import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Receipt, TrendingUp, TrendingDown } from "lucide-react";
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

const classificationColors = {
  need: "bg-blue-100 text-blue-800",
  want: "bg-purple-100 text-purple-800",
  saving: "bg-emerald-100 text-emerald-800",
  investment: "bg-amber-100 text-amber-800"
};

export default function TransactionList({ transactions, isLoading }) {
  if (isLoading) {
    return (
      <Card className="glass-effect shadow-lg border-0">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1,2,3,4,5].map(i => (
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
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-effect shadow-lg border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Receipt className="w-5 h-5 text-slate-600" />
          Recent Transactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length > 0 ? (
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div 
                key={transaction.id}
                className="flex items-center justify-between p-4 hover:bg-slate-50/50 rounded-lg transition-colors border border-slate-100"
              >
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
                  <div className="flex-1">
                    <div className="font-medium text-slate-800">{transaction.description}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${categoryColors[transaction.category] || categoryColors.other}`}
                      >
                        {transaction.category}
                      </Badge>
                      
                      {transaction.classification && (
                        <Badge 
                          variant="secondary"
                          className={`text-xs ${classificationColors[transaction.classification]}`}
                        >
                          {transaction.classification}
                        </Badge>
                      )}
                      
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
                  {transaction.type === 'income' ? '+' : '-'}R{Math.abs(transaction.amount).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Receipt className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">No transactions found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}