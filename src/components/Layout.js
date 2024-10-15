import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Results from "./Results";
import DetailView from "./DetailView";

const Layout = ({
  query,
  setQuery,
  handleSearch,
  loading,
  error,
  results,
  page,
  setPage,
  handleFilterChange,
}) => {
  return (
    <div className="max-w-4xl mx-auto p-4">
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

export default Layout;
