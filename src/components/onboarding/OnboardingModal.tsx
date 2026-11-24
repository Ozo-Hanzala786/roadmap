import React, { useState } from 'react';
import { Target, Sparkles, CheckCircle2, Flame, Clock, Award, ArrowRight, X } from 'lucide-react';
import { UserProgress } from '../../types';
import { StorageService } from '../../services/storage';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProgress: UserProgress;
  onSaveProgress: (updated: UserProgress) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  userProgress,
  onSaveProgress
}) => {
  const [step, setStep] = useState(1);
  const [experienceLevel, setExperienceLevel] = useState<'zero' | 'beginner' | 'intermediate'>(userProgress.experienceLevel || 'zero');
  const [targetRole, setTargetRole] = useState<string>(userProgress.targetRole || 'Full-Stack Developer');
  const [dailyGoal, setDailyGoal] = useState<number>(userProgress.dailyGoalMinutes || 30);

  if (!isOpen) return null;

  const handleFinish = () => {
    const updated: UserProgress = {
      ...userProgress,
      experienceLevel,
      targetRole,
      dailyGoalMinutes: dailyGoal
    };
    StorageService.saveUserProgress(updated);
    onSaveProgress(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl glass-panel rounded-2xl p-6 sm:p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-950/50">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-lg bg-slate-900 border border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 mb-3 text-cyan-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold font-heading text-slate-100">
            Personalize Your Coding Roadmap
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Answer 3 quick questions so we can generate your optimal learning path.
          </p>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all duration-300 ${
                s === step ? 'w-10 bg-cyan-400' : s < step ? 'w-4 bg-cyan-600' : 'w-4 bg-slate-800'
              }`}
            />
          ))}
        </div>

        {/* Step 1: Experience Level */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
              Step 1: What is your current programming experience?
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {[
                {
                  id: 'zero',
                  title: 'Absolute Beginner',
                  desc: 'Never coded before. Want step-by-step guidance from zero.'
                },
                {
                  id: 'beginner',
                  title: 'Know HTML/CSS Basics',
                  desc: 'Understand basic web tags, want to master JavaScript & React.'
                },
                {
                  id: 'intermediate',
                  title: 'Intermediate Developer',
                  desc: 'Know core coding, looking for structured Full-Stack & System Design.'
                }
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => setExperienceLevel(item.id as any)}
                  className={`p-4 rounded-xl cursor-pointer border transition-all ${
                    experienceLevel === item.id
                      ? 'bg-cyan-500/15 border-cyan-400 text-slate-100 shadow-md shadow-cyan-500/10'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-base">{item.title}</h4>
                      <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                    </div>
                    {experienceLevel === item.id && <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full mt-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center justify-center space-x-2 transition shadow-lg shadow-cyan-500/20"
            >
              <span>Next Question</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Target Role */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
              Step 2: What software career role do you want to achieve?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { role: 'Full-Stack Developer', badge: 'Recommended' },
                { role: 'Frontend React Engineer', badge: 'Popular' },
                { role: 'Backend Node.js Engineer', badge: 'High Demand' },
                { role: 'AI & Python Engineer', badge: 'Trending' }
              ].map((item) => (
                <div
                  key={item.role}
                  onClick={() => setTargetRole(item.role)}
                  className={`p-4 rounded-xl cursor-pointer border transition-all ${
                    targetRole === item.role
                      ? 'bg-cyan-500/15 border-cyan-400 text-slate-100 shadow-md shadow-cyan-500/10'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="font-semibold text-sm">{item.role}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-400">
                      {item.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setStep(1)}
                className="w-1/3 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-sm font-medium border border-slate-800"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="w-2/3 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center justify-center space-x-2 transition shadow-lg shadow-cyan-500/20"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Daily Target */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
              Step 3: How much time can you commit each day?
            </h3>

            <div className="grid grid-cols-3 gap-3">
              {[
                { mins: 15, label: 'Casual', icon: Clock },
                { mins: 30, label: 'Steady', icon: Flame },
                { mins: 60, label: 'Intensive', icon: Target }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.mins}
                    onClick={() => setDailyGoal(item.mins)}
                    className={`p-4 rounded-xl cursor-pointer border text-center transition-all ${
                      dailyGoal === item.mins
                        ? 'bg-cyan-500/15 border-cyan-400 text-slate-100 shadow-md shadow-cyan-500/10'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <Icon className="w-6 h-6 mx-auto mb-2 text-cyan-400" />
                    <div className="font-bold text-lg">{item.mins} mins</div>
                    <div className="text-xs text-slate-400">{item.label}</div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-xs text-cyan-300 flex items-center space-x-3 mt-4">
              <Sparkles className="w-5 h-5 flex-shrink-0 text-cyan-400" />
              <span>
                Great choice! Committing <strong>{dailyGoal} minutes/day</strong> will help you complete the <strong>{targetRole}</strong> path in approximately 4 months.
              </span>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setStep(2)}
                className="w-1/3 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-sm font-medium border border-slate-800"
              >
                Back
              </button>
              <button
                onClick={handleFinish}
                className="w-2/3 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-slate-950 font-bold text-sm flex items-center justify-center space-x-2 transition shadow-lg shadow-cyan-500/25"
              >
                <Award className="w-4 h-4" />
                <span>Launch My Custom Roadmap</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
