-- Create clients table
CREATE TABLE public.clients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create campaigns table
CREATE TABLE public.campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ad_proofs table
CREATE TABLE public.ad_proofs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  platform TEXT NOT NULL, -- 'facebook', 'instagram', 'linkedin', 'youtube', 'google_pmax'
  ad_format TEXT NOT NULL, -- 'single_image', 'story', 'carousel', 'pmax'
  share_token TEXT NOT NULL UNIQUE,
  current_version INT NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'approved', 'revision_requested'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ad_proof_versions table
CREATE TABLE public.ad_proof_versions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ad_proof_id UUID NOT NULL REFERENCES public.ad_proofs(id) ON DELETE CASCADE,
  version_number INT NOT NULL,
  ad_data JSONB NOT NULL, -- Stores all form data specific to platform/format
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(ad_proof_id, version_number)
);

-- Create comments table
CREATE TABLE public.comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ad_proof_id UUID NOT NULL REFERENCES public.ad_proofs(id) ON DELETE CASCADE,
  version_number INT NOT NULL,
  comment_type TEXT NOT NULL, -- 'general' or 'field_specific'
  field_name TEXT, -- NULL for general comments, field name for specific comments
  comment_text TEXT NOT NULL,
  commenter_name TEXT NOT NULL,
  commenter_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create approvals table
CREATE TABLE public.approvals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ad_proof_id UUID NOT NULL REFERENCES public.ad_proofs(id) ON DELETE CASCADE,
  version_number INT NOT NULL,
  decision TEXT NOT NULL, -- 'approved' or 'revision_requested'
  comment TEXT NOT NULL,
  approver_name TEXT NOT NULL,
  approver_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ad_proofs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ad_proof_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.approvals ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Public access for viewing proofs via share token
CREATE POLICY "Anyone can view ad proofs with valid share token"
ON public.ad_proofs FOR SELECT
USING (true);

CREATE POLICY "Anyone can view ad proof versions"
ON public.ad_proof_versions FOR SELECT
USING (true);

CREATE POLICY "Anyone can view comments"
ON public.comments FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert comments"
ON public.comments FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can view approvals"
ON public.approvals FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert approvals"
ON public.approvals FOR INSERT
WITH CHECK (true);

-- Internal management requires authentication (will add auth later)
CREATE POLICY "Public read access for clients"
ON public.clients FOR SELECT
USING (true);

CREATE POLICY "Public read access for campaigns"
ON public.campaigns FOR SELECT
USING (true);

-- Create storage buckets for ad media
INSERT INTO storage.buckets (id, name, public) 
VALUES ('ad-media', 'ad-media', true);

-- Storage policies for ad media
CREATE POLICY "Anyone can view ad media"
ON storage.objects FOR SELECT
USING (bucket_id = 'ad-media');

CREATE POLICY "Anyone can upload ad media"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'ad-media');

CREATE POLICY "Anyone can update ad media"
ON storage.objects FOR UPDATE
USING (bucket_id = 'ad-media');

-- Create indexes for performance
CREATE INDEX idx_campaigns_client_id ON public.campaigns(client_id);
CREATE INDEX idx_ad_proofs_campaign_id ON public.ad_proofs(campaign_id);
CREATE INDEX idx_ad_proofs_share_token ON public.ad_proofs(share_token);
CREATE INDEX idx_ad_proof_versions_ad_proof_id ON public.ad_proof_versions(ad_proof_id);
CREATE INDEX idx_comments_ad_proof_id ON public.comments(ad_proof_id);
CREATE INDEX idx_approvals_ad_proof_id ON public.approvals(ad_proof_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_clients_updated_at
BEFORE UPDATE ON public.clients
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at
BEFORE UPDATE ON public.campaigns
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ad_proofs_updated_at
BEFORE UPDATE ON public.ad_proofs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();