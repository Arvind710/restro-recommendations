import React from 'react';

function RestaurantCard({ c }) {
  const okPill = { display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '5px 10px', borderRadius: '8px', background: 'rgba(34,197,94,0.12)', color: '#4ADE80', fontSize: '11.5px', fontWeight: 600, whiteSpace: 'nowrap' };
  const noPill = { display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '5px 10px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', color: '#52525B', fontSize: '11.5px', fontWeight: 600, whiteSpace: 'nowrap' };
  
  const costText = '₹' + (c.cost_for_two ? c.cost_for_two.toLocaleString('en-IN') : 'N/A');
  const votesText = c.votes ? c.votes.toLocaleString('en-IN') : '0';
  const dishesShown = c.dish_liked ? c.dish_liked.slice(0,4) : [];
  const hasMore = c.dish_liked && c.dish_liked.length > 4;
  const moreDishes = '+' + (c.dish_liked ? c.dish_liked.length - 4 : 0) + ' more';

  const onlineStyle = c.online_order ? okPill : noPill;
  const onlineLabel = (c.online_order ? '✓ ' : '✕ ') + 'Order Online';
  
  const bookStyle = c.book_table ? okPill : noPill;
  const bookLabel = (c.book_table ? '✓ ' : '✕ ') + 'Book Table';

  return (
    <div style={{
      position: 'relative', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(16px)', 
      border: '1px solid rgba(255,255,255,0.08)', borderRadius: '22px', padding: '26px', 
      animation: 'fadeUp .6s both', animationDelay: c.delay, transition: 'transform .25s, box-shadow .25s, border-color .25s'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-6px)';
      e.currentTarget.style.borderColor = 'rgba(245,158,11,0.4)';
      e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.5)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = '';
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
      e.currentTarget.style.boxShadow = '';
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
          <div style={{ width: '30px', height: '30px', borderRadius: '9px', background: 'linear-gradient(135deg,var(--g1),var(--g3))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '14px', color: '#0f0f0f', flexShrink: 0 }}>
            {c.rank}
          </div>
          <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '23px', fontWeight: 700, margin: 0, letterSpacing: '-0.02em', lineHeight: 1.1 }}>{c.name}</h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '6px 11px', borderRadius: '10px', background: 'rgba(34,197,94,0.14)', flexShrink: 0 }}>
          <span style={{ color: '#4ADE80', fontSize: '12px' }}>★</span>
          <span style={{ fontWeight: 700, fontSize: '14px', color: '#4ADE80' }}>{c.rating}</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '13px', flexWrap: 'wrap' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 10px', borderRadius: '999px', background: 'rgba(255,255,255,0.06)', fontSize: '12px', color: '#D4D4D4' }}>📍 {c.location}</span>
        <span style={{ padding: '4px 10px', borderRadius: '999px', background: 'rgba(255,255,255,0.06)', fontSize: '12px', color: '#D4D4D4' }}>{c.rest_type}</span>
        <span style={{ fontSize: '12px', color: '#71717A' }}>{votesText} votes</span>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '14px' }}>
        {c.cuisines && c.cuisines.map(cz => (
          <span key={cz} style={{ padding: '4px 11px', borderRadius: '8px', background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.22)', fontSize: '12px', color: '#FDBA74', fontWeight: 500 }}>{cz}</span>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#71717A', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cost for two</div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '19px', marginTop: '2px' }}>{costText}</div>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <span style={onlineStyle}>{onlineLabel}</span>
          <span style={bookStyle}>{bookLabel}</span>
        </div>
      </div>

      <div style={{ marginTop: '16px' }}>
        <div style={{ fontSize: '11px', color: '#71717A', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Popular dishes</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {dishesShown.map(d => (
            <span key={d} style={{ padding: '3px 9px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', fontSize: '11.5px', color: '#A1A1AA' }}>{d}</span>
          ))}
          {hasMore && (
            <span style={{ padding: '3px 9px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', fontSize: '11.5px', color: '#71717A' }}>{moreDishes}</span>
          )}
        </div>
      </div>

      <div style={{ marginTop: '16px', padding: '14px 16px', borderLeft: '3px solid var(--g2)', background: 'rgba(245,158,11,0.06)', borderRadius: '0 10px 10px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#F59E0B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>✨ Why this pick</div>
        <p style={{ margin: 0, fontSize: '13.5px', lineHeight: 1.6, color: '#C4C4CC' }}>{c.ai_explanation}</p>
      </div>
    </div>
  );
}

export default RestaurantCard;
