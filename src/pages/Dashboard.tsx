import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Users, FileText, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground">Manage your clients and ad proofs</p>
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              New
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Clients Section */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <CardTitle>Clients</CardTitle>
                </div>
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Plus className="mr-1 h-3 w-3" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <button className="flex w-full items-center justify-between rounded-lg border p-3 text-left hover:bg-secondary">
                  <span className="text-sm font-medium">View Clients (16)</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Ad Proofs Section */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  <CardTitle>Ad Proofs (0)</CardTitle>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    View Archived
                  </Button>
                </div>
                <Link to="/create">
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Plus className="mr-1 h-3 w-3" />
                    New Proof
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex min-h-[200px] items-center justify-center rounded-lg border-2 border-dashed">
                <p className="text-sm text-muted-foreground">
                  No ad proofs yet. Create your first ad proof for this client.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SMS Proofs Section */}
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <CardTitle>SMS Proofs (0)</CardTitle>
              </div>
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="mr-1 h-3 w-3" />
                New SMS Proof
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex min-h-[150px] items-center justify-center rounded-lg border-2 border-dashed">
              <p className="text-sm text-muted-foreground">
                No SMS proofs yet. Create your first SMS proof for this client.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Landing Page Proofs Section */}
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <CardTitle>Landing Page Proofs (0)</CardTitle>
              </div>
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="mr-1 h-3 w-3" />
                New Landing Page Proof
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex min-h-[150px] items-center justify-center rounded-lg border-2 border-dashed">
              <p className="text-sm text-muted-foreground">
                No landing page proofs yet.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
