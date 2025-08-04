import solarTerms from '../../db/solar.json'

const SolarTerm = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  
  // Find the current solar term
  const getCurrentSolarTerm = () => {
    // Convert today's date to ISO format (YYYY-MM-DD)
    const todayISO = today.toISOString().split('T')[0];
    
    // Find the term where today is after the previous term but before the next one
    for (let i = 0; i < solarTerms.length; i++) {
      const term = solarTerms[i];
      const termDate = currentYear === 2025 ? term.iso_format2025 : term.iso_format2026;
      
      // If today is exactly the term date
      if (todayISO === termDate) {
        return term;
      }
      
      // If today is between this term and the next one
      if (i < solarTerms.length - 1) {
        const nextTerm = solarTerms[i + 1];
        const nextTermDate = currentYear === 2025 ? nextTerm.iso_format2025 : nextTerm.iso_format2026;
        
        if (todayISO > termDate && todayISO < nextTermDate) {
          return term;
        }
      }
    }
    
    // Handle the case after the last term of the year
    const lastTerm = solarTerms[solarTerms.length - 1];
    const lastTermDate = currentYear === 2025 ? lastTerm.iso_format2025 : lastTerm.iso_format2026;
    
    if (todayISO >= lastTermDate) {
      return lastTerm;
    }
    
    // Default to first term if before all terms (shouldn't happen with complete data)
    return solarTerms[0];
  };
  
  const currentTerm = getCurrentSolarTerm();

  return (
    <div className="solar-term">
      <div className="solar-term-english">{currentTerm.englishTitle}</div>
      <div className="solar-term-chinese">{currentTerm.chineseTitle}</div>
    </div>
  );
};

export default SolarTerm;