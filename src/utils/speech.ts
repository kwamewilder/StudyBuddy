import { SpeechSettings } from '../types';

export const defaultSpeechSettings: SpeechSettings = {
  rate: 1,
  pitch: 1,
  volume: 1,
  voice: null,
};

export function getAvailableVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve(voices);
    } else {
      speechSynthesis.onvoiceschanged = () => {
        resolve(speechSynthesis.getVoices());
      };
    }
  });
}