import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Award, Play } from "lucide-react";

export default function CourseCard({ course, onSelect, categoryIcon: CategoryIcon, categoryColor }) {
  return (
    <Card className="glass-effect shadow-lg border-0 hover:shadow-xl transition-all duration-300 cursor-pointer group">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <div className={`p-2 rounded-lg ${categoryColor}`}>
            <CategoryIcon className="w-5 h-5" />
          </div>
          <Badge variant="outline" className="text-xs">
            {course.difficulty}
          </Badge>
        </div>
        <CardTitle className="group-hover:text-emerald-600 transition-colors">
          {course.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-slate-600 text-sm mb-4 line-clamp-3">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{course.duration_minutes || 30} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="w-3 h-3" />
            <span>{course.points || 100} pts</span>
          </div>
        </div>

        <Button 
          onClick={() => onSelect(course)}
          className="w-full bg-emerald-600 hover:bg-emerald-700"
        >
          <Play className="w-4 h-4 mr-2" />
          Start Course
        </Button>
      </CardContent>
    </Card>
  );
}