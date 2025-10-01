import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Receipt, ArrowRight, TrendingUp, TrendingDown } from "lucide-react";
import { format } from "date-fns";

const categoryColors = {
  groceries: "bg-green-100 text-green-800",
  rent: "bg-blue-100 text-blue-800",
  transport: "bg-yellow-100 text-yellow-800",
  entertainment: "bg-purple-100 text-purple-800",
  dining: "bg-red-100 text-red-800",
  shopping: "bg-pink-100 text-pink-800",
  education: "bg-indigo-100 text-indigo-800",
  other: "bg-gray-100 text-gray-800"
};

const moodEmojis = {
  very_happy: "😄",
  happy: "😊",
  neutral: "😐", 
  stressed: "😰",
  sad: "😢",
  angry: "😡"
};

export default function RecentTransactions({ transactions, isLoading }) {
  return (
    <Card className="glass-effect shadow-lg border-0">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <Receipt className="w-5 h-5 text-green-500" />
            Recent Activity
          </CardTitle>
          <Link to={createPageUrl("Transactions")}>
            <Button variant="ghost" size="sm">
              View all
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {[1,2,3,4].map(i => (
              <div key={i} className="flex items-center justify-between p-3 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
                  <div>
                    <div className="h-4 bg-slate-200 rounded w-24 mb-1"></div>
                    <div className="h-3 bg-slate-200 rounded w-16"></div>
                  </div>
                </div>
                <div className="h-4 bg-slate-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        ) : transactions.length > 0 ? (
          <div className="space-y-3">
            {transactions.slice(0, 5).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-slate-50/50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'income' ? 'bg-emerald-100' : 'bg-slate-100'
                  }`}>
                    {transaction.type === 'income' ? (
                      <TrendingUp className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-slate-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-slate-800">{transaction.description}</div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${categoryColors[transaction.category] || categoryColors.other}`}
                      >
                        {transaction.category}
                      </Badge>
                      {transaction.mood && (
                        <span className="text-sm">{moodEmojis[transaction.mood]}</span>
                      )}
                      <span className="text-xs text-slate-500">
                        {format(new Date(transaction.date || transaction.created_date), "MMM d")}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={`font-semibold ${
                  transaction.type === 'income' ? 'text-emerald-600' : 'text-slate-800'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}R{Math.abs(transaction.amount).toFixed(0)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Receipt className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600 mb-4">No transactions yet</p>
            <Link to={createPageUrl("Transactions")}>
              <Button variant="outline">Add Your First Transaction</Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}