import React, { useState } from 'react';
import Header from '../components/Header';
import Coder from '../components/Coder';
import Analyzer from '../components/Analyzer';

export default function Home() {
  // states: 'idle', 'loading', 'success'
  const [analysisState, setAnalysisState] = useState('idle');

  const handleAnalyze = () => {
    setAnalysisState('loading');
    // Simulate an API call delay
    setTimeout(() => {
      setAnalysisState('success');
    }, 2000);
  };

  const handleClear = () => {
    setAnalysisState('idle');
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
          <Coder onAnalyze={handleAnalyze} onClearAnalyzer={handleClear} />
          <Analyzer analysisState={analysisState} onReset={handleClear} />
        </div>
      </main>
    </div>
  );
}
