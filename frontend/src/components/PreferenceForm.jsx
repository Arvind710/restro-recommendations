import React, { useState, useEffect, useRef } from 'react';
import { getLocations, getCuisines } from '../utils/api';

const diningGeneral = ["Buffet","Cafes","Delivery","Desserts","Dine-out","Drinks & nightlife","Pubs and bars"];
const diningTabs = ["Buffet","Cafes","Delivery","Desserts","Dine-out","Drinks & nightlife","Pubs and bars","Bakery","Bar","Casual Dining","Microbrewery","Quick Bites"];
const restTypesList = ["Casual Dining","Quick Bites","Cafe","Bakery","Bar","Microbrewery","Pub","Dessert Parlor","Fine Dining","Lounge","Food Court","Beverage Shop","Sweet Shop","Kiosk","Mess","Bhojanalya","Club","Confectionery","Dhaba","Irani Cafe","Food Truck","Meat Shop","Pop Up","Fusion","Bar+Casual Dining","Cafe+Bakery","Casual Dining+Bar","Casual Dining+Cafe","Quick Bites+Cafe","Quick Bites+Bakery","Dessert Parlor+Bakery","Sweet Shop+Quick Bites","Fine Dining+Bar","Lounge+Bar","Microbrewery+Casual Dining","Pub+Casual Dining","Cafe+Casual Dining","Bakery+Dessert Parlor","Quick Bites+Dessert Parlor","Casual Dining+Microbrewery"];
const allDining = [...diningGeneral, ...restTypesList.filter(r => !diningGeneral.includes(r))];
const budgets = [
  {key:'low',label:'Low',sub:'≤ ₹500'},
  {key:'medium',label:'Medium',sub:'₹500–1500'},
  {key:'high',label:'High',sub:'₹1500+'}
];

const baseChip = {
  padding: '9px 16px', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.1)', 
  background: 'rgba(255,255,255,0.03)', color: '#D4D4D4', fontSize: '14px', 
  fontFamily: "'Inter', sans-serif", cursor: 'pointer', fontWeight: 500, transition: 'all .18s'
};
const selChip = {
  ...baseChip,
  border: '1px solid transparent', background: 'linear-gradient(135deg, var(--g1), var(--g2))', 
  color: '#0f0f0f', fontWeight: 600
};

const locationsList = ["Indiranagar","Koramangala","Whitefield","Jayanagar","JP Nagar","HSR Layout","BTM Layout","Marathahalli","Bannerghatta Road","Electronic City","MG Road","Brigade Road","Malleshwaram","Rajajinagar","Basavanagudi","Yelahanka","Hebbal","Bellandur","Sarjapur Road","Kalyan Nagar","Frazer Town","Church Street","Lavelle Road","Commercial Street","Residency Road","Cunningham Road","Sadashivanagar","RT Nagar","Banaswadi","Kammanahalli"];
const popularCuisinesList = ["North Indian","South Indian","Chinese","Italian","Biryani","Street Food","Continental","Desserts","Cafe"];
const allCuisinesList = ["North Indian","South Indian","Chinese","Italian","Continental","Street Food","Biryani","Desserts","Mexican","Thai","Japanese","Mughlai","Beverages","Pizza","American","Asian","Cafe","Bakery","Fast Food","Andhra","Kerala","Mangalorean","Chettinad","Hyderabadi","Rajasthani","Gujarati","Bengali","Maharashtrian","Goan","Kashmiri","Lucknowi","Awadhi","Arabian","Lebanese","Mediterranean","Korean","Vietnamese","Burmese","Tibetan","Momos","Rolls","Kebab","BBQ","Seafood","Sushi","Salad","Healthy Food","Ice Cream","Juices","Tea","Coffee","Sandwich","Burger","Wraps","Finger Food","Bar Food","Steak","Tex-Mex","North Eastern","Konkan","Malwani","Parsi","Sindhi","Bihari","European","Spanish","French","Portuguese","Turkish","Afghani","Charcoal Chicken","Tandoor"];

function PreferenceForm({ onSubmit }) {
  const [location, setLocation] = useState('');
  const [locQuery, setLocQuery] = useState('');
  const [locOpen, setLocOpen] = useState(false);

  const [cuisines, setCuisines] = useState([]);
  const [cuisineQuery, setCuisineQuery] = useState('');
  const [cuisineOpen, setCuisineOpen] = useState(false);

  const [budget, setBudget] = useState('medium');
  const [minRating, setMinRating] = useState(4.0);

  const [diningTypes, setDiningTypes] = useState([]);
  const [diningQuery, setDiningQuery] = useState('');
  const [diningOpen, setDiningOpen] = useState(false);

  const [prefs, setPrefs] = useState('');

  const formRef = useRef();

  useEffect(() => {
    const handleDocClick = (e) => {
      const inside = e.target && e.target.closest && e.target.closest('[data-dropdown]');
      if (!inside) {
        setLocOpen(false); setCuisineOpen(false); setDiningOpen(false);
      }
    };
    document.addEventListener('mousedown', handleDocClick);
    return () => document.removeEventListener('mousedown', handleDocClick);
  }, []);

  const popularCuisines = popularCuisinesList;
  
  const filteredLocs = locationsList.filter(l => l.toLowerCase().includes(locQuery.toLowerCase())).slice(0, 7);
  const filteredCuisines = allCuisinesList.filter(c => c.toLowerCase().includes(cuisineQuery.toLowerCase()) && !cuisines.includes(c)).slice(0, 8);
  const selectedCuisineExtra = cuisines.filter(c => !popularCuisines.includes(c));

  const filteredDining = allDining.filter(d => d.toLowerCase().includes(diningQuery.toLowerCase()) && !diningTypes.includes(d)).slice(0, 8);
  const selectedDiningExtra = diningTypes.filter(d => !diningTabs.includes(d));

  const toggleCuisine = (c) => {
    setCuisines(prev => {
      if (prev.includes(c)) return prev.filter(x => x !== c);
      if (prev.length >= 5) {
        alert("You can select a maximum of 5 cuisines!");
        return prev;
      }
      return [...prev, c];
    });
  };
  const toggleDining = (d) => setDiningTypes(prev => prev.includes(d) ? [] : [d]);

  const handleSubmit = () => {
    onSubmit({
      location: location || locQuery || 'Indiranagar',
      cuisines,
      budget,
      min_rating: minRating,
      dining_type: diningTypes.length > 0 ? diningTypes[0] : undefined,
      preferences: prefs
    });
  };

  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '120px 24px 70px', animation: 'fadeUp .5s both' }}>
      <div style={{ width: '100%', maxWidth: '600px' }} ref={formRef}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '36px', fontWeight: 700, margin: 0, letterSpacing: '-0.025em' }}>Tell us what you're craving</h2>
          <p style={{ color: '#9CA3AF', margin: '12px 0 0', fontSize: '15px' }}>A few quick preferences and our AI does the rest.</p>
        </div>
        
        <div style={{
          background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.08)', 
          borderRadius: '24px', padding: '34px', display: 'flex', flexDirection: 'column', gap: '28px', 
          boxShadow: '0 30px 80px rgba(0,0,0,0.45)'
        }}>
          
          {/* Location */}
          <div data-dropdown="1" style={{ position: 'relative' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9CA3AF', marginBottom: '10px' }}>Location</label>
            <input 
              value={locQuery} 
              onChange={e => { setLocQuery(e.target.value); setLocOpen(true); }}
              onFocus={() => { setLocOpen(true); setCuisineOpen(false); setDiningOpen(false); }}
              placeholder="Search Bangalore areas…" 
              style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#FAFAFA', fontSize: '15px', fontFamily: "'Inter', sans-serif", outline: 'none' }}
            />
            {locOpen && filteredLocs.length > 0 && (
              <div style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0, zIndex: 30, background: '#161616', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '6px', maxHeight: '250px', overflow: 'auto', boxShadow: '0 24px 60px rgba(0,0,0,0.6)' }}>
                {filteredLocs.map(loc => (
                  <div key={loc} onClick={() => { setLocation(loc); setLocQuery(loc); setLocOpen(false); }} style={{ padding: '11px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', color: '#E5E5E5' }}>📍 {loc}</div>
                ))}
              </div>
            )}
          </div>

          {/* Cuisines */}
          <div data-dropdown="1" style={{ position: 'relative' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9CA3AF', marginBottom: '10px' }}>Cuisines</label>
            <input 
              value={cuisineQuery} 
              onChange={e => { setCuisineQuery(e.target.value); setCuisineOpen(true); }}
              onFocus={() => { setCuisineOpen(true); setLocOpen(false); setDiningOpen(false); }}
              placeholder="Search cuisines, or pick below…" 
              style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#FAFAFA', fontSize: '15px', fontFamily: "'Inter', sans-serif", outline: 'none' }}
            />
            {cuisineOpen && filteredCuisines.length > 0 && (
              <div style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0, zIndex: 30, background: '#161616', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '6px', maxHeight: '250px', overflow: 'auto', boxShadow: '0 24px 60px rgba(0,0,0,0.6)' }}>
                {filteredCuisines.map(cq => (
                  <div key={cq} onClick={() => { toggleCuisine(cq); setCuisineQuery(''); setCuisineOpen(false); }} style={{ padding: '11px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', color: '#E5E5E5' }}>🍴 {cq}</div>
                ))}
              </div>
            )}
            
            {selectedCuisineExtra.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '14px' }}>
                {selectedCuisineExtra.map(cx => (
                  <span key={cx} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 10px 8px 14px', borderRadius: '999px', background: 'linear-gradient(135deg,var(--g1),var(--g2))', color: '#0f0f0f', fontSize: '13px', fontWeight: 600 }}>
                    {cx}<span onClick={() => toggleCuisine(cx)} style={{ cursor: 'pointer', fontSize: '15px', opacity: .7 }}>×</span>
                  </span>
                ))}
              </div>
            )}
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '14px' }}>
              {popularCuisines.map(c => (
                <button key={c} onClick={() => toggleCuisine(c)} style={cuisines.includes(c) ? selChip : baseChip}>{c}</button>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9CA3AF', marginBottom: '12px' }}>Budget</label>
            <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '5px' }}>
              {budgets.map(b => {
                const isSelected = budget === b.key;
                return (
                  <button key={b.key} onClick={() => setBudget(b.key)} style={{
                    flex: 1, padding: '11px 6px', borderRadius: '10px', border: 'none', 
                    background: isSelected ? 'linear-gradient(135deg,var(--g1),var(--g2))' : 'transparent', 
                    color: isSelected ? '#0f0f0f' : '#9CA3AF', cursor: 'pointer', fontFamily: "'Inter', sans-serif", textAlign: 'center', transition: 'all .2s'
                  }}>
                    <span style={{ display: 'block', fontWeight: 600, fontSize: '14px' }}>{b.label}</span>
                    <span style={{ display: 'block', fontSize: '11px', marginTop: '2px', opacity: .75 }}>{b.sub}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Rating */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9CA3AF' }}>Minimum Rating</label>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '5px 12px', borderRadius: '999px', background: 'linear-gradient(135deg,var(--g1),var(--g2))', color: '#0f0f0f', fontWeight: 700, fontSize: '14px' }}>★ {minRating.toFixed(1)}+</span>
            </div>
            <div style={{ position: 'relative', height: '8px', borderRadius: '99px', background: 'rgba(255,255,255,0.08)' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${((minRating - 1) / 4) * 100}%`, borderRadius: '99px', background: 'linear-gradient(90deg,var(--g1),var(--g3))', pointerEvents: 'none' }}></div>
              <input type="range" min="1" max="5" step="0.1" value={minRating} onChange={e => setMinRating(parseFloat(e.target.value))} style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: '100%', margin: 0 }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#71717A', marginTop: '9px' }}><span>1.0</span><span>3.0</span><span>5.0</span></div>
          </div>

          {/* Dining Type */}
          <div data-dropdown="1" style={{ position: 'relative' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9CA3AF', marginBottom: '10px' }}>Dining Type</label>
            <input 
              value={diningQuery} 
              onChange={e => { setDiningQuery(e.target.value); setDiningOpen(true); }}
              onFocus={() => { setDiningOpen(true); setLocOpen(false); setCuisineOpen(false); }}
              placeholder="Search dining & restaurant types…" 
              style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#FAFAFA', fontSize: '15px', fontFamily: "'Inter', sans-serif", outline: 'none' }}
            />
            {diningOpen && filteredDining.length > 0 && (
              <div style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0, zIndex: 30, background: '#161616', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '6px', maxHeight: '250px', overflow: 'auto', boxShadow: '0 24px 60px rgba(0,0,0,0.6)' }}>
                {filteredDining.map(dq => (
                  <div key={dq} onClick={() => { toggleDining(dq); setDiningQuery(''); setDiningOpen(false); }} style={{ padding: '11px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', color: '#E5E5E5' }}>🍽️ {dq}</div>
                ))}
              </div>
            )}
            
            {selectedDiningExtra.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '14px' }}>
                {selectedDiningExtra.map(r => (
                  <span key={r} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 10px 8px 14px', borderRadius: '999px', background: 'linear-gradient(135deg,var(--g1),var(--g2))', color: '#0f0f0f', fontSize: '13px', fontWeight: 600 }}>
                    {r}<span onClick={() => toggleDining(r)} style={{ cursor: 'pointer', fontSize: '15px', opacity: .7 }}>×</span>
                  </span>
                ))}
              </div>
            )}
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '14px' }}>
              {diningTabs.map(d => (
                <button key={d} onClick={() => toggleDining(d)} style={diningTypes.includes(d) ? selChip : baseChip}>{d}</button>
              ))}
            </div>
          </div>

          {/* Preferences */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9CA3AF', marginBottom: '10px' }}>Additional Preferences</label>
            <input 
              value={prefs} 
              onChange={e => setPrefs(e.target.value)} 
              placeholder="family-friendly, rooftop, live music…" 
              style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#FAFAFA', fontSize: '15px', fontFamily: "'Inter', sans-serif", outline: 'none' }}
            />
          </div>

          <button 
            onClick={handleSubmit} 
            style={{
              marginTop: '6px', width: '100%', padding: '17px', borderRadius: '14px', border: 'none', 
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
            Find My Restaurant ✨
          </button>
        </div>
      </div>
    </section>
  );
}

export default PreferenceForm;
