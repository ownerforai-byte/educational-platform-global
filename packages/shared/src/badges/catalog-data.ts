import type { BadgeAssignment, BadgeAudience, BadgeCategory, BadgeDefinition, BadgeRarity } from "./types";

function badge(
  id: string,
  label: string,
  category: BadgeCategory,
  audience: BadgeAudience,
  rarity: BadgeRarity,
  assignment: BadgeAssignment,
): BadgeDefinition {
  return { id, label, category, audience, rarity, assignment };
}

/** Full platform badge catalog — student (earned + owner), teacher (owner), special (owner), role. */
export const BADGE_CATALOG: BadgeDefinition[] = [
  // ── Academic excellence (student) ──
  badge("leaderboard-1", "#1 Leaderboard", "academic-excellence", "student", "legendary", "earned"),
  badge("gold-scholar", "Gold Scholar", "academic-excellence", "student", "epic", "earned"),
  badge("book-master", "Book Master", "academic-excellence", "student", "rare", "earned"),
  badge("academic-star", "Academic Star", "academic-excellence", "student", "rare", "earned"),
  badge("perfect-score", "Perfect Score", "academic-excellence", "student", "epic", "earned"),
  badge("genius-mind", "Genius Mind", "academic-excellence", "student", "legendary", "earned"),
  badge("master-of-exams", "Master of Exams", "academic-excellence", "student", "legendary", "earned"),
  badge("subject-expert-student", "Subject Expert", "academic-excellence", "student", "epic", "owner"),

  // ── Consistency & discipline ──
  badge("streak-7", "7-Day Streak", "consistency-discipline", "student", "common", "earned"),
  badge("streak-30", "30-Day Streak", "consistency-discipline", "student", "rare", "earned"),
  badge("early-bird", "Early Bird", "consistency-discipline", "student", "uncommon", "owner"),
  badge("night-owl", "Night Owl", "consistency-discipline", "student", "uncommon", "owner"),
  badge("goal-crusher", "Goal Crusher", "consistency-discipline", "student", "rare", "earned"),
  badge("time-master", "Time Master", "consistency-discipline", "student", "rare", "owner"),
  badge("never-give-up", "Never Give Up", "consistency-discipline", "student", "uncommon", "earned"),
  badge("routine-master", "Routine Master", "consistency-discipline", "student", "epic", "owner"),

  // ── Knowledge & skills ──
  badge("critical-thinker", "Critical Thinker", "knowledge-skills", "student", "rare", "owner"),
  badge("curious-mind", "Curious Mind", "knowledge-skills", "student", "common", "earned"),
  badge("idea-generator", "Idea Generator", "knowledge-skills", "student", "uncommon", "owner"),
  badge("puzzle-solver", "Puzzle Solver", "knowledge-skills", "student", "uncommon", "earned"),
  badge("science-explorer", "Science Explorer", "knowledge-skills", "student", "rare", "owner"),
  badge("math-wizard", "Math Wizard", "knowledge-skills", "student", "epic", "owner"),
  badge("coding-beginner", "Coding Beginner", "knowledge-skills", "student", "common", "owner"),
  badge("coding-master", "Coding Master", "knowledge-skills", "student", "legendary", "owner"),
  badge("geography-explorer", "Geography Explorer", "knowledge-skills", "student", "uncommon", "owner"),
  badge("history-buff", "History Buff", "knowledge-skills", "student", "uncommon", "owner"),
  badge("grammar-guru", "Grammar Guru", "knowledge-skills", "student", "rare", "owner"),
  badge("vocabulary-builder", "Vocabulary Builder", "knowledge-skills", "student", "common", "owner"),
  badge("creative-genius", "Creative Genius", "knowledge-skills", "student", "epic", "owner"),
  badge("communication-pro", "Communication Pro", "knowledge-skills", "student", "rare", "owner"),
  badge("experiment-master", "Experiment Master", "knowledge-skills", "student", "rare", "owner"),
  badge("research-champion", "Research Champion", "knowledge-skills", "student", "epic", "owner"),

  // ── Community & participation ──
  badge("community-star", "Community Star", "community-participation", "student", "rare", "owner"),
  badge("discussion-champion", "Discussion Champion", "community-participation", "student", "rare", "owner"),
  badge("active-participant", "Active Participant", "community-participation", "student", "uncommon", "owner"),
  badge("helpful-member", "Helpful Member", "community-participation", "student", "uncommon", "owner"),
  badge("kindness-champion", "Kindness Champion", "community-participation", "student", "rare", "owner"),
  badge("team-player", "Team Player", "community-participation", "student", "common", "owner"),
  badge("competition-winner", "Competition Winner", "community-participation", "student", "epic", "owner"),
  badge("knowledge-sharer", "Knowledge Sharer", "community-participation", "student", "uncommon", "owner"),
  badge("peer-mentor", "Peer Mentor", "community-participation", "student", "epic", "owner"),
  badge("rising-contributor", "Rising Contributor", "community-participation", "student", "common", "owner"),
  badge("debate-champion", "Debate Champion", "community-participation", "student", "rare", "owner"),
  badge("question-master", "Question Master", "community-participation", "student", "uncommon", "owner"),

  // ── Learning milestones ──
  badge("first-step", "First Step", "learning-milestones", "student", "common", "earned"),
  badge("first-chapter", "First Chapter", "learning-milestones", "student", "common", "earned"),
  badge("first-quiz", "First Quiz", "learning-milestones", "student", "common", "earned"),
  badge("beginner", "Beginner", "learning-milestones", "student", "common", "earned"),
  badge("intermediate", "Intermediate", "learning-milestones", "student", "uncommon", "earned"),
  badge("advanced", "Advanced", "learning-milestones", "student", "rare", "earned"),
  badge("expert-learner", "Expert", "learning-milestones", "student", "epic", "earned"),
  badge("legend", "Legend", "learning-milestones", "student", "legendary", "earned"),
  badge("fast-learner", "Fast Learner", "learning-milestones", "student", "uncommon", "earned"),
  badge("course-finisher", "Course Finisher", "learning-milestones", "student", "rare", "earned"),

  // ── Teacher (owner-assigned) ──
  badge("master-educator", "Master Educator", "teacher", "teacher", "legendary", "owner"),
  badge("best-teacher", "Best Teacher", "teacher", "teacher", "epic", "owner"),
  badge("knowledge-master", "Knowledge Master", "teacher", "teacher", "epic", "owner"),
  badge("mentor-of-the-year", "Mentor of the Year", "teacher", "teacher", "legendary", "owner"),
  badge("creative-teacher", "Creative Teacher", "teacher", "teacher", "rare", "owner"),
  badge("top-educator", "Top Educator", "teacher", "teacher", "epic", "owner"),
  badge("content-creator", "Content Creator", "teacher", "teacher", "rare", "owner"),
  badge("student-supporter", "Student Supporter", "teacher", "teacher", "uncommon", "owner"),
  badge("consistent-teacher", "Consistent Teacher", "teacher", "teacher", "uncommon", "owner"),
  badge("subject-specialist", "Subject Specialist", "teacher", "teacher", "rare", "owner"),
  badge("discussion-leader", "Discussion Leader", "teacher", "teacher", "rare", "owner"),
  badge("student-growth-maker", "Student Growth Maker", "teacher", "teacher", "epic", "owner"),
  badge("teacher-expert", "Expert", "teacher", "teacher", "epic", "owner"),

  // ── Special & exclusive (owner) ──
  badge("hall-of-fame", "Hall of Fame", "special-exclusive", "special", "legendary", "owner"),
  badge("diamond-member", "Diamond Member", "special-exclusive", "special", "legendary", "owner"),
  badge("wise-owl", "Wise Owl", "special-exclusive", "special", "epic", "owner"),
  badge("trailblazer", "Trailblazer", "special-exclusive", "special", "epic", "owner"),
  badge("global-scholar", "Global Scholar", "special-exclusive", "special", "legendary", "owner"),
  badge("ultimate-champion", "Ultimate Champion", "special-exclusive", "special", "legendary", "owner"),
  badge("community-guardian", "Community Guardian", "special-exclusive", "special", "epic", "owner"),
  badge("legend-of-learning", "Legend of Learning", "special-exclusive", "special", "legendary", "owner"),

  // ── Role (automatic) ──
  badge("creator", "Creator", "role", "role", "legendary", "owner"),
  badge("community-bot", "Community bot", "role", "role", "epic", "owner"),
];