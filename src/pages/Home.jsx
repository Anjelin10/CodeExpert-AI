import React, { useState } from 'react';
import Header from '../components/Header';
import { LuFileCode } from "react-icons/lu";
import Editor from '@monaco-editor/react';
import { IoSearchSharp } from 'react-icons/io5';

export default function Home() {
  const [level, setLevel] = useState('Intermediate');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [errorMessage, setErrorMessage] = useState('');

  const [features, setFeatures] = useState({
    explainCause: false,
    suggestFix: false,
    correctedCode: false,
  });

  const languagesList = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
  ];

  const handleFeatureChange = (feature) => {
    setFeatures((prev) => ({
      ...prev,
      [feature]: !prev[feature],
    }));
  };

  const handleClear = () => {
    setCode('');
    setErrorMessage('');
    setFeatures({
      explainCause: false,
      suggestFix: false,
      correctedCode: false,
    });
    setLevel('Intermediate');
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-[#F4F4F5] pb-10">
      <Header />
      <main className="px-4 py-5 md:px-6 lg:px-8">
        <div className="mb-5">
          <h1 className="text-2xl font-semibold tracking-tight text-[#F4F4F5]">Debug your code</h1>
          <p className="mt-1.5 text-xs text-[#A1A1AA]">Paste your code and error details to understand what went wrong.</p>
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
          
          {/* ================= LEFT PANEL ================= */}
          <section className="min-w-0">
            <div className="overflow-hidden rounded-lg border border-[#27272A] bg-[#18181B]">
              <div className="flex h-10 items-center justify-between border-b border-[#27272A] bg-[#27272A] px-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg text-[#A1A1AA]">
                    <LuFileCode />
                  </span>
                  <span className="text-xs font-medium text-[#D4D4D8]">
                    Your Code
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[#71717A]">
                    Language:
                  </span>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="cursor-pointer border-none bg-transparent text-[11px] text-[#D4D4D8] outline-none"
                  >
                    {languagesList.map((lang) => (
                      <option
                        key={lang.value}
                        value={lang.value}
                        className="bg-[#18181B] text-[#F4F4F5]"
                      >
                        {lang.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Monaco Editor */}
              <div className="h-70 w-full bg-[#18181B]">
                <Editor
                  height="100%"
                  width="100%"
                  theme="vs-dark"
                  language={language}
                  value={code}
                  onChange={(newValue) => setCode(newValue || '')}
                  options={{
                    fontSize: 12,
                    minimap: {
                      enabled: false,
                    },
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                    lineNumbers: 'on',
                    wordWrap: 'on',
                    padding: {
                      top: 10,
                      bottom: 10,
                    },
                    fontFamily:
                      'Consolas, "Courier New", monospace',
                  }}
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-[11px] font-medium text-[#A1A1AA]">Error Message / Trace</label>
              <textarea
                value={errorMessage}
                onChange={(e) => setErrorMessage(e.target.value)}
                placeholder="Paste your error log or console traceback..."
                className="h-25 w-full resize-none rounded-lg border border-[#27272A] bg-[#18181B] px-3 py-3 text-xs text-[#D4D4D8] outline-none placeholder:text-[#52525B] focus:border-[#52525B]"
              />
            </div>

            <div className="mt-4 rounded-lg border border-[#27272A] bg-[#18181B] p-3">
              <div>
                <p className="mb-3 text-[11px] font-medium text-[#A1A1AA]">Explanation Level</p>
                <div className="flex items-center gap-4">
                  {['Beginner', 'Intermediate', 'Advanced'].map(
                    (option) => (
                      <label key={option} className="flex cursor-pointer items-center gap-2 text-[11px] text-[#A1A1AA]">
                        <input
                          type="radio"
                          name="level"
                          value={option}
                          checked={level === option}
                          onChange={(e) => setLevel(e.target.value)}
                          className="h-3 w-3 accent-[#8B5CF6]"
                        />
                        <span
                          className={
                            level === option
                              ? 'text-[#E4E4E7]'
                              : 'text-[#71717A]'
                          }
                        >
                          {option}
                        </span>
                      </label>
                    )
                  )}
                </div>
              </div>

              <div className="my-3 border-t border-[#27272A]" />

              <div>
                <p className="mb-3 text-[11px] font-medium text-[#A1A1AA]">Features</p>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                  <FeatureToggle
                    label="Explain the cause"
                    checked={features.explainCause}
                    onChange={() => handleFeatureChange('explainCause')}
                  />
                  <FeatureToggle
                    label="Suggest a fix"
                    checked={features.suggestFix}
                    onChange={() => handleFeatureChange('suggestFix')}
                  />
                  <FeatureToggle
                    label="Show corrected code"
                    checked={features.correctedCode}
                    onChange={() => handleFeatureChange('correctedCode')}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                className="flex h-8 flex-1 items-center justify-center gap-2 rounded-md bg-[#8B5CF6] text-xs font-medium text-white transition hover:bg-[#7C3AED] active:scale-[0.99]"
              >
                <span className="text-[11px]"><IoSearchSharp /></span>
                Analyze Bug
              </button>

              <button
                type="button"
                onClick={handleClear}
                className="h-8 rounded-md border border-[#27272A] bg-[#18181B] px-4 text-xs text-[#A1A1AA] transition hover:bg-[#27272A] hover:text-[#F4F4F5]"
              >
                Clear
              </button>
            </div>
          </section>

          {/* ================= RIGHT PANEL ================= */}
          <section className="min-w-0">
            <div className="flex h-full min-h-100 items-center justify-center rounded-lg border border-[#27272A] bg-[#18181B]">
              <div className="flex flex-col items-center justify-center px-6 text-center">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#27272A]">
                 <IoSearchSharp />
                </div>
                <h2 className="text-xs font-semibold text-[#E4E4E7]">Ready to analyze</h2>
                <p className="mt-2 max-w-150 text-[10px] leading-4 text-[#71717A]">Your debugging insights and recommended adjustments will appear here.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}


function FeatureToggle({ label, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center gap-2">
      <button
        type="button"
        onClick={onChange}
        aria-pressed={checked}
        className={`relative h-[13px] w-[25px] rounded-full transition cursor-pointer ${
          checked ? 'bg-[#8B5CF6]' : 'bg-[#3F3F46]'
        }`}
      >
        <span
          className={`absolute top-[2px] h-[9px] w-[9px] rounded-full cursor-pointer bg-white transition-all ${
            checked ? 'left-[14px]' : 'left-[2px]'
          }`}
        />
      </button>
      <span className="text-[10px] text-[#71717A]">
        {label}
      </span>
    </label>
  );
}