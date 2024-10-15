import React from "react";
import { useNavigate } from "react-router-dom";
import useAutocomplete from "../hooks/useAutocomplete";
import SearchBar from "./SearchBar";

const Home = ({ query, setQuery, handleSearch }) => {
  const navigate = useNavigate();
  const { suggestions, loading } = useAutocomplete(query);

  const onSearch = () => {
    handleSearch(query);
    navigate("/results");
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.phrase);
    handleSearch(suggestion.phrase);
    navigate(`/details/${suggestion.persistentId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="mb-4 text-2xl font-semibold">
        The Social Sciences & Humanities Open Marketplace
      </h2>
      <div className=" p-6 rounded-lg shadow-md w-full max-w-md">
        <SearchBar query={query} setQuery={setQuery} />
        <button
          onClick={onSearch}
          className="mt-4 bg-blue-500 text-white rounded-md p-2 w-full hover:bg-blue-600 transition duration-200"
        >
          Search
        </button>

        {loading && <p>Loading suggestions...</p>}
        {suggestions.length > 0 && (
          <ul className="bg-white border border-gray-300 rounded-md shadow-lg mt-2 max-h-60 overflow-y-auto">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.persistentId}
                onClick={() => handleSuggestionClick(suggestion)}
                className="cursor-pointer p-2 hover:bg-gray-200"
              >
                []
                {suggestion.phrase}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
