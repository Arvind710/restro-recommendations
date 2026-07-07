import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Restro Recs. AI Powered Recommendations for Bangalore.</p>
      </div>
    </footer>
  );
};

export default Footer;
