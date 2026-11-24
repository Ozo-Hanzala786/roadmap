import React, { useState } from 'react';
import { QuizQuestion } from '../../types';
import { StorageService } from '../../services/storage';
import { HelpCircle, CheckCircle2, XCircle, Award, Sparkles, ArrowRight } from 'lucide-react';

interface QuizWidgetProps {
  questions: QuizQuestion[];
  topicId: string;
  onCompleted?: () => void;
}

export const QuizWidget: React.FC<QuizWidgetProps> = ({ questions, topicId, onCompleted }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  if (!questions || questions.length === 0) return null;

  const currentQ = questions[currentIndex];
  const isCorrect = selectedOption === currentQ.correctAnswer;

  const handleSelectOption = (index: number) => {
    if (submitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setSubmitted(true);
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setSubmitted(false);
    } else {
      const finalPercentage = Math.round(((score + (isCorrect ? 1 : 0)) / questions.length) * 100);
      StorageService.saveQuizScore(topicId, finalPercentage);
      if (onCompleted) onCompleted();
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-6 shadow-xl">
      
      {/* Quiz Progress & Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
          <HelpCircle className="w-4 h-4" />
          <span>Knowledge Check ({currentIndex + 1} of {questions.length})</span>
        </div>
        <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold border border-cyan-500/30">
          <Award className="w-3.5 h-3.5" />
          <span>+30 XP Quiz</span>
        </div>
      </div>

      {/* Question Text */}
      <div>
        <h3 className="text-lg font-bold font-heading text-slate-100">{currentQ.question}</h3>
        {currentQ.codeSnippet && (
          <pre className="mt-3 p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-amber-300 overflow-x-auto">
            <code>{currentQ.codeSnippet}</code>
          </pre>
        )}
      </div>

      {/* Options Grid */}
      <div className="space-y-3">
        {currentQ.options.map((optionText, index) => {
          let optionStyle = 'bg-slate-900/80 border-slate-800 text-slate-200 hover:border-slate-700';

          if (selectedOption === index) {
            optionStyle = 'bg-cyan-500/20 border-cyan-400 text-slate-100 shadow-md shadow-cyan-500/10';
          }

          if (submitted) {
            if (index === currentQ.correctAnswer) {
              optionStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-bold';
            } else if (selectedOption === index) {
              optionStyle = 'bg-rose-950/40 border-rose-500 text-rose-300';
            }
          }

          return (
            <div
              key={index}
              onClick={() => handleSelectOption(index)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-sm ${optionStyle}`}
            >
              <div className="flex items-center space-x-3">
                <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono font-bold flex items-center justify-center text-slate-300">
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{optionText}</span>
              </div>

              {submitted && (
                index === currentQ.correctAnswer ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : selectedOption === index ? (
                  <XCircle className="w-5 h-5 text-rose-400" />
                ) : null
              )}
            </div>
          );
        })}
      </div>

      {/* Rationale Explanation on Submission */}
      {submitted && (
        <div className={`p-4 rounded-xl border space-y-2 text-xs ${
          isCorrect ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300' : 'bg-rose-950/20 border-rose-500/30 text-rose-300'
        }`}>
          <div className="font-bold text-sm">
            {isCorrect ? 'Correct! 🎉' : 'Not quite right!'}
          </div>
          <p className="leading-relaxed">{currentQ.explanation}</p>
        </div>
      )}

      {/* Controls */}
      <div className="flex justify-end pt-2">
        {!submitted ? (
          <button
            disabled={selectedOption === null}
            onClick={handleSubmitAnswer}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs transition ${
              selectedOption === null
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20'
            }`}
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20"
          >
            <span>{currentIndex < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

    </div>
  );
};
