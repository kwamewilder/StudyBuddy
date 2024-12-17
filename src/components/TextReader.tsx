import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { SpeechSettings } from './SpeechSettings';
import { defaultSpeechSettings, SpeechSettings as SpeechSettingsType } from '../utils/speech';

interface TextReaderProps {
  text: string;
  onComplete: () => void;
}

export function TextReader({ text, onComplete }: TextReaderProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const [settings, setSettings] = useState<SpeechSettingsType>(defaultSpeechSettings);

  useEffect(() => {
    const newUtterance = new SpeechSynthesisUtterance(text);
    newUtterance.onend = () => {
      setIsPlaying(false);
      setProgress(100);
      onComplete();
    };
    newUtterance.onboundary = (event) => {
      const progress = (event.charIndex / text.length) * 100;
      setProgress(Math.min(progress, 100));
    };
    
    // Apply settings
    newUtterance.rate = settings.rate;
    newUtterance.pitch = settings.pitch;
    newUtterance.volume = settings.volume;
    if (settings.voice) {
      newUtterance.voice = settings.voice;
    }
    
    setUtterance(newUtterance);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [text, onComplete, settings]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      window.speechSynthesis.pause();
    } else {
      if (progress === 100) {
        setProgress(0);
      }
      window.speechSynthesis.speak(utterance!);
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, progress, utterance]);

  const restart = useCallback(() => {
    window.speechSynthesis.cancel();
    setProgress(0);
    setIsPlaying(false);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="flex items-center justify-center space-x-4 mb-4">
        <button
          onClick={togglePlay}
          className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>
        <button
          onClick={restart}
          className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
        <SpeechSettings settings={settings} onSettingsChange={setSettings} />
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}