import React, { useState } from 'react';
import { UserResume } from '../../types';
import { StorageService } from '../../services/storage';
import { FileText, Copy, Check, Save, Sparkles, Download, X } from 'lucide-react';

interface ResumeBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeBuilderModal: React.FC<ResumeBuilderModalProps> = ({ isOpen, onClose }) => {
  const [resume, setResume] = useState<UserResume>(StorageService.getUserResume());
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    StorageService.saveUserResume(resume);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const formattedText = `
${resume.fullName.toUpperCase()}
${resume.title} | ${resume.location}
Email: ${resume.email} | Phone: ${resume.phone}
GitHub: ${resume.githubUrl} | Portfolio: ${resume.portfolioUrl}

TECHNICAL SKILLS
--------------------------------------------------
${resume.skills.join(' • ')}

PROFESSIONAL SUMMARY
--------------------------------------------------
${resume.summary}

KEY DEVELOPER PROJECTS
--------------------------------------------------
${resume.projects.map(p => `${p.name.toUpperCase()} [${p.tech}]\n- ${p.description}\nSource: ${p.githubLink || 'N/A'}\n`).join('\n')}

EDUCATION & CERTIFICATIONS
--------------------------------------------------
${resume.education.map(e => `${e.degree} — ${e.institution} (${e.year})`).join('\n')}
  `.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md p-4 flex items-center justify-center animate-fade-in">
      <div className="relative w-full max-w-4xl glass-panel rounded-2xl p-6 sm:p-8 border border-cyan-500/30 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-heading text-slate-100">Interactive ATS Developer Resume Builder</h2>
              <p className="text-xs text-slate-400">Generate clean markdown resume formatted for tech recruiters & ATS screeners.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inputs vs Live Text Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Edit Form */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Full Name</label>
              <input
                type="text"
                value={resume.fullName}
                onChange={(e) => setResume({ ...resume, fullName: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Professional Title</label>
              <input
                type="text"
                value={resume.title}
                onChange={(e) => setResume({ ...resume, title: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-400 mb-1">Email</label>
                <input
                  type="text"
                  value={resume.email}
                  onChange={(e) => setResume({ ...resume, email: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Phone</label>
                <input
                  type="text"
                  value={resume.phone}
                  onChange={(e) => setResume({ ...resume, phone: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Professional Summary</label>
              <textarea
                value={resume.summary}
                onChange={(e) => setResume({ ...resume, summary: e.target.value })}
                className="w-full h-24 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 leading-relaxed resize-none"
              />
            </div>
          </div>

          {/* Live Formatting Output */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300 overflow-y-auto max-h-[500px] whitespace-pre-wrap leading-relaxed">
            {formattedText}
          </div>

        </div>

        {/* Modal Toolbar */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white font-bold text-xs"
          >
            <Save className="w-4 h-4 text-cyan-400" />
            <span>{saved ? 'Saved!' : 'Save Progress'}</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Formatted Resume Text'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
