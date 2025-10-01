import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, CheckCircle, AlertTriangle, Target, TrendingUp } from "lucide-react";

export default function CreditRecommendations({ recommendations, riskLevel, creditScore }) {
  const getRiskIcon = () => {
    switch (riskLevel) {
      case "excellent": return CheckCircle;
      case "good": return TrendingUp;
      case "fair": return Target;
      default: return AlertTriangle;
    }
  };

  const getRiskColor = () => {
    switch (riskLevel) {
      case "excellent": return "text-emerald-600 bg-emerald-50";
      case "good": return "text-blue-600 bg-blue-50";
      case "fair": return "text-amber-600 bg-amber-50";
      default: return "text-red-600 bg-red-50";
    }
  };

  const RiskIcon = getRiskIcon();

  const priorityRecommendations = recommendations.slice(0, 3);
  const additionalRecommendations = recommendations.slice(3);

  return (
    <Card className="glass-effect shadow-lg border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-800">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          Smart Recommendations
        </CardTitle>
        <div className="flex items-center justify-between">
          <Badge className={getRiskColor()}>
            <RiskIcon className="w-3 h-3 mr-1" />
            Credit Health: {riskLevel}
          </Badge>
          <span className="text-sm text-slate-600">Score: {creditScore}/100</span>
        </div>
      </CardHeader>
      <CardContent>
        {recommendations.length > 0 ? (
          <div className="space-y-4">
            {/* Priority Recommendations */}
            <div>
              <h4 className="font-medium text-slate-800 mb-3">Priority Actions</h4>
              <div className="space-y-3">
                {priorityRecommendations.map((rec, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-medium mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-sm text-slate-700 flex-1">{rec}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Recommendations */}
            {additionalRecommendations.length > 0 && (
              <div>
                <h4 className="font-medium text-slate-800 mb-3">Additional Tips</h4>
                <div className="space-y-2">
                  {additionalRecommendations.map((rec, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg"
                    >
                      <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-slate-600">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Credit Building Tips */}
            <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
              <h5 className="font-medium text-emerald-800 mb-2">Student Credit Building Tips</h5>
              <ul className="text-sm text-emerald-700 space-y-1">
                <li>• Always pay bills on time, even if it's just the minimum</li>
                <li>• Keep credit utilization below 30% of available limits</li>
                <li>• Don't close old credit accounts - they help your credit age</li>
                <li>• Monitor your credit report regularly for errors</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Lightbulb className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">Upload a statement to get personalized recommendations</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}