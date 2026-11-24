import React, { useState } from 'react';
import { Lesson, UserProgress } from '../../types';
import { StorageService } from '../../services/storage';
import { QuizWidget } from './QuizWidget';
import { ChallengeRunner } from '../editor/ChallengeRunner';
import { 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  Bookmark, 
  ArrowRight, 
  ArrowLeft, 
  Code2, 
  Sparkles, 
  Copy, 
  Check, 
  Award 
} from 'lucide-react';

interface LessonReaderProps {
  lesson: Lesson;
  userProgress: UserProgress;
  onBackToRoadmap: () => void;
  onNextLesson?: (lessonId: string) => void;
  onUpdateProgress: () => void;
}

export const LessonReader: React.FC<LessonReaderProps> = ({
  lesson,
  userProgress,
  onBackToRoadmap,
  onNextLesson,
  onUpdateProgress
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const isCompleted = userProgress.completedLessonIds.includes(lesson.id);
  const isBookmarked = userProgress.bookmarkedLessonIds.includes(lesson.id);

  const handleComplete = () => {
    StorageService.completeLesson(lesson.id, lesson.topicId);
    onUpdateProgress();
  };

  const handleToggleBookmark = () => {
    StorageService.toggleBookmark(lesson.id);
    onUpdateProgress();
  };

  const handleCopyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToRoadmap}
          className="flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Roadmap</span>
        </button>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleToggleBookmark}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
              isBookmarked
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
            <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>

          {isCompleted && (
            <span className="flex items-center space-x-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
              <CheckCircle2 className="w-4 h-4" />
              <span>Completed</span>
            </span>
          )}
        </div>
      </div>

      {/* Lesson Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center space-x-3 text-xs text-slate-400 font-mono">
          <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold uppercase">
            Lesson
          </span>
          <span className="flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>{lesson.durationMinutes} mins read</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-100">
          {lesson.title}
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">{lesson.description}</p>

        {/* Objective Box */}
        <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex items-start space-x-3 text-xs text-cyan-300">
          <Sparkles className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-cyan-200">Lesson Objective:</strong> {lesson.objective}
          </div>
        </div>
      </div>

      {/* Lesson Body Content */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6 text-slate-200 text-sm leading-relaxed">
        <div className="prose prose-invert max-w-none space-y-4">
          {lesson.contentMarkdown.split('\n\n').map((paragraph, i) => {
            if (paragraph.startsWith('# ')) {
              return <h2 key={i} className="text-2xl font-bold font-heading text-slate-100 pt-4 pb-2 border-b border-slate-800">{paragraph.replace('# ', '')}</h2>;
            }
            if (paragraph.startsWith('### ')) {
              return <h3 key={i} className="text-lg font-bold font-heading text-cyan-400 pt-2">{paragraph.replace('### ', '')}</h3>;
            }
            return <p key={i} className="text-slate-300 leading-relaxed">{paragraph}</p>;
          })}
        </div>

        {/* Code Examples Section */}
        {lesson.codeExamples.length > 0 && (
          <div className="space-y-6 pt-4">
            <h3 className="text-lg font-bold font-heading text-slate-100 flex items-center space-x-2">
              <Code2 className="w-5 h-5 text-cyan-400" />
              <span>Interactive Code Examples</span>
            </h3>

            {lesson.codeExamples.map((example, idx) => (
              <div key={idx} className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden">
                <div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-slate-800 text-xs font-mono">
                  <span className="text-cyan-400 font-bold">{example.title}</span>
                  <button
                    onClick={() => handleCopyCode(example.code, idx)}
                    className="flex items-center space-x-1 text-slate-400 hover:text-slate-200"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="p-4 font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed">
                  <code>{example.code}</code>
                </pre>

                {example.explanation && (
                  <div className="p-3 bg-slate-900/60 border-t border-slate-800 text-xs text-slate-400">
                    💡 <strong>Note:</strong> {example.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quizzes Section */}
      {lesson.quizzes.length > 0 && (
        <QuizWidget
          questions={lesson.quizzes}
          topicId={lesson.topicId}
          onCompleted={() => {
            handleComplete();
          }}
        />
      )}

      {/* Challenges Section */}
      {lesson.challenges.length > 0 && (
        <div className="space-y-4">
          {lesson.challenges.map((ch) => (
            <ChallengeRunner
              key={ch.id}
              challenge={ch}
              onCompleted={() => {
                handleComplete();
              }}
            />
          ))}
        </div>
      )}

      {/* Bottom Summary & Mark Complete CTA */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-100 text-base">Lesson Summary</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">{lesson.summary}</p>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          {!isCompleted ? (
            <button
              onClick={handleComplete}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 transition"
            >
              <Award className="w-4 h-4" />
              <span>Mark Lesson Complete (+50 XP)</span>
            </button>
          ) : (
            lesson.nextLessonId && onNextLesson && (
              <button
                onClick={() => onNextLesson(lesson.nextLessonId!)}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 transition"
              >
                <span>Continue to Next Lesson</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )
          )}
        </div>
      </div>

    </div>
  );
};
