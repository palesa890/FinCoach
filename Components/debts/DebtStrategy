import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Zap } from "lucide-react";

export default function DebtStrategy({ debts }) {
  const getSnowballStrategy = () => {
    return [...debts]
      .sort((a, b) => (a.current_balance || 0) - (b.current_balance || 0))
      .slice(0, 3);
  };

  const getAvalancheStrategy = () => {
    return [...debts]
      .sort((a, b) => (b.interest_rate || 0) - (a.interest_rate || 0))
      .slice(0, 3);
  };

  const snowball = getSnowballStrategy();
  const avalanche = getAvalancheStrategy();

  return (
    <Card className="glass-effect shadow-lg border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-800">
          <Target className="w-5 h-5 text-purple-500" />
          Payoff Strategies
        </CardTitle>
      </CardHeader>
      <CardContent>
        {debts.length > 0 ? (
          <div className="space-y-6">
            {/* Snowball Method */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-blue-500" />
                <h4 className="font-semibold text-slate-800">Snowball Method</h4>
                <Badge variant="outline" className="text-xs">Motivating</Badge>
              </div>
              <p className="text-xs text-slate-600 mb-3">
                Pay smallest debts first for quick wins
              </p>
              <div className="space-y-2">
                {snowball.map((debt, index) => (
                  <div key={debt.id} className="flex items-center gap-2 text-sm">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </span>
                    <span className="flex-1">{debt.creditor}</span>
                    <span className="font-medium">R{debt.current_balance?.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Avalanche Method */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-emerald-500" />
                <h4 className="font-semibold text-slate-800">Avalanche Method</h4>
                <Badge variant="outline" className="text-xs">Saves Money</Badge>
              </div>
              <p className="text-xs text-slate-600 mb-3">
                Pay highest interest debts first
              </p>
              <div className="space-y-2">
                {avalanche.map((debt, index) => (
                  <div key={debt.id} className="flex items-center gap-2 text-sm">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </span>
                    <span className="flex-1">{debt.creditor}</span>
                    <span className="font-medium">{debt.interest_rate}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <p className="text-xs text-slate-500">
                💡 Choose snowball for motivation or avalanche to save on interest
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Target className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-500 text-sm">Add debts to see strategies</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}