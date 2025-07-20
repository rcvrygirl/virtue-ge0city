import { useState, useEffect } from 'react';
import wordsData from '../../db/words.json';
import WordDisplay from './WordDisplay';
import './WordGenerator.scss';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import { hallOfFameRef } from '../../config/firebase';

const WordGenerator = () => {
  const [phraseStructure, setPhraseStructure] = useState('adjective-noun');
  const [generatedPhrase, setGeneratedPhrase] = useState('');
  const [history, setHistory] = useState([]);
  const [options, setOptions] = useState({
    capitalize: true,
    addNumber: false
  })
  const [isLoading, setIsLoading] = useState(true);
  const [savedPhrases, setSavedPhrases] = useState(() => {
    try {
      const saved = localStorage.getItem('savedPhrases');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to parse saved phrases", error);
      return [];
    }
  });

  useEffect(() => {
    // Verify data is loaded correctly
    if (wordsData?.categories) {
      setIsLoading(false);
    } else {
      console.error('Word data failed to load');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('savedPhrases', JSON.stringify(savedPhrases));
  }, [savedPhrases]);

  const generateRandomWord = (category) => {
    try {
      if (!wordsData?.categories?.[category]) {
        console.error(`Category "${category}" not found`);
        return 'unknown';
      }
      
      const words = wordsData.categories[category];
      if (!words?.length) {
        console.error(`No words found in category "${category}"`);
        return 'unknown';
      }
      
      return words[Math.floor(Math.random() * words.length)];
    } catch (error) {
      console.error('Error generating word:', error);
      return 'error';
    }
  };

  const generatePhrase = () => {
    if (isLoading) return;

    let phrase = '';
    
    try {
      switch (phraseStructure) {
        case 'noun-preposition-adjective-noun':
          phrase = `${generateRandomWord('nouns')} ${generateRandomWord('prepositions')} ${generateRandomWord('adjectives')} ${generateRandomWord('nouns')}`;
          break;
        case 'adjective-noun':
          phrase = `${generateRandomWord('adjectives')} ${generateRandomWord('nouns')}`;
          break;
        case 'verb-noun':
          phrase = `${generateRandomWord('verbs')} ${generateRandomWord('nouns')}`;
          break;
        case 'noun-prep-noun':
          phrase = `${generateRandomWord('nouns')} ${generateRandomWord('prepositions')} ${generateRandomWord('nouns')}`;
          break;
        case 'noun-noun':
          phrase = `${generateRandomWord('nouns')} ${generateRandomWord('nouns')}`;
          break;
        case 'verb-noun-noun':
          phrase = `${generateRandomWord('verbs')} ${generateRandomWord('nouns')} ${generateRandomWord('nouns')}`;
            break;                  
          
        default:
          phrase = `${generateRandomWord('adjectives')} ${generateRandomWord('nouns')}`;
      }

      // Apply options
      if (options.capitalize) {
        phrase = phrase.split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }
      
      if (options.addNumber) {
        const randomNum = Math.floor(Math.random() * 10) + 1;
        phrase += ` ${randomNum}`;
      }
      
      setGeneratedPhrase(phrase);
      setHistory(prev => [phrase, ...prev].slice(0, 10));
    } catch (error) {
      console.error('Error generating phrase:', error);
      setGeneratedPhrase('Error generating phrase');
    }
  };

  const handleOptionChange = (e) => {
    const { name, value, type, checked } = e.target;
    setOptions(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const deletePhrase = (indexToDelete) => {
    setHistory(prev => prev.filter((_, index) => index !== indexToDelete));
  };

  // Save phrase
  const savePhrase = (phrase) => {
    if (!savedPhrases.includes(phrase)) {
      setSavedPhrases(prev => [...prev, phrase]);
    }
  };

  // Remove saved phrase
  const removeSavedPhrase = (index) => {
    setSavedPhrases(prev => prev.filter((_, i) => i !== index));
  };

  // Export saved phrases
  const exportPhrases = () => {
    const phrasesText = savedPhrases.join(', ');
    const blob = new Blob([phrasesText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-saved-phrases.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // hall of fame prep logic 

  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [currentPhraseToSubmit, setCurrentPhraseToSubmit] = useState('');
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('hallOfFameUsername') || '';
  });

  const prepareForSubmission = (phrase) => {
    setCurrentPhraseToSubmit(phrase);
    if (username) {
      submitToHallOfFame(phrase, username);
    } else {
      setShowUsernameModal(true);
    }
  };

  const submitToHallOfFame = async (phrase, name) => {
    try {
      await addDoc(hallOfFameRef, {
        phrase,
        timestamp: serverTimestamp(),
        votes: 0,
        submittedBy: name || "Anonymous",
        userSessionId: localStorage.getItem('userSessionId') || null
      });
      alert("Submitted to Hall of Fame! <3");
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('hallOfFameUsername', username);
    
    // Generate a unique session ID if none exists
    if (!localStorage.getItem('userSessionId')) {
      localStorage.setItem('userSessionId', crypto.randomUUID());
    }
    
    submitToHallOfFame(currentPhraseToSubmit, username);
    setShowUsernameModal(false);
  };

  // loading...

  if (isLoading) {
    return (
      <div className="generator-container">
        <div className="generator-card">
          <div className="loading">Loading word database...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="generator-container">
      <div className="generator-card">
        <h1>Yugioh Poetry Generator</h1>
        
        <div className="controls">
          <div className="structure-selector">
            <h3>Phrase Craft:</h3>
            <div className="structure-options">
              <label>
                <input
                  type="radio"
                  name="structure"
                  value="noun-preposition-adjective-noun"
                  checked={phraseStructure === 'noun-preposition-adjective-noun'}
                  onChange={() => setPhraseStructure('noun-preposition-adjective-noun')}
                />
                Noun + Preposition + Adjective + Noun
              </label>
              
              <label>
                <input
                  type="radio"
                  name="structure"
                  value="adjective-noun"
                  checked={phraseStructure === 'adjective-noun'}
                  onChange={() => setPhraseStructure('adjective-noun')}
                />
                Adjective + Noun
              </label>
              <label>
                <input
                  type="radio"
                  name="structure"
                  value="verb-noun"
                  checked={phraseStructure === 'verb-noun'}
                  onChange={() => setPhraseStructure('verb-noun')}
                />
                Verb + Noun
              </label>
              <br></br>
              <label>
                <input
                  type="radio"
                  name="structure"
                  value="'noun-prep-noun'"
                  checked={phraseStructure === 'noun-prep-noun'}
                  onChange={() => setPhraseStructure('noun-prep-noun')}
                />
                Noun + Preposition + Noun
              </label>
              <label>
                <input
                  type="radio"
                  name="structure"
                  value="noun-noun"
                  checked={phraseStructure === 'noun-noun'}
                  onChange={() => setPhraseStructure('noun-noun')}
                />
                Noun + Noun
              </label>
              <label>
                <input
                  type="radio"
                  name="structure"
                  value="verb-noun-noun"
                  checked={phraseStructure === 'verb-noun-noun'}
                  onChange={() => setPhraseStructure('verb-noun-noun')}
                />
                Verb + Noun + Noun
              </label>
            </div>
          </div>
          
          {/* <div className="options">
            <label className="option">
              <input
                type="checkbox"
                name="capitalize"
                checked={options.capitalize}
                onChange={handleOptionChange}
              />
              Capitalize Words
            </label>
            
            <label className="option">
              <input
                type="checkbox"
                name="addNumber"
                checked={options.addNumber}
                onChange={handleOptionChange}
              />
              Add Random Number
            </label>
          </div> */}
          
          <button 
            onClick={generatePhrase} 
            className="generate-button"
            disabled={isLoading}
          >
            Summon
          </button>
        </div>
        {/* TODO do something magic with this later, make it do like a fun presentation of new words animation */}
        {/* <WordDisplay word={generatedPhrase} /> */}

        {/* Saved Phrases Section */}
      {savedPhrases.length > 0 && (
        <div className="saved-phrases">
          <div className="section-header">
            <h3>Saved Phrases ({savedPhrases.length})</h3>
          </div>
          <ul>
            {savedPhrases.map((phrase, index) => (
              <li key={index}>
                <span>{phrase}</span>
                <div className="phrase-actions">
                  <button 
                    className="save-btn saved"
                    onClick={() => removeSavedPhrase(index)}
                    aria-label={`Remove ${phrase}`}
                  >
                    ✓ Saved
                  </button>
                  <button 
                    className="delete-button"
                    onClick={() => removeSavedPhrase(index)}
                    aria-label={`Delete ${phrase}`}
                  >
                    ×
                  </button>
                  <button
                    onClick={() => prepareForSubmission(phrase)}
                    className="medal-submit-btn"
                    aria-label="Submit to Hall of Fame"
                    title="Submit to Hall of Fame"
                  >
                    🏅+
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button 
              className="export-button"
              onClick={exportPhrases}
              disabled={savedPhrases.length === 0}
            >
              Export All
            </button>
        </div>
      )}
            {/* Username Modal */}
            {showUsernameModal && (
        <div className="modal-overlay">
          <div className="username-modal">
            <h3>Choose a Display Name</h3>
            <form onSubmit={handleUsernameSubmit}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your username"
                required
                minLength={2}
                maxLength={20}
              />
              <div className="modal-actions">
                <button type="submit">Submit</button>
                <button 
                  type="button" 
                  onClick={() => setShowUsernameModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

{history.length > 0 && (
        <div className="history">
            <div> 
                <h3>
                    Recent Creations
                <button 
                    className="clear-all-button"
                    onClick={() => setHistory([])}>
                    Clear All
                </button>
                </h3>
            </div>
          <ul>
            {history.map((phrase, index) => (
              <li key={index}>
                <span>{phrase}</span>
                <div className="phrase-actions">
                  <button 
                    className={`save-btn ${savedPhrases.includes(phrase) ? 'saved' : ''}`}
                    onClick={() => savePhrase(phrase)}
                    disabled={savedPhrases.includes(phrase)}
                    aria-label={savedPhrases.includes(phrase) ? 'Already saved' : `Save ${phrase}`}
                  >
                    {savedPhrases.includes(phrase) ? '✓ Saved' : 'Save'}
                  </button>
                  <button
          className="delete-button"
            onClick={() => deletePhrase(index)}
            aria-label={`Delete phrase: ${phrase}`}
          >
            ×
          </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      </div>
    </div>
  );
};

export default WordGenerator;