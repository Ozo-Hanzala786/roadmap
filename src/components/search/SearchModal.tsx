import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, Code2, FolderGit2, ArrowRight } from 'lucide-react';
import { Roadmap } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  roadmap: Roadmap;
  onSelectLesson: (lessonId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  roadmap,
  onSelectLesson
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle modal
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Flatten lessons from nodes
  const allLessons = roadmap.nodes.flatMap(n => n.lessons);
  const filtered = query.trim() === '' 
    ? allLessons 
    : allLessons.filter(l => 
        l.title.toLowerCase().includes(query.toLowerCase()) || 
        l.description.toLowerCase().includes(query.toLowerCase()) ||
        l.contentMarkdown.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md p-4 flex items-start justify-center pt-20 animate-fade-in">
      <div className="relative w-full max-w-xl glass-panel rounded-2xl border border-cyan-500/30 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Search Bar Input */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center space-x-3">
          <Search className="w-5 h-5 text-cyan-400 flex-shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lessons, topics, challenges, or syntax..."
            className="w-full bg-transparent text-slate-100 text-sm focus:outline-none placeholder-slate-500"
          />
          <button onClick={onClose} className="p-1 text-slate-500 hover:text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 max-h-96 overflow-y-auto space-y-2 text-xs">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No matching lessons found for "{query}". Try searching "Promises", "CSS", or "HTML".
            </div>
          ) : (
            filtered.map((lesson) => (
              <div
                key={lesson.id}
                onClick={() => {
                  onSelectLesson(lesson.id);
                  onClose();
                }}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 text-slate-200 cursor-pointer flex items-center justify-between transition"
              >
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-100 text-sm">{lesson.title}</h4>
                    <p className="text-slate-400 text-[11px] line-clamp-1">{lesson.description}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              </div>
            ))
          )}
        </div>

        <div className="p-3 bg-slate-900 border-t border-slate-800 text-[11px] text-slate-500 flex justify-between font-mono">
          <span>Navigate with mouse or arrow keys</span>
          <span>ESC to close</span>
        </div>

      </div>
    </div>
  );
};
