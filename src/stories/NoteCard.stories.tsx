import type { Meta, StoryObj } from '@storybook/react';
import { NoteCard } from '../components/NoteCard';
import type { Note } from '../types/Note';

const meta = {
  title: 'Components/NoteCard',
  component: NoteCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NoteCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Text Note
export const TextNote: Story = {
  args: {
    note: {
      id: '1',
      type: 'text',
      title: 'Buy Groceries',
      content: 'Need to buy milk, eggs, bread, and vegetables from the store.',
      category: 'Shopping',
      createdAt: new Date('2025-12-20'),
      archived: false,
      completed: false,
    },
    onDelete: (id: string) => console.log('Delete note:', id),
    onArchive: (id: string) => console.log('Archive note:', id),
    onToggleComplete: (id: string) => console.log('Toggle complete:', id),
  },
};

// Completed Note
export const CompletedNote: Story = {
  args: {
    note: {
      id: '2',
      type: 'text',
      title: 'Call Mom',
      content: 'Wish her happy birthday and catch up.',
      category: 'Personal',
      createdAt: new Date('2025-12-18'),
      archived: false,
      completed: true,
    },
    onDelete: (id: string) => console.log('Delete note:', id),
    onArchive: (id: string) => console.log('Archive note:', id),
    onToggleComplete: (id: string) => console.log('Toggle complete:', id),
  },
};

// Archived Note
export const ArchivedNote: Story = {
  args: {
    note: {
      id: '3',
      type: 'text',
      title: 'Old Project Ideas',
      content: 'Some ideas that are no longer relevant but keeping for reference.',
      category: 'Work',
      createdAt: new Date('2025-11-15'),
      archived: true,
      completed: false,
    },
    onDelete: (id: string) => console.log('Delete note:', id),
    onArchive: (id: string) => console.log('Archive note:', id),
    onToggleComplete: (id: string) => console.log('Toggle complete:', id),
  },
};

// Image Note
export const ImageNote: Story = {
  args: {
    note: {
      id: '4',
      type: 'image',
      title: 'Design Inspiration',
      content: 'Beautiful UI design for reference.',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop',
      category: 'Work',
      createdAt: new Date('2025-12-22'),
      archived: false,
      completed: false,
    },
    onDelete: (id: string) => console.log('Delete note:', id),
    onArchive: (id: string) => console.log('Archive note:', id),
    onToggleComplete: (id: string) => console.log('Toggle complete:', id),
  },
};

// Location Note
export const LocationNote: Story = {
  args: {
    note: {
      id: '5',
      type: 'location',
      title: 'Meeting Venue',
      content: 'Team meeting location for next week.',
      location: {
        lat: 40.7128,
        lng: -74.0060,
        address: '123 Main Street, New York, NY 10001',
      },
      category: 'Work',
      createdAt: new Date('2025-12-23'),
      archived: false,
      completed: false,
    },
    onDelete: (id: string) => console.log('Delete note:', id),
    onArchive: (id: string) => console.log('Archive note:', id),
    onToggleComplete: (id: string) => console.log('Toggle complete:', id),
  },
};

// Note Without Category
export const NoteWithoutCategory: Story = {
  args: {
    note: {
      id: '6',
      type: 'text',
      title: 'Random Thought',
      content: 'Just a quick note without any specific category.',
      createdAt: new Date('2025-12-24'),
      archived: false,
      completed: false,
    },
    onDelete: (id: string) => console.log('Delete note:', id),
    onArchive: (id: string) => console.log('Archive note:', id),
    onToggleComplete: (id: string) => console.log('Toggle complete:', id),
  },
};

// Long Content Note
export const LongContentNote: Story = {
  args: {
    note: {
      id: '7',
      type: 'text',
      title: 'Project Requirements',
      content: 'This is a very long note with lots of content. It should demonstrate how the card handles longer text. The content might overflow and we should see how it displays. This could be meeting notes, project requirements, or detailed todo items that require more explanation.',
      category: 'Work',
      createdAt: new Date('2025-12-19'),
      archived: false,
      completed: false,
    },
    onDelete: (id: string) => console.log('Delete note:', id),
    onArchive: (id: string) => console.log('Archive note:', id),
    onToggleComplete: (id: string) => console.log('Toggle complete:', id),
  },
};

// Completed and Archived
export const CompletedAndArchived: Story = {
  args: {
    note: {
      id: '8',
      type: 'text',
      title: 'Finished Old Task',
      content: 'A task that was completed and then archived.',
      category: 'Personal',
      createdAt: new Date('2025-10-10'),
      archived: true,
      completed: true,
    },
    onDelete: (id: string) => console.log('Delete note:', id),
    onArchive: (id: string) => console.log('Archive note:', id),
    onToggleComplete: (id: string) => console.log('Toggle complete:', id),
  },
};
