import { useState } from 'react';
import { useScroll } from '../../hooks/useScroll';
import './header.scss';
import bgHome from '../../assets/saturn.png';
import books from '../../assets/books-icon.png'
import tumblr from '../../assets/blood1.png'

import './header.scss'; // SCSS styles

const Header = () => {
  const isScrolled = useScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Navigation items with permanent background images
  const navItems = [
    { id: 1, text: 'Home Planet', bgImage: bgHome },
    { id: 3, text: 'Top Picks', bgImage: tumblr},
    { id: 2, text: 'Guest Book', bgImage: books},
  ];

  return (
    <header className="header">
      <div className="header__container">
        {/* Logo */}
        <div className="header__logo">
        <div className={`${isScrolled ? 'header__hidden' : 'header__logo'}`}>
          {/* <a href="/">Berry me in the realm of release...</a> */}
        </div>
        </div>

        {/* Navigation with permanent backgrounds */}
        <nav className="header__nav">
          <ul>
            {navItems.map((item) => (
              <li 
                key={item.id}
                className="header__nav-item"
                style={{ 
                  '--bg-image': `url(${item.bgImage})`,
                  '--text-color': '#fff', // Adjust based on image brightness
                }}
              >
                <a href={`${item.text.toLowerCase().replace(/ /g, '')}`}>{item.text}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="header__hamburger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="header__mobile-menu">
            <button 
              className="header__close-btn"
              onClick={() => setIsMenuOpen(false)}
            >
              ×
            </button>
            <ul>
              <li><a href="/" onClick={() => setIsMenuOpen(false)}>Home Planet</a></li>
              <li><a href="/guestbook" onClick={() => setIsMenuOpen(false)}>Guest book</a></li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
