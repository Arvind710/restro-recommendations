import React from 'react';
import { Star, MapPin, IndianRupee, Utensils } from 'lucide-react';

const RestaurantCard = ({ restaurant, index }) => {
  return (
    <div className={`card restaurant-card animate-fade-in delay-${(index % 3 + 1) * 100}`}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{restaurant.name}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <MapPin size={14} /> {restaurant.location}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', backgroundColor: '#22c55e', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontWeight: 'bold' }}>
          {restaurant.rating} <Star size={14} fill="currentColor" />
        </div>
      </div>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
        <span className="badge"><IndianRupee size={12} /> {restaurant.cost_for_two} for two</span>
        <span className="badge"><Utensils size={12} style={{marginRight: '0.25rem'}}/> {restaurant.rest_type}</span>
        {restaurant.online_order && <span className="badge" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#93c5fd' }}>Online Order</span>}
        {restaurant.book_table && <span className="badge" style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)', color: '#d8b4fe' }}>Book Table</span>}
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}><strong>Cuisines:</strong> {restaurant.cuisines?.join(', ')}</p>
        {restaurant.dish_liked?.length > 0 && (
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}><strong>Liked:</strong> {restaurant.dish_liked.join(', ')}</p>
        )}
      </div>
      
      <div style={{ padding: '1rem', backgroundColor: 'var(--bg-color-secondary)', borderRadius: '0.5rem', borderLeft: '4px solid var(--primary-color)' }}>
        <h4 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Explanation</h4>
        <p style={{ fontSize: '0.95rem' }}>{restaurant.ai_explanation}</p>
      </div>
    </div>
  );
};

export default RestaurantCard;
