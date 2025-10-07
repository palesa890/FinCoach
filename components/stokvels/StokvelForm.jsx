import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";

export default function StokvelForm({ onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    contribution_amount: 0,
    frequency: "monthly",
    max_members: 10,
    next_payout_date: ""
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
            <h1 className="text-2xl font-bold text-slate-800">Create New Stokvel</h1>
          </div>

          <Card className="glass-effect shadow-lg border-0">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label>Stokvel Name *</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    placeholder="e.g., Student Savings Circle"
                  />
                </div>

                <div>
                  <Label>Description *</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                    placeholder="Describe the group's goals and rules..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Monthly Contribution *</Label>
                    <Input
                      type="number"
                      value={formData.contribution_amount}
                      onChange={(e) => setFormData({...formData, contribution_amount: parseFloat(e.target.value)})}
                      required
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <Label>Contribution Frequency</Label>
                    <select
                      value={formData.frequency}
                      onChange={(e) => setFormData({...formData, frequency: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-200 rounded-md"
                    >
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Maximum Members</Label>
                    <Input
                      type="number"
                      value={formData.max_members}
                      onChange={(e) => setFormData({...formData, max_members: parseInt(e.target.value)})}
                      min="2"
                      max="50"
                    />
                  </div>

                  <div>
                    <Label>Next Payout Date</Label>
                    <Input
                      type="date"
                      value={formData.next_payout_date}
                      onChange={(e) => setFormData({...formData, next_payout_date: e.target.value})}
                    />
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-medium text-purple-800 mb-2">Stokvel Guidelines</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Members contribute equally on agreed schedule</li>
                    <li>• One member receives the full pool each round</li>
                    <li>• Trust score tracks payment reliability</li>
                    <li>• Late payments affect your trust score</li>
                  </ul>
                </div>

                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                    <Save className="w-4 h-4 mr-2" />
                    Create Stokvel
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