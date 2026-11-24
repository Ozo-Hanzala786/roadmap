import React, { useState } from 'react';
import { Briefcase, FolderGit2, FileText, HelpCircle, Award, CheckCircle2, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { INITIAL_INTERVIEW_QA } from '../../data/initialData';
import { ResumeBuilderModal } from './ResumeBuilderModal';
import { CertificateModal } from '../certificate/CertificateModal';

export const JobPrepHub: React.FC = () => {
  const [expandedQA, setExpandedQA] = useState<Record<string, boolean>>({});
  const [resumeOpen, setResumeOpen] = useState(false);
  const [certificateOpen, setCertificateOpen] = useState(false);

  const toggleQA = (id: string) => {
    setExpandedQA(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
          <Briefcase className="w-4 h-4" />
          <span>Career Readiness & Job Acceleration</span>
        </div>
        <h1 className="text-3xl font-extrabold font-heading text-slate-100">
          Developer Job Preparation Hub
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          Transform your coding skills into employment. Master GitHub portfolio setups, generate ATS resumes, practice real interview questions, and claim your completion certificate.
        </p>
      </div>

      {/* Career Roadmap Stepper */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800">
        <h2 className="text-base font-bold font-heading text-slate-100 mb-4">
          The 6-Step Developer Job Roadmap
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {[
            { step: '01', title: 'Learn Fundamentals', done: true },
            { step: '02', title: 'Solve Challenges', done: true },
            { step: '03', title: 'Build Projects', done: true },
            { step: '04', title: 'GitHub & Portfolio', done: false },
            { step: '05', title: 'ATS Resume', done: false },
            { step: '06', title: 'Land Job 🚀', done: false }
          ].map((item) => (
            <div
              key={item.step}
              className={`p-3 rounded-xl border text-center font-mono text-xs ${
                item.done
                  ? 'bg-cyan-950/30 border-cyan-500/40 text-cyan-300'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400'
              }`}
            >
              <div className="font-bold text-sm">{item.step}</div>
              <div className="text-[11px] font-sans mt-1">{item.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* ATS Resume Builder Trigger Card */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mb-3">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-heading text-slate-100">Interactive Resume Builder</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Create an ATS-friendly markdown resume tailored for software engineering recruiters. Highlight project bullet points with measurable impact metrics.
            </p>
          </div>

          <button
            onClick={() => setResumeOpen(true)}
            className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition flex items-center justify-center space-x-2"
          >
            <FileText className="w-4 h-4" />
            <span>Open ATS Resume Builder</span>
          </button>
        </div>

        {/* Completion Certificate Trigger Card */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center mb-3">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-heading text-slate-100">Shareable Certificate of Completion</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Generate an official, high-resolution downloadable certificate verifying your full-stack roadmap mastery. Attach to LinkedIn or your portfolio.
            </p>
          </div>

          <button
            onClick={() => setCertificateOpen(true)}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-indigo-500 hover:from-amber-400 hover:to-indigo-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition flex items-center justify-center space-x-2"
          >
            <Award className="w-4 h-4" />
            <span>Generate Official Certificate</span>
          </button>
        </div>

      </div>

      {/* Technical Interview Q&A Simulator */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
          <HelpCircle className="w-4 h-4" />
          <span>Interview Practice</span>
        </div>
        <h2 className="text-xl font-bold font-heading text-slate-100">
          Technical Interview Q&A Simulator
        </h2>

        <div className="space-y-3">
          {INITIAL_INTERVIEW_QA.map((qa) => {
            const isOpen = expandedQA[qa.id];
            return (
              <div
                key={qa.id}
                className="rounded-xl border border-slate-800 bg-slate-900/80 overflow-hidden transition"
              >
                <div
                  onClick={() => toggleQA(qa.id)}
                  className="p-4 flex items-center justify-between cursor-pointer text-sm font-semibold text-slate-200 hover:text-cyan-400"
                >
                  <div className="flex items-center space-x-3">
                    <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-[10px] text-cyan-400 font-mono">
                      {qa.topic}
                    </span>
                    <span>{qa.question}</span>
                  </div>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </div>

                {isOpen && (
                  <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-3 text-xs text-slate-300 leading-relaxed">
                    <p>{qa.answer}</p>
                    {qa.codeExample && (
                      <pre className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-cyan-300 overflow-x-auto">
                        <code>{qa.codeExample}</code>
                      </pre>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      <ResumeBuilderModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
      <CertificateModal isOpen={certificateOpen} onClose={() => setCertificateOpen(false)} />

    </div>
  );
};
