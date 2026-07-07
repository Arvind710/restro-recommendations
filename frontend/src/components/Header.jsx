import React from 'react';

function Header({ onLogoClick }) {
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 60, 
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
      padding: '18px 40px', backdropFilter: 'blur(8px)'
    }}>
      <div onClick={onLogoClick} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
        <div style={{
          width: '34px', height: '34px', borderRadius: '10px', 
          background: 'linear-gradient(135deg, var(--g1), var(--g3))', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '17px'
        }}>
          🍽️
        </div>
        <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '20px', letterSpacing: '-0.02em' }}>
          Restro<span style={{ 
            background: 'linear-gradient(135deg, var(--g1), var(--g3))', 
            WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' 
          }}>.ai</span>
        </span>
      </div>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#9CA3AF', fontWeight: 500 }}>
        📍 Bangalore
      </span>
    </header>
  );
}

export default Header;
