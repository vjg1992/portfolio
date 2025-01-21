import { useState, useEffect, useRef } from 'react';

const phrases = [
  "Hi, I'm Vijay G!",
  "I am a Full Stack Developer!",
  "Let's Build Something Amazing...",
];

const DynamicTextDisplay = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [textSize, setTextSize] = useState(48); // Starting text size
  const [isWrapped, setIsWrapped] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  
  // Typewriter effect
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    if (currentText.length < currentPhrase.length) {
      const timeout = setTimeout(() => {
        setCurrentText(currentPhrase.slice(0, currentText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentText('');
        setTextSize(48); // Reset text size
        setIsWrapped(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [currentText, currentPhraseIndex]);

  // Check text overflow and adjust size
  useEffect(() => {
    if (textRef.current && containerRef.current) {
      const textWidth = textRef.current.scrollWidth;
      const containerWidth = containerRef.current.offsetWidth - 32; // Account for padding
      
      if (textWidth > containerWidth && !isWrapped) {
        // If text is wider than container and not wrapped yet
        if (textSize > 32) { // Don't go smaller than 32px
          setTextSize(32); // Immediately halve the text size
        } else {
          setIsWrapped(true); // Allow wrapping if we've reached minimum size
        }
      }
    }
  }, [currentText, textSize, isWrapped]);

  return (
    <div className="w-120 h-32 rounded-lg bg-white dark:bg-gray-900 shadow-lg dark:shadow-gray-800/30 p-4 transition-colors duration-300">
      <div 
        ref={containerRef}
        className="w-full h-full flex items-center justify-center overflow-hidden"
      >
        <p
          ref={textRef}
          className={`
            text-center 
            text-gray-900 dark:text-gray-100
            decoration-teal-500 dark:decoration-teal-400
            underline decoration-2 underline-offset-8 
            transition-all duration-300 ease-in-out
            font-bold
          `}
          style={{
            fontSize: `${textSize}px`,
            lineHeight: '1.2',
            maxWidth: '100%',
            whiteSpace: isWrapped ? 'normal' : 'nowrap'
          }}
        >
          {currentText}
          <span className="animate-blink ml-1">|</span>
        </p>
      </div>
    </div>
  );
};

export default DynamicTextDisplay;