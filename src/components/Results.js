import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import FilterSidebar from "./FilterSidebar";

const Results = ({
  loading,
  error,
  results,
  page,
  setPage,
  handleFilterChange,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const totalPages = results?.pages || 0;
  const [filteredResults, setFilteredResults] = useState(results?.items || []);

  const toggleFilterSidebar = () => {
    setIsFilterOpen((prev) => !prev);
  };

  useEffect(() => {
    setFilteredResults(results?.items || []);
  }, [results]);

  const handleFiltersUpdate = (facetKey, key, isSelected) => {
    const updatedResults = results.items.filter((item) => {
      const isMatch = (item) => {
        return true;
      };

      return isMatch(item);
    });

    setFilteredResults(updatedResults);
    handleFilterChange(facetKey, key, isSelected);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div
        className={`bg-white shadow-lg transition-all duration-300 md:w-1/4 ${
          isFilterOpen ? "block" : "hidden md:block"
        }`}
      >
        <button
          onClick={toggleFilterSidebar}
          className="bg-blue-500 text-white p-2 rounded m-2"
        >
          {isFilterOpen ? "Hide Filters" : "Show Filters"}
        </button>
        {isFilterOpen && (
          <FilterSidebar
            facets={results?.facets}
            handleFilterChange={handleFiltersUpdate}
          />
        )}
      </div>

      <div className="md:w-3/4 p-4">
        {loading && <div className="loading">Loading new results...</div>}
        {error && <p>Error: {error.message}</p>}
        {!loading && filteredResults.length > 0 ? (
          <div>
            {filteredResults.map((item) => (
              <div
                key={item.persistentId}
                className="mb-5 p-4 border rounded-lg shadow-sm"
              >
                <h2>
                  <Link
                    to={`/details/${item.persistentId}`}
                    className="text-blue-500 hover:underline"
                  >
                    {item.label}
                  </Link>
                </h2>
                <p>
                  Accessible At:
                  {item.accessibleAt ? (
                    <a
                      href={item.accessibleAt}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {item.accessibleAt}
                    </a>
                  ) : (
                    "Not Accessible"
                  )}
                </p>

                <p>
                  Contributors:{" "}
                  {item.contributors.length > 0
                    ? item.contributors.map((contributor, index) => (
                        <span key={index}>
                          {contributor.actor.name}
                          {index < item.contributors.length - 1 ? ", " : ""}
                        </span>
                      ))
                    : "No contributors available"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          !loading && <p>No results found.</p>
        )}
        {!loading && filteredResults.length > 0 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        )}
      </div>
    </div>
  );
};

export default Results;
