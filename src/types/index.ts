// App Types
export type AppState = 'upload' | 'listening' | 'typing' | 'results';

// Speech Types
export interface SpeechSettings {
  rate: number;
  pitch: number;
  volume: number;
  voice: SpeechSynthesisVoice | null;
}

// Typing Types
export interface TypingMetrics {
  wpm: number;
  accuracy: number;
  errors: number;
  errorDetails: {
    insertions: number;
    deletions: number;
    substitutions: number;
  };
}

export interface WordComparison {
  text: string;
  status: 'correct' | 'incorrect' | 'missing' | 'extra';
}

// File Parser Types
export interface ParseResult {
  content: string;
  error?: string;
}