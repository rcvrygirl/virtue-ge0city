import PropTypes from 'prop-types';

const WordDisplay = ({ word }) => {
  return (
    <div className="word-display">
      {word ? (
        <div className="word">{word}</div>
      ) : (
        <div className="placeholder">Click "Generate" to summon</div>
      )}
    </div>
  );
};

WordDisplay.propTypes = {
  word: PropTypes.string
};

export default WordDisplay;