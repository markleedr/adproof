import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Users, Link as LinkIcon, Key, Calendar, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: Home },
    { path: "/clients", label: "Clients", icon: Users },
    { path: "/links", label: "Links", icon: LinkIcon },
    { path: "/access", label: "Access", icon: Key },
    { path: "/booking", label: "Booking", icon: Calendar },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link to="/dashboard" className="text-xl font-bold text-foreground">
            Ad Proof Manager
          </Link>
          
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-secondary"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </header>
  );
};

export default Navigation;
