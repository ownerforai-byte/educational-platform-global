/**
 * Achievement rules: badges and milestones derived from the device streak and
 * the progress journey. Pure; nothing is stored or awarded server-side.
 */

export interface AchievementInput {
  streak: number;
  topicsCompleted: number;
  topicsInProgress: number;
  /** Share of the whole catalogue completed, 0-100. */
  percent: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  earned: boolean;
  /** Progress toward the goal, 0-100. */
  progress: number;
}

interface Rule {
  id: string;
  title: string;
  description: string;
  value: (i: AchievementInput) => number;
  target: number;
}

export const ACHIEVEMENT_RULES: Rule[] = [
  { id: "streak-3", title: "Warm Up", description: "Study 3 days in a row.", value: (i) => i.streak, target: 3 },
  { id: "streak-7", title: "One Week Strong", description: "Study 7 days in a row.", value: (i) => i.streak, target: 7 },
  { id: "streak-30", title: "Monthly Habit", description: "Study 30 days in a row.", value: (i) => i.streak, target: 30 },
  { id: "first-topic", title: "First Step", description: "Complete your first topic.", value: (i) => i.topicsCompleted, target: 1 },
  { id: "topics-10", title: "Ten Down", description: "Complete 10 topics.", value: (i) => i.topicsCompleted, target: 10 },
  { id: "topics-50", title: "Fifty Club", description: "Complete 50 topics.", value: (i) => i.topicsCompleted, target: 50 },
  { id: "explorer", title: "Explorer", description: "Open 5 topics you have not finished yet.", value: (i) => i.topicsInProgress, target: 5 },
  { id: "quarter", title: "Quarter Way", description: "Finish 25% of the syllabus.", value: (i) => i.percent, target: 25 },
  { id: "half", title: "Halfway There", description: "Finish 50% of the syllabus.", value: (i) => i.percent, target: 50 },
];

export function evaluateAchievements(input: AchievementInput): Achievement[] {
  return ACHIEVEMENT_RULES.map((r) => {
    const v = Math.max(0, r.value(input));
    return {
      id: r.id,
      title: r.title,
      description: r.description,
      earned: v >= r.target,
      progress: Math.min(100, Math.round((v / r.target) * 100)),
    };
  });
}

/** The nearest unearned achievement (highest progress), or null when all are earned. */
export function nextMilestone(list: Achievement[]): Achievement | null {
  const open = list.filter((a) => !a.earned);
  if (open.length === 0) return null;
  return open.reduce((best, a) => (a.progress > best.progress ? a : best));
}
