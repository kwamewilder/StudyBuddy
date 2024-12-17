import { useState, useCallback } from 'react';
import { SpeechSettings } from '../types';
import { defaultSpeechSettings, getAvailableVoices } from '../utils/speech';

export const useSpeech = (text: string) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [settings, setSettings] = useState<SpeechSettings>(defaultSpeechSettings);

  const speak = useCallback(() => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = settings.rate;
    utterance.pitch = settings.pitch;
    utterance.volume = settings.volume;
    if (settings.voice) {
      utterance.voice = settings.voice;
    }

    utterance.onboundary = (event) => {
      const progress = (event.charIndex / text.length) * 100;
      setProgress(Math.min(progress, 100));
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setProgress(100);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  }, [text, settings]);

  const pause = useCallback(() => {
    window.speechSynthesis.pause();
    setIsPlaying(false);
  }, []);

  const resume = useCallback(() => {
    window.speechSynthesis.resume();
    setIsPlaying(true);
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setProgress(0);
  }, []);

  return {
    isPlaying,
    progress,
    settings,
    setSettings,
    speak,
    pause,
    resume,
    stop,
    getAvailableVoices,
  };
};