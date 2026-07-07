import React from 'react';
import PreferenceForm from '../components/PreferenceForm';
import { ChefHat } from 'lucide-react';

const HomePage = ({ onSearch, isLoading, error }) => {
  return (
    <div>
      <section className="hero animate-fade-in">
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '4rem', height: '4rem', borderRadius: '50%', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--primary-color)', marginBottom: '1.5rem' }}>
          <ChefHat size={32} />
        </div>
        <h1><span className="text-gradient">AI-Powered</span> Dining</h1>
        <p>Discover the perfect restaurant in Bangalore, curated specifically for your tastes and budget by artificial intelligence.</p>
      </section>

      {error && (
        <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#fca5a5', padding: '1rem', borderRadius: '0.5rem', border: '1px solid rgba(239, 68, 68, 0.2)', marginBottom: '2rem', textAlign: 'center' }}>
          {error}
        </div>
      )}

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <PreferenceForm onSearch={onSearch} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default HomePage;
