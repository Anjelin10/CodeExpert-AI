import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import { RiDeleteBinFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { FaBookmark } from 'react-icons/fa';
import DeleteModal from '../components/DeleteModal';

export default function Saved() {
  const navigate = useNavigate();
  const [historyData, setHistoryData] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All Languages');

  const filters = ['All Languages', 'JavaScript', 'Python','TypeScript','HTML','CSS'];
  
  const fetchSaved = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;
    try {
      const res = await fetch(`https://codeexpert-ai.onrender.com/api/history/user/${user.id}/saved`);
      const data = await res.json();
      setHistoryData(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSaved();
  }, []);

  const handleUnsaveClick = (id) => {
    setItemToDelete(id);
  };

  const confirmUnsave = async () => {
    if (!itemToDelete) return;
    try {
      const res = await fetch(`https://codeexpert-ai.onrender.com/api/history/${itemToDelete}/toggle-save`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_saved: false })
      });
      if (res.ok) {
        fetchSaved();
        setItemToDelete(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleSave = async (id, currentStatus) => {
    try {
      const res = await fetch(`https://codeexpert-ai.onrender.com/api/history/${id}/toggle-save`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_saved: !currentStatus })
      });
      if (res.ok) {
        fetchSaved();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredData = historyData.filter(item => {
    return activeFilter === 'All Languages' || item.language.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <div>
    <Header/>
        <div className="min-h-screen bg-[#09090B] text-[#F4F4F5] pb-10">
            <main className='px-4 py-5 md:px-6 lg:px-8'>
                <div className="mb-5">
                    <h1 className="text-2xl font-semibold tracking-tight text-[#F4F4F5]">Saved Sessions</h1>
                    <p className="mt-1.5 text-xs text-[#A1A1AA]">Keep crucial bug reports handy to reference anytime.</p>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                        activeFilter === filter
                          ? 'bg-[#8B5CF6]/10 border-[#8B5CF6] text-[#A78BFA]'
                          : 'bg-[#18181B] border-[#27272A] text-[#A1A1AA] hover:bg-[#27272A]'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
            </main>
            {historyData.length === 0 ? (
              <div className="flex flex-col items-center justify-center mt-20">
                <div className="w-16 h-16 bg-[#27272A] rounded-full mb-4 flex items-center justify-center">
                  <FaBookmark className="text-[#A78BFA]" size={26} />
                </div>
                <h3 className="text-base font-semibold text-[#F4F4F5]">No saved analyses</h3>
                <p className="text-sm text-[#71717A] mt-1 mb-6">Save your debugging sessions for quick reference.</p>
                <button onClick={() => navigate('/')} className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors cursor-pointer">
                  Start Debugging
                </button>
              </div>
            ) : filteredData.length === 0 ? (
              <div className="flex flex-col items-center justify-center mt-20">
                <div className="w-16 h-16 bg-[#27272A] rounded-full mb-4 flex items-center justify-center">
                  <FaBookmark className="text-[#52525B]" size={20} />
                </div>
                <h3 className="text-base font-semibold text-[#F4F4F5]">No results found</h3>
                <p className="text-sm text-[#71717A] mt-1 mb-6">Try adjusting your filters.</p>
                <button onClick={() => setActiveFilter('All Languages')} className="bg-[#27272A] hover:bg-[#3F3F46] text-[#D4D4D8] text-sm font-medium py-2 px-4 rounded-lg transition-colors cursor-pointer">
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 px-4 md:px-6 lg:px-8">
                {filteredData.map((item) => (
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
                              : item.severity === 'Medium'
                                ? 'bg-[#78350F]/30 text-[#FCD34D]'
                                : 'bg-[#064E3B]/30 text-[#34D399]'
                          }`}>
                            {item.severity}
                          </span>
                        </div>
                        <span className="text-[10px] text-[#71717A]">
                          {new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      
                      <h3 className="text-sm font-semibold text-[#F4F4F5] mb-1.5 leading-snug">
                        {item.error_message ? (item.error_message.length > 40 ? item.error_message.substring(0, 40) + '...' : item.error_message) : 'Debug Analysis'}
                      </h3>
                      <p className="text-[11px] text-[#71717A] font-mono mb-5 truncate">
                        {item.code_snippet}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <button onClick={() => navigate('/', { state: { analysis: item } })} className="text-[11px] cursor-pointer font-medium text-[#D4D4D8] bg-[#27272A] hover:bg-[#3F3F46] transition-colors px-4 py-1.5 rounded-md">
                        View Details
                      </button>
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleToggleSave(item.id, item.is_saved)} className={`p-1 cursor-pointer transition-colors ${item.is_saved ? 'text-[#10B981] hover:text-[#059669]' : 'text-[#71717A] hover:text-[#A1A1AA]'}`}>
                          <FaBookmark size={13} />
                        </button>
                        <button onClick={() => handleUnsaveClick(item.id)} className="text-[#EF4444] hover:text-[#F87171] transition-colors p-1 cursor-pointer">
                          <RiDeleteBinFill size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>
        
        <DeleteModal 
          isOpen={!!itemToDelete} 
          onClose={() => setItemToDelete(null)} 
          onConfirm={confirmUnsave} 
          title="Remove saved session?"
          message="This action will remove the session from your saved list. It will still remain in your history."
        />
    </div>
  )
}
