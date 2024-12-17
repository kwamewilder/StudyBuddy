import React, { useCallback, useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { parseFile } from '../utils/fileParser';

interface FileUploadProps {
  onFileSelect: (content: string) => void;
}

export function FileUpload({ onFileSelect }: FileUploadProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);

    const result = await parseFile(file);
    
    if (result.error) {
      setError(result.error);
    } else if (result.content.trim()) {
      onFileSelect(result.content);
    } else {
      setError('The file appears to be empty');
    }

    setIsLoading(false);
  }, [onFileSelect]);

  return (
    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
      <Upload className="w-12 h-12 text-gray-400 mb-4" />
      <label className="cursor-pointer">
        <span className={`${
          isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
        } text-white px-4 py-2 rounded-lg transition-colors`}>
          {isLoading ? 'Processing...' : 'Choose File'}
        </span>
        <input
          type="file"
          className="hidden"
          accept=".txt,.docx,.pdf"
          onChange={handleFileChange}
          disabled={isLoading}
        />
      </label>
      <p className="mt-2 text-sm text-gray-500">
        Upload .txt, .docx, or .pdf files
      </p>
      {error && (
        <div className="mt-4 flex items-center text-red-500">
          <AlertCircle className="w-4 h-4 mr-2" />
          <span className="text-sm">{error}</span>
        </div>
      )}
    </div>
  );
}