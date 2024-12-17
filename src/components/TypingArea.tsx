import React, { useState, useCallback, useEffect } from 'react';
import { calculateWPM } from '../utils/typing';

interface TypingAreaProps {
  originalText: string;
  onComplete: (typedText: string, wpm: number) => void;
}

export function TypingArea({ originalText, onComplete }: TypingAreaProps) {
  const [typedText, setTypedText] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);

  useEffect(() => {
    if (typedText.length === 1) {
      setStartTime(Date.now());
    }
    
    if (startTime && typedText.length > 0) {
      const timeInSeconds = (Date.now() - startTime) / 1000;
      const currentWpm = calculateWPM(typedText, timeInSeconds);
      setWpm(currentWpm);
    }
  }, [typedText, startTime]);

  const handleSubmit = useCallback(() => {
    if (startTime) {
      const timeInSeconds = (Date.now() - startTime) / 1000;
      const finalWpm = calculateWPM(typedText, timeInSeconds);
      onComplete(typedText, finalWpm);
    }
  }, [typedText, startTime, onComplete]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {wpm > 0 && (
        <div className="mb-4 text-lg font-semibold text-gray-700">
          Current Speed: {wpm} WPM
        </div>
      )}
      <textarea
        className="w-full h-48 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={typedText}
        onChange={(e) => setTypedText(e.target.value)}
        placeholder="Type the text you heard here..."
      />
      <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Submit
      </button>
    </div>
  );
}