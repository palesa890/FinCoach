import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Clock, Award, Target } from "lucide-react";

const categoryColors = {
  saving: "bg-emerald-100 text-emerald-800",
  spending_reduction: "bg-blue-100 text-blue-800",
  debt_payoff: "bg-red-100 text-red-800",
  learning: "bg-purple-100 text-purple-800",
  budgeting: "bg-amber-100 text-amber-800"
};

const difficultyColors = {
  easy: "bg-green-100 text-green-800",
  medium: "bg-amber-100 text-amber-800",
  hard: "bg-red-100 text-red-800"
};

export default function ChallengeCard({ challenge, onSelect, onJoin }) {
  return (
    <Card className="glass-effect shadow-lg border-0 hover:shadow-xl transition-all duration-300 cursor-pointer group">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge className={categoryColors[challenge.category]}>
            {challenge.category.replace('_', ' ')}
          </Badge>
          <Badge variant="outline" className={difficultyColors[challenge.difficulty]}>
            {challenge.difficulty}
          </Badge>
        </div>
        <CardTitle className="group-hover:text-amber-600 transition-colors">
          {challenge.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
          {challenge.description}
        </p>

        <div className="space-y-2 mb-4">
          {challenge.target_amount && (
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <Target className="w-4 h-4" />
                <span>Target</span>
              </div>
              <span className="font-semibold">R{challenge.target_amount?.toLocaleString()}</span>
            </div>
          )}

          {challenge.duration_days && (
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <Clock className="w-4 h-4" />
                <span>Duration</span>
              </div>
              <span className="font-medium">{challenge.duration_days} days</span>
            </div>
          )}

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-slate-600">
              <Award className="w-4 h-4" />
              <span>Reward</span>
            </div>
            <span className="font-medium">{challenge.points_reward || 100} points</span>
          </div>
        </div>

        {challenge.badge_name && (
          <p className="text-xs text-purple-600 mb-3">
            🏆 Earn badge: {challenge.badge_name}
          </p>
        )}

        <Button 
          onClick={() => onJoin(challenge)}
          className="w-full bg-amber-600 hover:bg-amber-700"
        >
          <Trophy className="w-4 h-4 mr-2" />
          Join Challenge
        </Button>
      </CardContent>
    </Card>
  );
}