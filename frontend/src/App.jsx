import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';

function AppContent() {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async (preferences) => {
    setIsLoading(true);
    setError(null);
    try {
      // Import api lazily or use global utils to avoid circular deps
      const { getRecommendations } = await import('./utils/api');
      const data = await getRecommendations(preferences);
      setResults(data);
      navigate('/results');
    } catch (err) {
      console.error(err);
      setError('Something went wrong while fetching recommendations.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setError(null);
    navigate('/');
  };

  return (
    <div className="app-container">
      <Header />
      <main className="container">
        <Routes>
          <Route 
            path="/" 
            element={<HomePage onSearch={handleSearch} isLoading={isLoading} error={error} />} 
          />
          <Route 
            path="/results" 
            element={<ResultsPage results={results} isLoading={isLoading} error={error} onReset={handleReset} />} 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
