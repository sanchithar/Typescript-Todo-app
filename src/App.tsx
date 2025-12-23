import React, { useState, useEffect, useMemo } from 'react';
import { Search, Calendar, Plus, X, Archive, Trash2, Image, MapPin, FileText, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

// Types
type NoteType = 'text' | 'image' | 'location';

interface Note {
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
}

interface FilterOptions {
  searchTerm: string;
  startDate: string;
  endDate: string;
  category: string;
  showArchived: boolean;
}

const ITEMS_PER_PAGE = 6;

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterOptions>({
    searchTerm: '',
    startDate: '',
    endDate: '',
    category: '',
    showArchived: false
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    const savedCategories = localStorage.getItem('categories');
    
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes);
      setNotes(parsedNotes.map((note: Note) => ({
        ...note,
        createdAt: new Date(note.createdAt)
      })));
    }
    
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, []);

  // Save to localStorage whenever notes or categories change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const filteredAndSortedNotes = useMemo(() => {
    let filtered = notes.filter(note => {
      if (!filters.showArchived && note.archived) return false;
      if (filters.showArchived && !note.archived) return false;
      
      if (filters.searchTerm) {
        const search = filters.searchTerm.toLowerCase();
        if (!note.title.toLowerCase().includes(search) && 
            !note.content.toLowerCase().includes(search)) {
          return false;
        }
      }
      
      if (filters.category && note.category !== filters.category) return false;
      
      if (filters.startDate) {
        const start = new Date(filters.startDate);
        if (note.createdAt < start) return false;
      }
      
      if (filters.endDate) {
        const end = new Date(filters.endDate);
        end.setHours(23, 59, 59, 999);
        if (note.createdAt > end) return false;
      }
      
      return true;
    });

    return filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }, [notes, filters]);

  const totalPages = Math.ceil(filteredAndSortedNotes.length / ITEMS_PER_PAGE);
  const paginatedNotes = filteredAndSortedNotes.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const toggleArchive = (id: string) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, archived: !note.archived } : note
    ));
  };

  return (
    <div className="app">
      <header className="header">
        <h1>📝 Notes & TODO</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={20} /> New Note
        </button>
      </header>

      <div className="container">
        <FilterPanel 
          filters={filters} 
          setFilters={setFilters}
          categories={categories}
          setCurrentPage={setCurrentPage}
        />

        <div className="notes-grid">
          {paginatedNotes.length === 0 ? (
            <div className="empty-state">
              <p>{filters.showArchived ? 'No archived notes' : 'No notes yet. Create your first note!'}</p>
            </div>
          ) : (
            paginatedNotes.map(note => (
              <NoteCard 
                key={note.id} 
                note={note}
                onDelete={deleteNote}
                onArchive={toggleArchive}
              />
            ))
          )}
        </div>

        {totalPages > 1 && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      {showModal && (
        <NoteModal 
          onClose={() => setShowModal(false)}
          onSave={(note) => {
            setNotes([note, ...notes]);
            if (note.category && !categories.includes(note.category)) {
              setCategories([...categories, note.category]);
            }
            setShowModal(false);
          }}
          categories={categories}
        />
      )}
    </div>
  );
};

const FilterPanel: React.FC<{
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
  categories: string[];
  setCurrentPage: (page: number) => void;
}> = ({ filters, setFilters, categories, setCurrentPage }) => {
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

const NoteCard: React.FC<{
  note: Note;
  onDelete: (id: string) => void;
  onArchive: (id: string) => void;
}> = ({ note, onDelete, onArchive }) => {
  const getIcon = () => {
    switch (note.type) {
      case 'text': return <FileText size={20} />;
      case 'image': return <Image size={20} />;
      case 'location': return <MapPin size={20} />;
    }
  };

  return (
    <div className={`note-card ${note.archived ? 'archived' : ''}`}>
      <div className="note-header">
        <div className="note-type">{getIcon()}</div>
        <div className="note-actions">
          <button 
            className="icon-btn"
            onClick={() => onArchive(note.id)}
            title={note.archived ? 'Unarchive' : 'Archive'}
          >
            <Archive size={18} />
          </button>
          <button 
            className="icon-btn"
            onClick={() => onDelete(note.id)}
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <h3 className="note-title">{note.title}</h3>
      
      {note.type === 'image' && note.imageUrl && (
        <img src={note.imageUrl} alt={note.title} className="note-image" />
      )}
      
      {note.type === 'location' && note.location && (
        <div className="note-location">
          <MapPin size={16} />
          <span>{note.location.address}</span>
        </div>
      )}
      
      <p className="note-content">{note.content}</p>
      
      <div className="note-footer">
        {note.category && (
          <span className="note-category">{note.category}</span>
        )}
        <span className="note-date">
          {note.createdAt.toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

const NoteModal: React.FC<{
  onClose: () => void;
  onSave: (note: Note) => void;
  categories: string[];
}> = ({ onClose, onSave, categories }) => {
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
      archived: false
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

const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={20} />
      </button>
      
      <span className="pagination-info">
        Page {currentPage} of {totalPages}
      </span>
      
      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default App;