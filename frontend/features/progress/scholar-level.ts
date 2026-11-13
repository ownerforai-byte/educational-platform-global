import {
  Award,
  BookOpen,
  Compass,
  Crown,
  Target,
  Trophy,
  Zap,
} from "lucide-react";

export interface ScholarLevelInfo {
  level: number;
  title: string;
  description: string;
  currentXp: number;
  minXp: number;
  nextXp: number;
  progressPercent: number;
  badgeName: string;
  nextPerk: string;
  icon: typeof Award;
}

export function calculateScholarLevel(completedTopics: number, credits: number = 0): ScholarLevelInfo {
  const baseTopicXp = completedTopics * 100;
  const bonusXp = Math.min(100, (credits || 0) * 5);
  const currentXp = baseTopicXp + bonusXp;

  const tiers = [
    { level: 1, title: "Novice Scholar", minXp: 0, nextXp: 200, desc: "Embarking on the NEB academic path", perk: "Complete 2 topics to unlock Level 2 Explorer", icon: BookOpen },
    { level: 2, title: "Curious Explorer", minXp: 200, nextXp: 500, desc: "Developing solid foundation across science topics", perk: "Complete 5 topics to reach Level 3 Scholar", icon: Compass },
    { level: 3, title: "Active Scholar", minXp: 500, nextXp: 1000, desc: "Mastering formulas, theorems, and core exam units", perk: "Complete 10 topics to reach Level 4 Achiever", icon: Zap },
    { level: 4, title: "Academic Achiever", minXp: 1000, nextXp: 2000, desc: "Commanding deep comprehension across curriculum", perk: "Complete 20 topics to reach Level 5 Master", icon: Target },
    { level: 5, title: "Master Scholar", minXp: 2000, nextXp: 3500, desc: "Top-tier mastery of Class 11 & 12 curriculum", perk: "Complete 35 topics to reach Grandmaster", icon: Trophy },
    { level: 6, title: "NEB Grandmaster", minXp: 3500, nextXp: 5000, desc: "Elite conceptual & numerical mastery", perk: "Maximum level achieved! Ready for Board Exams", icon: Crown },
  ];

  let currentTier = tiers[0];
  for (let i = tiers.length - 1; i >= 0; i--) {
    if (currentXp >= tiers[i].minXp) {
      currentTier = tiers[i];
      break;
    }
  }

  const range = currentTier.nextXp - currentTier.minXp;
  const inTier = Math.max(0, currentXp - currentTier.minXp);
  const progressPercent = currentTier.level === 6 ? 100 : Math.min(100, Math.round((inTier / range) * 100));

  return {
    level: currentTier.level,
    title: currentTier.title,
    description: currentTier.desc,
    currentXp,
    minXp: currentTier.minXp,
    nextXp: currentTier.nextXp,
    progressPercent,
    badgeName: `Level ${currentTier.level} · ${currentTier.title}`,
    nextPerk: currentTier.perk,
    icon: currentTier.icon,
  };
}
