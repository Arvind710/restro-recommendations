import React from 'react';
import { ArrowLeft, Frown } from 'lucide-react';
import AISummary from '../components/AISummary';
import RestaurantCard from '../components/RestaurantCard';
import LoadingState from '../components/LoadingState';

const ResultsPage = ({ results, isLoading, error, onReset }) => {
  if (isLoading) return <LoadingState />;
  
  if (error) {
    return (
      <div className="empty-state animate-fade-in">
        <Frown size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
        <h2>Oops! Something went wrong.</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{error}</p>
        <button onClick={onReset} className="btn btn-outline"><ArrowLeft size={16} /> Go Back</button>
      </div>
    );
  }

  if (!results) {
    // If somehow results are null but not loading, go back
    setTimeout(onReset, 100);
    return null;
  }

  const { recommendations, summary } = results;

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="empty-state animate-fade-in">
        <Frown size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
        <h2>No restaurants found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Try adjusting your filters (e.g. broaden budget or cuisine).</p>
        <button onClick={onReset} className="btn btn-outline"><ArrowLeft size={16} /> Search Again</button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Your Recommendations</h2>
        <button onClick={onReset} className="btn btn-outline"><ArrowLeft size={16} /> Search Again</button>
      </div>

      <AISummary summary={summary} />

      <div className="grid grid-cols-2">
        {recommendations.map((restaurant, idx) => (
          <RestaurantCard key={restaurant.id || restaurant.name} restaurant={restaurant} index={idx} />
        ))}
      </div>
    </div>
  );
};

export default ResultsPage;
