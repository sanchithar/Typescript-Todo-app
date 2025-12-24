import { X, Image, MapPin, FileText } from 'lucide-react';
import { useState } from 'react';
import type { Note, NoteType } from '../types/Note';

export function NoteModal({
  onClose,
  onSave,
  categories
}: {
  onClose: () => void;
  onSave: (note: Note) => void;
  categories: string[];
}) {
  const [noteType, setNoteType] = useState<NoteType>('text');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [location, setLocation] = useState({ address: '', lat: 0, lng: 0 });
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');

  const handleSave = () => {
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }

    const note: Note = {
      id: Date.now().toString(),
      type: noteType,
      title: title.trim(),
      content: content.trim(),
      category: newCategory.trim() || category || undefined,
      createdAt: new Date(),
      archived: false,
      completed: false
    };

    if (noteType === 'image' && imageUrl.trim()) {
      note.imageUrl = imageUrl.trim();
    }

    if (noteType === 'location' && location.address.trim()) {
      note.location = {
        address: location.address.trim(),
        lat: location.lat,
        lng: location.lng
      };
    }

    onSave(note);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Note</h2>
          <button className="icon-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>Note Type</label>
            <div className="type-selector">
              <button
                className={`type-btn ${noteType === 'text' ? 'active' : ''}`}
                onClick={() => setNoteType('text')}
              >
                <FileText size={20} /> Text
              </button>
              <button
                className={`type-btn ${noteType === 'image' ? 'active' : ''}`}
                onClick={() => setNoteType('image')}
              >
                <Image size={20} /> Image
              </button>
              <button
                className={`type-btn ${noteType === 'location' ? 'active' : ''}`}
                onClick={() => setNoteType('location')}
              >
                <MapPin size={20} /> Location
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title"
              className="form-input"
            />
          </div>

          {noteType === 'image' && (
            <div className="form-group">
              <label>Image URL</label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter image URL"
                className="form-input"
              />
            </div>
          )}

          {noteType === 'location' && (
            <div className="form-group">
              <label>Location Address</label>
              <input
                type="text"
                value={location.address}
                onChange={(e) => setLocation({ ...location, address: e.target.value })}
                placeholder="Enter location address"
                className="form-input"
              />
            </div>
          )}

          <div className="form-group">
            <label>Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter note content"
              className="form-textarea"
              rows={4}
            />
          </div>

          <div className="form-group">
            <label>Category (Optional)</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-input"
            >
              <option value="">Select existing category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Or Create New Category</label>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter new category name"
              className="form-input"
            />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleSave}>
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
};