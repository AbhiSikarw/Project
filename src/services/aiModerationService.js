// AI Moderation Service
// This service simulates an AI-powered content moderation system
// In production, this would call a backend API with a trained NLP model

// List of abusive/toxic words (simplified - in production, use a comprehensive dataset)
const abusiveWords = [
  'hate', 'stupid', 'idiot', 'dumb', 'ugly', 'kill', 'die',
  // Add more words as needed
];

// Context-aware replacements
const replacements = {
  'hate': 'dislike',
  'stupid': 'unwise',
  'idiot': 'person',
  'dumb': 'unwise',
  'ugly': 'unpleasant',
  'kill': 'stop',
  'die': 'end',
};

/**
 * Detects abusive words in text
 * @param {string} text - Input text to check
 * @returns {Array} Array of detected abusive words
 */
export const detectAbusiveWords = (text) => {
  const words = text.toLowerCase().split(/\s+/);
  const detected = [];
  
  words.forEach(word => {
    // Remove punctuation for matching
    const cleanWord = word.replace(/[^\w]/g, '');
    if (abusiveWords.includes(cleanWord)) {
      detected.push(cleanWord);
    }
  });
  
  return [...new Set(detected)]; // Return unique words
};

/**
 * Moderates text by replacing abusive words
 * @param {string} text - Input text to moderate
 * @returns {Object} { moderatedText, detectedWords, isClean }
 */
export const moderateText = (text) => {
  if (!text || text.trim() === '') {
    return { moderatedText: text, detectedWords: [], isClean: true };
  }

  const words = text.split(/(\s+)/);
  const detectedWords = [];
  let isClean = true;

  const moderatedWords = words.map(word => {
    const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
    
    if (abusiveWords.includes(cleanWord)) {
      isClean = false;
      if (!detectedWords.includes(cleanWord)) {
        detectedWords.push(cleanWord);
      }
      
      // Replace with context-aware replacement or mask
      const replacement = replacements[cleanWord] || '***';
      return word.replace(/[\w]+/gi, (match) => {
        return match.toLowerCase() === cleanWord ? replacement : match;
      });
    }
    
    return word;
  });

  return {
    moderatedText: moderatedWords.join(''),
    detectedWords,
    isClean,
  };
};

/**
 * Real-time moderation as user types
 * @param {string} text - Current text input
 * @param {Function} callback - Callback function with moderation results
 */
export const moderateTextRealtime = (text, callback) => {
  // Simulate API delay (in production, this would be an actual API call)
  setTimeout(() => {
    const result = moderateText(text);
    callback(result);
  }, 100);
};

/**
 * Check if text contains any abusive content
 * @param {string} text - Text to check
 * @returns {boolean} True if text is clean
 */
export const isTextClean = (text) => {
  return moderateText(text).isClean;
};

