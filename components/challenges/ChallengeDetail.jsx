import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Trophy, Target, Calendar, Award, CheckCircle, DollarSign } from "lucide-react";
import { Challenge } from "@/entities/all";
import { format, differenceInDays } from "date-fns";

export default function ChallengeDetail({ challenge, onBack, onUpdate, currentUser }) {
  const [amountUpdate, setAmountUpdate] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const daysLeft = challenge.end_date 
    ? differenceInDays(new Date(challenge.end_date), new Date())
    : null;

  const currentAmount = challenge.current_amount || 0;
  const targetAmount = challenge.target_amount || 0;
  const calculatedProgress = targetAmount > 0 ? Math.min((currentAmount / targetAmount) * 100, 100) : 0;

  const handleUpdateAmount = async () => {
    const newAmount = parseFloat(amountUpdate);
    if (isNaN(newAmount) || newAmount < 0) {
      alert("Please enter a valid amount");
      return;
    }

    setIsUpdating(true);
    try {
      const updatedAmount = currentAmount + newAmount;
      const newProgress = targetAmount > 0 ? Math.min((updatedAmount / targetAmount) * 100, 100) : 0;
      
      await Challenge.update(challenge.id, { 
        current_amount: updatedAmount,
        progress: newProgress
      });
      setAmountUpdate("");
      onUpdate();
    } catch (error) {
      console.error("Error updating amount:", error);
      alert("Failed to update amount. Please try again.");
    }
    setIsUpdating(false);
  };

  const handleComplete = async () => {
    setIsUpdating(true);
    try {
      await Challenge.update(challenge.id, { 
        completed: true, 
        progress: 100,
        current_amount: targetAmount
      });
      onUpdate();
    } catch (error) {
      console.error("Error completing challenge:", error);
      alert("Failed to complete challenge. Please try again.");
    }
    setIsUpdating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="glass-effect shadow-lg border-0">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl mb-2">{challenge.title}</CardTitle>
                      <div className="flex gap-2">
                        <Badge className="bg-amber-100 text-amber-800">
                          {challenge.category?.replace('_', ' ')}
                        </Badge>
                        <Badge variant="outline">
                          {challenge.difficulty}
                        </Badge>
                      </div>
                    </div>
                    {challenge.completed && (
                      <Badge className="bg-emerald-100 text-emerald-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-6">{challenge.description}</p>

                  <div className="space-y-4">
                    {/* Amount Progress */}
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-slate-600">Current Amount</span>
                        <span className="text-2xl font-bold text-emerald-600">
                          R{currentAmount.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs text-slate-500">Target</span>
                        <span className="text-sm font-medium text-slate-700">
                          R{targetAmount.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={calculatedProgress} className="h-3 mb-2" />
                      <div className="text-center">
                        <span className="text-sm font-medium text-slate-700">
                          {calculatedProgress.toFixed(1)}% Complete
                        </span>
                      </div>
                    </div>

                    {!challenge.completed && (
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <div className="flex-1 relative">
                            <DollarSign className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                            <Input
                              type="number"
                              min="0"
                              step="0.01"
                              value={amountUpdate}
                              onChange={(e) => setAmountUpdate(e.target.value)}
                              placeholder="Add amount (R)"
                              disabled={isUpdating}
                              className="pl-10"
                            />
                          </div>
                          <Button 
                            onClick={handleUpdateAmount}
                            disabled={isUpdating || !amountUpdate}
                            className="bg-emerald-600 hover:bg-emerald-700"
                          >
                            {isUpdating ? "Adding..." : "Add Funds"}
                          </Button>
                        </div>
                        <p className="text-xs text-slate-500">
                          💡 Enter the amount you want to add to your progress
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {!challenge.completed && calculatedProgress >= 100 && (
                <Card className="glass-effect shadow-lg border-0 bg-gradient-to-r from-amber-50 to-orange-50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">🎉 Challenge Complete!</h3>
                        <p className="text-slate-600">Mark as completed to earn your rewards</p>
                      </div>
                      <Button 
                        onClick={handleComplete}
                        disabled={isUpdating}
                        className="bg-emerald-600 hover:bg-emerald-700"
                      >
                        <Trophy className="w-4 h-4 mr-2" />
                        {isUpdating ? "Completing..." : "Complete"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              <Card className="glass-effect shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-lg">Challenge Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {challenge.target_amount && (
                    <div>
                      <div className="flex items-center gap-2 text-slate-600 mb-1">
                        <Target className="w-4 h-4" />
                        <span className="text-sm">Target Amount</span>
                      </div>
                      <p className="text-xl font-bold">R{challenge.target_amount?.toLocaleString()}</p>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2 text-slate-600 mb-1">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-sm">Amount Remaining</span>
                    </div>
                    <p className="text-lg font-medium text-amber-600">
                      R{Math.max(0, targetAmount - currentAmount).toLocaleString()}
                    </p>
                  </div>

                  {daysLeft !== null && (
                    <div>
                      <div className="flex items-center gap-2 text-slate-600 mb-1">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">Time Remaining</span>
                      </div>
                      <p className="text-lg font-medium">
                        {daysLeft > 0 ? `${daysLeft} days` : "Expired"}
                      </p>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2 text-slate-600 mb-1">
                      <Trophy className="w-4 h-4" />
                      <span className="text-sm">Points Reward</span>
                    </div>
                    <p className="text-lg font-medium">{challenge.points_reward || 100} points</p>
                  </div>

                  {challenge.badge_name && (
                    <div>
                      <div className="flex items-center gap-2 text-slate-600 mb-1">
                        <Award className="w-4 h-4" />
                        <span className="text-sm">Badge Earned</span>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800">
                        {challenge.badge_name}
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="glass-effect shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-lg">Challenge Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-slate-600 space-y-2">
                    <li>• Update your progress regularly</li>
                    <li>• Set up automatic transfers to savings</li>
                    <li>• Break target into weekly milestones</li>
                    <li>• Celebrate small wins along the way</li>
                    <li>• Stay consistent with contributions</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
