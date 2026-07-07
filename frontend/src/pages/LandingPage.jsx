import React from 'react';

function LandingPage({ onGetStarted }) {
  return (
    <section style={{
      position: 'relative', minHeight: '100vh', display: 'flex', 
      alignItems: 'center', justifyContent: 'center', textAlign: 'center', 
      padding: '0 24px', overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute', width: '620px', height: '620px', borderRadius: '50%', 
        background: 'radial-gradient(circle, rgba(245,158,11,0.30), transparent 70%)', 
        top: '-160px', left: '-140px', filter: 'blur(24px)', animation: 'blobA 14s ease-in-out infinite'
      }}></div>
      
      <div style={{
        position: 'absolute', width: '560px', height: '560px', borderRadius: '50%', 
        background: 'radial-gradient(circle, rgba(239,68,68,0.24), transparent 70%)', 
        bottom: '-180px', right: '-120px', filter: 'blur(24px)', animation: 'blobB 16s ease-in-out infinite'
      }}></div>
      
      <div style={{
        position: 'absolute', width: '420px', height: '420px', borderRadius: '50%', 
        background: 'radial-gradient(circle, rgba(249,115,22,0.20), transparent 70%)', 
        top: '38%', left: '56%', filter: 'blur(34px)', animation: 'blobA 19s ease-in-out infinite reverse'
      }}></div>
      
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '840px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '7px 16px', 
          borderRadius: '999px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', 
          fontSize: '13px', color: '#FCD34D', fontWeight: 500, marginBottom: '6px'
        }}>
          ✨ AI-powered dining discovery
        </div>
        <h1 style={{
          fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '70px', 
          lineHeight: 1.03, letterSpacing: '-0.035em', margin: '22px 0 0'
        }}>
          Discover Bangalore's<br/>
          <span style={{
            background: 'linear-gradient(120deg, var(--g1), var(--g2), var(--g3))', 
            WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent'
          }}>Best Restaurants</span>
        </h1>
        <p style={{ fontSize: '20px', color: '#9CA3AF', margin: '24px auto 0', maxWidth: '540px', lineHeight: 1.55 }}>
          AI-powered recommendations tailored to your taste.
        </p>
        
        <button 
          onClick={onGetStarted} 
          style={{
            marginTop: '40px', padding: '17px 36px', borderRadius: '15px', border: 'none', 
            fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '16px', color: '#fff', cursor: 'pointer', 
            background: 'linear-gradient(120deg, var(--g1), var(--g2), var(--g3))', backgroundSize: '200% 200%', 
            animation: 'gradientMove 5s ease infinite', boxShadow: '0 14px 44px rgba(249,115,22,0.4)', 
            transition: 'transform .2s, box-shadow .2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 22px 60px rgba(249,115,22,0.6)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = '';
            e.currentTarget.style.boxShadow = '0 14px 44px rgba(249,115,22,0.4)';
          }}
        >
          Get Started ✨
        </button>
      </div>
    </section>
  );
}

export default LandingPage;
