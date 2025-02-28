export const nGramFuzzySearch = (value: string, query: string): number => {
  // Handle edge cases
  if (!query || !value) return 0;
  
  // If the value contains the query exactly, return a high score
  if (value.includes(query.toLowerCase())) return 0.9;
  
  // For very short queries (1-2 chars), be more lenient
  if (query.length <= 2) {
    return value.toLowerCase().includes(query.toLowerCase()) ? 0.8 : 0;
  }
  
  const n = Math.min(2, Math.min(value.length, query.length)); // Use bigrams or unigrams for very short strings
  
  // Generate n-grams
  const valueGrams = generateNGrams(value.toLowerCase(), n);
  const queryGrams = generateNGrams(query.toLowerCase(), n);
  
  if (valueGrams.length === 0 || queryGrams.length === 0) return 0;
  
  // Find matching n-grams
  const intersection = valueGrams.filter((gram) => queryGrams.includes(gram));
  
  // Calculate similarity score
  return intersection.length / Math.max(valueGrams.length, queryGrams.length);
};

const generateNGrams = (str: string, n: number): string[] => {
  if (str.length < n) return [str];
  
  const grams: string[] = [];
  
  for (let i = 0; i <= str.length - n; i++) {
    grams.push(str.slice(i, i + n));
  }
  
  return grams;
};
