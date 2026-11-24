export type DifficultyLevel = 'Beginner' | 'Easy' | 'Intermediate' | 'Advanced' | 'Expert';

export type NodeStatus = 'locked' | 'available' | 'in_progress' | 'completed' | 'mastered';

export interface Prerequisite {
  nodeId: string;
  title: string;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'code_prediction' | 'fill_in_blank';
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswer: number | string; // index or string answer
  explanation: string;
  wrongExplanations?: Record<number, string>;
}

export interface CodingTestCase {
  input?: string;
  expectedOutput: string;
  description: string;
  isHidden?: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  instructions: string[];
  starterCode: {
    html?: string;
    css?: string;
    js?: string;
  };
  language: 'html' | 'css' | 'javascript';
  testCases: CodingTestCase[];
  hints: string[];
  xpReward: number;
  solutionExplanation: string;
}

export interface Lesson {
  id: string;
  topicId: string;
  title: string;
  description: string;
  durationMinutes: number;
  objective: string;
  contentMarkdown: string;
  codeExamples: {
    title: string;
    language: 'html' | 'css' | 'javascript';
    code: string;
    explanation?: string;
  }[];
  quizzes: QuizQuestion[];
  challenges: Challenge[];
  summary: string;
  nextLessonId?: string;
}

export interface TopicNode {
  id: string;
  roadmapId: string;
  levelIndex: number;
  title: string;
  category: string;
  iconName: string;
  description: string;
  difficulty: DifficultyLevel;
  estimatedHours: number;
  prerequisites: string[]; // array of topic ids
  lessons: Lesson[];
  projectsCount?: number;
  position: { x: number; y: number }; // SVG canvas node location
}

export interface RoadmapLevel {
  levelNumber: number;
  title: string;
  description: string;
  topicIds: string[];
}

export interface Roadmap {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  category: string;
  color: string;
  badge: string;
  targetRole: string;
  levels: RoadmapLevel[];
  nodes: TopicNode[];
}

export interface ProjectMilestone {
  id: string;
  title: string;
  description: string;
  checklist: string[];
}

export interface Project {
  id: string;
  title: string;
  difficulty: DifficultyLevel;
  category: string;
  estimatedHours: number;
  description: string;
  technologies: string[];
  milestones: ProjectMilestone[];
  starterCodeRepo?: string;
  architectureDiagram?: string;
  xpReward: number;
  demoUrl?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  category: 'streak' | 'lesson' | 'challenge' | 'project' | 'roadmap';
  xpReward: number;
}

export interface UserProgress {
  userId: string;
  name: string;
  email: string;
  selectedRoadmapId: string;
  experienceLevel: 'zero' | 'beginner' | 'intermediate';
  targetRole: string;
  dailyGoalMinutes: number;
  xp: number;
  level: number;
  streakDays: number;
  lastActiveDate: string;
  completedLessonIds: string[];
  completedTopicIds: string[];
  completedChallengeIds: string[];
  completedProjectIds: string[];
  unlockedAchievementIds: string[];
  bookmarkedLessonIds: string[];
  quizScores: Record<string, number>; // quizId -> score percentage
  challengeSubmissions: Record<string, { code: string; passed: boolean; date: string }>;
  learningTimeMinutesTotal: number;
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  codeSnippet?: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  category: 'HTML/CSS' | 'JavaScript' | 'React' | 'Backend' | 'Git' | 'General';
  type: 'Documentation' | 'Cheat Sheet' | 'Tool' | 'Article' | 'Video';
  description: string;
  url: string;
  tags: string[];
}

export interface InterviewQA {
  id: string;
  topic: string;
  difficulty: DifficultyLevel;
  question: string;
  answer: string;
  codeExample?: string;
}

export interface UserResume {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  githubUrl: string;
  linkedinUrl: string;
  portfolioUrl: string;
  summary: string;
  skills: string[];
  projects: {
    name: string;
    tech: string;
    description: string;
    githubLink?: string;
  }[];
  education: {
    institution: string;
    degree: string;
    year: string;
  }[];
}
