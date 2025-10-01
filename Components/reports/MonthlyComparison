import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart3 } from "lucide-react";
import { format } from "date-fns";

export default function MonthlyComparison({ budgets, isLoading }) {
  const generateChartData = () => {
    return budgets.slice(0, 6).map(budget => ({
      month: format(new Date(budget.month + "-01"), "MMM yyyy"),
      budgeted: (budget.essential_budget || 0) + (budget.discretionary_budget || 0),
      spent: (budget.essential_spent || 0) + (budget.discretionary_spent || 0),
      saved: budget.savings_actual || 0
    })).reverse();
  };

  const data = generateChartData();

  if (isLoading) {
    return (
      <Card className="glass-effect shadow-lg border-0 animate-pulse">
        <CardHeader>
          <div className="h-6 bg-slate-200 rounded"></div>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-slate-200 rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-effect shadow-lg border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-emerald-500" />
          Budget Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="budgeted" fill="#94a3b8" name="Budgeted" />
              <Bar dataKey="spent" fill="#ef4444" name="Spent" />
              <Bar dataKey="saved" fill="#10b981" name="Saved" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-500">No budget data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}