import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Plus, Upload, Target, Users, BookOpen, PieChart } from "lucide-react";

const quickActions = [
  {
    title: "Set Budget",
    description: "Create monthly budget",
    icon: Plus,
    url: createPageUrl("Budget"),
    color: "bg-emerald-500 hover:bg-emerald-600"
  },
  {
    title: "Upload Statement",
    description: "Analyze bank statement", 
    icon: Upload,
    url: createPageUrl("Budget"),
    color: "bg-blue-500 hover:bg-blue-600"
  },
  {
    title: "Join Challenge",
    description: "Start saving challenge",
    icon: Target,
    url: createPageUrl("Challenges"), 
    color: "bg-purple-500 hover:bg-purple-600"
  },
  {
    title: "Find Stokvel",
    description: "Join savings group",
    icon: Users,
    url: createPageUrl("Stokvels"),
    color: "bg-amber-500 hover:bg-amber-600"
  },
  {
    title: "Learn Finance",
    description: "Take a course",
    icon: BookOpen,
    url: createPageUrl("Courses"),
    color: "bg-indigo-500 hover:bg-indigo-600"
  },
  {
    title: "Manage Debts",
    description: "Track your debts", 
    icon: PieChart,
    url: createPageUrl("Debts"),
    color: "bg-pink-500 hover:bg-pink-600"
  }
];

export default function QuickActions() {
  return (
    <Card className="glass-effect shadow-lg border-0 mb-8">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action) => (
            <Link key={action.title} to={action.url}>
              <Button 
                variant="outline" 
                className="h-auto p-4 flex flex-col items-center gap-2 hover:shadow-md transition-all duration-300 w-full"
              >
                <div className={`w-10 h-10 rounded-full ${action.color} flex items-center justify-center shadow-lg`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-medium text-sm text-slate-800">{action.title}</div>
                  <div className="text-xs text-slate-500">{action.description}</div>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}