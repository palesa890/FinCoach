import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, AlertTriangle, Target } from "lucide-react";

export default function SpendingInsights({ transactions, isLoading }) {
  const calculateInsights = () => {
    const expenses = transactions.filter(t => t.type === "expense");
    
    // Category breakdown
    const categoryTotals = {};
    expenses.forEach(t => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });
    
    const sortedCategories = Object.entries(categoryTotals)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);

    // Mood analysis
    const moodTotals = {};
    expenses.filter(t => t.mood).forEach(t => {
      moodTotals[t.mood] = (moodTotals[t.mood] || 0) + t.amount;
    });

    // Classification breakdown
    const classificationTotals = {};
    expenses.filter(t => t.classification).forEach(t => {
      classificationTotals[t.classification] = (classificationTotals[t.classification] || 0) + t.amount;
    });

    const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);

    return {
      categories: sortedCategories,
      moods: moodTotals,
      classifications: classificationTotals,
      totalExpenses
    };
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-6 bg-slate-200 rounded"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1,2,3].map(i => (
                <div key={i} className="h-4 bg-slate-200 rounded"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { categories, moods, classifications, totalExpenses } = calculateInsights();

  const categoryColors = {
    groceries: "bg-green-500",
    rent: "bg-blue-500",
    transport: "bg-yellow-500",
    entertainment: "bg-purple-500",
    dining: "bg-red-500",
    shopping: "bg-pink-500",
    education: "bg-indigo-500",
    other: "bg-gray-500"
  };

  const moodEmojis = {
    very_happy: "😄",
    happy: "😊",
    neutral: "😐",
    stressed: "😰",
    sad: "😢", 
    angry: "😡"
  };

  return (
    <div className="space-y-6">
      {/* Top Categories */}
      <Card className="glass-effect shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            Top Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          {categories.length > 0 ? (
            <div className="space-y-3">
              {categories.map(([category, amount]) => (
                <div key={category}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium capitalize">{category}</span>
                    <span className="text-sm font-medium">R{amount.toFixed(0)}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${categoryColors[category] || categoryColors.other}`}
                      style={{ 
                        width: totalExpenses > 0 ? `${(amount / totalExpenses) * 100}%` : '0%'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-center py-4">No spending data yet</p>
          )}
        </CardContent>
      </Card>

      {/* Mood Analysis */}
      {Object.keys(moods).length > 0 && (
        <Card className="glass-effect shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <Brain className="w-5 h-5 text-purple-500" />
              Mood Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(moods)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 3)
                .map(([mood, amount]) => (
                  <div key={mood} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{moodEmojis[mood]}</span>
                      <span className="text-sm capitalize">{mood.replace('_', ' ')}</span>
                    </div>
                    <span className="font-medium">R{amount.toFixed(0)}</span>
                  </div>
                ))}
            </div>
            
            {Object.keys(moods).length > 0 && (
              <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                <p className="text-xs text-purple-700">
                  💡 You spend most when feeling{' '}
                  <strong>{Object.entries(moods).sort(([,a], [,b]) => b - a)[0][0].replace('_', ' ')}</strong>
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Need vs Want Analysis */}
      {Object.keys(classifications).length > 0 && (
        <Card className="glass-effect shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <Target className="w-5 h-5 text-emerald-500" />
              Need vs Want
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(classifications).map(([classification, amount]) => {
                const percentage = totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0;
                return (
                  <div key={classification}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium capitalize">{classification}</span>
                      <span className="text-sm font-medium">{percentage.toFixed(0)}%</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
            </div>

            {classifications.want && classifications.need && (
              <div className="mt-4 p-3 bg-emerald-50 rounded-lg">
                <p className="text-xs text-emerald-700">
                  {classifications.want > classifications.need ? (
                    <>⚠️ You're spending more on wants than needs. Consider prioritizing essentials.</>
                  ) : (
                    <>✅ Good balance! You're prioritizing needs over wants.</>
                  )}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}