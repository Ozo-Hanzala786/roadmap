import React from 'react';
import { Code2, Heart, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950/80 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
            <Code2 className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <span className="font-heading font-bold text-slate-200 text-lg">CodePath Platform</span>
            <p className="text-xs text-slate-500">Interactive Coding Roadmap & Career Acceleration</p>
          </div>
        </div>

        {/* Tech Badges */}
        <div className="flex items-center space-x-2 text-xs font-mono text-slate-500">
          <span className="px-2 py-1 bg-slate-900 rounded border border-slate-800">React 19</span>
          <span className="px-2 py-1 bg-slate-900 rounded border border-slate-800">TypeScript</span>
          <span className="px-2 py-1 bg-slate-900 rounded border border-slate-800">Tailwind CSS</span>
          <span className="px-2 py-1 bg-slate-900 rounded border border-slate-800">Monaco Sandbox</span>
        </div>

        {/* Right Attribution */}
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <span>Built for ambitious developers</span>
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          <span>© 2026 CodePath</span>
        </div>
      </div>
    </footer>
  );
};
