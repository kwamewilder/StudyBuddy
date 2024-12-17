import React from 'react';
import { compareTexts } from '../utils/typing';

interface ScoreDisplayProps {
  originalText: string;
  typedText: string;
  wpm: number;
  onRetry: () => void;
}

export function ScoreDisplay({ originalText, typedText, wpm, onRetry }: ScoreDisplayProps) {
  const { words, errorDetails } = compareTexts(originalText, typedText);
  const totalErrors = errorDetails.insertions + errorDetails.deletions + errorDetails.substitutions;
  const accuracy = ((words.filter(w => w.status === 'correct').length / words.length) * 100);

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Results</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <span className="block text-sm text-gray-600">Speed</span>
          <span className="text-2xl font-bold text-blue-600">{wpm} WPM</span>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <span className="block text-sm text-gray-600">Accuracy</span>
          <span className="text-2xl font-bold text-blue-600">{accuracy.toFixed(1)}%</span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Error Details:</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-2 bg-red-50 rounded">
            <span className="block text-sm text-gray-600">Insertions</span>
            <span className="text-lg font-semibold text-red-600">{errorDetails.insertions}</span>
          </div>
          <div className="p-2 bg-red-50 rounded">
            <span className="block text-sm text-gray-600">Deletions</span>
            <span className="text-lg font-semibold text-red-600">{errorDetails.deletions}</span>
          </div>
          <div className="p-2 bg-red-50 rounded">
            <span className="block text-sm text-gray-600">Substitutions</span>
            <span className="text-lg font-semibold text-red-600">{errorDetails.substitutions}</span>
          </div>
        </div>
      </div>

      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Text Comparison:</h3>
        <div className="space-x-1">
          {words.map((word, index) => (
            <span
              key={index}
              className={`inline-block ${
                word.status === 'correct'
                  ? 'text-green-600'
                  : word.status === 'incorrect'
                  ? 'text-red-600 line-through'
                  : word.status === 'missing'
                  ? 'text-yellow-600 opacity-50'
                  : 'text-blue-600 underline'
              }`}
            >
              {word.text}{' '}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={onRetry}
        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}