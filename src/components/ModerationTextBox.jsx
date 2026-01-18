import { useState, useEffect, useRef } from 'react';
import { Shield, AlertCircle } from 'lucide-react';
import { moderateTextRealtime } from '../services/aiModerationService';

const ModerationTextBox = ({
  value,
  onChange,
  placeholder = 'Share your travel experience...',
  rows = 6,
  className = '',
}) => {
  const [moderationResult, setModerationResult] = useState({
    moderatedText: '',
    detectedWords: [],
    isClean: true,
  });
  const [showWarning, setShowWarning] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Debounce moderation check
    timeoutRef.current = setTimeout(() => {
      if (value) {
        moderateTextRealtime(value, (result) => {
          setModerationResult(result);
          setShowWarning(!result.isClean);

          // Auto-apply moderation if content is not clean
          if (!result.isClean && result.moderatedText !== value) {
            onChange(result.moderatedText);
          }
        });
      } else {
        setModerationResult({ moderatedText: '', detectedWords: [], isClean: true });
        setShowWarning(false);
      }
    }, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, onChange]);

  return (
    <div className={`relative ${className}`}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`input-field ${showWarning ? 'border-yellow-400 focus:ring-yellow-400' : ''}`}
      />
      
      {/* Moderation Status */}
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {moderationResult.isClean ? (
            <div className="flex items-center space-x-1 text-green-600 text-sm">
              <Shield className="h-4 w-4" />
              <span>Content is clean</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1 text-yellow-600 text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>
                {moderationResult.detectedWords.length} word(s) moderated
              </span>
            </div>
          )}
        </div>
        <span className="text-sm text-gray-500">
          {value.length} characters
        </span>
      </div>

      {/* Warning Tooltip */}
      {showWarning && moderationResult.detectedWords.length > 0 && (
        <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>AI Moderation:</strong> Some words were automatically moderated to ensure a safe environment.
            {moderationResult.detectedWords.length > 0 && (
              <span className="block mt-1">
                Detected: {moderationResult.detectedWords.join(', ')}
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default ModerationTextBox;

