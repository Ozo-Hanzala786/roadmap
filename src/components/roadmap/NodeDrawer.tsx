import React from 'react';
import { X, Clock, Award, BookOpen, Lock, ArrowRight, CheckCircle2, AlertCircle, Sparkles, Zap } from 'lucide-react';
import { TopicNode, UserProgress, Roadmap } from '../../types';

interface NodeDrawerProps {
  node: TopicNode | null;
  isOpen: boolean;
  onClose: () => void;
  userProgress: UserProgress;
  onSelectLesson: (lessonId: string) => void;
  roadmap?: Roadmap;
}

export const NodeDrawer: React.FC<NodeDrawerProps> = ({
  node,
  isOpen,
  onClose,
  userProgress,
  onSelectLesson,
  roadmap,
}) => {
  if (!isOpen || !node) return null;

  const isCompleted = userProgress.completedTopicIds.includes(node.id);
  const prereqsCompleted = node.prerequisites.every(p => userProgress.completedTopicIds.includes(p));
  const isLocked = !prereqsCompleted && !isCompleted;

  // Build a topic title lookup from roadmap nodes
  const topicTitleMap: Record<string, string> = {};
  if (roadmap) {
    for (const n of roadmap.nodes) {
      topicTitleMap[n.id] = n.title;
    }
  }

  const completedLessonsInTopic = node.lessons.filter(l =>
    userProgress.completedLessonIds.includes(l.id)
  ).length;
  const topicXpReward = node.lessons.length * 50;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md glass-panel border-l border-slate-800 shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
          
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  isCompleted 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : isLocked 
                    ? 'bg-slate-800 text-slate-400 border border-slate-700'
                    : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                }`}>
                  {isCompleted ? 'Mastered ✓' : isLocked ? 'Locked 🔒' : 'Available ⚡'}
                </span>
                <span className="text-xs text-slate-400 font-mono">{node.category}</span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Title & Description */}
            <div className="mt-6">
              <h2 className="text-2xl font-bold font-heading text-slate-100">{node.title}</h2>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">{node.description}</p>
            </div>

            {/* Meta Tags */}
            <div className="grid grid-cols-3 gap-3 my-6">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <Clock className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                <div className="text-xs text-slate-400">Est. Time</div>
                <div className="font-bold text-sm text-slate-200">{node.estimatedHours} hrs</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <BookOpen className="w-4 h-4 text-indigo-400 mx-auto mb-1" />
                <div className="text-xs text-slate-400">Lessons</div>
                <div className="font-bold text-sm text-slate-200">{node.lessons.length}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <Award className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                <div className="text-xs text-slate-400">Difficulty</div>
                <div className="font-bold text-xs text-slate-200 mt-0.5">{node.difficulty}</div>
              </div>
            </div>

            {/* Prerequisites Section */}
            {node.prerequisites.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Prerequisites Required:
                </h3>
                <div className="space-y-2">
                  {node.prerequisites.map((pId) => {
                    const done = userProgress.completedTopicIds.includes(pId);
                    const prereqTitle = topicTitleMap[pId] ?? pId;
                    return (
                      <div
                        key={pId}
                        className={`flex items-center space-x-2 text-xs p-2.5 rounded-lg border ${
                          done
                            ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
                            : 'bg-rose-950/20 border-rose-800/40 text-rose-300'
                        }`}
                      >
                        {done ? <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />}
                        <span className="flex-1">{prereqTitle}</span>
                        <span className={`text-[10px] font-bold uppercase ${done ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {done ? 'Done ✓' : 'Needed'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Lessons List */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Topic Lessons Breakdown
              </h3>

              <div className="space-y-3">
              {node.lessons.map((lesson, idx) => {
                  const lessonDone = userProgress.completedLessonIds.includes(lesson.id);
                  return (
                    <div
                      key={lesson.id}
                      onClick={() => !isLocked && onSelectLesson(lesson.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer group ${
                        isLocked
                          ? 'opacity-50 cursor-not-allowed bg-slate-900 border-slate-800'
                          : lessonDone
                          ? 'bg-cyan-950/20 border-cyan-500/30 text-slate-200 hover:border-cyan-400'
                          : 'bg-slate-900/80 border-slate-800 text-slate-200 hover:border-indigo-500/40 hover:bg-indigo-950/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center font-mono flex-shrink-0 ${
                            lessonDone
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-slate-800 text-slate-300 border border-slate-700'
                          }`}>
                            {lessonDone ? '✓' : idx + 1}
                          </span>
                          <div>
                            <h4 className="font-semibold text-sm group-hover:text-cyan-400 transition">{lesson.title}</h4>
                            <div className="flex items-center space-x-2 text-xs text-slate-400 mt-0.5">
                              <span>{lesson.durationMinutes} min</span>
                              <span className="text-cyan-400/60">+50 XP</span>
                            </div>
                          </div>
                        </div>

                        {lessonDone ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                        ) : isLocked ? (
                          <Lock className="w-4 h-4 text-slate-500 flex-shrink-0" />
                        ) : (
                          <ArrowRight className="w-4 h-4 text-cyan-400 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Action CTA */}
          <div className="pt-6 border-t border-slate-800">
            {node.lessons.length > 0 && (
              <div className="space-y-3">
                {/* Progress summary */}
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>{completedLessonsInTopic} / {node.lessons.length} lessons done</span>
                  <span className="flex items-center space-x-1 text-cyan-400">
                    <Zap className="w-3.5 h-3.5" />
                    <span>+{topicXpReward} XP reward</span>
                  </span>
                </div>

                <button
                  disabled={isLocked}
                  onClick={() => onSelectLesson(node.lessons[0].id)}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition ${
                    isLocked
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                      : 'bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-slate-950 shadow-lg shadow-cyan-500/25 hover:scale-[1.02]'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isCompleted ? 'Review Topic Lessons' : isLocked ? 'Complete Prerequisites First' : 'Start Topic Lessons'}</span>
                  {!isLocked && <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
