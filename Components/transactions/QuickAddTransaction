import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Receipt, Smile } from "lucide-react";
import { format } from "date-fns";

const moodOptions = [
  { value: "very_happy", label: "😄 Very Happy", color: "bg-emerald-100" },
  { value: "happy", label: "😊 Happy", color: "bg-green-100" },
  { value: "neutral", label: "😐 Neutral", color: "bg-slate-100" },
  { value: "stressed", label: "😰 Stressed", color: "bg-amber-100" },
  { value: "sad", label: "😢 Sad", color: "bg-blue-100" },
  { value: "angry", label: "😡 Angry", color: "bg-red-100" }
];

const categoryOptions = [
  "groceries", "rent", "transport", "entertainment", "dining", 
  "shopping", "education", "healthcare", "utilities", "subscriptions", "other"
];

const classificationOptions = [
  { value: "need", label: "Need", color: "bg-blue-100 text-blue-800" },
  { value: "want", label: "Want", color: "bg-purple-100 text-purple-800" },
  { value: "saving", label: "Saving", color: "bg-emerald-100 text-emerald-800" },
  { value: "investment", label: "Investment", color: "bg-amber-100 text-amber-800" }
];

export default function QuickAddTransaction({ onSave, onCancel }) {
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    category: "",
    type: "expense",
    mood: "",
    classification: "",
    date: format(new Date(), "yyyy-MM-dd"),
    notes: ""
  });

  const [step, setStep] = useState(1);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    const transactionData = {
      ...formData,
      amount: parseFloat(formData.amount)
    };
    onSave(transactionData);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.amount && formData.description && formData.category;
      case 2:
        return formData.classification;
      case 3:
        return true; // Mood is optional
      default:
        return false;
    }
  };

  return (
    <Card className="glass-effect shadow-lg border-0 mb-8">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-emerald-600" />
            Add New Transaction
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Progress Steps */}
        <div className="flex items-center gap-2 mt-4">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepNumber 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-slate-200 text-slate-600'
              }`}>
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={`w-8 h-0.5 mx-2 ${
                  step > stepNumber ? 'bg-emerald-600' : 'bg-slate-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </CardHeader>
      
      <CardContent>
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800">Transaction Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Transaction Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="expense">💸 Expense</SelectItem>
                    <SelectItem value="income">💰 Income</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="amount">Amount (R)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="What was this for?"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map(category => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800">How would you classify this?</h3>
            <p className="text-sm text-slate-600">This helps us understand your spending patterns</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {classificationOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => handleInputChange("classification", option.value)}
                  className={`p-4 rounded-lg border transition-all text-left ${
                    formData.classification === option.value
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className={`inline-block px-2 py-1 rounded text-xs font-medium mb-2 ${option.color}`}>
                    {option.label}
                  </div>
                  <p className="text-sm text-slate-600">
                    {option.value === "need" && "Essential for daily life"}
                    {option.value === "want" && "Nice to have but not essential"}
                    {option.value === "saving" && "Money set aside for future"}
                    {option.value === "investment" && "Growing your wealth"}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800">How were you feeling?</h3>
            <p className="text-sm text-slate-600">Track your mood to understand spending triggers (optional)</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {moodOptions.map(mood => (
                <button
                  key={mood.value}
                  onClick={() => handleInputChange("mood", mood.value)}
                  className={`p-3 rounded-lg border transition-all text-center ${
                    formData.mood === mood.value
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="text-2xl mb-1">{mood.label.split(' ')[0]}</div>
                  <div className="text-xs text-slate-600">{mood.label.split(' ').slice(1).join(' ')}</div>
                </button>
              ))}
            </div>

            <div>
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any additional details..."
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                rows={3}
              />
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mt-6 pt-6 border-t">
          <div className="text-sm text-slate-500">
            Step {step} of 3
          </div>
          
          <div className="flex gap-3">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Previous
              </Button>
            )}
            
            {step < 3 ? (
              <Button 
                onClick={() => setStep(step + 1)}
                disabled={!isStepValid()}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                Next
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                Save Transaction
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}