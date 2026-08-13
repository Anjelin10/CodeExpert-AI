import React, { useState, useEffect } from 'react'
import { IoSearchSharp, IoBookmark } from 'react-icons/io5'
import { FaRegCopy, FaMagic } from 'react-icons/fa'
import { BsCircleFill, BsCheckCircleFill } from 'react-icons/bs'
import { HiSparkles } from 'react-icons/hi'

export default function Analyzer({ analysisState = 'idle', onReset, onSave, isSaved, currentAnalysis }) {
  const ai = currentAnalysis?.aiResult || {};
  const whatWentWrong = ai.whatWentWrong || ai.what_went_wrong || '';
  const rootCause = ai.rootCause || ai.root_cause || '';
  const suggestedFix = ai.suggestedFix || ai.suggested_fix || '';
  const correctedCode = ai.correctedCode || ai.corrected_code || '';
  
  if (analysisState === 'idle') {
    return (
      <div className="flex flex-col h-full min-h-[30rem] lg:min-h-0">
          <section className="min-w-0 flex-1 flex">
              <div className="flex w-full items-center justify-center rounded-lg border border-[#27272A] bg-[#18181B]">
                  <div className="flex flex-col items-center justify-center px-6 text-center">
                      <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#27272A]">
                          <IoSearchSharp />
                      </div>
                      <h2 className="text-xs font-semibold text-[#E4E4E7]">Ready to analyze</h2>
                      <p className="mt-2 max-w-[200px] text-[10px] leading-4 text-[#71717A]">Your debugging insights and recommended adjustments will appear here.</p>
                  </div>
              </div>
          </section>
      </div>
    )
  }

  const [loadingText, setLoadingText] = useState('Analyzing your code...');
  const [loadingSubText, setLoadingSubText] = useState('Checking AST tree and traces');

  useEffect(() => {
    let timer1, timer2;
    if (analysisState === 'loading') {
      setLoadingText('Analyzing your code...');
      setLoadingSubText('Checking AST tree and traces');
      
      timer1 = setTimeout(() => {
        setLoadingText('Fetching details...');
        setLoadingSubText('Generating AI insights');
      }, 5000);
      
      timer2 = setTimeout(() => {
        setLoadingText('Getting response...');
        setLoadingSubText('Finalizing report');
      }, 10000);
    }
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [analysisState]);

  if (analysisState === 'loading') {
    return (
      <div className="flex flex-col h-full min-h-[30rem] lg:min-h-0">
          <section className="min-w-0 flex-1 flex">
              <div className="flex w-full items-center justify-center rounded-lg border border-[#27272A] bg-[#18181B]">
                  <div className="flex flex-col items-center justify-center px-6 text-center">
                      <div className="mb-6 flex gap-2 justify-center items-center">
                          <span className="h-2.5 w-2.5 rounded-full bg-[#8B5CF6] animate-bounce" style={{ animationDelay: '0ms' }}></span>
                          <span className="h-2.5 w-2.5 rounded-full bg-[#8B5CF6]/70 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                          <span className="h-2.5 w-2.5 rounded-full bg-[#8B5CF6]/40 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                      <h2 className="text-xs font-semibold text-[#E4E4E7] transition-all duration-300">{loadingText}</h2>
                      <p className="mt-2 text-[10px] leading-4 text-[#71717A] transition-all duration-300">{loadingSubText}</p>
                  </div>
              </div>
          </section>
      </div>
    )
  }

  if (analysisState === 'error') {
    return (
      <div className="flex flex-col h-full min-h-[30rem] lg:min-h-0">
          <section className="min-w-0 flex-1 flex">
              <div className="flex w-full items-center justify-center rounded-lg border border-[#ef4444]/20 bg-[#18181B]">
                  <div className="flex flex-col items-center justify-center px-6 text-center">
                      <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#ef4444]/20 text-[#ef4444]">
                          <span className="text-lg font-bold">!</span>
                      </div>
                      <h2 className="text-xs font-semibold text-[#E4E4E7]">Oops! try again</h2>
                      <p className="mt-2 max-w-[200px] text-[10px] leading-4 text-[#71717A]">Something went wrong while fetching the AI response.</p>
                      <button onClick={onReset} className="mt-4 px-4 py-1.5 bg-[#27272A] hover:bg-[#3F3F46] text-[#E4E4E7] text-[11px] font-medium rounded-md transition cursor-pointer">
                        Reset
                      </button>
                  </div>
              </div>
          </section>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
        <section className="min-w-0 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4 mt-2">
                <div className="flex items-center gap-3">
                    <span className="bg-[#3B0764] text-[#D8B4FE] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">AI INSIGHTS</span>
                    <h2 className="text-sm font-semibold text-[#F4F4F5]">Analysis Completed</h2>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#10B981] font-medium bg-[#10B981]/10 px-2 py-1 rounded">
                    <BsCircleFill size={6} />
                    <span>Confidence: High</span>
                </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto pr-1 pb-4">
                {/* What went wrong */}
                {whatWentWrong && (
                <div className="rounded-xl border border-[#27272A] bg-[#18181B] p-4 md:p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <BsCircleFill className="text-[#8B5CF6]" size={14} />
                        <h3 className="text-[13px] font-semibold text-[#E4E4E7]">What went wrong?</h3>
                    </div>
                    <p className="text-xs text-[#A1A1AA] leading-relaxed whitespace-pre-wrap">
                        {whatWentWrong}
                    </p>
                </div>
                )}

                {/* Root Cause */}
                {currentAnalysis?.features?.explainCause && rootCause && (
                <div className="rounded-xl border border-[#27272A] bg-[#18181B] p-4 md:p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <HiSparkles className="text-[#8B5CF6]" size={16} />
                        <h3 className="text-[13px] font-semibold text-[#E4E4E7]">Root Cause</h3>
                    </div>
                    <p className="text-xs text-[#A1A1AA] leading-relaxed whitespace-pre-wrap">
                        {rootCause}
                    </p>
                </div>
                )}

                {/* Suggested Fix */}
                {currentAnalysis?.features?.suggestFix && suggestedFix && (
                <div className="rounded-xl border border-[#27272A] bg-[#18181B] p-4 md:p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <FaMagic className="text-[#8B5CF6]" size={14} />
                        <h3 className="text-[13px] font-semibold text-[#E4E4E7]">Suggested Fix</h3>
                    </div>
                    <p className="text-xs text-[#A1A1AA] leading-relaxed whitespace-pre-wrap">
                        {suggestedFix}
                    </p>
                </div>
                )}
                    
                {/* Corrected Code */}
                {currentAnalysis?.features?.correctedCode && correctedCode && (
                <div className="rounded-xl border border-[#27272A] bg-[#18181B] p-4 md:p-5">
                    <h3 className="text-[13px] font-semibold text-[#E4E4E7] mb-3">Corrected Code</h3>
                    <div className="rounded-lg border border-[#3F3F46] bg-[#09090B] overflow-hidden mb-3">
                        <div className="p-4 overflow-x-auto text-xs font-mono leading-loose text-[#E4E4E7] whitespace-pre">
                            {correctedCode}
                        </div>
                    </div>
                    
                    <button onClick={() => { navigator.clipboard.writeText(correctedCode); }} className="flex items-center cursor-pointer gap-2 text-[11px] font-medium text-[#D4D4D8] bg-[#27272A] hover:bg-[#3F3F46] transition px-3 py-1.5 rounded-md">
                        <FaRegCopy size={12} />
                        Copy Code
                    </button>
                </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className="mt-2 flex flex-col sm:flex-row gap-3 pt-2">
                <button type="button" onClick={() => { onSave(); }} disabled={isSaved} className={`flex h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border text-xs font-medium transition active:scale-[0.99] ${isSaved ? 'border-green-500/50 bg-green-500/10 text-green-500 hover:bg-green-500/20' : 'border-[#8B5CF6]/50 bg-[#8B5CF6]/10 text-[#8B5CF6] hover:bg-[#8B5CF6]/20'}`}>
                    {isSaved ? <BsCheckCircleFill size={14} /> : <IoBookmark size={14} />}
                    {isSaved ? 'Analysis Saved' : 'Save Analysis'}
                </button>
                <button type="button" onClick={onReset} className="flex h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#27272A] bg-[#18181B] text-xs font-medium text-[#A1A1AA] transition hover:bg-[#27272A] hover:text-[#F4F4F5] active:scale-[0.99]">
                    Analyze Again
                </button>
            </div>
        </section>
    </div>
  )
}

