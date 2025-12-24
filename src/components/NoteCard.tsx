import type { Note } from '../types/Note';
import { Archive, Trash2, Image, MapPin, FileText } from 'lucide-react';
export function NoteCard({
  note,
  onDelete,
  onArchive,
  onToggleComplete
}: {
  note: Note;
  onDelete: (id: string) => void;
  onArchive: (id: string) => void;
  onToggleComplete: (id: string) => void;
}) {
  const getIcon = () => {
    switch (note.type) {
      case 'text': return <FileText size={20} />;
      case 'image': return <Image size={20} />;
      case 'location': return <MapPin size={20} />;
    }
  };

  return (
    <div className={`note-card ${note.archived ? 'archived' : ''} ${note.completed ? 'completed' : ''}`}>
      <div className="note-header">
        <div className="note-type-wrapper">
          <input
            type="checkbox"
            checked={note.completed}
            onChange={() => onToggleComplete(note.id)}
            className="note-checkbox"
            title={note.completed ? 'Mark as incomplete' : 'Mark as complete'}
          />
          <div className="note-type">{getIcon()}</div>
        </div>
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
