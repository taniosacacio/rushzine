import React, { useRef } from 'react';
import { Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './PuzzleBoard.css';

const PuzzleBoard = ({ 
  targetWordLength = 7, 
  clickedLetters = [],
  onReset,
  instruction = "Digite o nome do personagem da imagem para resolver o \"Puzzlee\".",
  onLetterType
}) => {
  const inputRef = useRef(null);

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    if (val.length > 0 && onLetterType) {
      const lastChar = val.slice(-1).toUpperCase();
      if (lastChar.match(/^[A-Z]$/)) {
        onLetterType(lastChar);
      }
      e.target.value = '';
    }
  };
  const slots = Array.from({ length: targetWordLength });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <div 
        className="easter-egg-spelling-container"
        onClick={handleContainerClick}
        style={{ position: 'relative', cursor: 'text' }}
      >
        <input 
          ref={inputRef}
          type="text"
          onChange={handleInputChange}
          style={{ 
            position: 'absolute', 
            opacity: 0, 
            height: 0, 
            width: 0, 
            border: 'none', 
            padding: 0, 
            margin: 0,
            overflow: 'hidden'
          }}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
        />
        {instruction && (
          <p className="easter-egg-instruction-inside">
            {instruction.split('\n').map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                {idx < instruction.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        )}
        <div className="easter-egg-spelling">
          {slots.map((_, index) => {
            const letter = clickedLetters[index];
            const isFilled = !!letter;
            const isSuccess = clickedLetters.length === targetWordLength;

            return (
              <motion.div
                key={index}
                className={`easter-egg-spelling-box ${
                  isSuccess ? 'success' : isFilled ? 'filled' : ''
                }`}
                animate={isFilled ? { scale: [0.8, 1.2, 1], borderColor: "#FFD700", color: "#FFD700", textShadow: "0 0 10px rgba(255,215,0,0.5)" } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {isFilled ? letter : <span className="spelling-box-dash">—</span>}
              </motion.div>
            );
          })}
        </div>
      </div>
      
      <div className="action-area mt-4">
        {clickedLetters.length > 0 && (
          <button onClick={onReset} className="btn-reset">
            <Trash2 size={16} />
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default PuzzleBoard;
