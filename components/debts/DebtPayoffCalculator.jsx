import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

export default function DebtPayoffCalculator({ debts }) {
  const [extraPayment, setExtraPayment] = useState(0);

  const calculatePayoffTime = () => {
    if (debts.length === 0) return null;

    const totalDebt = debts.reduce((sum, d) => sum + (d.current_balance || 0), 0);
    const totalMonthly = debts.reduce((sum, d) => sum + (d.monthly_payment || 0), 0);
    const avgInterest = debts.reduce((sum, d) => sum + (d.interest_rate || 0), 0) / debts.length;

    if (totalMonthly === 0) return null;

    // Simple calculation (not accounting for compound interest precisely)
    const monthlyInterestRate = (avgInterest / 100) / 12;
    const totalPayment = totalMonthly + extraPayment;
    
    let months = 0;
    let remainingBalance = totalDebt;
    
    while (remainingBalance > 0 && months < 600) { // Cap at 50 years
      const interestPayment = remainingBalance * monthlyInterestRate;
      const principalPayment = totalPayment - interestPayment;
      remainingBalance -= principalPayment;
      months++;
    }

    const totalInterest = (totalPayment * months) - totalDebt;

    return {
      months,
      years: Math.floor(months / 12),
      remainingMonths: months % 12,
      totalPaid: totalPayment * months,
      totalInterest
    };
  };

  const payoffInfo = calculatePayoffTime();

  return (
    <Card className="glass-effect shadow-lg border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-800">
          <Calculator className="w-5 h-5 text-emerald-500" />
          Payoff Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        {debts.length > 0 ? (
          <div className="space-y-4">
            <div>
              <Label>Extra Monthly Payment</Label>
              <Input
                type="number"
                value={extraPayment}
                onChange={(e) => setExtraPayment(parseFloat(e.target.value) || 0)}
                placeholder="0.00"
              />
            </div>

            {payoffInfo && (
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-600">Time to payoff:</span>
                  <span className="font-semibold">
                    {payoffInfo.years}y {payoffInfo.remainingMonths}m
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Total to pay:</span>
                  <span className="font-semibold">R{payoffInfo.totalPaid.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Total interest:</span>
                  <span className="font-semibold text-red-600">
                    R{payoffInfo.totalInterest.toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-200">
              <p className="text-xs text-slate-500">
                💡 Paying just R{extraPayment || 100} extra per month can significantly reduce your payoff time!
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Calculator className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-500 text-sm">Add debts to calculate payoff time</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}