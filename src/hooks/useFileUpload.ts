import { useState, useCallback } from 'react';
import { parseFile } from '../utils/fileParser';
import { ParseResult } from '../types';

export const useFileUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(async (file: File): Promise<ParseResult> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await parseFile(file);
      if (result.error) {
        setError(result.error);
      }
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return { content: '', error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    handleFile,
  };
};