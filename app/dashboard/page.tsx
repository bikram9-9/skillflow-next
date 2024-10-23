"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Move } from "lucide-react";
import SkillNode from "@/components/skill-node";
import { useAuth } from "@/components/auth-provider";
import { redirect } from "next/navigation";

interface SkillNode {
  id: string;
  title: string;
  position: { x: number; y: number };
  connections: string[];
}

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [nodes, setNodes] = useState<SkillNode[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      redirect("/login");
    }
  }, [user, loading]);

  const addNode = () => {
    const newNode: SkillNode = {
      id: Date.now().toString(),
      title: "New Skill",
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      connections: [],
    };
    setNodes([...nodes, newNode]);
  };

  const updateNodePosition = (id: string, position: { x: number; y: number }) => {
    setNodes(nodes.map(node => 
      node.id === id ? { ...node, position } : node
    ));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Skill Dashboard</h1>
        <Button onClick={addNode}>
          <Plus className="mr-2 h-4 w-4" /> Add Skill
        </Button>
      </div>

      <Card className="relative h-[calc(100vh-12rem)] overflow-hidden bg-muted/50">
        <div className="absolute inset-0">
          {nodes.map((node) => (
            <SkillNode
              key={node.id}
              node={node}
              onPositionUpdate={updateNodePosition}
              setIsDragging={setIsDragging}
            />
          ))}
        </div>
      </Card>
    </div>
  );
}