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
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-foreground">Ad Proof Review</h1>
          <p className="text-sm text-muted-foreground">Client Name - Campaign Name</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Ad Preview */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Ad Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border p-8 text-center text-muted-foreground">
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
                  <Label htmlFor="name">Your Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email (optional)</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="comment">Comment</Label>
                  <Textarea
                    id="comment"
                    placeholder="Please provide your feedback..."
                    rows={5}
                  />
                </div>
                <div className="flex gap-3">
                  <Button className="flex-1" variant="default">
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
                <CardTitle>Comments</CardTitle>
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
