import { useMemo, useEffect } from "react";
import useDebounce from "./useDebounce";

type FilterFunction<T> = (data: T[], query: string) => T[];

function useSearch<T>(data: T | T[], query: string, ...filters: FilterFunction<T>[]) {
  // Increase debounce delay to 500ms for better user experience
  const debouncedQuery = useDebounce(query, 500);
  
  // Add debugging to track when the query changes
  useEffect(() => {
    console.log("Original query:", query);
  }, [query]);
  
  useEffect(() => {
    console.log("Debounced query:", debouncedQuery);
  }, [debouncedQuery]);

  return useMemo(() => {
    console.log("Running search with query:", debouncedQuery);
    const dataArray = Array.isArray(data) ? data : [data];

    try {
      // Apply each filter function in sequence
      const result = filters.reduce(
        (acc, feature) => feature(acc, debouncedQuery),
        dataArray
      );
      
      console.log(`Found ${result.length} results`);
      return result;
    } catch (error) {
      console.error("Error applying search features:", error);
      return dataArray;
    }
  }, [data, debouncedQuery, filters]);
}

export default useSearch;