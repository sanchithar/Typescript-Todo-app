import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from '../components/Pagination';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

// First Page
export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 5,
    onPageChange: (page: number) => console.log('Page changed to:', page),
  },
};

// Middle Page
export const MiddlePage: Story = {
  args: {
    currentPage: 3,
    totalPages: 5,
    onPageChange: (page: number) => console.log('Page changed to:', page),
  },
};

// Last Page
export const LastPage: Story = {
  args: {
    currentPage: 5,
    totalPages: 5,
    onPageChange: (page: number) => console.log('Page changed to:', page),
  },
};

// Only Two Pages
export const TwoPages: Story = {
  args: {
    currentPage: 1,
    totalPages: 2,
    onPageChange: (page: number) => console.log('Page changed to:', page),
  },
};

// Many Pages
export const ManyPages: Story = {
  args: {
    currentPage: 8,
    totalPages: 20,
    onPageChange: (page: number) => console.log('Page changed to:', page),
  },
};

// Single Page (edge case)
export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
    onPageChange: (page: number) => console.log('Page changed to:', page),
  },
};
