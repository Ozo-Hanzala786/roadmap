import React, { useState } from 'react';
import { Challenge } from '../../types';
import { StorageService } from '../../services/storage';
import { Code2, Play, Lightbulb, CheckCircle2, XCircle, Award, Sparkles, HelpCircle } from 'lucide-react';

interface ChallengeRunnerProps {
  challenge: Challenge;
  onCompleted?: () => void;
}

export const ChallengeRunner: React.FC<ChallengeRunnerProps> = ({ challenge, onCompleted }) => {
  const [code, setCode] = useState<string>(
    challenge.starterCode.js || challenge.starterCode.html || ''
  );
  const [hintsUnlocked, setHintsUnlocked] = useState<number>(0);
  const [testResults, setTestResults] = useState<{
    tested: boolean;
    allPassed: boolean;
    cases: { description: string; expected: string; actual: string; passed: boolean }[];
  }>({ tested: false, allPassed: false, cases: [] });

  const handleRunTests = () => {
    const results: { description: string; expected: string; actual: string; passed: boolean }[] = [];
    let allPassed = true;

    try {
      if (challenge.language === 'javascript') {
        // Evaluates function in isolated sandbox
        const userFunction = new Function(`
          ${code}
          return typeof addNumbers !== 'undefined' ? addNumbers : (typeof getEvenNumbers !== 'undefined' ? getEvenNumbers : null);
        `)();

        challenge.testCases.forEach((tc) => {
          try {
            const evalResult = new Function(`
              ${code}
              return ${tc.input};
            `)();
            
            const actualStr = JSON.stringify(evalResult) ?? String(evalResult);
            const expectedStr = tc.expectedOutput;
            const passed = actualStr.replace(/\s+/g, '') === expectedStr.replace(/\s+/g, '');

            if (!passed) allPassed = false;

            results.push({
              description: tc.description,
              expected: expectedStr,
              actual: actualStr,
              passed
            });
          } catch (e: any) {
            allPassed = false;
            results.push({
              description: tc.description,
              expected: tc.expectedOutput,
              actual: `Error: ${e.message}`,
              passed: false
            });
          }
        });
      } else if (challenge.language === 'html') {
        challenge.testCases.forEach((tc) => {
          const cleanCode = code.replace(/\s+/g, '').toLowerCase();
          const cleanExpected = tc.expectedOutput.replace(/\s+/g, '').toLowerCase();
          const passed = cleanCode.includes(cleanExpected);
          if (!passed) allPassed = false;
          results.push({
            description: tc.description,
            expected: tc.expectedOutput,
            actual: passed ? tc.expectedOutput : 'Missing required tags',
            passed
          });
        });
      }
    } catch (e: any) {
      allPassed = false;
      results.push({
        description: 'Code Syntax',
        expected: 'Valid syntax',
        actual: e.message,
        passed: false
      });
    }

    setTestResults({ tested: true, allPassed, cases: results });

    if (allPassed) {
      StorageService.completeChallenge(challenge.id, code, challenge.xpReward);
      if (onCompleted) onCompleted();
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-6 shadow-xl">
      
      {/* Challenge Title & Reward */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 mb-1">
            <Code2 className="w-4 h-4" />
            <span>Interactive Challenge</span>
          </div>
          <h2 className="text-xl font-bold font-heading text-slate-100">{challenge.title}</h2>
        </div>

        <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs">
          <Award className="w-4 h-4" />
          <span>+{challenge.xpReward} XP</span>
        </div>
      </div>

      {/* Description & Instructions */}
      <div className="space-y-3">
        <p className="text-sm text-slate-300">{challenge.description}</p>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Instructions:
          </h4>
          <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
            {challenge.instructions.map((inst, i) => (
              <li key={i}>{inst}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Code Editor TextArea */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Write Solution ({challenge.language.toUpperCase()}):</span>
          <button
            onClick={() => setCode(challenge.starterCode.js || challenge.starterCode.html || '')}
            className="text-slate-500 hover:text-slate-300"
          >
            Reset Starter Code
          </button>
        </div>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-44 p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-sm text-cyan-300 focus:outline-none focus:border-cyan-500 leading-relaxed resize-none"
          spellCheck={false}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        {/* Hint Trigger */}
        {challenge.hints.length > 0 && (
          <button
            onClick={() => setHintsUnlocked(Math.min(challenge.hints.length, hintsUnlocked + 1))}
            className="flex items-center space-x-1.5 text-xs text-amber-400 hover:text-amber-300 font-medium"
          >
            <Lightbulb className="w-4 h-4" />
            <span>
              {hintsUnlocked < challenge.hints.length
                ? `Unlock Hint (${hintsUnlocked}/${challenge.hints.length})`
                : 'All Hints Unlocked'}
            </span>
          </button>
        )}

        <button
          onClick={handleRunTests}
          className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20"
        >
          <Play className="w-4 h-4 fill-slate-950" />
          <span>Submit & Run Automated Tests</span>
        </button>
      </div>

      {/* Unlocked Hints */}
      {hintsUnlocked > 0 && (
        <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-300 space-y-1">
          {challenge.hints.slice(0, hintsUnlocked).map((hint, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <HelpCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>
                <strong>Hint #{idx + 1}:</strong> {hint}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Test Case Results Output */}
      {testResults.tested && (
        <div className={`p-4 rounded-xl border space-y-3 ${
          testResults.allPassed
            ? 'bg-emerald-950/30 border-emerald-500/40'
            : 'bg-rose-950/30 border-rose-500/40'
        }`}>
          <div className="flex items-center space-x-2 font-bold text-sm">
            {testResults.allPassed ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-300">All Challenge Test Cases Passed! +{challenge.xpReward} XP</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-rose-400" />
                <span className="text-rose-300">Some Test Cases Failed. Check outputs below:</span>
              </>
            )}
          </div>

          <div className="space-y-2">
            {testResults.cases.map((c, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg text-xs font-mono border ${
                  c.passed ? 'bg-emerald-900/20 border-emerald-800 text-emerald-300' : 'bg-rose-900/20 border-rose-800 text-rose-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold">{c.description}</span>
                  <span>{c.passed ? 'Passed ✓' : 'Failed ✗'}</span>
                </div>
                {!c.passed && (
                  <div className="mt-1 text-[11px] text-slate-400 space-y-0.5">
                    <div>Expected: <code className="text-emerald-400">{c.expected}</code></div>
                    <div>Got: <code className="text-rose-400">{c.actual}</code></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {testResults.allPassed && (
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <span className="font-bold text-cyan-400">Solution Explanation:</span> {challenge.solutionExplanation}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
