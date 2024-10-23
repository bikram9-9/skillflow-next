import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Brain, Target, Trophy } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Master New Skills with SkillFlow
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Create interactive learning paths, track your progress, and visualize your skill development journey.
            </p>
          </div>
          <div className="space-x-4">
            <Link href="/login">
              <Button className="px-8">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
            <Brain className="h-8 w-8 text-primary" />
            <h2 className="text-xl font-bold">Interactive Learning</h2>
            <p className="text-gray-500 dark:text-gray-400 text-center">
              Create visual learning paths and connect skills in meaningful ways
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
            <Target className="h-8 w-8 text-primary" />
            <h2 className="text-xl font-bold">Progress Tracking</h2>
            <p className="text-gray-500 dark:text-gray-400 text-center">
              Monitor your learning journey with detailed progress analytics
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
            <Trophy className="h-8 w-8 text-primary" />
            <h2 className="text-xl font-bold">Achievement System</h2>
            <p className="text-gray-500 dark:text-gray-400 text-center">
              Earn badges and track milestones as you master new skills
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}