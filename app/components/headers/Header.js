import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`header-container ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="nav-bar">
        <div className="logo">BlocksBuster</div>
        <ul className="nav-links">
          <li><a href="#articles">Articles</a></li>
          <li><a href="#videos">Videos</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
