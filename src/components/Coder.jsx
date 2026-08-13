import React, { useState, useEffect } from 'react'
import { LuFileCode } from "react-icons/lu";
import Editor from '@monaco-editor/react';
import { IoSearchSharp } from 'react-icons/io5';

export default function Coder({ onAnalyze, onClearAnalyzer, initialData }) {
    const [level, setLevel] = useState('Intermediate');
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('javascript');
    const [errorMessage, setErrorMessage] = useState('');
    const [features, setFeatures] = useState({
        explainCause: false,
        suggestFix: false,
        correctedCode: false,
    });

    useEffect(() => {
        if (initialData) {
            setCode(initialData.code || '');
            setLanguage(initialData.language || 'javascript');
            setErrorMessage(initialData.errorMessage || '');
            setLevel(initialData.level || 'Intermediate');
            if (initialData.features) {
                setFeatures(initialData.features);
            }
        }
    }, [initialData]);
    
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
        if (onClearAnalyzer) {
            onClearAnalyzer();
        }
    };

  return (
    <div>
        <section className="min-w-0">
            <div className="overflow-hidden rounded-lg border border-[#27272A] bg-[#18181B]">
                <div className="flex h-10 items-center justify-between border-b border-[#27272A] bg-[#27272A] px-3">
                    <div className="flex items-center gap-2">
                        <span className="text-lg text-[#A1A1AA]"><LuFileCode /></span>
                        <span className="text-xs font-medium text-[#D4D4D8]">Your Code</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[11px] text-[#71717A]">Language:</span>
                          <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="cursor-pointer border-none bg-transparent text-[11px] text-[#D4D4D8] outline-none"
                          >
                            {languagesList.map((lang) => (
                              <option key={lang.value} value={lang.value} className="bg-[#18181B] text-[#F4F4F5]">
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
                <button type="button" onClick={() => onAnalyze({ code, language, errorMessage, features, level })} className="flex h-8 flex-1 cursor-pointer items-center justify-center gap-2 rounded-md bg-[#8B5CF6] text-xs font-medium text-white transition hover:bg-[#7C3AED] active:scale-[0.99]">
                    <span className="text-[11px]"><IoSearchSharp /></span>
                    Analyze Bug
                </button>
                <button type="button" onClick={handleClear} className="h-8 cursor-pointer rounded-md border border-[#27272A] bg-[#18181B] px-4 text-xs text-[#A1A1AA] transition hover:bg-[#27272A] hover:text-[#F4F4F5]">
                        Clear
                </button>
            </div>
        </section>
    </div>
  )
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