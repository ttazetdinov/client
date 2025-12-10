import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Home, Users, Calendar, MessageCircle, Bell, User, Settings, LogOut, Tag } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { Avatar } from "../ui/Avatar";
import { Badge } from "../ui/Badge";

interface MainLayoutProps {
  children: ReactNode;
}

const navItems = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/members", icon: Users, label: "Members" },
  { href: "/events", icon: Calendar, label: "Events" },
  { href: "/ads", icon: Tag, label: "Ads" },
  { href: "/messages", icon: MessageCircle, label: "Messages" },
  { href: "/notifications", icon: Bell, label: "Alerts" },
];

export function MainLayout({ children }: MainLayoutProps) {
  const [location] = useLocation();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/dashboard">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                <span className="text-lg font-bold">L</span>
              </div>
              <span className="font-heading font-bold text-xl hidden sm:block">Lumiere</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location === item.href || location.startsWith(item.href + "/");
              return (
                <Link key={item.href} href={item.href}>
                  <button
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                      isActive
                        ? "gradient-bg text-white"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                    data-testid={`nav-${item.label.toLowerCase()}`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/profile">
              <div className="flex items-center gap-2 cursor-pointer">
                <Avatar 
                  src={user?.avatar} 
                  name={user?.name || "User"} 
                  size="sm"
                  isVip={user?.isVip}
                />
                <span className="hidden sm:block text-sm font-medium">{user?.name}</span>
              </div>
            </Link>
            <Link href="/settings">
              <button 
                className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all"
                data-testid="nav-settings"
              >
                <Settings className="w-5 h-5" />
              </button>
            </Link>
            <button
              onClick={() => logout()}
              className="p-2 rounded-lg text-white/60 hover:text-red-400 hover:bg-white/5 transition-all"
              data-testid="button-logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-20 pb-24 md:pb-8">
        <div className="max-w-6xl mx-auto px-4">
          {children}
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 md:hidden glass-card border-t border-white/5 safe-area-bottom">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const isActive = location === item.href || location.startsWith(item.href + "/");
            return (
              <Link key={item.href} href={item.href}>
                <button
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                    isActive ? "text-purple-400" : "text-white/50"
                  }`}
                  data-testid={`mobile-nav-${item.label.toLowerCase()}`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </button>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
