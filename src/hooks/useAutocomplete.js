import { useEffect, useState } from "react";

const useAutocomplete = (query) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://marketplace-api.sshopencloud.eu/api/item-search/autocomplete?q=${query}`
        );
        const data = await response.json();
        setSuggestions(data.suggestions || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(fetchSuggestions, 300);

    return () => clearTimeout(debounceTimeout);
  }, [query]);

  return { suggestions, loading, error };
};

export default useAutocomplete;
