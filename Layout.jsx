import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "./utils";
import { User } from "./entities/User";
import {
  LayoutDashboard,
  BookOpen,
  Wallet,
  Banknote,
  Users,
  Trophy,
  Menu,
  TrendingUp,
  Shield,
  Target
} from "./icons";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar";
import { Card } from "./components/ui/card";
import { Button } from "./components/ui/button";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: LayoutDashboard,
    description: "Financial overview"
  },
  {
    title: "Courses",
    url: createPageUrl("Courses"),
    icon: BookOpen,
    description: "Learning center"
  },
  {
    title: "Budget & Credit",
    url: createPageUrl("Budget"),
    icon: Wallet,
    description: "Track & analyze"
  },
  {
    title: "Debts",
    url: createPageUrl("Debts"),
    icon: Banknote,
    description: "Debt management"
  },
  {
    title: "Stokvels",
    url: createPageUrl("Stokvels"),
    icon: Users,
    description: "Savings groups"
  },
  {
    title: "Challenges",
    url: createPageUrl("Challenges"),
    icon: Trophy,
    description: "Gamified goals"
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [currentUser, setCurrentUser] = React.useState(null);
  const [loadingUser, setLoadingUser] = React.useState(true);

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await User.me();
        setCurrentUser(user);
      } catch (error) {
        console.log("User not authenticated, showing login");
        setCurrentUser(null);
      } finally {
        setLoadingUser(false);
      }
    };
    loadUser();
  }, []);

  // Display a loading indicator while user is being checked
  if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-emerald-500 animate-pulse" style={{ animationDelay: '0s' }}></div>
          <div className="w-4 h-4 rounded-full bg-emerald-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-4 h-4 rounded-full bg-emerald-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          <p className="text-slate-700 ml-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <Card className="glass-effect shadow-lg border-0 p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome to FinCoach</h2>
          <p className="text-slate-600 mb-6">Please log in to access your financial dashboard</p>
          <Button 
            onClick={() => User.login()}
            className="bg-emerald-600 hover:bg-emerald-700 w-full"
          >
            Login with Google
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <style>{`
          :root {
            --primary: 30 41 59;
            --primary-foreground: 248 250 252;
            --secondary: 16 185 129;
            --accent: 245 158 11;
            --destructive: 239 68 68;
            --success: 16 185 129;
          }
          
          .nav-gradient {
            background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
          }
          
          .glass-effect {
            backdrop-filter: blur(20px);
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
        `}</style>
        
        <Sidebar className="border-r-0 shadow-xl">
          <div className="nav-gradient h-full">
            <SidebarHeader className="border-b border-slate-700/30 p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-white text-lg">FinCoach</h2>
                  <p className="text-xs text-slate-300">Student Finance Coach</p>
                </div>
              </div>
            </SidebarHeader>
            
            <SidebarContent className="p-2">
              <SidebarGroup>
                <SidebarGroupLabel className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 py-3">
                  Navigation
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-1">
                    {navigationItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton 
                          asChild 
                          className={`group hover:bg-white/10 hover:text-white transition-all duration-300 rounded-xl mb-1 p-3 ${
                            location.pathname === item.url 
                              ? 'bg-emerald-500/20 text-emerald-300 shadow-lg border border-emerald-500/30' 
                              : 'text-slate-300 hover:shadow-md'
                          }`}
                        >
                          <Link to={item.url} className="flex items-center gap-3">
                            <item.icon className={`w-5 h-5 transition-transform duration-300 ${
                              location.pathname === item.url ? 'scale-110' : 'group-hover:scale-105'
                            }`} />
                            <div>
                              <span className="font-medium text-sm">{item.title}</span>
                              <p className="text-xs opacity-75">{item.description}</p>
                            </div>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup className="mt-8">
                <SidebarGroupLabel className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 py-3">
                  Quick Stats
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <div className="px-3 py-2 space-y-3">
                    <div className="flex items-center justify-between text-sm bg-white/5 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-emerald-400" />
                        <span className="text-slate-300">Trust Score</span>
                      </div>
                      <span className="font-bold text-emerald-400">{currentUser?.trust_score || 100}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm bg-white/5 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-amber-400" />
                        <span className="text-slate-300">Streak</span>
                      </div>
                      <span className="font-bold text-amber-400">{currentUser?.current_streak || 0} days</span>
                    </div>
                  </div>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-slate-700/30 p-4">
              <div className="flex items-center gap-3 bg-white/5 rounded-lg p-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {currentUser?.full_name?.charAt(0) || currentUser?.email?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white text-sm truncate">
                    {currentUser?.full_name || 'Student'}
                  </p>
                  <p className="text-xs text-slate-400 truncate">
                    {currentUser?.email}
                  </p>
                </div>
              </div>
              <Button 
                onClick={() => User.logout()}
                variant="ghost"
                className="w-full text-slate-300 hover:text-white hover:bg-white/10"
                size="sm"
              >
                Logout
              </Button>
            </SidebarFooter>
          </div>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          {/* Mobile Header */}
          <header className="bg-white/80 glass-effect border-b border-slate-200/50 px-6 py-4 md:hidden sticky top-0 z-40">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-slate-100 p-2 rounded-lg transition-colors duration-200">
                <Menu className="w-5 h-5" />
              </SidebarTrigger>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
                <h1 className="text-xl font-bold text-slate-800">FinCoach</h1>
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
