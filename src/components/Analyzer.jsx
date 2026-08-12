import React from 'react'
import { IoSearchSharp, IoBookmark } from 'react-icons/io5'
import { FaRegCopy, FaMagic } from 'react-icons/fa'
import { BsCircleFill } from 'react-icons/bs'
import { HiSparkles } from 'react-icons/hi'

export default function Analyzer({ analysisState = 'idle', onReset }) {
  
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
                      <h2 className="text-xs font-semibold text-[#E4E4E7]">Analyzing your code...</h2>
                      <p className="mt-2 text-[10px] leading-4 text-[#71717A]">Checking AST tree and traces</p>
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
                <div className="rounded-xl border border-[#27272A] bg-[#18181B] p-4 md:p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <BsCircleFill className="text-[#8B5CF6]" size={14} />
                        <h3 className="text-[13px] font-semibold text-[#E4E4E7]">What went wrong?</h3>
                    </div>
                    <p className="text-xs text-[#A1A1AA] leading-relaxed">
                        Your code throws a <span className="text-[#F87171] font-mono">TypeError</span> because you are attempting to access the <span className="text-[#818CF8] font-mono">profile</span> property of a user object which does not exist in the array (specifically, the user with <span className="text-[#E4E4E7] font-mono">id: 2</span>).
                    </p>
                </div>

                {/* Root Cause */}
                <div className="rounded-xl border border-[#27272A] bg-[#18181B] p-4 md:p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <HiSparkles className="text-[#8B5CF6]" size={16} />
                        <h3 className="text-[13px] font-semibold text-[#E4E4E7]">Root Cause</h3>
                    </div>
                    <p className="text-xs text-[#A1A1AA] leading-relaxed">
                        In line 3 of users, the object <code className="text-[#E4E4E7] bg-[#27272A] px-1 py-0.5 rounded font-mono text-[11px]">{`{ id: 2, name: "Bob" }`}</code> does not define a <span className="text-[#818CF8] font-mono">profile</span> field. When your filter attempts to evaluate <code className="text-[#E4E4E7] bg-[#27272A] px-1 py-0.5 rounded font-mono text-[11px]">u.profile.roles</code>, <code className="text-[#E4E4E7] bg-[#27272A] px-1 py-0.5 rounded font-mono text-[11px]">u.profile</code> returns <span className="text-[#F87171] font-mono">undefined</span>, causing <code className="text-[#E4E4E7] bg-[#27272A] px-1 py-0.5 rounded font-mono text-[11px]">undefined.roles</code> to throw a fatal execution error.
                    </p>
                </div>

                {/* Suggested Fix */}
                <div className="rounded-xl border border-[#27272A] bg-[#18181B] p-4 md:p-5">
                    <h3 className="text-[13px] font-semibold text-[#E4E4E7] mb-2">Suggested Fix</h3>
                    <p className="text-xs text-[#A1A1AA] leading-relaxed mb-4">
                        Use optional chaining <code className="text-[#F4F4F5] bg-[#27272A] px-1 py-0.5 rounded font-mono text-[11px]">?.</code> to safely verify nested fields without interrupting evaluation flow:
                    </p>
                    
                    <div className="rounded-lg border border-[#3F3F46] bg-[#09090B] overflow-hidden mb-3">
                        <div className="p-4 overflow-x-auto text-xs font-mono leading-loose">
                            <div className="flex gap-4">
                                <span className="text-[#52525B] select-none text-right w-4">1</span>
                                <span className="text-[#E4E4E7] whitespace-nowrap"><span className="text-[#C678DD]">function</span> <span className="text-[#61AFEF]">getAdminUsers</span>(<span className="text-[#D19A66]">userList</span>) {'{'}</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="text-[#52525B] select-none text-right w-4">2</span>
                                <span className="text-[#E4E4E7] whitespace-nowrap">    <span className="text-[#C678DD]">return</span> userList.<span className="text-[#61AFEF]">filter</span>(u <span className="text-[#C678DD]">=&gt;</span> u.profile<span className="text-[#E5C07B]">?.</span>roles<span className="text-[#E5C07B]">?.</span><span className="text-[#61AFEF]">includes</span>(<span className="text-[#98C379]">"admin"</span>));</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="text-[#52525B] select-none text-right w-4">3</span>
                                <span className="text-[#E4E4E7] whitespace-nowrap">{'}'}</span>
                            </div>
                        </div>
                    </div>
                    
                    <button className="flex items-center gap-2 text-[11px] font-medium text-[#D4D4D8] bg-[#27272A] hover:bg-[#3F3F46] transition px-3 py-1.5 rounded-md">
                        <FaRegCopy size={12} />
                        Copy Code
                    </button>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-2 flex flex-col sm:flex-row gap-3 pt-2">
                <button type="button" className="flex h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#8B5CF6]/50 bg-[#8B5CF6]/10 text-xs font-medium text-[#8B5CF6] transition hover:bg-[#8B5CF6]/20 active:scale-[0.99]">
                    <IoBookmark size={14} />
                    Save Analysis
                </button>
                <button type="button" onClick={onReset} className="flex h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#27272A] bg-[#18181B] text-xs font-medium text-[#A1A1AA] transition hover:bg-[#27272A] hover:text-[#F4F4F5] active:scale-[0.99]">
                    Analyze Again
                </button>
            </div>
        </section>
    </div>
  )
}

