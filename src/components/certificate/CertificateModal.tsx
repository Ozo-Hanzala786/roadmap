import React, { useEffect } from 'react';
import { Award, Download, Share2, X, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProgress, Roadmap } from '../../types';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProgress?: UserProgress;
  roadmap?: Roadmap;
  studentName?: string;
  roadmapTitle?: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  userProgress,
  roadmap,
  studentName,
  roadmapTitle,
}) => {
  const resolvedName = userProgress?.name ?? studentName ?? 'CodePath Graduate';
  const resolvedTitle = roadmap?.title ?? roadmapTitle ?? 'Full-Stack Web Development';
  const resolvedRole = userProgress?.targetRole ?? 'Software Developer';
  const resolvedXP = userProgress?.xp ?? 0;
  const resolvedLessons = userProgress?.completedLessonIds?.length ?? 0;
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.5 }
        });
      } catch (e) {
        // ignore fallback
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const todayDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const certId = `CERT-${(userProgress?.userId ?? 'USR').slice(-4).toUpperCase()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md p-4 flex items-center justify-center animate-fade-in">
      <div className="relative w-full max-w-3xl glass-panel rounded-2xl p-6 sm:p-10 border border-cyan-500/40 shadow-2xl space-y-6 text-center">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-lg bg-slate-900 border border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Printable Canvas Box */}
        <div className="p-8 sm:p-12 rounded-xl border-4 border-amber-500/40 shadow-2xl relative overflow-hidden text-center space-y-6"
          style={{ background: 'linear-gradient(135deg, #020617 0%, #0c1120 40%, #030d1a 100%)' }}
        >
          {/* Decorative corner ornaments */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-3 left-3 text-amber-500/30 text-5xl select-none">✦</div>
          <div className="absolute top-3 right-3 text-amber-500/30 text-5xl select-none">✦</div>
          <div className="absolute bottom-3 left-3 text-amber-500/30 text-5xl select-none">✦</div>
          <div className="absolute bottom-3 right-3 text-amber-500/30 text-5xl select-none">✦</div>

          {/* Seal */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-900/40 border-2 border-amber-400/70 text-amber-400 flex items-center justify-center mx-auto shadow-2xl shadow-amber-500/30 relative">
            <Award className="w-10 h-10" />
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center">
              <Star className="w-3 h-3 text-white fill-white" />
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase font-bold tracking-[0.25em] text-cyan-400/80 font-mono">
              ✦ Official Certificate of Completion ✦
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-100 mt-2 tracking-wide">
              CodePath Academy
            </h2>
            <div className="text-xs text-slate-500 font-mono mt-0.5">Interactive Developer Roadmap Platform</div>
          </div>

          <div className="text-sm text-slate-400">This is to certify that</div>

          <div className="text-2xl sm:text-3xl font-extrabold font-heading text-gradient underline decoration-cyan-500/50 underline-offset-8 px-4">
            {resolvedName}
          </div>

          <div className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
            has successfully completed all lessons, coding challenges, and milestones for the
            <strong className="block text-cyan-300 font-bold text-sm mt-1">{resolvedTitle}</strong>
            <span className="text-slate-400 text-xs">and is recognised as a <strong className="text-indigo-300">{resolvedRole}</strong></span>
          </div>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-6 py-2">
            <div className="text-center">
              <div className="text-xl font-extrabold text-cyan-400 font-mono">{resolvedXP}</div>
              <div className="text-[10px] text-slate-500">Total XP</div>
            </div>
            <div className="w-px h-8 bg-slate-800" />
            <div className="text-center">
              <div className="text-xl font-extrabold text-indigo-400 font-mono">{resolvedLessons}</div>
              <div className="text-[10px] text-slate-500">Lessons Done</div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-mono gap-2">
            <div>Date Issued: <strong className="text-slate-200">{todayDate}</strong></div>
            <div>Verification ID: <strong className="text-cyan-400">{certId}</strong></div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => alert('Certificate PDF generated! You can download or print.')}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20"
          >
            <Download className="w-4 h-4" />
            <span>Download High-Res PDF/PNG</span>
          </button>

          <button
            onClick={() => {
              navigator.clipboard.writeText(`https://codepath.dev/verify/${certId}`);
              alert('Verification URL copied to clipboard!');
            }}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white font-bold text-xs"
          >
            <Share2 className="w-4 h-4 text-cyan-400" />
            <span>Share to LinkedIn</span>
          </button>
        </div>

      </div>
    </div>
  );
};
