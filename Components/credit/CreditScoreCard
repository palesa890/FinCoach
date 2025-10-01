import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

const riskConfig = {
  excellent: {
    color: "text-emerald-600 bg-emerald-50",
    icon: CheckCircle,
    label: "Excellent",
    description: "Outstanding credit health!"
  },
  good: {
    color: "text-blue-600 bg-blue-50",
    icon: TrendingUp,
    label: "Good", 
    description: "Solid financial standing"
  },
  fair: {
    color: "text-amber-600 bg-amber-50",
    icon: AlertTriangle,
    label: "Fair",
    description: "Room for improvement"
  },
  poor: {
    color: "text-red-600 bg-red-50",
    icon: AlertTriangle,
    label: "Needs Attention",
    description: "Focus on improvement"
  }
};

export default function CreditScoreCard({ score, riskLevel, isLoading }) {
  const config = riskConfig[riskLevel] || riskConfig.fair;
  const Icon = config.icon;

  if (isLoading) {
    return (
      <Card className="glass-effect shadow-lg border-0 animate-pulse">
        <CardHeader>
          <div className="h-6 bg-slate-200 rounded mb-2"></div>
        </CardHeader>
        <CardContent>
          <div className="h-16 bg-slate-200 rounded mb-2"></div>
          <div className="h-4 bg-slate-200 rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-effect shadow-lg border-0">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-slate-800">
          <Shield className="w-5 h-5 text-blue-500" />
          Credit Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {score}/100
            </div>
            <Badge className={config.color}>
              <Icon className="w-3 h-3 mr-1" />
              {config.label}
            </Badge>
          </div>
          
          <div>
            <Progress value={score} className="h-3" />
            <p className="text-xs text-slate-600 mt-2 text-center">
              {config.description}
            </p>
          </div>
          
          <div className="text-xs text-slate-500 text-center">
            Student-friendly scoring
          </div>
        </div>
      </CardContent>
    </Card>
  );
}