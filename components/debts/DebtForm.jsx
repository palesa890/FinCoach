import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";

export default function DebtForm({ debt, onSave, onCancel }) {
  const [formData, setFormData] = useState(debt || {
    creditor: "",
    debt_type: "credit_card",
    original_amount: 0,
    current_balance: 0,
    monthly_payment: 0,
    interest_rate: 0,
    due_date: "",
    priority: "medium"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" onClick={onCancel}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                {debt ? "Edit Debt" : "Add New Debt"}
              </h1>
            </div>
          </div>

          <Card className="glass-effect shadow-lg border-0">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Creditor Name *</Label>
                    <Input
                      value={formData.creditor}
                      onChange={(e) => setFormData({...formData, creditor: e.target.value})}
                      required
                      placeholder="e.g., Bank Name, Store"
                    />
                  </div>

                  <div>
                    <Label>Debt Type *</Label>
                    <select
                      value={formData.debt_type}
                      onChange={(e) => setFormData({...formData, debt_type: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-200 rounded-md"
                      required
                    >
                      <option value="student_loan">Student Loan</option>
                      <option value="credit_card">Credit Card</option>
                      <option value="personal_loan">Personal Loan</option>
                      <option value="overdraft">Overdraft</option>
                      <option value="store_credit">Store Credit</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Original Amount</Label>
                    <Input
                      type="number"
                      value={formData.original_amount}
                      onChange={(e) => setFormData({...formData, original_amount: parseFloat(e.target.value)})}
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <Label>Current Balance *</Label>
                    <Input
                      type="number"
                      value={formData.current_balance}
                      onChange={(e) => setFormData({...formData, current_balance: parseFloat(e.target.value)})}
                      required
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Monthly Payment</Label>
                    <Input
                      type="number"
                      value={formData.monthly_payment}
                      onChange={(e) => setFormData({...formData, monthly_payment: parseFloat(e.target.value)})}
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <Label>Interest Rate (%)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={formData.interest_rate}
                      onChange={(e) => setFormData({...formData, interest_rate: parseFloat(e.target.value)})}
                      placeholder="0.0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Next Payment Date</Label>
                    <Input
                      type="date"
                      value={formData.due_date}
                      onChange={(e) => setFormData({...formData, due_date: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label>Priority Level</Label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({...formData, priority: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-200 rounded-md"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save Debt
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}