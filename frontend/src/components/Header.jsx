import React from 'react';
import { Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          <Utensils className="logo-icon" />
          <span className="text-gradient">Restro Recs</span>
        </Link>
        <nav>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
