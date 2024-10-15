import React, { useState, useEffect } from "react";

const FilterSidebar = ({ facets, handleFilterChange }) => {
  const [openFacets, setOpenFacets] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({});

  useEffect(() => {
    const initialSelected = {};
    Object.keys(facets).forEach((facetKey) => {
      Object.entries(facets[facetKey]).forEach(([key, value]) => {
        if (value.checked) {
          initialSelected[key] = true;
        }
      });
    });
    setSelectedFilters(initialSelected);
  }, [facets]);

  const toggleFacet = (facetKey) => {
    setOpenFacets((prev) => ({
      ...prev,
      [facetKey]: !prev[facetKey],
    }));
  };

  const handleCheckboxChange = (facetKey, key) => {
    const isChecked = selectedFilters[key] || false;

    const newSelectedFilters = {
      ...selectedFilters,
      [key]: !isChecked,
    };

    setSelectedFilters(newSelectedFilters);
    handleFilterChange(facetKey, key, !isChecked);
  };

  return (
    <div className="p-4">
      {Object.keys(facets).map((facetKey) => {
        const isOpen = openFacets[facetKey] || false;

        return (
          <div key={facetKey} className="mb-4">
            <h4
              className="flex justify-between items-center cursor-pointer text-lg font-semibold"
              onClick={() => toggleFacet(facetKey)}
            >
              {facetKey}
              <span>{isOpen ? "▼" : "▲"}</span>
            </h4>
            {isOpen && (
              <div className="ml-4 mt-2">
                {Object.entries(facets[facetKey]).map(([key, value]) => (
                  <div key={key} className="flex items-center">
                    <label className="mr-2">
                      <input
                        type="checkbox"
                        checked={selectedFilters[key] || false}
                        onChange={() => handleCheckboxChange(facetKey, key)}
                      />
                      {key} ({value.count})
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FilterSidebar;
