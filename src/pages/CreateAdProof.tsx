import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { SiGoogle } from "react-icons/si";

const CreateAdProof = () => {
  const navigate = useNavigate();
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);

  const platforms = [
    { id: "facebook", name: "Facebook", icon: Facebook, color: "text-blue-600" },
    { id: "instagram", name: "Instagram", icon: Instagram, color: "text-pink-600" },
    { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "text-blue-700" },
    { id: "youtube", name: "YouTube", icon: Youtube, color: "text-red-600" },
    { id: "google_pmax", name: "Google Performance Max", icon: SiGoogle, color: "text-blue-500" },
  ];

  const formatsByPlatform: Record<string, Array<{ id: string; name: string; description: string }>> = {
    facebook: [
      { id: "single_image", name: "Single Image Feed", description: "Single image ad for Facebook feed" },
      { id: "story", name: "Story", description: "Vertical format story ad" },
      { id: "carousel", name: "Carousel", description: "Multiple images in carousel format" },
    ],
    instagram: [
      { id: "single_image", name: "Single Image Feed", description: "Single image ad for Instagram feed" },
      { id: "story", name: "Story", description: "Vertical format story ad" },
      { id: "carousel", name: "Carousel", description: "Multiple images in carousel format" },
    ],
    linkedin: [
      { id: "single_image", name: "Single Image", description: "Single image/video feed ad" },
      { id: "carousel", name: "Carousel", description: "Multiple images in carousel format" },
    ],
    youtube: [
      { id: "video", name: "Video Ad", description: "Video advertisement for YouTube" },
    ],
    google_pmax: [
      { id: "pmax", name: "Performance Max", description: "Multi-format Performance Max campaign" },
    ],
  };

  const handlePlatformSelect = (platformId: string) => {
    setSelectedPlatform(platformId);
    setSelectedFormat(null);
  };

  const handleFormatSelect = (formatId: string) => {
    setSelectedFormat(formatId);
  };

  const handleContinue = () => {
    if (selectedPlatform && selectedFormat) {
      navigate(`/create/${selectedPlatform}/${selectedFormat}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-foreground">Create New Ad Proof</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Step 1: Select Platform */}
          <div>
            <h2 className="mb-4 text-xl font-semibold">Step 1: Select Ad Channel</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {platforms.map((platform) => {
                const Icon = platform.icon;
                return (
                  <Card
                    key={platform.id}
                    className={`cursor-pointer transition-all hover-scale ${
                      selectedPlatform === platform.id ? "border-primary ring-2 ring-primary" : ""
                    }`}
                    onClick={() => handlePlatformSelect(platform.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Icon className={`h-8 w-8 ${platform.color}`} />
                        <CardTitle>{platform.name}</CardTitle>
                      </div>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Step 2: Select Format */}
          {selectedPlatform && (
            <div className="animate-fade-in">
              <h2 className="mb-4 text-xl font-semibold">Step 2: Select Ad Format</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {formatsByPlatform[selectedPlatform]?.map((format) => (
                  <Card
                    key={format.id}
                    className={`cursor-pointer transition-all hover-scale ${
                      selectedFormat === format.id ? "border-primary ring-2 ring-primary" : ""
                    }`}
                    onClick={() => handleFormatSelect(format.id)}
                  >
                    <CardHeader>
                      <CardTitle>{format.name}</CardTitle>
                      <CardDescription>{format.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Continue Button */}
          {selectedPlatform && selectedFormat && (
            <div className="flex justify-end animate-fade-in">
              <Button size="lg" onClick={handleContinue}>
                Continue
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CreateAdProof;
