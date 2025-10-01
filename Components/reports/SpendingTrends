import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";
import { format, startOfMonth } from "date-fns";

export default function SpendingTrends({ transactions, isLoading }) {
  const generateChartData = () => {
    const monthlyData = {};
    
    transactions.forEach(t => {
      const date = new Date(t.date || t.created_date);
      const monthKey = format(startOfMonth(date), "MMM yyyy");
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { month: monthKey, income: 0, expenses: 0 };
      }
      
      if (t.type === "income") {
        monthlyData[monthKey].income += t.amount;
      } else {
        monthlyData[monthKey].expenses += t.amount;
      }
    });
    
    return Object.values(monthlyData).slice(-6);
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
          <TrendingUp className="w-5 h-5 text-blue-500" />
          Spending Trends
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-500">No data available for trends</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}