import React, { useState } from 'react';
import { INITIAL_RESOURCES } from '../../data/initialData';
import { BookOpen, ExternalLink, Search, Filter } from 'lucide-react';

export const ResourcesHub: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'HTML/CSS', 'JavaScript', 'React', 'Git'];

  const filtered = INITIAL_RESOURCES.filter((r) => {
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'All' || r.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
          <BookOpen className="w-4 h-4" />
          <span>Curated Resource Library</span>
        </div>
        <h1 className="text-3xl font-extrabold font-heading text-slate-100">
          Developer Documentation & Tools
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          Access official documentation, cheat sheets, debugging guides, and industry-standard reference sites.
        </p>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documentation & tools..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex space-x-1.5 overflow-x-auto w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Resources Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-[10px] text-cyan-400 font-mono">
                  {item.category}
                </span>
                <span className="text-[11px] text-slate-500 font-mono">{item.type}</span>
              </div>

              <h3 className="text-lg font-bold font-heading text-slate-100">{item.title}</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">{item.description}</p>

              <div className="flex flex-wrap gap-1.5 mt-4">
                {item.tags.map((tag, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 text-[10px] text-slate-400 font-mono">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-cyan-400 font-bold text-xs flex items-center justify-center space-x-2 transition"
            >
              <span>Visit Resource</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>

    </div>
  );
};
