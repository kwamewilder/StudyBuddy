export function calculateAccuracy(original: string, typed: string): { accuracy: number; errors: number } {
  const maxLength = Math.max(original.length, typed.length);
  let errors = 0;

  for (let i = 0; i < maxLength; i++) {
    if (original[i] !== typed[i]) {
      errors++;
    }
  }

  const accuracy = ((maxLength - errors) / maxLength) * 100;
  return { accuracy, errors };
}