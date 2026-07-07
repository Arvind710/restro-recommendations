import React from 'react';

const LoadingState = () => {
  return (
    <div className="animate-fade-in" style={{ marginTop: '2rem' }}>
      <div className="loading-skeleton" style={{ height: '120px', marginBottom: '2rem' }}></div>
      <div className="grid grid-cols-1 grid-cols-2">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="card loading-skeleton" style={{ height: '300px' }}></div>
        ))}
      </div>
    </div>
  );
};

export default LoadingState;
