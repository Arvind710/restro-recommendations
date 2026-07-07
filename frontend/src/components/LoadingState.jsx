import React from 'react';

function LoadingState() {
  return (
    <section style={{ minHeight: '100vh', padding: '130px 24px 70px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '44px' }}>
        <div style={{ fontSize: '46px', animation: 'pulse 1.4s ease-in-out infinite' }}>🍽️</div>
        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '27px', fontWeight: 700, margin: '20px 0 0', letterSpacing: '-0.02em' }}>
          AI is curating your perfect dining experience
          <span style={{ animation: 'dot 1.4s infinite' }}>.</span>
          <span style={{ animation: 'dot 1.4s infinite .2s' }}>.</span>
          <span style={{ animation: 'dot 1.4s infinite .4s' }}>.</span>
        </h2>
        <p style={{ color: '#9CA3AF', margin: '10px 0 0', fontSize: '15px' }}>Analysing hundreds of Bangalore restaurants…</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(360px,1fr))', gap: '20px' }}>
        {[0,1,2,3,4].map(sk => (
          <div key={sk} style={{
            height: '250px', borderRadius: '22px', 
            background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 75%)', 
            backgroundSize: '600px 100%', animation: 'shimmer 1.6s infinite linear', border: '1px solid rgba(255,255,255,0.06)'
          }}></div>
        ))}
      </div>
    </section>
  );
}

export default LoadingState;
