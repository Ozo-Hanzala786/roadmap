import React, { useEffect, useState } from 'react';
import { Award, Sparkles, TrendingUp, X } from 'lucide-react';

export interface XPToastData {
  id: string;
  xpAmount: number;
  message: string;
  leveledUp?: boolean;
  newLevel?: number;
}

interface XPToastProps {
  toasts: XPToastData[];
  onDismiss: (id: string) => void;
}

export const XPToast: React.FC<XPToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 items-end pointer-events-none">
      {toasts.map((toast) => (
        <XPToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const XPToastItem: React.FC<{ toast: XPToastData; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss,
}) => {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const enterTimer = setTimeout(() => setVisible(true), 10);
    // Auto-dismiss after 4s
    const dismissTimer = setTimeout(() => {
      setLeaving(true);
      setTimeout(() => onDismiss(toast.id), 400);
    }, 4000);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(dismissTimer);
    };
  }, [toast.id, onDismiss]);

  const handleClose = () => {
    setLeaving(true);
    setTimeout(() => onDismiss(toast.id), 400);
  };

  return (
    <div
      className="pointer-events-auto"
      style={{
        opacity: visible && !leaving ? 1 : 0,
        transform: visible && !leaving ? 'translateX(0) scale(1)' : 'translateX(60px) scale(0.9)',
        transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      {toast.leveledUp ? (
        /* Level Up Variant */
        <div className="relative flex items-center space-x-4 px-5 py-4 rounded-2xl border-2 border-amber-400/60 shadow-2xl shadow-amber-500/30 overflow-hidden min-w-[300px]"
          style={{
            background: 'linear-gradient(135deg, rgba(120, 53, 15, 0.95) 0%, rgba(30, 41, 59, 0.98) 100%)',
            backdropFilter: 'blur(16px)',
          }}
        >
          {/* Shimmer background */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent -skew-x-12 animate-shimmer" />

          <div className="relative w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/50">
            <TrendingUp className="w-7 h-7 text-white" />
          </div>

          <div className="relative flex-1">
            <div className="flex items-center space-x-1 mb-0.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest">LEVEL UP!</span>
            </div>
            <div className="text-lg font-extrabold text-white font-heading">
              You reached Level {toast.newLevel}!
            </div>
            <div className="text-xs text-amber-200/80 mt-0.5">+{toast.xpAmount} XP earned — {toast.message}</div>
          </div>

          <button
            onClick={handleClose}
            className="relative text-slate-400 hover:text-white transition p-1"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Bottom progress indicator */}
          <div className="absolute bottom-0 left-0 h-0.5 bg-amber-400/60 animate-shrink-bar" />
        </div>
      ) : (
        /* XP Earned Variant */
        <div className="relative flex items-center space-x-4 px-5 py-3.5 rounded-2xl border border-cyan-500/40 shadow-2xl shadow-cyan-500/20 overflow-hidden min-w-[260px]"
          style={{
            background: 'linear-gradient(135deg, rgba(8, 47, 73, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div className="relative w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0">
            <Award className="w-5 h-5 text-cyan-400" />
          </div>

          <div className="flex-1">
            <div className="text-sm font-bold text-slate-100">{toast.message}</div>
            <div className="flex items-center space-x-1 mt-0.5">
              <span className="text-xl font-extrabold text-cyan-400 font-mono">+{toast.xpAmount}</span>
              <span className="text-xs text-cyan-300/70 font-semibold">XP</span>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="text-slate-500 hover:text-slate-300 transition p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="absolute bottom-0 left-0 h-0.5 bg-cyan-500/50 animate-shrink-bar" />
        </div>
      )}
    </div>
  );
};
