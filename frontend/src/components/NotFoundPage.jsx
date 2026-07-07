import React from 'react';

const NotFoundPage = ({ onReturnHome }) => {
  return (
    <section style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 70px', animation: 'fadeUp .5s both', textAlign: 'center' }}>
      <div style={{
        background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '24px', padding: '50px 40px', maxWidth: '500px',
        boxShadow: '0 30px 80px rgba(0,0,0,0.45)'
      }}>
        <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '64px', fontWeight: 700, margin: '0 0 16px', letterSpacing: '-0.025em', background: 'linear-gradient(135deg, var(--g1), var(--g3))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>404</h1>
        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '28px', fontWeight: 600, color: '#E5E5E5', margin: '0 0 16px' }}>Page Not Found</h2>
        <p style={{ color: '#9CA3AF', margin: '0 0 32px', fontSize: '16px', lineHeight: '1.6' }}>
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <button
          onClick={onReturnHome}
          style={{
            padding: '16px 32px', borderRadius: '14px', border: 'none',
            fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '16px', color: '#fff', cursor: 'pointer',
            background: 'linear-gradient(120deg,var(--g1),var(--g2),var(--g3))', backgroundSize: '200% 200%',
            animation: 'gradientMove 5s ease infinite', boxShadow: '0 14px 40px rgba(249,115,22,0.35)', transition: 'transform .2s, box-shadow .2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 20px 54px rgba(249,115,22,0.55)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = '';
            e.currentTarget.style.boxShadow = '0 14px 40px rgba(249,115,22,0.35)';
          }}
        >
          Return Home
        </button>
      </div>
    </section>
  );
};

export default NotFoundPage;
