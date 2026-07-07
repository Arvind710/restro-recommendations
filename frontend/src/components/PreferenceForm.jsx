import React, { useState, useEffect } from 'react';
import { getLocations, getCuisines } from '../utils/api';
import { Search, MapPin, UtensilsCrossed, IndianRupee, Star, Coffee } from 'lucide-react';

const PreferenceForm = ({ onSearch, isLoading }) => {
  const [locations, setLocations] = useState([]);
  const [availableCuisines, setAvailableCuisines] = useState([]);
  
  const [formData, setFormData] = useState({
    location: '',
    cuisines: [],
    budget: 'medium',
    min_rating: 3.5,
    dining_type: '',
    preferences: ''
  });

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [locs, cuiss] = await Promise.all([getLocations(), getCuisines()]);
        setLocations(locs);
        setAvailableCuisines(cuiss);
        if (locs.length > 0) {
          setFormData(prev => ({ ...prev, location: locs[0] }));
        }
      } catch (err) {
        console.error('Failed to load form options:', err);
      }
    };
    fetchDropdowns();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCuisineToggle = (cuisine) => {
    setFormData(prev => {
      const current = prev.cuisines;
      if (current.includes(cuisine)) {
        return { ...prev, cuisines: current.filter(c => c !== cuisine) };
      }
      if (current.length >= 5) return prev; // max 5
      return { ...prev, cuisines: [...current, cuisine] };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.location) return;
    onSearch(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="card glass form-container animate-fade-in delay-100">
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label"><MapPin size={16} style={{display:'inline', marginRight:'0.5rem', verticalAlign:'text-bottom'}} />Location</label>
          <select 
            name="location" 
            value={formData.location} 
            onChange={handleChange}
            className="form-control"
            required
          >
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label className="form-label"><IndianRupee size={16} style={{display:'inline', marginRight:'0.5rem', verticalAlign:'text-bottom'}} />Budget</label>
          <select 
            name="budget" 
            value={formData.budget} 
            onChange={handleChange}
            className="form-control"
          >
            <option value="low">Low (₹0 - ₹500)</option>
            <option value="medium">Medium (₹500 - ₹1500)</option>
            <option value="high">High (₹1500+)</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label"><UtensilsCrossed size={16} style={{display:'inline', marginRight:'0.5rem', verticalAlign:'text-bottom'}} />Cuisines (Select up to 5)</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', maxHeight: '150px', overflowY: 'auto', padding: '0.5rem', backgroundColor: 'var(--bg-color-secondary)', borderRadius: '0.5rem', border: '1px solid var(--card-border)' }}>
          {availableCuisines.slice(0, 50).map(cuisine => (
            <button
              key={cuisine}
              type="button"
              onClick={() => handleCuisineToggle(cuisine)}
              className={`badge ${formData.cuisines.includes(cuisine) ? 'badge-primary' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              {cuisine}
            </button>
          ))}
        </div>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label className="form-label"><Star size={16} style={{display:'inline', marginRight:'0.5rem', verticalAlign:'text-bottom'}} />Minimum Rating: {formData.min_rating}</label>
          <input 
            type="range" 
            name="min_rating" 
            min="1.0" max="5.0" step="0.1" 
            value={formData.min_rating} 
            onChange={handleChange}
            style={{ width: '100%', accentColor: 'var(--primary-color)' }}
          />
        </div>
        
        <div className="form-group">
          <label className="form-label"><Coffee size={16} style={{display:'inline', marginRight:'0.5rem', verticalAlign:'text-bottom'}} />Dining Type (Optional)</label>
          <input 
            type="text" 
            name="dining_type" 
            value={formData.dining_type} 
            onChange={handleChange}
            placeholder="e.g. Dine-out, Delivery, Cafe"
            className="form-control"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Special Preferences (Optional)</label>
        <textarea 
          name="preferences" 
          value={formData.preferences} 
          onChange={handleChange}
          placeholder="e.g. family-friendly, date night, outdoor seating"
          className="form-control"
          rows="3"
        ></textarea>
      </div>

      <button type="submit" disabled={isLoading} className="btn btn-primary" style={{ width: '100%', fontSize: '1.125rem' }}>
        {isLoading ? 'Searching...' : <><Search size={20} /> Find My Restaurant ✨</>}
      </button>
    </form>
  );
};

export default PreferenceForm;
