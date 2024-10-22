import React from 'react';
import { FilterOptions } from '../types';

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-6">
      <div className="flex flex-wrap items-center justify-between">
        <div className="w-full md:w-auto mb-4 md:mb-0">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            id="date"
            value={filters.date}
            onChange={(e) => onFilterChange({ ...filters, date: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div className="w-full md:w-auto">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
          <select
            id="type"
            value={filters.type}
            onChange={(e) => onFilterChange({ ...filters, type: e.target.value as FilterOptions['type'] })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            <option value="all">All Types</option>
            <option value="meet">Meet</option>
            <option value="show">Show</option>
            <option value="race">Race</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;