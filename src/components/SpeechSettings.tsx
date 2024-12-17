import React, { useEffect, useState } from 'react';
import { Settings } from 'lucide-react';
import { SpeechSettings as SpeechSettingsType, getAvailableVoices } from '../utils/speech';

interface SpeechSettingsProps {
  settings: SpeechSettingsType;
  onSettingsChange: (settings: SpeechSettingsType) => void;
}

export function SpeechSettings({ settings, onSettingsChange }: SpeechSettingsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    getAvailableVoices().then(setVoices);
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
      >
        <Settings className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-10">
          <h3 className="font-semibold mb-4">Speech Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Rate</label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={settings.rate}
                onChange={(e) => onSettingsChange({ ...settings, rate: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Pitch</label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={settings.pitch}
                onChange={(e) => onSettingsChange({ ...settings, pitch: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Volume</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={settings.volume}
                onChange={(e) => onSettingsChange({ ...settings, volume: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Voice</label>
              <select
                value={settings.voice?.voiceURI || ''}
                onChange={(e) => {
                  const voice = voices.find(v => v.voiceURI === e.target.value) || null;
                  onSettingsChange({ ...settings, voice });
                }}
                className="w-full mt-1 rounded-md border-gray-300 shadow-sm"
              >
                <option value="">Default</option>
                {voices.map((voice) => (
                  <option key={voice.voiceURI} value={voice.voiceURI}>
                    {voice.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}