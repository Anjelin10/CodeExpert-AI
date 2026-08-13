import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import { RiDeleteBinFill, RiFileCodeFill } from 'react-icons/ri'
import { BsCircleFill } from 'react-icons/bs'
import { FaBookmark } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import DeleteModal from '../components/DeleteModal'
import { IoSearchSharp } from 'react-icons/io5'

export default function History() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All Languages');
  const [historyData, setHistoryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemToDelete, setItemToDelete] = useState(null);
  
  const filters = ['All Languages', 'JavaScript', 'Python','TypeScript','HTML','CSS'];

  const fetchHistory = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;
    try {
      const res = await fetch(`https://codeexpert-ai.onrender.com/api/history/user/${user.id}`);
      const data = await res.json();
      setHistoryData(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDeleteClick = (id) => {
    setItemToDelete(id);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      const res = await fetch(`https://codeexpert-ai.onrender.com/api/history/${itemToDelete}`, { method: 'DELETE' });
      if (res.ok) {
        fetchHistory();
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
        fetchHistory();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredData = historyData.filter(item => {
    const matchesFilter = activeFilter === 'All Languages' || item.language.toLowerCase() === activeFilter.toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      (item.error_message && item.error_message.toLowerCase().includes(searchLower)) || 
      (item.code_snippet && item.code_snippet.toLowerCase().includes(searchLower)) ||
      (item.language && item.language.toLowerCase().includes(searchLower));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#09090B] text-[#F4F4F5]">
      <Header/>
      <main className="px-8 py-6 mx-auto">
        <div className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight text-[#F4F4F5] mb-1.5">Debug History</h1>
            <p className="text-xs text-[#A1A1AA]">Review and search previous debug results.</p>
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

        {/* History Cards */}
        {historyData.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <div className="w-16 h-16 bg-[#27272A] rounded-full mb-4 flex items-center justify-center">
              <RiFileCodeFill className="text-[#A78BFA]" size={30} />
            </div>
            <h3 className="text-base font-semibold text-[#F4F4F5]">No debug history yet</h3>
            <p className="text-sm text-[#71717A] mt-1 mb-6">Start debugging to build your history.</p>
            <button onClick={() => navigate('/')} className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors cursor-pointer">
              Start Debugging
            </button>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <div className="w-16 h-16 bg-[#27272A] rounded-full mb-4 flex items-center justify-center">
              <IoSearchSharp className="text-[#52525B]" size={20} />
            </div>
            <h3 className="text-base font-semibold text-[#F4F4F5]">No results found</h3>
            <p className="text-sm text-[#71717A] mt-1 mb-6">Try adjusting your search or filters.</p>
            <button onClick={() => { setSearchTerm(''); setActiveFilter('All Languages'); }} className="bg-[#27272A] hover:bg-[#3F3F46] text-[#D4D4D8] text-sm font-medium py-2 px-4 rounded-lg transition-colors cursor-pointer">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
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
                          : 'bg-[#78350F]/30 text-[#FCD34D]'
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
                    <button onClick={() => handleDeleteClick(item.id)} className="text-[#EF4444] hover:text-[#F87171] transition-colors p-1 cursor-pointer">
                      <RiDeleteBinFill size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <DeleteModal 
        isOpen={!!itemToDelete} 
        onClose={() => setItemToDelete(null)} 
        onConfirm={confirmDelete} 
      />
    </div>
  )
}
