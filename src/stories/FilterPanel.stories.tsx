import type { Meta, StoryObj } from '@storybook/react';
import { FilterPanel } from '../components/FilterPanel';
import type { FilterOptions } from '../types/FilterOptions';

const meta = {
  title: 'Components/FilterPanel',
  component: FilterPanel,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FilterPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default state
export const Default: Story = {
  args: {
    filters: {
      searchTerm: '',
      startDate: '',
      endDate: '',
      category: '',
      showArchived: false,
    },
    setFilters: (filters: FilterOptions) => console.log('Filters updated:', filters),
    categories: ['Work', 'Personal', 'Shopping'],
    setCurrentPage: (page: number) => console.log('Page changed to:', page),
  },
};

// With search term
export const WithSearchTerm: Story = {
  args: {
    filters: {
      searchTerm: 'Buy milk',
      startDate: '',
      endDate: '',
      category: '',
      showArchived: false,
    },
    setFilters: (filters: FilterOptions) => console.log('Filters updated:', filters),
    categories: ['Work', 'Personal', 'Shopping'],
    setCurrentPage: (page: number) => console.log('Page changed to:', page),
  },
};

// With date range
export const WithDateRange: Story = {
  args: {
    filters: {
      searchTerm: '',
      startDate: '2025-12-01',
      endDate: '2025-12-31',
      category: '',
      showArchived: false,
    },
    setFilters: (filters: FilterOptions) => console.log('Filters updated:', filters),
    categories: ['Work', 'Personal', 'Shopping'],
    setCurrentPage: (page: number) => console.log('Page changed to:', page),
  },
};

// With category selected
export const WithCategorySelected: Story = {
  args: {
    filters: {
      searchTerm: '',
      startDate: '',
      endDate: '',
      category: 'Work',
      showArchived: false,
    },
    setFilters: (filters: FilterOptions) => console.log('Filters updated:', filters),
    categories: ['Work', 'Personal', 'Shopping'],
    setCurrentPage: (page: number) => console.log('Page changed to:', page),
  },
};

// Show archived enabled
export const ShowArchivedEnabled: Story = {
  args: {
    filters: {
      searchTerm: '',
      startDate: '',
      endDate: '',
      category: '',
      showArchived: true,
    },
    setFilters: (filters: FilterOptions) => console.log('Filters updated:', filters),
    categories: ['Work', 'Personal', 'Shopping'],
    setCurrentPage: (page: number) => console.log('Page changed to:', page),
  },
};

// All filters applied
export const AllFiltersApplied: Story = {
  args: {
    filters: {
      searchTerm: 'meeting',
      startDate: '2025-12-01',
      endDate: '2025-12-25',
      category: 'Work',
      showArchived: false,
    },
    setFilters: (filters: FilterOptions) => console.log('Filters updated:', filters),
    categories: ['Work', 'Personal', 'Shopping'],
    setCurrentPage: (page: number) => console.log('Page changed to:', page),
  },
};

// No categories
export const NoCategories: Story = {
  args: {
    filters: {
      searchTerm: '',
      startDate: '',
      endDate: '',
      category: '',
      showArchived: false,
    },
    setFilters: (filters: FilterOptions) => console.log('Filters updated:', filters),
    categories: [],
    setCurrentPage: (page: number) => console.log('Page changed to:', page),
  },
};
