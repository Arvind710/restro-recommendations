import React from 'react';
import RestaurantCard from '../components/RestaurantCard';

function ResultsPage({ results, onSearchAgain }) {
  const cards = (results?.recommendations || []).map((r, idx) => ({
    ...r,
    delay: `${idx * 0.1}s`,
    rank: idx + 1
  }));
  const summary = results?.summary || "Here are your personalized restaurant recommendations based on your preferences.";

  return (
    <section style={{ minHeight: '100vh', padding: '120px 24px 120px', maxWidth: '1080px', margin: '0 auto' }}>
      <div style={{
        background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(16px)', 
        border: '1px solid rgba(255,255,255,0.08)', borderLeft: '3px solid var(--g2)', 
        borderRadius: '0 18px 18px 0', padding: '24px 26px', marginBottom: '28px', animation: 'fadeUp .55s both'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ fontSize: '18px' }}>✨</span>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '15px', letterSpacing: '-0.01em' }}>AI Summary</span>
        </div>
        <p style={{ margin: 0, fontSize: '16px', lineHeight: 1.6, color: '#D4D4D8' }}>{summary}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(380px,1fr))', gap: '20px' }}>
        {cards.map(c => <RestaurantCard key={c.name} c={c} />)}
      </div>

      <button 
        onClick={onSearchAgain} 
        style={{
          position: 'fixed', bottom: '28px', left: '50%', transform: 'translateX(-50%)', zIndex: 50, 
          padding: '14px 28px', borderRadius: '14px', border: 'none', fontFamily: "'Inter', sans-serif", 
          fontWeight: 600, fontSize: '15px', color: '#fff', cursor: 'pointer', 
          background: 'linear-gradient(120deg,var(--g1),var(--g2),var(--g3))', backgroundSize: '200% 200%', 
          animation: 'gradientMove 5s ease infinite', boxShadow: '0 12px 40px rgba(249,115,22,0.45)', transition: 'box-shadow .2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 20px 54px rgba(249,115,22,0.6)'}
        onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 12px 40px rgba(249,115,22,0.45)'}
      >
        🔄 Search Again
      </button>
    </section>
  );
}

export default ResultsPage;
