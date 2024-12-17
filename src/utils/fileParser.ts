import mammoth from 'mammoth';
import * as PDFJS from 'pdfjs-dist';
import { ParseResult } from '../types';

async function parseTextFile(file: File): Promise<ParseResult> {
  try {
    const content = await file.text();
    return { content };
  } catch (error) {
    return { content: '', error: 'Failed to read text file' };
  }
}

async function parseDocxFile(file: File): Promise<ParseResult> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return { content: result.value };
  } catch (error) {
    return { content: '', error: 'Failed to read DOCX file' };
  }
}

async function parsePdfFile(file: File): Promise<ParseResult> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFJS.getDocument({ data: arrayBuffer }).promise;
    
    let content = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      content += textContent.items
        .map((item: any) => item.str)
        .join(' ') + '\n';
    }
    
    return { content: content.trim() };
  } catch (error) {
    return { content: '', error: 'Failed to read PDF file' };
  }
}

export function parseFile(file: File): Promise<ParseResult> {
  switch (file.type) {
    case 'text/plain':
      return parseTextFile(file);
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return parseDocxFile(file);
    case 'application/pdf':
      return parsePdfFile(file);
    default:
      return Promise.resolve({ content: '', error: 'Unsupported file type' });
  }
}