import type { Meta, StoryObj } from '@storybook/react';
import { NoteModal } from '../components/NoteModal';

const meta = {
  title: 'Components/NoteModal',
  component: NoteModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NoteModal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Modal
export const Default: Story = {
  args: {
    onClose: () => console.log('Modal closed'),
    onSave: (note) => console.log('Note saved:', note),
    categories: ['Work', 'Personal', 'Shopping', 'Health'],
  },
};

// With Many Categories
export const ManyCategories: Story = {
  args: {
    onClose: () => console.log('Modal closed'),
    onSave: (note) => console.log('Note saved:', note),
    categories: [
      'Work',
      'Personal',
      'Shopping',
      'Health',
      'Fitness',
      'Study',
      'Travel',
      'Finance',
      'Home',
      'Projects',
    ],
  },
};

// No Categories
export const NoCategories: Story = {
  args: {
    onClose: () => console.log('Modal closed'),
    onSave: (note) => console.log('Note saved:', note),
    categories: [],
  },
};
