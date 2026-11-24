import React, { useState, useRef, useEffect } from 'react';
import { 
  Code2, 
  Map, 
  Play, 
  FolderGit2, 
  Briefcase, 
  BookOpen, 
  Flame, 
  Award, 
  Search, 
  Menu, 
  X, 
  User, 
  Settings,
  ChevronDown,
  Layers,
  GraduationCap,
  LayoutGrid,
  Wrench,
  ArrowRight
} from 'lucide-react';
import { UserProgress } from '../../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  userProgress: UserProgress;
  onOpenSearch: () => void;
  onOpenOnboarding: () => void;
}

interface DropdownItem {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
}

interface NavDropdown {
  label: string;
  icon: React.ElementType;
  items: DropdownItem[];
}

const NAV_DROPDOWNS: NavDropdown[] = [
  {
    label: 'Learn',
    icon: GraduationCap,
    items: [
      { id: 'modules', label: 'Course Modules', description: 'Step-by-step module curriculum', icon: Layers },
      { id: 'roadmap', label: 'Skill Tree Roadmap', description: 'Visual learning path canvas', icon: Map },
      { id: 'playground', label: 'Code Playground', description: 'In-browser code sandbox', icon: Play },
    ],
  },
  {
    label: 'Build & Career',
    icon: Briefcase,
    items: [
      { id: 'projects', label: 'Projects Hub', description: 'Real-world portfolio projects', icon: FolderGit2 },
      { id: 'job-prep', label: 'Career & Job Prep', description: 'Resumes, interviews & portfolio', icon: Briefcase },
      { id: 'resources', label: 'Resources Library', description: 'Docs, cheat sheets & tools', icon: BookOpen },
    ],
  },
  {
    label: 'Tools',
    icon: Wrench,
    items: [
      { id: 'dashboard', label: 'Dashboard', description: 'Track your learning progress', icon: User },
      { id: 'admin', label: 'Admin CMS', description: 'Manage roadmap content', icon: Settings },
    ],
  },
];

// Flatten all items for mobile
const ALL_NAV_ITEMS = NAV_DROPDOWNS.flatMap(group => group.items);

/* ── Desktop Dropdown ── */
const DesktopDropdown: React.FC<{
  dropdown: NavDropdown;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}> = ({ dropdown, currentTab, setCurrentTab }) => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const hasActiveChild = dropdown.items.some(i => i.id === currentTab);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };
  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 200);
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const GroupIcon = dropdown.icon;

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
          hasActiveChild
            ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
        }`}
      >
        <GroupIcon className={`w-4 h-4 ${hasActiveChild ? 'text-cyan-400' : 'text-slate-400'}`} />
        <span>{dropdown.label}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div className="absolute top-full left-0 mt-1.5 w-72 rounded-xl bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 shadow-2xl shadow-black/40 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-2">
            {dropdown.items.map((item) => {
              const ItemIcon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    setOpen(false);
                  }}
                  className={`w-full flex items-start space-x-3 px-3 py-3 rounded-lg text-left transition-all group ${
                    isActive
                      ? 'bg-cyan-500/10 border border-cyan-500/20'
                      : 'hover:bg-slate-800/80 border border-transparent'
                  }`}
                >
                  <div className={`mt-0.5 p-2 rounded-lg border ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
                      : 'bg-slate-800 text-slate-400 border-slate-700 group-hover:text-cyan-400 group-hover:border-cyan-500/30'
                  }`}>
                    <ItemIcon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-semibold ${isActive ? 'text-cyan-400' : 'text-slate-200 group-hover:text-white'}`}>
                      {item.label}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      {item.description}
                    </div>
                  </div>
                  {isActive && (
                    <div className="mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  userProgress,
  onOpenSearch,
  onOpenOnboarding
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileGroup, setExpandedMobileGroup] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentTab('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-heading font-extrabold text-xl tracking-tight text-gradient">
                CodePath
              </span>
            </div>
          </div>

          {/* Desktop Navigation — Dropdown Menus */}
          <nav className="hidden lg:flex items-center space-x-1">
            {/* Home direct link */}
            <button
              onClick={() => setCurrentTab('home')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                currentTab === 'home'
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <LayoutGrid className={`w-4 h-4 ${currentTab === 'home' ? 'text-cyan-400' : 'text-slate-400'}`} />
              <span>Home</span>
            </button>

            {/* Dropdown Groups */}
            {NAV_DROPDOWNS.map((dropdown) => (
              <DesktopDropdown
                key={dropdown.label}
                dropdown={dropdown}
                currentTab={currentTab}
                setCurrentTab={(tab) => { setCurrentTab(tab); }}
              />
            ))}
          </nav>

          {/* Right Side: Search, Streak, XP, Mobile Toggle */}
          <div className="flex items-center space-x-3">
            
            {/* Search Modal Trigger */}
            <button
              onClick={onOpenSearch}
              className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 text-xs transition"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search...</span>
              <kbd className="px-1.5 py-0.5 text-[10px] bg-slate-800 rounded text-slate-400 font-mono">⌘K</kbd>
            </button>

            {/* Streak Counter */}
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold" title="Daily Streak">
              <Flame className="w-4 h-4 text-amber-500 animate-bounce" />
              <span>{userProgress.streakDays}d</span>
            </div>

            {/* XP & Level Badge */}
            <div 
              onClick={onOpenOnboarding}
              className="cursor-pointer flex items-center space-x-2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-950 to-indigo-950 border border-cyan-500/30 text-xs font-medium hover:border-cyan-400 transition"
              title="Click to customize your goal"
            >
              <Award className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-300">Lvl {userProgress.level}</span>
              <span className="text-cyan-400 font-bold">{userProgress.xp} XP</span>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 max-h-[calc(100vh-4rem)] overflow-y-auto">
          
          {/* Home link */}
          <button
            onClick={() => { setCurrentTab('home'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left text-sm font-medium ${
              currentTab === 'home'
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <LayoutGrid className="w-5 h-5 text-cyan-400" />
            <span>Home</span>
          </button>

          {/* Grouped sections */}
          {NAV_DROPDOWNS.map((group) => {
            const GroupIcon = group.icon;
            const isExpanded = expandedMobileGroup === group.label;
            const hasActiveChild = group.items.some(i => i.id === currentTab);

            return (
              <div key={group.label} className="space-y-1">
                <button
                  onClick={() => setExpandedMobileGroup(isExpanded ? null : group.label)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition ${
                    hasActiveChild
                      ? 'bg-cyan-500/5 text-cyan-400'
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <GroupIcon className="w-5 h-5 text-cyan-400" />
                    <span>{group.label}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>

                {isExpanded && (
                  <div className="ml-4 space-y-1 pb-1">
                    {group.items.map((item) => {
                      const ItemIcon = item.icon;
                      const isActive = currentTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setCurrentTab(item.id);
                            setMobileMenuOpen(false);
                          }}
                          className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-left text-sm transition ${
                            isActive
                              ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                              : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                          }`}
                        >
                          <ItemIcon className="w-4 h-4" />
                          <div>
                            <div className="font-medium">{item.label}</div>
                            <div className="text-[11px] text-slate-500">{item.description}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* Search bar in mobile */}
          <div className="pt-2 border-t border-slate-800/80 mt-2">
            <button
              onClick={() => {
                onOpenSearch();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-sm"
            >
              <Search className="w-4 h-4" />
              <span>Search platform content</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
