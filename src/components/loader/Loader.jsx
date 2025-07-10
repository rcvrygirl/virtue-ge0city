// components/Loader.jsx
import { useState, useEffect } from 'react';
import './Loader.scss';

export default function Loader({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for fonts to load
    document.fonts.ready.then(() => {
      // Wait for images to load
      Promise.all(
        Array.from(document.images).map(img => {
          if (img.complete) return Promise.resolve();
          return new Promise(resolve => {
            img.addEventListener('load', resolve);
            img.addEventListener('error', resolve);
          });
        })
      ).then(() => {
        // Additional delay for smoother transition (optional)
        setTimeout(() => setIsLoading(false), 300);
      });
    });
  }, []);

  if (isLoading) {
    return (
      <div className="loader-overlay">
        <div className="loader-spinner"></div>
      </div>
    );
  }

  return children;
}