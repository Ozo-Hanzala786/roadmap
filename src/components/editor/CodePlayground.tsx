import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Copy, Terminal, Eye, Code, Sparkles, Check, Layers } from 'lucide-react';

export const CodePlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [htmlCode, setHtmlCode] = useState<string>(
    `<div className="card">
  <h1>Hello Developers! 👋</h1>
  <p>Welcome to the CodePath Interactive Playground.</p>
  <button id="demo-btn">Click Me!</button>
</div>`
  );
  const [cssCode, setCssCode] = useState<string>(
    `body {
  background-color: #0f172a;
  color: #f8fafc;
  font-family: system-ui, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.card {
  background: rgba(30, 41, 59, 0.8);
  padding: 2.5rem;
  border-radius: 1rem;
  border: 1px solid rgba(6, 182, 212, 0.3);
  text-align: center;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
}

button {
  background: linear-gradient(135deg, #06b6d4, #6366f1);
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: transform 0.2s;
}

button:hover {
  transform: scale(1.05);
}`
  );
  const [jsCode, setJsCode] = useState<string>(
    `const button = document.getElementById('demo-btn');
let count = 0;

if (button) {
  button.addEventListener('click', () => {
    count++;
    console.log("Button clicked!", count, "times");
    button.textContent = \`Clicked \${count} times! 🎉\`;
  });
}

console.log("CodePath Playground Ready!");`
  );

  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [previewSrc, setPreviewSrc] = useState<string>('');

  const generatePreview = () => {
    setConsoleLogs([]);
    const src = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode}
          <script>
            (function() {
              const oldLog = console.log;
              const oldError = console.error;
              console.log = function(...args) {
                oldLog.apply(console, args);
                window.parent.postMessage({ type: 'CONSOLE_LOG', data: args.join(' ') }, '*');
              };
              console.error = function(...args) {
                oldError.apply(console, args);
                window.parent.postMessage({ type: 'CONSOLE_ERROR', data: args.join(' ') }, '*');
              };
              window.onerror = function(msg, url, line) {
                window.parent.postMessage({ type: 'CONSOLE_ERROR', data: msg + ' (Line ' + line + ')' }, '*');
              };
            })();
            try {
              ${jsCode}
            } catch(err) {
              console.error(err.message);
            }
          </script>
        </body>
      </html>
    `;
    setPreviewSrc(src);
  };

  useEffect(() => {
    generatePreview();
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'CONSOLE_LOG') {
        setConsoleLogs(prev => [...prev, `[LOG]: ${event.data.data}`]);
      } else if (event.data?.type === 'CONSOLE_ERROR') {
        setConsoleLogs(prev => [...prev, `[ERR]: ${event.data.data}`]);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleCopy = () => {
    const fullCode = `<!-- HTML -->\n${htmlCode}\n\n/* CSS */\n${cssCode}\n\n// JS\n${jsCode}`;
    navigator.clipboard.writeText(fullCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadPreset = (preset: 'card' | 'js-array' | 'flex') => {
    if (preset === 'card') {
      setHtmlCode(`<div class="box">\n  <h2>Interactive Counter</h2>\n  <button id="btn">Increment</button>\n</div>`);
      setCssCode(`.box { padding: 2rem; background: #1e293b; color: #fff; text-align: center; border-radius: 12px; }`);
      setJsCode(`let c=0;\ndocument.getElementById('btn').onclick = () => console.log('Count:', ++c);`);
    } else if (preset === 'js-array') {
      setHtmlCode(`<div style="color:white; padding: 1rem;">Check the Output Console below!</div>`);
      setCssCode(`body { background: #090d16; }`);
      setJsCode(`const numbers = [1, 2, 3, 4, 5, 6, 7, 8];\nconst evens = numbers.filter(n => n % 2 === 0);\nconsole.log("Evens:", evens);\nconst doubled = evens.map(n => n * 2);\nconsole.log("Doubled Evens:", doubled);`);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 glass-panel p-6 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Web Playground</span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-slate-100">
            HTML, CSS & JavaScript Code Sandbox
          </h1>
          <p className="text-xs text-slate-400">Write frontend code and see live preview output instantly.</p>
        </div>

        {/* Preset & Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => loadPreset('card')}
              className="px-2.5 py-1 text-xs text-slate-300 hover:text-cyan-400"
            >
              Preset: Card
            </button>
            <button
              onClick={() => loadPreset('js-array')}
              className="px-2.5 py-1 text-xs text-slate-300 hover:text-cyan-400"
            >
              Preset: JS Array
            </button>
          </div>

          <button
            onClick={generatePreview}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>Run Code</span>
          </button>

          <button
            onClick={handleCopy}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            title="Copy all code"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Grid: Code Editors & Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[600px]">
        
        {/* Left: Code Editor Container */}
        <div className="glass-panel rounded-2xl border border-slate-800 flex flex-col overflow-hidden shadow-2xl">
          
          {/* Tabs */}
          <div className="flex items-center justify-between bg-slate-900/90 px-4 py-2 border-b border-slate-800">
            <div className="flex space-x-1">
              {(['html', 'css', 'js'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition ${
                    activeTab === tab
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <span className="text-[11px] font-mono text-slate-500">Live Editor</span>
          </div>

          {/* Text Area Code Inputs */}
          <div className="flex-1 p-4 bg-slate-950">
            {activeTab === 'html' && (
              <textarea
                value={htmlCode}
                onChange={(e) => setHtmlCode(e.target.value)}
                className="w-full h-full min-h-[400px] bg-transparent font-mono text-sm text-cyan-300 focus:outline-none resize-none leading-relaxed"
                placeholder="Write HTML markup here..."
                spellCheck={false}
              />
            )}
            {activeTab === 'css' && (
              <textarea
                value={cssCode}
                onChange={(e) => setCssCode(e.target.value)}
                className="w-full h-full min-h-[400px] bg-transparent font-mono text-sm text-indigo-300 focus:outline-none resize-none leading-relaxed"
                placeholder="Write CSS styling rules here..."
                spellCheck={false}
              />
            )}
            {activeTab === 'js' && (
              <textarea
                value={jsCode}
                onChange={(e) => setJsCode(e.target.value)}
                className="w-full h-full min-h-[400px] bg-transparent font-mono text-sm text-amber-300 focus:outline-none resize-none leading-relaxed"
                placeholder="Write JavaScript code here..."
                spellCheck={false}
              />
            )}
          </div>
        </div>

        {/* Right: Live Preview & Virtual Console */}
        <div className="flex flex-col space-y-4">
          
          {/* Output Preview Iframe */}
          <div className="glass-panel rounded-2xl border border-slate-800 flex-1 overflow-hidden flex flex-col min-h-[350px]">
            <div className="bg-slate-900/90 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center space-x-1.5">
                <Eye className="w-4 h-4 text-cyan-400" />
                <span>Live Browser Output</span>
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>

            <div className="flex-1 bg-slate-950 p-2">
              <iframe
                title="Code Preview"
                srcDoc={previewSrc}
                className="w-full h-full min-h-[300px] rounded-xl border border-slate-800 bg-slate-900"
                sandbox="allow-scripts"
              />
            </div>
          </div>

          {/* Console Logger */}
          <div className="glass-panel rounded-xl border border-slate-800 h-48 flex flex-col overflow-hidden">
            <div className="bg-slate-900/90 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center space-x-1.5">
                <Terminal className="w-4 h-4 text-amber-400" />
                <span>JavaScript Virtual Console Output</span>
              </span>
              <button
                onClick={() => setConsoleLogs([])}
                className="text-[11px] text-slate-500 hover:text-slate-300"
              >
                Clear
              </button>
            </div>

            <div className="p-3 bg-slate-950 font-mono text-xs overflow-y-auto flex-1 space-y-1">
              {consoleLogs.length === 0 ? (
                <div className="text-slate-600 italic">No console messages logged yet. Call console.log() in JS!</div>
              ) : (
                consoleLogs.map((log, i) => (
                  <div
                    key={i}
                    className={log.startsWith('[ERR]') ? 'text-rose-400 font-bold' : 'text-slate-300'}
                  >
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
