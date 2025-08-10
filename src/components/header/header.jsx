import { useState, useEffect } from 'react';
import { useScroll } from '../../hooks/useScroll';
import './header.scss';
import bgHome from '../../assets/saturn.png';
import library from '../../assets/books-icon.png';
import tumblr from '../../assets/tumblr-icon.png';
import books from '../../assets/book-icon.png';
import hallOfFame from '../../assets/blood1.png';
import generator from '../../assets/left-clover.png';
import { useLocation } from 'react-router-dom';
import SolarTerm from '../chinese-calendar/SolarTerm';
import NoongarSeason from '../noongar-calendar/NoongarSeasons';

const Header = () => {
  const isScrolled = useScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState('');

  const navItems = [
    { id: 1, text: 'Home Planet', bgImage: bgHome },
    { id: 5, text: 'Yugioh Poetry Generator', bgImage: hallOfFame },
    { id: 0, text: 'Hall of Fame', bgImage: generator },
    { id: 4, text: 'Guestbook', bgImage: books },
    { id: 2, text: 'Library', bgImage: library },
    { id: 3, text: 'Tumblr', bgImage: tumblr },
  ];

  const pathMapping = {
    '/': {
      id: 'homeplanet',
      title: 'hey'
    },
    '/yugiohpoetrygenerator': {
      id: 'yugiohpoetrygenerator', 
      title: 'Yugioh Poetry Generator'
    },
    '/halloffame': {
      id: 'halloffame',
      title: 'Hall of Fame'
    },
    '/guestbook': {
      id: 'guestbook',
      title: 'Guest Book'
    },
    '/library': {
      id: 'library',
      title: 'Library'
    },
    '/tumblr': {
      id: 'tumblr',
      title: 'Image Gallery'
    }
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const routeData = pathMapping[currentPath] || {
      title: '',
      id: 'homeplanet'
    };
    setPageTitle(routeData.title);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__title-wrapper">
          <div className="header__page-title">
            <NoongarSeason />
            <SolarTerm />
          </div>
        </div>

        <div className="header__logo">
          <div className={`${isScrolled ? 'header__hidden' : 'header__logo'}`}>
          </div>
        </div>

        <nav className="header__nav">
          <ul>
            {navItems.map((item) => (
              <li 
                key={item.id}
                className={`header__nav-item ${
                  location.pathname === pathMapping[item.text.toLowerCase().replace(/ /g, '')] ||
                  (location.pathname === '/' && item.text === 'Home Planet')
                    ? 'active' 
                    : ''
                }`}
                style={{ 
                  '--bg-image': `url(${item.bgImage})`,
                  '--text-color': '#fff',
                }}
              >
                <a href={`${item.text.toLowerCase().replace(/ /g, '')}`}>
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button - Only shown when menu is closed */}
        {!isMenuOpen && (
          <button 
            className="header__hamburger"
            onClick={toggleMenu}
            aria-label="Open menu"
          >
            ☰
          </button>
        )}

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="header__mobile-menu">
            <button 
              className="header__close-btn"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              ×
            </button>
            <ul>
              {navItems.map((item) => (
                <li key={item.id}>
                  <a 
                    href={`${item.text.toLowerCase().replace(/ /g, '')}`}
                    onClick={closeMenu}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
