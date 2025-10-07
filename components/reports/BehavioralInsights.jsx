import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, AlertTriangle, CheckCircle, Lightbulb } from "lucide-react";

export default function BehavioralInsights({ transactions, isLoading }) {
  const generateInsights = () => {
    const insights = [];
    
    // Mood spending analysis
    const moodSpending = {};
    transactions.filter(t => t.mood && t.type === "expense").forEach(t => {
      moodSpending[t.mood] = (moodSpending[t.mood] || 0) + t.amount;
    });
    
    if (Object.keys(moodSpending).length > 0) {
      const topMood = Object.entries(moodSpending).sort(([,a], [,b]) => b - a)[0];
      insights.push({
        type: "warning",
        icon: AlertTriangle,
        title: "Mood Spending Pattern",
        description: `You spend most when feeling ${topMood[0].replace('_', ' ')} (R${topMood[1].toFixed(0)}). Consider creating a 24-hour rule for purchases during this mood.`
      });
    }
    
    // Need vs Want analysis
    const needWant = {};
    transactions.filter(t => t.classification && t.type === "expense").forEach(t => {
      needWant[t.classification] = (needWant[t.classification] || 0) + t.amount;
    });
    
    if (needWant.want > needWant.need) {
      insights.push({
        type: "tip",
        icon: Lightbulb,
        title: "Discretionary Spending Alert",
        description: `You're spending R${(needWant.want - needWant.need).toFixed(0)} more on wants than needs. Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings.`
      });
    } else if (needWant.need > needWant.want) {
      insights.push({
        type: "success",
        icon: CheckCircle,
        title: "Excellent Prioritization",
        description: "You're prioritizing needs over wants. This shows great financial discipline!"
      });
    }
    
    // Weekend spending
    const weekendSpending = transactions.filter(t => {
      const date = new Date(t.date || t.created_date);
      const day = date.getDay();
      return (day === 0 || day === 6) && t.type === "expense";
    });
    
    const weekendTotal = weekendSpending.reduce((sum, t) => sum + t.amount, 0);
    const totalSpending = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
    
    if (weekendTotal / totalSpending > 0.4) {
      insights.push({
        type: "tip",
        icon: Lightbulb,
        title: "Weekend Spending Pattern",
        description: `${((weekendTotal / totalSpending) * 100).toFixed(0)}% of your spending happens on weekends. Plan free activities to reduce weekend expenses.`
      });
    }
    
    return insights.slice(0, 4);
  };

  const insights = generateInsights();

  const getInsightStyle = (type) => {
    switch (type) {
      case "success":
        return "border-emerald-200 bg-emerald-50";
      case "warning":
        return "border-amber-200 bg-amber-50";
      case "tip":
        return "border-blue-200 bg-blue-50";
      default:
        return "border-slate-200 bg-slate-50";
    }
  };

  const getIconStyle = (type) => {
    switch (type) {
      case "success":
        return "text-emerald-600";
      case "warning":
        return "text-amber-600";
      case "tip":
        return "text-blue-600";
      default:
        return "text-slate-600";
    }
  };

  if (isLoading) {
    return (
      <Card className="glass-effect shadow-lg border-0 animate-pulse">
        <CardHeader>
          <div className="h-6 bg-slate-200 rounded"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1,2,3].map(i => (
              <div key={i} className="h-20 bg-slate-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-effect shadow-lg border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-500" />
          Behavioral Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        {insights.length > 0 ? (
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border ${getInsightStyle(insight.type)}`}
              >
                <div className="flex items-start gap-3">
                  <insight.icon className={`w-5 h-5 mt-0.5 ${getIconStyle(insight.type)}`} />
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">{insight.title}</h4>
                    <p className="text-sm text-slate-600">{insight.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Brain className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-500">Track more transactions to get behavioral insights</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}