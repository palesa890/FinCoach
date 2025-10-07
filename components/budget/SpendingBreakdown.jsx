import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, TrendingUp, Target } from "lucide-react";

export default function SpendingBreakdown({ budget, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {[1,2,3].map(i => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-slate-200 rounded mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-20 bg-slate-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const essentialPercentage = budget.essential_budget ? 
    ((budget.essential_spent || 0) / budget.essential_budget) * 100 : 0;
  const discretionaryPercentage = budget.discretionary_budget ? 
    ((budget.discretionary_spent || 0) / budget.discretionary_budget) * 100 : 0;
  const savingsPercentage = budget.savings_goal ? 
    ((budget.savings_actual || 0) / budget.savings_goal) * 100 : 0;

  const getStatusColor = (percentage) => {
    if (percentage < 70) return "text-emerald-600";
    if (percentage < 90) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Essential Spending */}
      <Card className="glass-effect shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <TrendingDown className="w-5 h-5 text-blue-500" />
            Essential Expenses
          </CardTitle>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">R{(budget.essential_spent || 0).toLocaleString()}</span>
            <Badge variant="outline" className={getStatusColor(essentialPercentage)}>
              {Math.round(essentialPercentage)}%
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Progress value={essentialPercentage} className="h-3" />
            <div className="flex justify-between text-sm text-slate-600">
              <span>Budget: R{(budget.essential_budget || 0).toLocaleString()}</span>
              <span>Left: R{((budget.essential_budget || 0) - (budget.essential_spent || 0)).toLocaleString()}</span>
            </div>
            <p className="text-xs text-slate-500">
              Rent, groceries, utilities, transport
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Discretionary Spending */}
      <Card className="glass-effect shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <TrendingUp className="w-5 h-5 text-purple-500" />
            Fun Money
          </CardTitle>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">R{(budget.discretionary_spent || 0).toLocaleString()}</span>
            <Badge variant="outline" className={getStatusColor(discretionaryPercentage)}>
              {Math.round(discretionaryPercentage)}%
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Progress value={discretionaryPercentage} className="h-3" />
            <div className="flex justify-between text-sm text-slate-600">
              <span>Budget: R{(budget.discretionary_budget || 0).toLocaleString()}</span>
              <span>Left: R{((budget.discretionary_budget || 0) - (budget.discretionary_spent || 0)).toLocaleString()}</span>
            </div>
            <p className="text-xs text-slate-500">
              Entertainment, dining out, shopping
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Savings Progress */}
      <Card className="glass-effect shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <Target className="w-5 h-5 text-emerald-500" />
            Savings Goal
          </CardTitle>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">R{(budget.savings_actual || 0).toLocaleString()}</span>
            <Badge variant="outline" className="text-emerald-600">
              {Math.round(savingsPercentage)}%
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Progress value={savingsPercentage} className="h-3" />
            <div className="flex justify-between text-sm text-slate-600">
              <span>Goal: R{(budget.savings_goal || 0).toLocaleString()}</span>
              <span>To go: R{((budget.savings_goal || 0) - (budget.savings_actual || 0)).toLocaleString()}</span>
            </div>
            <p className="text-xs text-slate-500">
              Emergency fund, future goals
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}