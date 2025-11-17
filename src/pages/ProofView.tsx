import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThumbsUp, MessageSquare } from "lucide-react";

const ProofView = () => {
  const { shareToken } = useParams();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background">
        <div className="mx-auto px-6 py-6">
          <h1 className="text-2xl font-bold text-foreground">Ad Proof Manager</h1>
          <p className="text-sm text-muted-foreground">Ad Proof Review</p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Client Name - Campaign Name</h2>
          <p className="text-sm text-muted-foreground">Version 1</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Ad Preview */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Ad Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex min-h-[400px] items-center justify-center rounded-lg border-2 border-dashed text-muted-foreground">
                  Ad preview will appear here
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Approval Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Feedback</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name *</Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email (optional)</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="comment">Comment *</Label>
                  <Textarea
                    id="comment"
                    placeholder="Please provide your feedback..."
                    rows={5}
                  />
                </div>
                <div className="flex gap-3">
                  <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                  <Button className="flex-1" variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Request Revision
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Comments History */}
            <Card>
              <CardHeader>
                <CardTitle>Comments & History</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">No comments yet</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProofView;
