import React, { useState, useEffect } from 'react';
import text from "@/i18n/en/text.json";

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
      <div className="logo"><a href="#hero">{text.header.mainHeader.logo}</a></div>
      <nav className="nav-bar">
        <ul className="nav-links">
          <li><a href="#articles">{text.header.mainHeader.navMenu.articles}</a></li>
          <li><a href="#videos">{text.header.mainHeader.navMenu.videos}</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
