import { TypingMetrics, WordComparison } from '../types';

export function calculateWPM(text: string, timeInSeconds: number): number {
  const words = text.trim().split(/\s+/).length;
  const minutes = timeInSeconds / 60;
  return Math.round(words / minutes);
}

export function compareTexts(original: string, typed: string): {
  words: WordComparison[];
  errorDetails: { insertions: number; deletions: number; substitutions: number };
} {
  const originalWords = original.trim().split(/\s+/);
  const typedWords = typed.trim().split(/\s+/);
  
  const result: WordComparison[] = [];
  const errorDetails = { insertions: 0, deletions: 0, substitutions: 0 };
  
  let i = 0, j = 0;
  while (i < originalWords.length || j < typedWords.length) {
    if (i >= originalWords.length) {
      result.push({ text: typedWords[j], status: 'extra' });
      errorDetails.insertions++;
      j++;
    } else if (j >= typedWords.length) {
      result.push({ text: originalWords[i], status: 'missing' });
      errorDetails.deletions++;
      i++;
    } else if (originalWords[i] === typedWords[j]) {
      result.push({ text: originalWords[i], status: 'correct' });
      i++;
      j++;
    } else {
      result.push({ text: originalWords[i], status: 'incorrect' });
      errorDetails.substitutions++;
      i++;
      j++;
    }
  }
  
  return { words: result, errorDetails };
}