"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Move } from "lucide-react";

interface SkillNodeProps {
  node: {
    id: string;
    title: string;
    position: { x: number; y: number };
    connections: string[];
  };
  onPositionUpdate: (id: string, position: { x: number; y: number }) => void;
  setIsDragging: (isDragging: boolean) => void;
}

export default function SkillNode({ node, onPositionUpdate, setIsDragging }: SkillNodeProps) {
  const [position, setPosition] = useState(node.position);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(node.title);
  const [isDragging, setIsDraggingLocal] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDraggingLocal(true);
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newPosition = {
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        };
        setPosition(newPosition);
        onPositionUpdate(node.id, newPosition);
      }
    };

    const handleMouseUp = () => {
      setIsDraggingLocal(false);
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragStart, node.id, onPositionUpdate]);

  return (
    <Card
      className="absolute p-4 cursor-move shadow-lg w-48"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: isDragging ? "none" : "transform 0.1s ease-in-out",
      }}
    >
      <div className="flex items-center justify-between">
        {isEditing ? (
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
            autoFocus
          />
        ) : (
          <div
            className="flex-1 font-medium"
            onDoubleClick={() => setIsEditing(true)}
          >
            {title}
          </div>
        )}
        <Move
          className="h-4 w-4 cursor-move ml-2"
          onMouseDown={handleMouseDown}
        />
      </div>
    </Card>
  );
}