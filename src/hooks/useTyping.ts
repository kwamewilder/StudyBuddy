import { useState, useEffect } from 'react';
import { calculateWPM } from '../utils/typing';

export const useTyping = () => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);

  const startTyping = () => {
    setStartTime(Date.now());
  };

  const updateWPM = (text: string) => {
    if (startTime && text.length > 0) {
      const timeInSeconds = (Date.now() - startTime) / 1000;
      const currentWpm = calculateWPM(text, timeInSeconds);
      setWpm(currentWpm);
    }
  };

  return {
    wpm,
    startTyping,
    updateWPM,
  };
};