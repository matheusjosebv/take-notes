export interface NoteProps {
  key: string;
  id: string;
  text: string;
  title: string;
  image?: string;
  edited: boolean;
  pinned: boolean;
  animate: boolean;
  createdAt: string;
  handlePin?: React.MouseEventHandler;
  infoButton: boolean;
  handleEdit?: React.MouseEventHandler;
  handleDelete?: React.MouseEventHandler;
  handleRecovery?: React.MouseEventHandler;
  handleDuplicate?: React.MouseEventHandler;
  handlePermanentDelete?: React.MouseEventHandler;
}

export interface ContextValue {
  notes: NoteProps[];
  setNotes: React.Dispatch<React.SetStateAction<NoteProps[]>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  darkTheme: boolean;
  toggleTheme: () => void;
  deletedNotes: NoteProps[];
  setDeletedNotes: React.Dispatch<React.SetStateAction<NoteProps[]>>;
}
