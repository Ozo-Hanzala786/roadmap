import React, { useState } from 'react';
import { Roadmap, TopicNode, Lesson } from '../../types';
import { StorageService } from '../../services/storage';
import { Settings, Plus, Edit, Trash2, Save, RefreshCw, Layers, BookOpen, AlertTriangle } from 'lucide-react';

interface AdminCMSProps {
  roadmaps: Roadmap[];
  onUpdateRoadmaps: (roadmaps: Roadmap[]) => void;
}

export const AdminCMS: React.FC<AdminCMSProps> = ({ roadmaps, onUpdateRoadmaps }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'topics' | 'lessons' | 'reset'>('overview');
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicDesc, setNewTopicDesc] = useState('');
  const [selectedLevel, setSelectedLevel] = useState(1);

  const handleAddTopic = () => {
    if (!newTopicTitle.trim()) return;

    const updated = [...roadmaps];
    const webDev = updated[0];

    const newId = `topic-${Date.now()}`;
    const newNode: TopicNode = {
      id: newId,
      roadmapId: webDev.id,
      levelIndex: selectedLevel,
      title: newTopicTitle,
      category: 'Custom',
      iconName: 'Code',
      description: newTopicDesc || 'Custom topic added via Admin CMS.',
      difficulty: 'Intermediate',
      estimatedHours: 4,
      prerequisites: [],
      position: { x: 250, y: 500 },
      lessons: [
        {
          id: `les-${Date.now()}`,
          topicId: newId,
          title: `${newTopicTitle} Essentials`,
          description: 'Learn fundamental principles of ' + newTopicTitle,
          durationMinutes: 20,
          objective: 'Understand ' + newTopicTitle,
          contentMarkdown: `# ${newTopicTitle}\n\nThis lesson was created dynamically inside the Admin CMS!`,
          codeExamples: [],
          quizzes: [],
          challenges: [],
          summary: 'Admin generated topic lesson.'
        }
      ]
    };

    webDev.nodes.push(newNode);
    StorageService.saveRoadmaps(updated);
    onUpdateRoadmaps(updated);
    setNewTopicTitle('');
    setNewTopicDesc('');
    alert('New topic added successfully to Web Development roadmap!');
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset all user progress and restore default datasets?')) {
      StorageService.resetProgress();
      window.location.reload();
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
          <Settings className="w-4 h-4" />
          <span>Platform Administration</span>
        </div>
        <h1 className="text-3xl font-extrabold font-heading text-slate-100">
          Content Management System (CMS)
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          Create, edit, and organize curriculum roadmaps, levels, topics, lessons, quizzes, and automated coding challenges dynamically.
        </p>
      </div>

      {/* Tabs Toolbar */}
      <div className="flex space-x-2 border-b border-slate-800 pb-3">
        {[
          { id: 'overview', label: 'Overview & Stats' },
          { id: 'topics', label: 'Add New Topic' },
          { id: 'reset', label: 'Database Reset' }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === t.id
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 text-center">
            <Layers className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
            <div className="text-3xl font-extrabold font-heading text-slate-100">{roadmaps.length}</div>
            <div className="text-xs text-slate-400 mt-1">Active Roadmaps</div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 text-center">
            <BookOpen className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
            <div className="text-3xl font-extrabold font-heading text-slate-100">
              {roadmaps[0]?.nodes.length || 0}
            </div>
            <div className="text-xs text-slate-400 mt-1">Curriculum Topic Nodes</div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 text-center">
            <Settings className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <div className="text-3xl font-extrabold font-heading text-slate-100">Active</div>
            <div className="text-xs text-slate-400 mt-1">CMS Engine Status</div>
          </div>
        </div>
      )}

      {/* Add Topic Form Tab */}
      {activeTab === 'topics' && (
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 max-w-2xl">
          <h2 className="text-lg font-bold font-heading text-slate-100 flex items-center space-x-2">
            <Plus className="w-5 h-5 text-cyan-400" />
            <span>Create New Roadmap Topic</span>
          </h2>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Topic Title</label>
            <input
              type="text"
              value={newTopicTitle}
              onChange={(e) => setNewTopicTitle(e.target.value)}
              placeholder="e.g. Next.js Server Components"
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Select Roadmap Level</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(Number(e.target.value))}
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200"
            >
              {[0, 1, 2, 3, 4, 5, 6, 7].map((lvl) => (
                <option key={lvl} value={lvl}>
                  Level {lvl}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Description</label>
            <textarea
              value={newTopicDesc}
              onChange={(e) => setNewTopicDesc(e.target.value)}
              placeholder="Brief summary of what students will learn..."
              className="w-full h-24 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 resize-none"
            />
          </div>

          <button
            onClick={handleAddTopic}
            className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20"
          >
            Save & Publish Topic Node
          </button>
        </div>
      )}

      {/* Reset Tab */}
      {activeTab === 'reset' && (
        <div className="glass-panel p-6 rounded-2xl border border-rose-500/30 bg-rose-950/10 space-y-4 max-w-xl">
          <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm">
            <AlertTriangle className="w-5 h-5" />
            <span>Danger Zone: Reset All Platform Progress</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Clicking reset will erase all local user XP, level, completed topics, challenge submissions, and custom CMS edits, restoring default clean datasets.
          </p>
          <button
            onClick={handleResetData}
            className="px-6 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold text-xs"
          >
            Reset Progress & Data
          </button>
        </div>
      )}

    </div>
  );
};
