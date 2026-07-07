import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import PreferenceForm from './components/PreferenceForm';
import LoadingState from './components/LoadingState';
import ResultsPage from './pages/ResultsPage';
import NotFoundPage from './components/NotFoundPage';

function App() {
  const [stage, setStage] = useState('landing');
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (window.location.pathname !== '/') {
      setStage('404');
    }
  }, []);

  const handleGetStarted = () => {
    setStage('form');
    window.scrollTo(0, 0);
  };

  const handleSearch = async (preferences) => {
    setStage('loading');
    window.scrollTo(0, 0);
    
    try {
      const { getRecommendations } = await import('./utils/api');
      const data = await getRecommendations(preferences);
      setResults(data);
      setStage('results');
    } catch (err) {
      // In case of error, just fall back to form for now or show error state
      alert('Failed to get recommendations. Please try again.');
      setStage('form');
    }
  };

  const handleReset = () => {
    setResults(null);
    setStage('form');
    window.scrollTo(0, 0);
  };

  const handleLogoClick = () => {
    setStage('landing');
    setResults(null);
    window.history.pushState({}, '', '/');
    window.scrollTo(0, 0);
  };

  const handleReturnHome = () => {
    setStage('landing');
    setResults(null);
    window.history.pushState({}, '', '/');
    window.scrollTo(0, 0);
  };

  return (
    <div style={{ position: 'relative', overflowX: 'hidden' }}>
      <Header onLogoClick={handleLogoClick} />
      
      {stage === 'landing' && <LandingPage onGetStarted={handleGetStarted} />}
      {stage === 'form' && <PreferenceForm onSubmit={handleSearch} />}
      {stage === 'loading' && <LoadingState />}
      {stage === 'results' && <ResultsPage results={results} onSearchAgain={handleReset} />}
      {stage === '404' && <NotFoundPage onReturnHome={handleReturnHome} />}
    </div>
  );
}

export default App;
