export type FilterState = {
  category: string;
  priceRange: string;
  rating: number;
  search: string;
};

export type FilterProps = {
  categories: string[];
  onFilterChange: (filters: FilterState) => void;
};
