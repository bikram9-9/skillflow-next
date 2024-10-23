"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/components/auth-provider";
import { redirect } from "next/navigation";
import { Trophy, Star, Target, User } from "lucide-react";

interface Skill {
  name: string;
  progress: number;
  level: number;
}

export default function Profile() {
  const { user, loading } = useAuth();
  const [skills, setSkills] = useState<Skill[]>([
    { name: "JavaScript", progress: 75, level: 3 },
    { name: "React", progress: 60, level: 2 },
    { name: "TypeScript", progress: 45, level: 1 },
  ]);

  useEffect(() => {
    if (!loading && !user) {
      redirect("/login");
    }
  }, [user, loading]);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 p-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>
        </Card>

        <Card className="col-span-2 p-6">
          <h3 className="text-xl font-bold mb-4">Skill Progress</h3>
          <div className="space-y-6">
            {skills.map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-muted-foreground">
                    Level {skill.level}
                  </span>
                </div>
                <Progress value={skill.progress} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="col-span-1 md:col-span-3 p-6">
          <h3 className="text-xl font-bold mb-4">Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-4 p-4 bg-primary/5 rounded-lg">
              <Trophy className="w-8 h-8 text-primary" />
              <div>
                <h4 className="font-medium">Quick Learner</h4>
                <p className="text-sm text-muted-foreground">
                  Completed 5 skills
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-primary/5 rounded-lg">
              <Star className="w-8 h-8 text-primary" />
              <div>
                <h4 className="font-medium">Skill Master</h4>
                <p className="text-sm text-muted-foreground">
                  Reached level 3 in a skill
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-primary/5 rounded-lg">
              <Target className="w-8 h-8 text-primary" />
              <div>
                <h4 className="font-medium">Goal Setter</h4>
                <p className="text-sm text-muted-foreground">
                  Created 3 learning paths
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}