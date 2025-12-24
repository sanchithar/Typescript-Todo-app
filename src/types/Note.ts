export type NoteType = 'text' | 'image' | 'location';

export interface Note {
  id: string;
  type: NoteType;
  title: string;
  content: string;
  imageUrl?: string;
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  category?: string;
  createdAt: Date;
  archived: boolean;
  completed: boolean;
}