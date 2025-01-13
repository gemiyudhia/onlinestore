"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import FilterButton from "../Button/FilterButton";
import { priceRanges, ratingOptions } from "@/types/FilterData";
import { FilterState, FilterProps } from "@/types/FilterTypes";

export default function ProductFilter({
  categories,
  onFilterChange,
}: FilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    category: "",
    priceRange: "all",
    rating: 0,
    search: "",
  });

  const handleFilterChange = (
    key: keyof FilterState,
    value: string | number
  ) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      category: "",
      priceRange: "all",
      rating: 0,
      search: "",
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="space-y-4 p-4 bg-white shadow rounded-lg mb-6">
      {/* Category Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <div className="flex flex-wrap gap-2">
          <FilterButton
            active={filters.category === ""}
            label="All"
            onClick={() => handleFilterChange("category", "")}
          />
          {categories.map((category) => (
            <FilterButton
              key={category}
              active={filters.category === category}
              label={category}
              onClick={() => handleFilterChange("category", category)}
            />
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range
        </label>
        <div className="flex flex-wrap gap-2">
          {priceRanges.map((range) => (
            <FilterButton
              key={range.value}
              active={filters.priceRange === range.value}
              label={range.label}
              onClick={() => handleFilterChange("priceRange", range.value)}
            />
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Minimum Rating
        </label>
        <div className="flex flex-wrap gap-2">
          {ratingOptions.map((rating) => (
            <FilterButton
              key={rating}
              active={filters.rating === rating}
              label={rating === 0 ? "Any" : `${rating}★ & up`}
              onClick={() => handleFilterChange("rating", rating)}
            />
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div>
        <label
          htmlFor="search"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Search
        </label>
        <div className="flex gap-2">
          <Input
            id="search"
            type="text"
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />
          <FilterButton
            active={false}
            label={<X className="h-4 w-4" />}
            onClick={() => handleFilterChange("search", "")}
          />
        </div>
      </div>

      {/* Clear Filters Button */}
      <FilterButton
        active={false}
        label="Clear All Filters"
        onClick={clearFilters}
      />
    </div>
  );
}
