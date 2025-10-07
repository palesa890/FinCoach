import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";

export default function ChallengeForm({ onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "saving",
    target_amount: 0,
    duration_days: 30,
    difficulty: "medium",
    points_reward: 100,
    badge_name: "",
    start_date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const endDate = new Date(formData.start_date);
    endDate.setDate(endDate.getDate() + parseInt(formData.duration_days));
    
    onSave({
      ...formData,
      end_date: endDate.toISOString().split('T')[0]
    });
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
            <h1 className="text-2xl font-bold text-slate-800">Create Custom Challenge</h1>
          </div>

          <Card className="glass-effect shadow-lg border-0">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label>Challenge Title *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                    placeholder="e.g., Save R500 This Month"
                  />
                </div>

                <div>
                  <Label>Description *</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                    placeholder="Describe your challenge goals..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Category *</Label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-200 rounded-md"
                    >
                      <option value="saving">Saving</option>
                      <option value="spending_reduction">Spending Reduction</option>
                      <option value="debt_payoff">Debt Payoff</option>
                      <option value="learning">Learning</option>
                      <option value="budgeting">Budgeting</option>
                    </select>
                  </div>

                  <div>
                    <Label>Difficulty</Label>
                    <select
                      value={formData.difficulty}
                      onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-200 rounded-md"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Target Amount (Optional)</Label>
                    <Input
                      type="number"
                      value={formData.target_amount}
                      onChange={(e) => setFormData({...formData, target_amount: parseFloat(e.target.value)})}
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <Label>Duration (Days)</Label>
                    <Input
                      type="number"
                      value={formData.duration_days}
                      onChange={(e) => setFormData({...formData, duration_days: parseInt(e.target.value)})}
                      min="1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Points Reward</Label>
                    <Input
                      type="number"
                      value={formData.points_reward}
                      onChange={(e) => setFormData({...formData, points_reward: parseInt(e.target.value)})}
                      min="0"
                    />
                  </div>

                  <div>
                    <Label>Badge Name (Optional)</Label>
                    <Input
                      value={formData.badge_name}
                      onChange={(e) => setFormData({...formData, badge_name: e.target.value})}
                      placeholder="e.g., Super Saver"
                    />
                  </div>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg">
                  <h4 className="font-medium text-amber-800 mb-2">Challenge Tips</h4>
                  <ul className="text-sm text-amber-700 space-y-1">
                    <li>• Set realistic, achievable goals</li>
                    <li>• Track your progress regularly</li>
                    <li>• Celebrate milestones along the way</li>
                    <li>• Join with friends for accountability</li>
                  </ul>
                </div>

                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-amber-600 hover:bg-amber-700">
                    <Save className="w-4 h-4 mr-2" />
                    Create Challenge
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