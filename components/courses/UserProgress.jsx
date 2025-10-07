import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Target, BookOpen } from "lucide-react";

export default function UserProgress({ currentUser, courseProgress, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[1,2,3,4].map(i => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-slate-200 rounded mb-2"></div>
              <div className="h-8 bg-slate-200 rounded"></div>
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  const completedCourses = courseProgress.filter(p => p.completed).length;
  const inProgressCourses = courseProgress.filter(p => !p.completed && p.progress > 0).length;
  const totalBadges = currentUser?.badges?.length || 0;
  const totalPoints = currentUser?.total_points || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="glass-effect shadow-lg border-0">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm text-slate-600">
            <BookOpen className="w-4 h-4" />
            Courses Completed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-800">{completedCourses}</div>
          <div className="text-xs text-slate-500">{inProgressCourses} in progress</div>
        </CardContent>
      </Card>

      <Card className="glass-effect shadow-lg border-0">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm text-slate-600">
            <Award className="w-4 h-4" />
            Badges Earned
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-amber-600">{totalBadges}</div>
          <div className="flex flex-wrap gap-1 mt-2">
            {currentUser?.badges?.slice(0, 3).map((badge, i) => (
              <Badge key={i} variant="secondary" className="text-xs">
                {badge}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="glass-effect shadow-lg border-0">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm text-slate-600">
            <Trophy className="w-4 h-4" />
            Total Points
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald-600">{totalPoints}</div>
          <div className="text-xs text-slate-500">Keep learning!</div>
        </CardContent>
      </Card>

      <Card className="glass-effect shadow-lg border-0">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm text-slate-600">
            <Target className="w-4 h-4" />
            Learning Streak
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600">{currentUser?.current_streak || 0} days</div>
          <div className="text-xs text-slate-500">
            {currentUser?.current_streak > 0 ? "Keep it up!" : "Start your journey"}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}