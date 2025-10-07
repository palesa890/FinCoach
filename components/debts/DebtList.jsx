import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Banknote, Pencil, Trash2, Calendar, TrendingDown } from "lucide-react";
import { format } from "date-fns";

const debtTypeColors = {
  student_loan: "bg-blue-100 text-blue-800",
  credit_card: "bg-red-100 text-red-800",
  personal_loan: "bg-purple-100 text-purple-800",
  overdraft: "bg-amber-100 text-amber-800",
  store_credit: "bg-pink-100 text-pink-800",
  other: "bg-gray-100 text-gray-800"
};

const priorityColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-amber-100 text-amber-800",
  low: "bg-green-100 text-green-800"
};

export default function DebtList({ debts, onEdit, onDelete, isLoading }) {
  if (isLoading) {
    return (
      <Card className="glass-effect shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Banknote className="w-5 h-5 text-blue-500" />
            Your Debts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1,2,3].map(i => (
              <div key={i} className="p-4 animate-pulse">
                <div className="h-6 bg-slate-200 rounded mb-2"></div>
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
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
          <Banknote className="w-5 h-5 text-blue-500" />
          Your Debts
        </CardTitle>
      </CardHeader>
      <CardContent>
        {debts.length > 0 ? (
          <div className="space-y-4">
            {debts.map((debt) => {
              const payoffPercentage = debt.original_amount > 0 
                ? ((debt.original_amount - debt.current_balance) / debt.original_amount) * 100 
                : 0;
              
              return (
                <div key={debt.id} className="p-4 bg-slate-50/50 rounded-lg border border-slate-200">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-1">{debt.creditor}</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge className={debtTypeColors[debt.debt_type]}>
                          {debt.debt_type.replace('_', ' ')}
                        </Badge>
                        <Badge className={priorityColors[debt.priority]}>
                          {debt.priority} priority
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => onEdit(debt)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => onDelete(debt.id)}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Current Balance</span>
                      <span className="font-semibold">R{debt.current_balance?.toLocaleString() || 0}</span>
                    </div>
                    {debt.original_amount > 0 && (
                      <>
                        <Progress value={payoffPercentage} className="h-2" />
                        <p className="text-xs text-slate-500">
                          {payoffPercentage.toFixed(0)}% paid off
                        </p>
                      </>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-slate-400" />
                      <div>
                        <p className="text-slate-600">Monthly Payment</p>
                        <p className="font-medium">R{debt.monthly_payment?.toLocaleString() || 0}</p>
                      </div>
                    </div>
                    {debt.due_date && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <div>
                          <p className="text-slate-600">Next Payment</p>
                          <p className="font-medium">{format(new Date(debt.due_date), "MMM d, yyyy")}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {debt.interest_rate > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-200">
                      <p className="text-xs text-slate-600">
                        Interest Rate: <span className="font-medium">{debt.interest_rate}% per year</span>
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <Banknote className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">No debts tracked yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}