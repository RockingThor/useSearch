import { getAllKeys } from './getAllKeys';
import { getFieldValue } from './getFieldValue';
import { convertToString } from './convertToString';
import { nGramFuzzySearch } from './nGramFuzzySearch';

type MatchType = 'exact' | 'startsWith' | 'endsWith' | 'contains' | 'fuzzySearch';

interface SearchOptions {
  fields?: string | string[];
  matchType: MatchType;
  threshold?: number;
}

export function search(options: SearchOptions) {
  const { 
    fields, 
    matchType,
    threshold = matchType === 'fuzzySearch' ? 0.3 : 0.5 
  } = options;

  return (data: any[], query: string) => {
    const trimmedQuery = String(query || '').trim().toLowerCase();

    if (trimmedQuery === "") {
      return data;
    }

    const effectiveMatchType = 
      (matchType === 'fuzzySearch' && trimmedQuery.length <= 2) 
        ? 'contains' 
        : matchType;

    return data.filter((item) => {
      const fieldsArray = fields
        ? Array.isArray(fields)
          ? fields
          : [fields]
        : getAllKeys(item);

      return fieldsArray.some((field) => {
        const fieldValue = getFieldValue(item, field);
        if (fieldValue == null) {
          return false;
        }

        const stringValue = convertToString(fieldValue).toLowerCase();

        switch (effectiveMatchType) {
          case "exact":
            return stringValue === trimmedQuery;
          case "startsWith":
            return stringValue.startsWith(trimmedQuery);
          case "endsWith":
            return stringValue.endsWith(trimmedQuery);
          case "contains":
            return stringValue.includes(trimmedQuery);
          case "fuzzySearch": {
            if (stringValue.length > 50) {
              const words = stringValue.split(/\s+/);
              for (const word of words) {
                const score = nGramFuzzySearch(word, trimmedQuery);
                if (score >= threshold) return true;
              }
              return false;
            } else {
              const score = nGramFuzzySearch(stringValue, trimmedQuery);
              return score >= threshold;
            }
          }
          default:
            throw new Error(`Unsupported match type: ${effectiveMatchType}`);
        }
      });
    });
  };
}
