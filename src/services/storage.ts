import { UserProgress, Roadmap, Achievement, UserResume } from '../types';
import { INITIAL_ROADMAPS, INITIAL_ACHIEVEMENTS } from '../data/initialData';
import confetti from 'canvas-confetti';

const STORAGE_KEYS = {
  USER_PROGRESS: 'codepath_user_progress',
  CUSTOM_ROADMAPS: 'codepath_custom_roadmaps',
  USER_RESUME: 'codepath_user_resume',
  BOOKMARKS: 'codepath_bookmarks',
  AI_CHAT: 'codepath_ai_chat'
};

const DEFAULT_USER_PROGRESS: UserProgress = {
  userId: 'user_1',
  name: 'Learner',
  email: 'learner@codepath.dev',
  selectedRoadmapId: 'web-dev',
  experienceLevel: 'zero',
  targetRole: 'Full-Stack Developer',
  dailyGoalMinutes: 30,
  xp: 150,
  level: 1,
  streakDays: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedLessonIds: ['les-html-1'],
  completedTopicIds: ['mod-html'],
  completedChallengeIds: [],
  completedProjectIds: [],
  unlockedAchievementIds: ['ach-first-lesson'],
  bookmarkedLessonIds: [],
  quizScores: { 'q-comp-1': 100 },
  challengeSubmissions: {},
  learningTimeMinutesTotal: 45
};

export class StorageService {
  public static getUserProgress(): UserProgress {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
      if (!data) {
        this.saveUserProgress(DEFAULT_USER_PROGRESS);
        return DEFAULT_USER_PROGRESS;
      }
      const parsed: UserProgress = JSON.parse(data);
      this.updateStreakIfNeeded(parsed);
      return parsed;
    } catch {
      return DEFAULT_USER_PROGRESS;
    }
  }

  public static saveUserProgress(progress: UserProgress): void {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save progress to localStorage', e);
    }
  }

  private static updateStreakIfNeeded(progress: UserProgress): void {
    const today = new Date().toISOString().split('T')[0];
    const lastActive = progress.lastActiveDate;

    if (lastActive === today) return;

    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (lastActive === yesterday) {
      progress.streakDays += 1;
    } else if (lastActive < yesterday) {
      progress.streakDays = 1;
    }
    progress.lastActiveDate = today;
    this.saveUserProgress(progress);
  }

  public static addXP(amount: number): { newXP: number; newLevel: number; leveledUp: boolean } {
    const progress = this.getUserProgress();
    const oldLevel = progress.level;
    progress.xp += amount;
    const newLevel = Math.floor(progress.xp / 250) + 1;
    const leveledUp = newLevel > oldLevel;
    progress.level = newLevel;
    this.saveUserProgress(progress);

    if (leveledUp) {
      this.triggerConfetti();
    }
    return { newXP: progress.xp, newLevel, leveledUp };
  }

  public static triggerConfetti(): void {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.warn('Confetti unavailable', e);
    }
  }

  public static completeLesson(lessonId: string, topicId: string): void {
    const progress = this.getUserProgress();
    if (!progress.completedLessonIds.includes(lessonId)) {
      progress.completedLessonIds.push(lessonId);
      if (!progress.completedTopicIds.includes(topicId)) {
        progress.completedTopicIds.push(topicId);
      }
      this.saveUserProgress(progress);
      this.addXP(50);
      this.checkAchievements();
    }
  }

  public static completeChallenge(challengeId: string, code: string, xpReward: number = 100): void {
    const progress = this.getUserProgress();
    if (!progress.completedChallengeIds.includes(challengeId)) {
      progress.completedChallengeIds.push(challengeId);
    }
    progress.challengeSubmissions[challengeId] = {
      code,
      passed: true,
      date: new Date().toISOString()
    };
    this.saveUserProgress(progress);
    this.addXP(xpReward);
    this.checkAchievements();
  }

  public static saveQuizScore(quizId: string, scorePercentage: number): void {
    const progress = this.getUserProgress();
    progress.quizScores[quizId] = scorePercentage;
    this.saveUserProgress(progress);
    if (scorePercentage >= 80) {
      this.addXP(30);
    }
  }

  public static completeProject(projectId: string, xpReward: number = 250): void {
    const progress = this.getUserProgress();
    if (!progress.completedProjectIds.includes(projectId)) {
      progress.completedProjectIds.push(projectId);
      this.saveUserProgress(progress);
      this.addXP(xpReward);
      this.checkAchievements();
    }
  }

  public static toggleBookmark(lessonId: string): boolean {
    const progress = this.getUserProgress();
    const index = progress.bookmarkedLessonIds.indexOf(lessonId);
    let isBookmarked = false;
    if (index >= 0) {
      progress.bookmarkedLessonIds.splice(index, 1);
    } else {
      progress.bookmarkedLessonIds.push(lessonId);
      isBookmarked = true;
    }
    this.saveUserProgress(progress);
    return isBookmarked;
  }

  public static checkAchievements(): Achievement[] {
    const progress = this.getUserProgress();
    const newlyUnlocked: Achievement[] = [];

    INITIAL_ACHIEVEMENTS.forEach(ach => {
      if (progress.unlockedAchievementIds.includes(ach.id)) return;

      let unlock = false;
      if (ach.id === 'ach-first-lesson' && progress.completedLessonIds.length >= 1) unlock = true;
      if (ach.id === 'ach-first-challenge' && progress.completedChallengeIds.length >= 1) unlock = true;
      if (ach.id === 'ach-streak-3' && progress.streakDays >= 3) unlock = true;
      if (ach.id === 'ach-first-project' && progress.completedProjectIds.length >= 1) unlock = true;

      if (unlock) {
        progress.unlockedAchievementIds.push(ach.id);
        newlyUnlocked.push(ach);
      }
    });

    if (newlyUnlocked.length > 0) {
      this.saveUserProgress(progress);
      this.triggerConfetti();
    }
    return newlyUnlocked;
  }

  public static getRoadmaps(): Roadmap[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_ROADMAPS);
      if (data) return JSON.parse(data);
    } catch {
      // ignore fallback
    }
    return INITIAL_ROADMAPS;
  }

  public static saveRoadmaps(roadmaps: Roadmap[]): void {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_ROADMAPS, JSON.stringify(roadmaps));
  }

  public static getUserResume(): UserResume {
    const defaultResume: UserResume = {
      fullName: 'Hanzala Developer',
      title: 'Full-Stack Software Engineer',
      email: 'hanzala@codepath.dev',
      phone: '+1 (555) 019-2834',
      location: 'San Francisco, CA / Remote',
      githubUrl: 'https://github.com/hanzala-dev',
      linkedinUrl: 'https://linkedin.com/in/hanzala-dev',
      portfolioUrl: 'https://hanzala.dev',
      summary: 'Passionate Full-Stack Developer with hands-on experience building modern responsive web apps using React, Next.js, Node.js, and SQL. Completed 80+ coding challenges and 5 full-stack projects.',
      skills: ['JavaScript (ES6+)', 'React', 'HTML5/CSS3', 'Tailwind CSS', 'Node.js', 'Express', 'SQL / PostgreSQL', 'Git & GitHub'],
      projects: [
        {
          name: 'Interactive Code Roadmap Platform',
          tech: 'React, TypeScript, Tailwind CSS',
          description: 'Designed and built interactive educational platform with visual skill tree canvas, embedded code playground, automated challenge test runner, and AI mentor.',
          githubLink: 'https://github.com/hanzala-dev/roadmap-platform'
        }
      ],
      education: [
        {
          institution: 'CodePath Developer Roadmap Academy',
          degree: 'Full-Stack Web Engineering Certification',
          year: '2026'
        }
      ]
    };
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_RESUME);
      return data ? JSON.parse(data) : defaultResume;
    } catch {
      return defaultResume;
    }
  }

  public static saveUserResume(resume: UserResume): void {
    localStorage.setItem(STORAGE_KEYS.USER_RESUME, JSON.stringify(resume));
  }

  public static resetProgress(): void {
    localStorage.removeItem(STORAGE_KEYS.USER_PROGRESS);
    localStorage.removeItem(STORAGE_KEYS.CUSTOM_ROADMAPS);
    localStorage.removeItem(STORAGE_KEYS.USER_RESUME);
  }
}
