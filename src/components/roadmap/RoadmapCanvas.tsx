import React, { useState } from 'react';
import { 
  Roadmap, 
  TopicNode, 
  UserProgress 
} from '../../types';
import { 
  Cpu, 
  Globe, 
  Terminal, 
  Layout, 
  Palette, 
  Code, 
  MousePointer, 
  GitBranch, 
  Atom, 
  Server, 
  Database, 
  Briefcase, 
  Lock, 
  CheckCircle2, 
  Sparkles, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  List, 
  GitFork,
  ArrowRight,
  Clock,
  BookOpen
} from 'lucide-react';
import { NodeDrawer } from './NodeDrawer';

interface RoadmapCanvasProps {
  roadmap: Roadmap;
  userProgress: UserProgress;
  onSelectLesson: (lessonId: string) => void;
}

const ICON_MAP: Record<string, any> = {
  Cpu,
  Globe,
  Terminal,
  Layout,
  Palette,
  Code,
  MousePointer,
  GitBranch,
  Atom,
  Server,
  Database,
  Briefcase
};

export const RoadmapCanvas: React.FC<RoadmapCanvasProps> = ({
  roadmap,
  userProgress,
  onSelectLesson
}) => {
  const [selectedNode, setSelectedNode] = useState<TopicNode | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'canvas' | 'list'>('canvas');
  const [zoomLevel, setZoomLevel] = useState(1);

  const completedCount = roadmap.nodes.filter(n => userProgress.completedTopicIds.includes(n.id)).length;
  const progressPercent = Math.round((completedCount / (roadmap.nodes.length || 1)) * 100);

  const handleNodeClick = (node: TopicNode) => {
    setSelectedNode(node);
    setDrawerOpen(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Roadmap Header & Progress Bar */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10" />
        
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                {roadmap.category}
              </span>
              <span className="text-xs text-slate-400 font-mono">Target Role: {roadmap.targetRole}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-100">
              {roadmap.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl leading-relaxed">
              {roadmap.description}
            </p>
          </div>

          {/* Progress Card */}
          <div className="glass-card p-5 rounded-xl border border-slate-800 min-w-[280px]">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-slate-400 font-medium">Roadmap Progress</span>
              <span className="text-cyan-400 font-bold font-mono">{progressPercent}%</span>
            </div>
            <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-500 shadow-md shadow-cyan-500/50"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 mt-3">
              <span>{completedCount} of {roadmap.nodes.length} topics mastered</span>
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            </div>
          </div>
        </div>

        {/* View Switcher & Controls */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-800/80">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('canvas')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === 'canvas'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              <GitFork className="w-4 h-4" />
              <span>Skill Tree Canvas</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === 'list'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              <List className="w-4 h-4" />
              <span>List View</span>
            </button>
          </div>

          {viewMode === 'canvas' && (
            <div className="hidden sm:flex items-center space-x-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setZoomLevel(Math.max(0.8, zoomLevel - 0.1))}
                className="p-1.5 text-slate-400 hover:text-slate-200"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-slate-400 px-2">{Math.round(zoomLevel * 100)}%</span>
              <button
                onClick={() => setZoomLevel(Math.min(1.2, zoomLevel + 0.1))}
                className="p-1.5 text-slate-400 hover:text-slate-200"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="p-1.5 text-slate-400 hover:text-slate-200"
                title="Reset Zoom"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* View Mode 1: Skill Tree Visual Canvas */}
      {viewMode === 'canvas' && (
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 min-h-[700px] overflow-x-auto relative shadow-2xl">
          <div 
            className="transition-transform duration-200 origin-top-left py-4"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {/* Level Sections */}
            {roadmap.levels.map((lvl) => {
              const levelNodes = roadmap.nodes.filter(n => lvl.topicIds.includes(n.id));
              return (
                <div key={lvl.levelNumber} className="mb-12 relative">
                  
                  {/* Level Header */}
                  <div className="flex items-center space-x-3 mb-6 pb-2 border-b border-slate-800/80">
                    <span className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-extrabold text-sm flex items-center justify-center font-mono">
                      L{lvl.levelNumber}
                    </span>
                    <div>
                      <h3 className="font-bold text-lg text-slate-200">{lvl.title}</h3>
                      <p className="text-xs text-slate-400">{lvl.description}</p>
                    </div>
                  </div>

                  {/* Level Topic Nodes Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
                    {levelNodes.map((node) => {
                      const IconComponent = ICON_MAP[node.iconName] || Code;
                      const isCompleted = userProgress.completedTopicIds.includes(node.id);
                      const prereqsMet = node.prerequisites.every(p => userProgress.completedTopicIds.includes(p));
                      const isLocked = !prereqsMet && !isCompleted;

                      return (
                        <div
                          key={node.id}
                          onClick={() => handleNodeClick(node)}
                          className={`relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer group ${
                            isCompleted
                              ? 'bg-gradient-to-br from-cyan-950/40 via-slate-900 to-emerald-950/30 border-cyan-400/50 shadow-lg shadow-cyan-500/10 hover:border-cyan-300'
                              : isLocked
                              ? 'bg-slate-900/40 border-slate-800/60 opacity-60 hover:opacity-80'
                              : 'bg-slate-900/80 border-slate-700/80 hover:border-cyan-400/80 hover:shadow-lg hover:shadow-cyan-500/10'
                          }`}
                        >
                          {/* Status Badge */}
                          <div className="flex items-center justify-between mb-3">
                            <div className={`p-2.5 rounded-xl border ${
                              isCompleted 
                                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40' 
                                : isLocked 
                                ? 'bg-slate-800 text-slate-500 border-slate-700' 
                                : 'bg-indigo-500/20 text-indigo-300 border-indigo-400/40'
                            }`}>
                              <IconComponent className="w-6 h-6" />
                            </div>

                            <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide flex items-center space-x-1 ${
                              isCompleted
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : isLocked
                                ? 'bg-slate-800 text-slate-400 border border-slate-700'
                                : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                            }`}>
                              {isCompleted ? (
                                <>
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Mastered</span>
                                </>
                              ) : isLocked ? (
                                <>
                                  <Lock className="w-3.5 h-3.5" />
                                  <span>Locked</span>
                                </>
                              ) : (
                                <>
                                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                                  <span>Available</span>
                                </>
                              )}
                            </span>
                          </div>

                          {/* Topic Details */}
                          <h4 className="font-bold text-base text-slate-100 group-hover:text-cyan-400 transition">
                            {node.title}
                          </h4>
                          <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                            {node.description}
                          </p>

                          {/* Node Footer */}
                          <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-800/80 text-xs text-slate-400 font-mono">
                            <span>{node.lessons.length} Lessons</span>
                            <span>{node.estimatedHours} hrs</span>
                            <span className="text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform">
                              Explore →
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* View Mode 2: Vertical List View */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {roadmap.nodes.map((node, idx) => {
            const isCompleted = userProgress.completedTopicIds.includes(node.id);
            const prereqsMet = node.prerequisites.every(p => userProgress.completedTopicIds.includes(p));
            const isLocked = !prereqsMet && !isCompleted;

            return (
              <div
                key={node.id}
                onClick={() => handleNodeClick(node)}
                className={`glass-panel p-5 rounded-xl border transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isCompleted
                    ? 'border-cyan-500/40 bg-cyan-950/20'
                    : isLocked
                    ? 'border-slate-800 opacity-60'
                    : 'border-slate-800 hover:border-cyan-500/40'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <span className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-bold text-slate-100">{node.title}</h4>
                      <span className="text-[10px] px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-400 rounded">
                        L{node.levelIndex}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{node.description}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-xs">
                  <div className="flex items-center space-x-3 text-slate-400 font-mono">
                    <span className="flex items-center space-x-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{node.lessons.length}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{node.estimatedHours}h</span>
                    </span>
                  </div>

                  <button className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 hover:bg-cyan-500/10 font-bold text-xs">
                    View Topic
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Node Details Slide-over Drawer */}
      <NodeDrawer
        node={selectedNode}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        userProgress={userProgress}
        roadmap={roadmap}
        onSelectLesson={(lessonId) => {
          setDrawerOpen(false);
          onSelectLesson(lessonId);
        }}
      />

    </div>
  );
};
