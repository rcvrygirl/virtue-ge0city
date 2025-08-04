import { useState, useEffect } from 'react';
import { useScroll } from '../../hooks/useScroll';
import './header.scss';
import bgHome from '../../assets/saturn.png';
import library from '../../assets/books-icon.png'
import tumblr from '../../assets/tumblr-icon.png'
import books from '../../assets/book-icon.png'
import hallOfFame from '../../assets/blood1.png'
import generator from '../../assets/left-clover.png'
import { useLocation } from 'react-router-dom';

import './header.scss'; // SCSS styles
import SolarTerm from '../chinese-calendar/SolarTerm';

const Header = () => {
  const isScrolled = useScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState('');

  // Navigation items with permanent background images
  const navItems = [
    { id: 1, text: 'Home Planet', bgImage: bgHome },
    { id: 5, text: 'Yugioh Poetry Generator', bgImage: hallOfFame},
    { id: 0, text: 'Hall of Fame', bgImage: generator},
    { id: 4, text: 'Guestbook', bgImage: books },
    { id: 2, text: 'Library', bgImage: library},
    { id: 3, text: 'Tumblr', bgImage: tumblr},
  ];

  // // // Map of text-to-router paths for proper matching
  // const pathMapping = {
  //   'homeplanet': '/',
  //   'yugiohpoetrygenerator': '/yugiohpoetrygenerator',
  //   'halloffame': '/halloffame',
  //   'guestbook': '/guestbook',
  //   'library': '/library',
  //   'tumblr': '/tumblr'
  // };
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

  // Updated useEffect hook to use the new mapping
useEffect(() => {
  const currentPath = location.pathname;
  const routeData = pathMapping[currentPath] || {
    title: '', // Default fallback
    id: 'homeplanet'
  };
  
  setPageTitle(routeData.title);
  
  // If you still need the ID for other functionality:
  // const routeId = routeData.id;
  
}, [location.pathname]);


  // // Set page title based on current route
  // useEffect(() => {
  //   const getPageTitle = () => {
  //     // Get the current path
  //     const currentPath = location.pathname;

  //     // Check for home route
  //     if (currentPath === '/') return 'Home Planet';

  //     // Find matching nav item
  //     const matchedItem = navItems.find(item => {
  //       const linkPath = item.text.toLowerCase().replace(/ /g, '');
  //       const routerPath = pathMapping[linkPath];
  //       return currentPath === routerPath;
  //     });

  //     return matchedItem?.text || '';
  //   };

  //   setPageTitle(getPageTitle());
  // }, [location.pathname]);

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__title-wrapper">
    <div className="header__page-title">
      {/* {pageTitle} */}
      <SolarTerm />
    </div>
  </div>


        {/* Logo */}
        <div className="header__logo">
        <div className={`${isScrolled ? 'header__hidden' : 'header__logo'}`}>
        </div>
        </div>
        {/* Navigation - keep your original link generation */}
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
              <li><a href="/yugiohpoetrygenerator" onClick={() => setIsMenuOpen(false)}>Yugioh Poetry Generator</a></li>
              <li><a href="/halloffame" onClick={() => setIsMenuOpen(false)}>Hall of Fame</a></li>
              <li><a href="/tumblr" onClick={() => setIsMenuOpen(false)}>"Tumblr"</a></li>
              <li><a href="/library" onClick={() => setIsMenuOpen(false)}>Library</a></li>
              <li><a href="/guestbook" onClick={() => setIsMenuOpen(false)}>Guest Book</a></li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
