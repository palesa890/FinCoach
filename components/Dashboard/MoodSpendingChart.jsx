import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from "lucide-react";

const moodEmojis = {
  very_happy: "😄",
  happy: "😊", 
  neutral: "😐",
  stressed: "😰",
  sad: "😢",
  angry: "😡"
};

const moodColors = {
  very_happy: "bg-emerald-500",
  happy: "bg-green-500",
  neutral: "bg-slate-500", 
  stressed: "bg-amber-500",
  sad: "bg-blue-500",
  angry: "bg-red-500"
};

export default function MoodSpendingChart({ moodData, isLoading }) {
  const totalSpending = Object.values(moodData).reduce((sum, amount) => sum + amount, 0);
  const sortedMoods = Object.entries(moodData).sort(([,a], [,b]) => b - a);

  return (
    <Card className="glass-effect shadow-lg border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-800">
          <Brain className="w-5 h-5 text-purple-500" />
          Mood vs. Spending
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="animate-pulse space-y-3">
            {[1,2,3].map(i => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-200 rounded"></div>
                <div className="flex-1 h-4 bg-slate-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : sortedMoods.length > 0 ? (
          <div className="space-y-3">
            {sortedMoods.map(([mood, amount]) => (
              <div key={mood} className="flex items-center gap-3">
                <div className="text-2xl">{moodEmojis[mood]}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium capitalize text-slate-700">
                      {mood.replace('_', ' ')}
                    </span>
                    <span className="text-sm font-medium text-slate-700">
                      R{amount.toFixed(0)}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${moodColors[mood]}`}
                      style={{ 
                        width: totalSpending > 0 ? `${(amount / totalSpending) * 100}%` : '0%' 
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-4 p-3 bg-purple-50 rounded-lg">
              <p className="text-xs text-purple-700">
                💡 <strong>Insight:</strong> You tend to spend more when {sortedMoods[0] ? sortedMoods[0][0].replace('_', ' ') : 'tracking'}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Brain className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">Start tracking your mood with expenses to see patterns</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}