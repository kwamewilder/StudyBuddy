import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { TextReader } from './components/TextReader';
import { TypingArea } from './components/TypingArea';
import { ScoreDisplay } from './components/ScoreDisplay';
import { Header } from './components/Header';
import { AppState } from './types';

const App = () => {
  const [state, setState] = useState<AppState>('upload');
  const [content, setContent] = useState('');
  const [typedText, setTypedText] = useState('');
  const [wpm, setWpm] = useState(0);

  const handleFileSelect = (text: string) => {
    setContent(text);
    setState('listening');
  };

  const handleListeningComplete = () => {
    setState('typing');
  };

  const handleTypingComplete = (text: string, speed: number) => {
    setTypedText(text);
    setWpm(speed);
    setState('results');
  };

  const handleRetry = () => {
    setState('listening');
    setTypedText('');
    setWpm(0);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {state === 'upload' && (
          <div className="max-w-md mx-auto">
            <FileUpload onFileSelect={handleFileSelect} />
          </div>
        )}

        {state === 'listening' && (
          <div className="space-y-8">
            <TextReader text={content} onComplete={handleListeningComplete} />
            <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow">
              <p className="text-gray-700">{content}</p>
            </div>
          </div>
        )}

        {state === 'typing' && (
          <TypingArea originalText={content} onComplete={handleTypingComplete} />
        )}

        {state === 'results' && (
          <ScoreDisplay
            originalText={content}
            typedText={typedText}
            wpm={wpm}
            onRetry={handleRetry}
          />
        )}
      </main>
    </div>
  );
};

export default App;