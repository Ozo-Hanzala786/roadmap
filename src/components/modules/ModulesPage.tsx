import React, { useState } from 'react';
import {
  Layout,
  Palette,
  Code,
  Globe,
  Terminal,
  Server,
  Atom,
  Database,
  Lock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Clock,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Play,
} from 'lucide-react';
import { Roadmap, UserProgress } from '../../types';
import { MODULE_LIST, type ModuleMeta } from '../../data/initialData';

interface ModulesPageProps {
  roadmap: Roadmap;
  userProgress: UserProgress;
  onSelectLesson: (lessonId: string) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Layout, Palette, Code, Globe, Terminal, Server, Atom, Database,
};

export const ModulesPage: React.FC<ModulesPageProps> = ({
  roadmap,
  userProgress,
  onSelectLesson,
}) => {
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  const completedCount = roadmap.nodes.filter(n =>
    userProgress.completedTopicIds.includes(n.id)
  ).length;
  const totalModules = roadmap.nodes.length;
  const progressPercent = Math.round((completedCount / (totalModules || 1)) * 100);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Page Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-semibold text-cyan-400">
          <BookOpen className="w-4 h-4" />
          <span>{totalModules} Modules • Full-Stack Curriculum</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-100 tracking-tight">
          Course <span className="text-gradient">Modules</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Follow the numbered modules in order. Each module builds on the previous one, taking you from HTML basics to advanced full-stack development.
        </p>

        {/* Overall Progress Bar */}
        <div className="max-w-md mx-auto pt-2">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>{completedCount} of {totalModules} modules completed</span>
            <span className="text-cyan-400 font-bold font-mono">{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Module Cards */}
      <div className="space-y-4">
        {MODULE_LIST.map((mod, idx) => {
          const node = roadmap.nodes.find(n => n.id === mod.topicId);
          const isCompleted = userProgress.completedTopicIds.includes(mod.topicId);
          const prereqMet =
            idx === 0 || userProgress.completedTopicIds.includes(MODULE_LIST[idx - 1].topicId);
          const isLocked = !prereqMet && !isCompleted;
          const isExpanded = expandedModule === mod.topicId;
          const IconComponent = ICON_MAP[mod.icon] || Code;

          return (
            <div key={mod.topicId} className="group">
              {/* Module Card Header */}
              <button
                onClick={() =>
                  setExpandedModule(isExpanded ? null : mod.topicId)
                }
                className={`w-full text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 ${
                  isCompleted
                    ? 'bg-gradient-to-r from-emerald-950/30 to-cyan-950/20 border-emerald-500/40 hover:border-emerald-400'
                    : isLocked
                    ? 'bg-slate-900/40 border-slate-800/60 opacity-60'
                    : 'glass-panel border-slate-800 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/5'
                }`}
              >
                <div className="flex items-center gap-4 sm:gap-5">
                  {/* Module Number Badge */}
                  <div
                    className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${mod.color} flex items-center justify-center shadow-lg relative ${
                      isLocked ? 'opacity-50 grayscale' : ''
                    }`}
                  >
                    {isLocked ? (
                      <Lock className="w-6 h-6 text-white/80" />
                    ) : isCompleted ? (
                      <CheckCircle2 className="w-7 h-7 text-white" />
                    ) : (
                      <span className="text-xl sm:text-2xl font-extrabold text-white font-mono">
                        {mod.moduleNumber}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-[11px] font-bold font-mono text-slate-500 uppercase tracking-wider">
                        Module {mod.moduleNumber}
                      </span>
                      {isCompleted && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          Completed ✓
                        </span>
                      )}
                      {!isCompleted && !isLocked && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                          Available
                        </span>
                      )}
                      {isLocked && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-500 border border-slate-700">
                          Locked
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-100 truncate">
                      {mod.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1 line-clamp-1">
                      {mod.description}
                    </p>
                  </div>

                  {/* Right side meta */}
                  <div className="hidden sm:flex items-center gap-4 flex-shrink-0">
                    <div className="text-center">
                      <div className="text-xs text-slate-500 font-mono">{mod.estimatedHours}h</div>
                      <div className="text-[10px] text-slate-600">Duration</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-slate-500 font-mono">{node?.lessons.length || 0}</div>
                      <div className="text-[10px] text-slate-600">Lessons</div>
                    </div>
                    <div className={`p-2 rounded-lg transition ${isExpanded ? 'bg-cyan-500/10' : ''}`}>
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-cyan-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-slate-500" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Tags row — mobile */}
                <div className="flex items-center gap-2 mt-3 sm:hidden">
                  <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {mod.estimatedHours}h
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                    <BookOpen className="w-3 h-3" /> {node?.lessons.length || 0} lessons
                  </span>
                  <span className={`ml-auto text-[10px] font-bold ${isExpanded ? 'text-cyan-400' : 'text-slate-500'}`}>
                    {isExpanded ? 'Collapse' : 'Expand'}
                  </span>
                </div>
              </button>

              {/* Expanded Lessons Panel */}
              {isExpanded && node && (
                <div className="mt-2 ml-4 sm:ml-8 p-4 sm:p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Lessons in this module
                  </div>
                  {node.lessons.map((lesson, lIdx) => {
                    const lessonDone = userProgress.completedLessonIds.includes(lesson.id);
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => {
                          if (!isLocked) onSelectLesson(lesson.id);
                        }}
                        disabled={isLocked}
                        className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-4 ${
                          isLocked
                            ? 'border-slate-800 opacity-50 cursor-not-allowed'
                            : lessonDone
                            ? 'border-emerald-500/30 bg-emerald-950/20 hover:border-emerald-400/50'
                            : 'border-slate-700/60 hover:border-cyan-500/40 hover:bg-slate-800/40 cursor-pointer'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          lessonDone
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : isLocked
                            ? 'bg-slate-800 text-slate-600'
                            : 'bg-cyan-500/10 text-cyan-400'
                        }`}>
                          {lessonDone ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : isLocked ? (
                            <Lock className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-slate-200 truncate">
                            {lesson.title}
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {lesson.durationMinutes} min
                            </span>
                            {lesson.challenges.length > 0 && (
                              <span className="text-amber-500 font-semibold">
                                {lesson.challenges.length} challenge{lesson.challenges.length > 1 ? 's' : ''}
                              </span>
                            )}
                            {lesson.quizzes.length > 0 && (
                              <span className="text-indigo-400">
                                {lesson.quizzes.length} quiz{lesson.quizzes.length > 1 ? 'zes' : ''}
                              </span>
                            )}
                          </div>
                        </div>
                        {!isLocked && (
                          <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}

                  {/* Tags */}
                  <div className="flex items-center gap-2 pt-2 flex-wrap">
                    {mod.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 text-[10px] font-mono font-bold bg-slate-800 text-slate-400 rounded border border-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Connector Line between modules */}
              {idx < MODULE_LIST.length - 1 && (
                <div className="flex justify-center py-1">
                  <div className="w-0.5 h-4 bg-gradient-to-b from-slate-700 to-slate-800 rounded-full" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
