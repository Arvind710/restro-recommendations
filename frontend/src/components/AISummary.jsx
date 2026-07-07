import React from 'react';
import { Sparkles } from 'lucide-react';

const AISummary = ({ summary }) => {
  if (!summary) return null;
  
  return (
    <div className="card glass ai-summary animate-fade-in">
      <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', marginBottom: '0.75rem', color: '#f59e0b' }}>
        <Sparkles size={20} /> AI Summary
      </h2>
      <p style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>{summary}</p>
    </div>
  );
};

export default AISummary;
