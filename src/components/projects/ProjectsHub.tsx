import React, { useState } from 'react';
import { Project, UserProgress } from '../../types';
import { StorageService } from '../../services/storage';
import { INITIAL_PROJECTS } from '../../data/initialData';
import { FolderGit2, Rocket, Clock, Award, CheckCircle2, Circle, ArrowUpRight } from 'lucide-react';

interface ProjectsHubProps {
  userProgress: UserProgress;
  onUpdateProgress: () => void;
}

export const ProjectsHub: React.FC<ProjectsHubProps> = ({ userProgress, onUpdateProgress }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [completedMilestones, setCompletedMilestones] = useState<Record<string, boolean>>({});

  const categories = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredProjects = selectedCategory === 'All' 
    ? INITIAL_PROJECTS 
    : INITIAL_PROJECTS.filter(p => p.difficulty === selectedCategory);

  const toggleMilestone = (mId: string) => {
    setCompletedMilestones(prev => ({ ...prev, [mId]: !prev[mId] }));
  };

  const handleCompleteProject = (proj: Project) => {
    StorageService.completeProject(proj.id, proj.xpReward);
    onUpdateProgress();
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
          <FolderGit2 className="w-4 h-4" />
          <span>Project-Based Learning</span>
        </div>
        <h1 className="text-3xl font-extrabold font-heading text-slate-100">
          Real-World Software Portfolio Projects
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          Transition from coding tutorials to building real applications. Complete step-by-step milestones to earn XP and build an impressive GitHub developer portfolio.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              selectedCategory === cat
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => {
          const isDone = userProgress.completedProjectIds.includes(project.id);

          return (
            <div
              key={project.id}
              className={`glass-panel p-6 rounded-2xl border transition space-y-6 flex flex-col justify-between ${
                isDone ? 'border-emerald-500/40 bg-emerald-950/10' : 'border-slate-800 hover:border-cyan-500/40'
              }`}
            >
              <div>
                {/* Header Metadata */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase ${
                    project.difficulty === 'Beginner' ? 'bg-cyan-500/20 text-cyan-400' :
                    project.difficulty === 'Intermediate' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-purple-500/20 text-purple-400'
                  }`}>
                    {project.difficulty}
                  </span>

                  <div className="flex items-center space-x-3 text-xs font-mono text-slate-400">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{project.estimatedHours} hrs</span>
                    </span>
                    <span className="flex items-center space-x-1 text-amber-400 font-bold">
                      <Award className="w-3.5 h-3.5" />
                      <span>+{project.xpReward} XP</span>
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold font-heading text-slate-100">{project.title}</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{project.description}</p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.technologies.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Milestones Checklist */}
                <div className="mt-6 space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Step-by-Step Milestones:
                  </h4>
                  {project.milestones.map((m) => {
                    const checked = completedMilestones[m.id] || isDone;
                    return (
                      <div
                        key={m.id}
                        onClick={() => toggleMilestone(m.id)}
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition flex items-start space-x-3 ${
                          checked ? 'bg-cyan-950/30 border-cyan-500/30 text-cyan-200' : 'bg-slate-900/60 border-slate-800 text-slate-300'
                        }`}
                      >
                        {checked ? (
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" />
                        )}
                        <div>
                          <div className="font-bold">{m.title}</div>
                          <div className="text-[11px] text-slate-400 mt-0.5">{m.description}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-800">
                {!isDone ? (
                  <button
                    onClick={() => handleCompleteProject(project)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition flex items-center justify-center space-x-2"
                  >
                    <Rocket className="w-4 h-4" />
                    <span>Submit & Claim Project Completion (+{project.xpReward} XP)</span>
                  </button>
                ) : (
                  <div className="flex items-center justify-center space-x-2 text-xs font-bold text-emerald-400 py-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Project Mastered & Added to Portfolio!</span>
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
