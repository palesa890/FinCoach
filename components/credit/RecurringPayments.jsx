import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Repeat, Calendar, DollarSign } from "lucide-react";

const frequencyColors = {
  monthly: "bg-blue-100 text-blue-800",
  weekly: "bg-green-100 text-green-800",
  quarterly: "bg-purple-100 text-purple-800",
  yearly: "bg-amber-100 text-amber-800"
};

export default function RecurringPayments({ payments, totalCommitments }) {
  const sortedPayments = payments.sort((a, b) => (b.amount || 0) - (a.amount || 0));

  return (
    <Card className="glass-effect shadow-lg border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-800">
          <Repeat className="w-5 h-5 text-green-500" />
          Recurring Payments
        </CardTitle>
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-600">Monthly commitments</span>
          <span className="font-semibold text-green-600">
            R{totalCommitments.toLocaleString()}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        {sortedPayments.length > 0 ? (
          <div className="space-y-3">
            {sortedPayments.map((payment, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 bg-slate-50/50 rounded-lg"
              >
                <div className="flex-1">
                  <div className="font-medium text-slate-800">
                    {payment.description}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge 
                      variant="secondary"
                      className={frequencyColors[payment.frequency] || frequencyColors.monthly}
                    >
                      <Calendar className="w-3 h-3 mr-1" />
                      {payment.frequency || 'monthly'}
                    </Badge>
                  </div>
                </div>
                <div className="font-semibold text-slate-800">
                  R{(payment.amount || 0).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Repeat className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">No recurring payments detected</p>
            <p className="text-sm text-slate-500 mt-1">
              Upload a bank statement to analyze your commitments
            </p>
          </div>
        )}

        {payments.length > 0 && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-blue-800">Payment Insights</span>
            </div>
            <div className="space-y-1 text-sm text-blue-700">
              <div>• Largest payment: R{Math.max(...payments.map(p => p.amount || 0)).toLocaleString()}</div>
              <div>• Average payment: R{(totalCommitments / payments.length).toFixed(0)}</div>
              <div>• Total commitments: {((totalCommitments / 2500) * 100).toFixed(0)}% of typical student income</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}