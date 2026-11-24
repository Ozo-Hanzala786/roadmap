import React, { useState, useEffect, useCallback } from 'react';
import { UserProgress, Roadmap, Lesson } from './types';
import { StorageService } from './services/storage';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { OnboardingModal } from './components/onboarding/OnboardingModal';
import { RoadmapCanvas } from './components/roadmap/RoadmapCanvas';
import { CodePlayground } from './components/editor/CodePlayground';
import { LessonReader } from './components/lessons/LessonReader';
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { ProjectsHub } from './components/projects/ProjectsHub';
import { JobPrepHub } from './components/jobprep/JobPrepHub';
import { ResourcesHub } from './components/resources/ResourcesHub';
import { AdminCMS } from './components/admin/AdminCMS';
import { SearchModal } from './components/search/SearchModal';
import { AITutorWidget } from './components/ai/AITutorWidget';
import { CertificateModal } from './components/certificate/CertificateModal';
import { XPToast, XPToastData } from './components/gamification/XPToast';
import { ModulesPage } from './components/modules/ModulesPage';
import { MODULE_LIST } from './data/initialData';
import {
  ArrowRight, Sparkles, Code2, Map, Play, Rocket,
  CheckCircle2, Flame, Users, Star, Zap, GraduationCap,
  BookOpen, Lock, Layout, Palette, Code, Globe,
  Terminal, Server, Atom, Database, ChevronRight
} from 'lucide-react';

const MODULE_ICON_MAP: Record<string, React.ElementType> = {
  Layout, Palette, Code, Globe, Terminal, Server, Atom, Database,
};

let toastIdCounter = 0;

export function App() {
  const [userProgress, setUserProgress] = useState<UserProgress>(StorageService.getUserProgress());
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>(StorageService.getRoadmaps());
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [certificateOpen, setCertificateOpen] = useState(false);
  const [xpToasts, setXpToasts] = useState<XPToastData[]>([]);

  const activeRoadmap = roadmaps[0]; // Full-Stack Web Dev

  // Find active lesson object if selected
  let activeLesson: Lesson | null = null;
  if (selectedLessonId) {
    for (const node of activeRoadmap.nodes) {
      const found = node.lessons.find(l => l.id === selectedLessonId);
      if (found) { activeLesson = found; break; }
    }
  }

  // Build a lesson lookup map for the whole roadmap
  const lessonMap = React.useMemo(() => {
    const map: Record<string, Lesson> = {};
    for (const node of activeRoadmap.nodes) {
      for (const lesson of node.lessons) {
        map[lesson.id] = lesson;
      }
    }
    return map;
  }, [activeRoadmap]);

  const handleSelectLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setCurrentTab('lesson');
  };

  const addXPToast = useCallback((data: Omit<XPToastData, 'id'>) => {
    const id = `toast-${++toastIdCounter}`;
    setXpToasts(prev => [...prev, { ...data, id }]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setXpToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const refreshProgress = useCallback(() => {
    const prev = userProgress;
    const next = StorageService.getUserProgress();
    const xpDiff = next.xp - prev.xp;
    if (xpDiff > 0) {
      const leveledUp = next.level > prev.level;
      addXPToast({
        xpAmount: xpDiff,
        message: leveledUp ? 'Amazing progress! Keep it up!' : 'Lesson completed',
        leveledUp,
        newLevel: next.level,
      });
    }
    setUserProgress(next);
  }, [userProgress, addXPToast]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">

      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => { setSelectedLessonId(null); setCurrentTab(tab); }}
        userProgress={userProgress}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenOnboarding={() => setOnboardingOpen(true)}
      />

      {/* Main View Switcher */}
      <main className="flex-1">

        {/* ══════════════════════════════════════════ */}
        {/*                HOME PAGE                   */}
        {/* ══════════════════════════════════════════ */}
        {currentTab === 'home' && (
          <div className="space-y-20 py-12">

            {/* ── Hero ── */}
            <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 pt-4">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/10 to-indigo-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />

              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-xs font-semibold text-cyan-400">
                <Sparkles className="w-4 h-4" />
                <span>12 Modules • Zero to Full-Stack Developer</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight max-w-4xl mx-auto leading-tight">
                Master Web Development{' '}
                <span className="text-gradient-animated">Module by Module</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Follow a structured, numbered curriculum from HTML foundations to React, Next.js, 
                Node.js, and beyond. Learn at your own pace with interactive lessons and challenges.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <button
                  onClick={() => setCurrentTab('modules')}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-extrabold text-base shadow-2xl shadow-cyan-500/30 transition-all hover:scale-105 hover:shadow-cyan-500/50"
                >
                  <span>Explore Modules</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setCurrentTab('playground')}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white font-bold text-base hover:border-cyan-500/40 hover:bg-slate-800/80 transition"
                >
                  <Play className="w-5 h-5 text-cyan-400" />
                  <span>Try Code Playground</span>
                </button>
              </div>
            </section>

            {/* ── Course Modules Overview Grid ── */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="text-center space-y-3">
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-100">
                  Course Outline
                </h2>
                <p className="text-sm text-slate-400 max-w-xl mx-auto">
                  12 structured modules that take you from zero to job-ready full-stack developer
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {MODULE_LIST.map((mod) => {
                  const isCompleted = userProgress.completedTopicIds.includes(mod.topicId);
                  const IconComp = MODULE_ICON_MAP[mod.icon] || Code;

                  return (
                    <button
                      key={mod.topicId}
                      onClick={() => setCurrentTab('modules')}
                      className={`group relative p-4 sm:p-5 rounded-2xl border transition-all duration-300 text-left hover:scale-[1.02] ${
                        isCompleted
                          ? 'bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-400'
                          : 'glass-panel border-slate-800 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/5'
                      }`}
                    >
                      {/* Module Number */}
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${mod.color} flex items-center justify-center mb-3 shadow-md`}>
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        ) : (
                          <span className="text-sm font-extrabold text-white font-mono">{mod.moduleNumber}</span>
                        )}
                      </div>

                      <h4 className="font-bold text-sm text-slate-100 group-hover:text-cyan-400 transition mb-1">
                        {mod.shortTitle}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                        {mod.description}
                      </p>

                      <div className="flex items-center justify-between mt-3 text-[10px] text-slate-500 font-mono">
                        <span>{mod.estimatedHours}h</span>
                        <span className={`font-bold ${isCompleted ? 'text-emerald-400' : 'text-slate-500'}`}>
                          {isCompleted ? '✓ Done' : mod.difficulty}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* ── Platform Highlights ── */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="text-center space-y-3">
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-100">
                  Why CodePath
                </h2>
                <p className="text-sm text-slate-400 max-w-xl mx-auto">
                  Everything you need to go from zero programming to landing your first developer role
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: BookOpen, title: 'Module-Based Learning', desc: 'Structured numbered modules with clear prerequisites and progression path.', accent: 'cyan' },
                  { icon: Code2, title: 'In-Browser Sandbox', desc: 'Practice HTML, CSS, and JavaScript directly in the browser. Zero installs needed.', accent: 'indigo' },
                  { icon: Rocket, title: 'Real-World Projects', desc: 'Build portfolio applications from personal sites to full-stack e-commerce platforms.', accent: 'purple' },
                  { icon: Flame, title: 'Gamified Progress', desc: 'Earn XP, level up, maintain streaks, and unlock achievement badges.', accent: 'amber' },
                ].map((feature, i) => {
                  const Icon = feature.icon;
                  const accentStyles: Record<string, string> = {
                    cyan: 'border-cyan-500/20 hover:border-cyan-500/50 text-cyan-400',
                    indigo: 'border-indigo-500/20 hover:border-indigo-500/50 text-indigo-400',
                    purple: 'border-purple-500/20 hover:border-purple-500/50 text-purple-400',
                    amber: 'border-amber-500/20 hover:border-amber-500/50 text-amber-400',
                  };
                  return (
                    <div key={i} className={`glass-panel p-5 rounded-2xl border transition-all hover:shadow-lg space-y-3 ${accentStyles[feature.accent]}`}>
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${accentStyles[feature.accent]} bg-slate-900/50`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold font-heading text-slate-100">{feature.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{feature.desc}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ── Stats Row ── */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { icon: GraduationCap, value: '12', label: 'Course Modules', color: 'text-cyan-400' },
                  { icon: BookOpen, value: '100+', label: 'Interactive Lessons', color: 'text-indigo-400' },
                  { icon: Star, value: '98%', label: 'Satisfaction Rate', color: 'text-amber-400' },
                  { icon: Users, value: '12,400+', label: 'Active Learners', color: 'text-emerald-400' },
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} className="glass-panel p-5 rounded-xl border border-slate-800 text-center space-y-2">
                      <Icon className={`w-6 h-6 mx-auto ${stat.color}`} />
                      <div className={`text-2xl font-extrabold font-heading ${stat.color}`}>{stat.value}</div>
                      <div className="text-[11px] text-slate-500 font-medium">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ── CTA ── */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative glass-panel p-10 sm:p-14 rounded-3xl border border-cyan-500/20 text-center overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/5 via-transparent to-indigo-600/5 pointer-events-none" />
                <div className="relative">
                  <Sparkles className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-100 mb-3">
                    Ready to Start?
                  </h2>
                  <p className="text-sm text-slate-300 max-w-md mx-auto mb-6">
                    Begin with Module 1 and work your way through 12 comprehensive modules to become a job-ready developer.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => setCurrentTab('modules')}
                      className="flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-extrabold text-sm shadow-2xl shadow-cyan-500/30 transition hover:scale-105"
                    >
                      <Zap className="w-5 h-5" />
                      <span>Start Module 1 — HTML</span>
                    </button>
                    <button
                      onClick={() => setOnboardingOpen(true)}
                      className="flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:border-cyan-500/40 font-bold text-sm transition"
                    >
                      <span>Set My Learning Goal</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* Modules Page */}
        {currentTab === 'modules' && (
          <ModulesPage
            roadmap={activeRoadmap}
            userProgress={userProgress}
            onSelectLesson={handleSelectLesson}
          />
        )}

        {/* Roadmap */}
        {currentTab === 'roadmap' && (
          <RoadmapCanvas
            roadmap={activeRoadmap}
            userProgress={userProgress}
            onSelectLesson={handleSelectLesson}
          />
        )}

        {/* Dashboard */}
        {currentTab === 'dashboard' && (
          <StudentDashboard
            userProgress={userProgress}
            activeRoadmap={activeRoadmap}
            onNavigateTab={setCurrentTab}
            onSelectLesson={handleSelectLesson}
            lessonMap={lessonMap}
            onOpenCertificate={() => setCertificateOpen(true)}
          />
        )}

        {/* Code Playground */}
        {currentTab === 'playground' && <CodePlayground />}

        {/* Projects */}
        {currentTab === 'projects' && (
          <ProjectsHub
            userProgress={userProgress}
            onUpdateProgress={refreshProgress}
          />
        )}

        {/* Job Prep */}
        {currentTab === 'job-prep' && <JobPrepHub />}

        {/* Resources */}
        {currentTab === 'resources' && <ResourcesHub />}

        {/* Admin */}
        {currentTab === 'admin' && (
          <AdminCMS
            roadmaps={roadmaps}
            onUpdateRoadmaps={(updated) => { setRoadmaps(updated); refreshProgress(); }}
          />
        )}

        {/* Lesson Reader */}
        {currentTab === 'lesson' && activeLesson && (
          <LessonReader
            lesson={activeLesson}
            userProgress={userProgress}
            onBackToRoadmap={() => setCurrentTab('modules')}
            onNextLesson={(nextId) => handleSelectLesson(nextId)}
            onUpdateProgress={refreshProgress}
          />
        )}

      </main>

      {/* ── Floating & Overlay Elements ── */}

      {/* AI Tutor */}
      <AITutorWidget currentTopicTitle={activeLesson?.title} />

      {/* XP Toast Notifications */}
      <XPToast toasts={xpToasts} onDismiss={dismissToast} />

      {/* Onboarding Modal */}
      <OnboardingModal
        isOpen={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
        userProgress={userProgress}
        onSaveProgress={(updated) => {
          setUserProgress(updated);
          setCurrentTab('modules');
        }}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        roadmap={activeRoadmap}
        onSelectLesson={handleSelectLesson}
      />

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={certificateOpen}
        onClose={() => setCertificateOpen(false)}
        userProgress={userProgress}
        roadmap={activeRoadmap}
      />

      <Footer />
    </div>
  );
}
export default App;
