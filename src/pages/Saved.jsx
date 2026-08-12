import React from 'react'
import Header from '../components/Header'
import { RiDeleteBinFill } from 'react-icons/ri';

export default function Saved() {
    
  const historyData = [
    {
      id: 1,
      language: 'JavaScript',
      severity: 'High',
      date: 'Aug 8, 2026',
      title: 'TypeError: Cannot read properties of undefin...',
      code: "u.profile.roles.includes('admin')"
    },
    {
      id: 2,
      language: 'Python',
      severity: 'High',
      date: 'Aug 7, 2026',
      title: "KeyError: 'database_url'",
      code: "config_path = os.environ['database_url']"
    },
    {
      id: 3,
      language: 'Java',
      severity: 'Medium',
      date: 'Aug 5, 2026',
      title: 'NullPointerException at getMetadata()',
      code: 'meta.getMetadata().hashCode()'
    }
  ];
  return (
    <div>
    <Header/>
        <div className="min-h-screen bg-[#09090B] text-[#F4F4F5] pb-10">
            <main className='px-4 py-5 md:px-6 lg:px-8'>
                <div className="mb-5">
                    <h1 className="text-2xl font-semibold tracking-tight text-[#F4F4F5]">Saved Sessions</h1>
                    <p className="mt-1.5 text-xs text-[#A1A1AA]">Keep crucial bug reports handy to reference anytime.</p>
                </div>
            </main>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 px-8">
                      {historyData.map((item) => (
                        <div key={item.id} className="bg-[#18181B] border border-[#27272A] p-4 rounded-xl flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-2">
                                <span className="bg-[#27272A] text-[#D4D4D8] text-[10px] font-semibold px-2 py-0.5 rounded-md">
                                  {item.language}
                                </span>
                                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                                  item.severity === 'High' 
                                    ? 'bg-[#7F1D1D]/30 text-[#FCA5A5]' 
                                    : 'bg-[#78350F]/30 text-[#FCD34D]'
                                }`}>
                                  {item.severity}
                                </span>
                              </div>
                              <span className="text-[10px] text-[#71717A]">{item.date}</span>
                            </div>
                            
                            <h3 className="text-sm font-semibold text-[#F4F4F5] mb-1.5 leading-snug">
                              {item.title}
                            </h3>
                            <p className="text-[11px] text-[#71717A] font-mono mb-5 truncate">
                              {item.code}
                            </p>
                          </div>
            
                          <div className="flex items-center justify-between mt-auto">
                            <button className="text-[11px] cursor-pointer font-medium text-[#D4D4D8] bg-[#27272A] hover:bg-[#3F3F46] transition-colors px-4 py-1.5 rounded-md">
                              View Details
                            </button>
                            <button className="text-[#EF4444] hover:text-[#F87171] transition-colors p-1">
                              <RiDeleteBinFill size={16} className='cursor-pointer'/>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
        </div>
    </div>
  )
}
