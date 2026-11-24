import React from 'react';
import { UserProgress, Roadmap, Lesson } from '../../types';
import {
  Flame,
  Award,
  BookOpen,
  Code,
  ArrowRight,
  Sparkles,
  Bookmark,
  CheckCircle2,
  Trophy,
  Clock,
  Target,
  GraduationCap,
  TrendingUp
} from 'lucide-react';
import { INITIAL_ACHIEVEMENTS } from '../../data/initialData';

interface StudentDashboardProps {
  userProgress: UserProgress;
  activeRoadmap: Roadmap;
  onNavigateTab: (tab: string) => void;
  onSelectLesson: (lessonId: string) => void;
  lessonMap?: Record<string, Lesson>;
  onOpenCertificate?: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  userProgress,
  activeRoadmap,
  onNavigateTab,
  onSelectLesson,
  lessonMap = {},
  onOpenCertificate,
}) => {
  const completedTopicsCount = userProgress.completedTopicIds.length;
  const totalTopicsCount = activeRoadmap.nodes.length || 1;
  const progressPercent = Math.round((completedTopicsCount / totalTopicsCount) * 100);

  const xpToNextLevel = (userProgress.level * 250) - userProgress.xp;
  const xpInThisLevel = userProgress.xp - ((userProgress.level - 1) * 250);
  const xpLevelPercent = Math.min(100, Math.round((xpInThisLevel / 250) * 100));

  // Find next uncompleted lesson
  let nextLessonId = 'les-comp-1';
  for (const node of activeRoadmap.nodes) {
    for (const les of node.lessons) {
      if (!userProgress.completedLessonIds.includes(les.id)) {
        nextLessonId = les.id;
        break;
      }
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* ── Welcome Banner ── */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl" />

        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs text-cyan-400 font-mono mb-1">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>Target Career: {userProgress.targetRole}</span>
            </div>
            <h1 className="text-3xl font-extrabold font-heading text-slate-100">
              Welcome Back, {userProgress.name}! 👋
            </h1>
            <p className="text-sm text-slate-300 mt-1">
              You are on a{' '}
              <span className="text-amber-400 font-bold">🔥 {userProgress.streakDays}-day streak!</span>{' '}
              Keep learning to reach Level {userProgress.level + 1}.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onSelectLesson(nextLessonId)}
              className="flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition hover:scale-105"
            >
              <span>Resume Learning</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {progressPercent >= 50 && onOpenCertificate && (
              <button
                onClick={onOpenCertificate}
                className="flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 font-bold text-sm transition"
              >
                <GraduationCap className="w-4 h-4" />
                <span>View Certificate</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Stats Overview Grid ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-xl border border-amber-500/20 bg-amber-950/10">
          <div className="flex items-center justify-between text-amber-400 mb-2">
            <Flame className="w-6 h-6 animate-pulse" />
            <span className="text-xs font-mono text-slate-400">Streak</span>
          </div>
          <div className="text-2xl font-extrabold font-heading text-slate-100">{userProgress.streakDays} Days</div>
          <div className="text-xs text-slate-400 mt-1">Daily goal: {userProgress.dailyGoalMinutes} mins/day</div>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-cyan-500/20 bg-cyan-950/10">
          <div className="flex items-center justify-between text-cyan-400 mb-2">
            <Award className="w-6 h-6" />
            <span className="text-xs font-mono text-slate-400">Level {userProgress.level}</span>
          </div>
          <div className="text-2xl font-extrabold font-heading text-slate-100">{userProgress.xp} XP</div>
          <div className="text-xs text-slate-400 mt-1">{xpToNextLevel > 0 ? `${xpToNextLevel} XP to next level` : 'Max level!'}</div>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-indigo-500/20 bg-indigo-950/10">
          <div className="flex items-center justify-between text-indigo-400 mb-2">
            <BookOpen className="w-6 h-6" />
            <span className="text-xs font-mono text-slate-400">Lessons</span>
          </div>
          <div className="text-2xl font-extrabold font-heading text-slate-100">{userProgress.completedLessonIds.length}</div>
          <div className="text-xs text-slate-400 mt-1">Completed lessons</div>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-emerald-500/20 bg-emerald-950/10">
          <div className="flex items-center justify-between text-emerald-400 mb-2">
            <Code className="w-6 h-6" />
            <span className="text-xs font-mono text-slate-400">Challenges</span>
          </div>
          <div className="text-2xl font-extrabold font-heading text-slate-100">{userProgress.completedChallengeIds.length}</div>
          <div className="text-xs text-slate-400 mt-1">Challenges solved</div>
        </div>
      </div>

      {/* ── Roadmap Progress Card ── */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold font-heading text-slate-100 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              <span>Primary Roadmap Progress</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">{activeRoadmap.title}</p>
          </div>
          <button
            onClick={() => onNavigateTab('roadmap')}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition"
          >
            View Skill Tree →
          </button>
        </div>

        {/* Main progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400">Roadmap Mastery</span>
            <span className="text-cyan-400 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full h-4 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-700 shadow-md shadow-cyan-500/40"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-slate-500 font-mono">
            <span>{completedTopicsCount} of {totalTopicsCount} topics mastered</span>
            <span>{userProgress.completedLessonIds.length} lessons done</span>
          </div>
        </div>

        {/* XP level progress bar */}
        <div className="pt-2 border-t border-slate-800 space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400">Level {userProgress.level} → Level {userProgress.level + 1}</span>
            <span className="text-indigo-400 font-bold">{xpLevelPercent}%</span>
          </div>
          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-700"
              style={{ width: `${xpLevelPercent}%` }}
            />
          </div>
        </div>

        {/* Level topic cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pt-2">
          {activeRoadmap.levels.map((lvl) => {
            const levelNodes = activeRoadmap.nodes.filter(n => lvl.topicIds.includes(n.id));
            const levelDone = levelNodes.every(n => userProgress.completedTopicIds.includes(n.id));
            const levelPartial = levelNodes.some(n => userProgress.completedTopicIds.includes(n.id)) && !levelDone;
            return (
              <div
                key={lvl.levelNumber}
                className={`p-2 rounded-xl border text-center text-[10px] font-mono transition cursor-pointer ${
                  levelDone
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-400'
                    : levelPartial
                    ? 'bg-cyan-950/30 border-cyan-500/30 text-cyan-400'
                    : 'bg-slate-900/40 border-slate-800 text-slate-500'
                }`}
                title={lvl.title}
                onClick={() => onNavigateTab('roadmap')}
              >
                <div className="font-bold">L{lvl.levelNumber}</div>
                <div className="mt-0.5">{levelDone ? '✓' : levelPartial ? '⏳' : '🔒'}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Achievements & Bookmarks Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Unlocked Achievements */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="text-lg font-bold font-heading text-slate-100 flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span>Badges & Achievements</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {INITIAL_ACHIEVEMENTS.map((ach) => {
              const unlocked = userProgress.unlockedAchievementIds.includes(ach.id);
              return (
                <div
                  key={ach.id}
                  className={`p-3 rounded-xl border flex items-center space-x-3 transition ${
                    unlocked
                      ? 'bg-amber-950/20 border-amber-500/30 text-slate-200'
                      : 'bg-slate-900/30 border-slate-800/60 opacity-40'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-xl ${
                    unlocked ? 'bg-amber-500/20' : 'bg-slate-800'
                  }`}>
                    {unlocked ? '🏆' : '🔒'}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-100">{ach.title}</h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{ach.description}</p>
                    {unlocked && (
                      <span className="text-[10px] text-amber-400 font-mono">+{ach.xpReward} XP</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bookmarked Lessons */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="text-lg font-bold font-heading text-slate-100 flex items-center space-x-2">
            <Bookmark className="w-5 h-5 text-cyan-400" />
            <span>Bookmarked Lessons</span>
          </h2>

          {userProgress.bookmarkedLessonIds.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center space-y-2">
              <Bookmark className="w-10 h-10 text-slate-700" />
              <p className="text-xs text-slate-500">No bookmarked lessons yet.</p>
              <p className="text-xs text-slate-600">Click the bookmark icon inside any lesson to save it here!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {userProgress.bookmarkedLessonIds.map((bId) => {
                const lesson = lessonMap[bId];
                return (
                  <div
                    key={bId}
                    onClick={() => onSelectLesson(bId)}
                    className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:bg-cyan-950/20 cursor-pointer flex items-center justify-between group transition"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-200 group-hover:text-cyan-400 transition line-clamp-1">
                          {lesson?.title ?? bId}
                        </div>
                        {lesson && (
                          <div className="flex items-center space-x-2 text-[10px] text-slate-500 mt-0.5">
                            <Clock className="w-3 h-3" />
                            <span>{lesson.durationMinutes} min</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* ── Quick Actions ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'View Roadmap', icon: Target, tab: 'roadmap', color: 'cyan' },
          { label: 'Code Playground', icon: Code, tab: 'playground', color: 'indigo' },
          { label: 'Projects', icon: CheckCircle2, tab: 'projects', color: 'emerald' },
          { label: 'Job Prep', icon: GraduationCap, tab: 'job-prep', color: 'amber' },
        ].map((action) => {
          const Icon = action.icon;
          const colorMap: Record<string, string> = {
            cyan: 'border-cyan-500/20 hover:border-cyan-500/50 text-cyan-400 bg-cyan-500/5',
            indigo: 'border-indigo-500/20 hover:border-indigo-500/50 text-indigo-400 bg-indigo-500/5',
            emerald: 'border-emerald-500/20 hover:border-emerald-500/50 text-emerald-400 bg-emerald-500/5',
            amber: 'border-amber-500/20 hover:border-amber-500/50 text-amber-400 bg-amber-500/5',
          };
          return (
            <button
              key={action.tab}
              onClick={() => onNavigateTab(action.tab)}
              className={`glass-panel p-4 rounded-xl border flex flex-col items-center space-y-2 transition hover:scale-105 ${colorMap[action.color]}`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-semibold text-slate-300">{action.label}</span>
            </button>
          );
        })}
      </div>

    </div>
  );
};
