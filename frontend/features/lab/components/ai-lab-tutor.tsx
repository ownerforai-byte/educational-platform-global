"use client";

import { StudyChat } from "@/components/chat/study-chat";

export const AILabTutor: React.FC = () => {
  return (
    <div className="w-full h-full">
      <StudyChat compact={true} />
    </div>
  );
};
