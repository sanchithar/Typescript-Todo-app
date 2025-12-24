import type { FilterOptions } from '../types/FilterOptions';
import { Search, Calendar, Filter } from 'lucide-react';
export function FilterPanel({
  filters,
  setFilters,
  categories,
  setCurrentPage
}: {
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
  categories: string[];
  setCurrentPage: (page: number) => void;
}) {
  const updateFilter = (key: keyof FilterOptions, value: string | boolean) => {
    setFilters({ ...filters, [key]: value });
    setCurrentPage(1);
  };

  return (
    <div className="filter-panel">
      <div className="filter-group">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search notes..."
          value={filters.searchTerm}
          onChange={(e) => updateFilter('searchTerm', e.target.value)}
          className="filter-input"
        />
      </div>

      <div className="filter-row">
        <div className="filter-group">
          <Calendar size={18} />
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => updateFilter('startDate', e.target.value)}
            className="filter-input"
          />
          <span>to</span>
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => updateFilter('endDate', e.target.value)}
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <Filter size={18} />
          <select
            value={filters.category}
            onChange={(e) => updateFilter('category', e.target.value)}
            className="filter-input"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={filters.showArchived}
            onChange={(e) => updateFilter('showArchived', e.target.checked)}
          />
          Show Archived
        </label>
      </div>
    </div>
  );
};