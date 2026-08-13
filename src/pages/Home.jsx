import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Coder from '../components/Coder';
import Analyzer from '../components/Analyzer';
import LoginModal from '../components/LoginModal';

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [analysisState, setAnalysisState] = useState('idle');
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    if (location.state?.analysis) {
      const item = location.state.analysis;
      const parsedAnalysis = {
        id: item.id,
        language: item.language,
        code: item.code_snippet,
        errorMessage: item.error_message,
        level: item.explanation_level,
        features: {
          explainCause: item.feature_explain_cause === 1,
          suggestFix: item.feature_suggest_fix === 1,
          correctedCode: item.feature_show_corrected_code === 1
        },
        aiResult: {
          whatWentWrong: item.what_went_wrong,
          rootCause: item.root_cause,
          suggestedFix: item.suggested_fix,
          correctedCode: item.corrected_code
        }
      };
      setCurrentAnalysis(parsedAnalysis);
      setAnalysisState('success');
      setIsSaved(item.is_saved === 1);
      setInitialData(parsedAnalysis);
    }
  }, [location.state]);

  const handleAnalyze = async (payload) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }
    
    setIsSaved(false);
    setAnalysisState('loading');
    
    try {
      const res = await fetch('https://codeexpert-ai.onrender.com/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          code: payload.code,
          language: payload.language,
          errorMessage: payload.errorMessage,
          level: payload.level,
          features: payload.features
        })
      });
      const data = await res.json();
      if (res.ok) {
        setCurrentAnalysis({
          id: data.id,
          ...payload,
          aiResult: data
        });
        setAnalysisState('success');
      } else {
        console.error(data.error);
        setAnalysisState('error');
      }
    } catch (err) {
      console.error(err);
      setAnalysisState('error');
    }
  };

  const handleSave = async () => {
    if (!currentAnalysis || !currentAnalysis.id) return;
    try {
      const res = await fetch(`https://codeexpert-ai.onrender.com/api/history/${currentAnalysis.id}/toggle-save`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_saved: true })
      });
      if (res.ok) {
        setIsSaved(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleClear = () => {
    setAnalysisState('idle');
    setCurrentAnalysis(null);
    setIsSaved(false);
    setInitialData(null);
    navigate('/', { replace: true });
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
          <Coder onAnalyze={handleAnalyze} onClearAnalyzer={handleClear} initialData={initialData} />
          <Analyzer analysisState={analysisState} onReset={handleClear} onSave={handleSave} isSaved={isSaved} currentAnalysis={currentAnalysis} />
        </div>
      </main>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onConfirm={() => navigate('/login')} 
      />
    </div>
  );
}
