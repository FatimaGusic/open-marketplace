import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Results from "./components/Results";
import DetailView from "./components/DetailView";
import Home from "./components/Home";
import useFetch from "./hooks/useFetch";

const AppContent = ({
  query,
  setQuery,
  handleSearch,
  page,
  setPage,
  fetchData,
  results,
  loading,
  error,
  handleFilterChange,
}) => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setQuery("");
      setPage(1);
    }
  }, [location.pathname, setQuery, setPage]);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              query={query}
              setQuery={setQuery}
              handleSearch={handleSearch}
            />
          }
        />
        <Route
          path="/results"
          element={
            <Results
              loading={loading}
              error={error}
              results={results}
              page={page}
              setPage={setPage}
              handleFilterChange={handleFilterChange}
            />
          }
        />
        <Route path="/details/:id" element={<DetailView />} />
      </Routes>
    </div>
  );
};

const App = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [fetchData, setFetchData] = useState(false);
  const [filters, setFilters] = useState({});
  const pageSize = 10;

  const filterQuery = Object.entries(filters)
    .map(([key, value]) => `f.${key}=${value}`)
    .join("&");

  const {
    data: results,
    loading,
    error,
  } = useFetch(
    fetchData
      ? `https://marketplace-api.sshopencloud.eu/api/item-search?q=${query}&categories=tool-or-service&page=${page}&size=${pageSize}&${filterQuery}`
      : null
  );

  const handleSearch = (searchQuery) => {
    if (searchQuery && searchQuery.trim()) {
      setQuery(searchQuery);
      setFetchData(true);
      setPage(1);
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
    setFetchData(true);
    setPage(1);
  };

  return (
    <Router>
      <AppContent
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
        page={page}
        setPage={setPage}
        fetchData={fetchData}
        results={results}
        loading={loading}
        error={error}
        handleFilterChange={handleFilterChange}
      />
    </Router>
  );
};

export default App;
