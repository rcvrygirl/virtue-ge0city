import { useState, useEffect } from 'react';
import seasonData from '../../db/noongar-seasons.json';
import './NoongarSeasons.scss';

const NoongarSeason = () => {
  const [currentSeason, setCurrentSeason] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const currentDate = new Date();
      const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
      
      const foundSeason = seasonData.seasons.find(season => 
        season.months.includes(currentMonth)
      );
      
      if (foundSeason) {
        setCurrentSeason({
          ...foundSeason,
          monthsDescription: `${foundSeason.months.join('-')}: ${foundSeason.description}`
        });
      } else {
        setError('No season data available for current month');
      }
    } catch (err) {
      setError('Failed to load season data');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="noongar-season loading">
        <div className="loading-spinner"></div>
        <span>Loading season information...</span>
      </div>
    );
  }

  if (error) {
    return <div className="noongar-season error">{error}</div>;
  }

  if (!currentSeason) {
    return <div className="noongar-season">Season information not available</div>;
  }

  return (
    <div className="noongar-season">
      <div className="season-content">
        <div className="noongar-season-title">{currentSeason.title}</div>
        <div className="noongar-season-subtitle">{currentSeason.subtitle}</div>
      </div>
      {/* <div 
        className="noongar-season-hover" 
        title={currentSeason.monthsDescription}
        aria-label="Season details"
      >
        <span className="question-mark">?</span>
        <span className="tooltip">{currentSeason.monthsDescription}</span>
      </div> */}
    </div>
  );
};

export default NoongarSeason;