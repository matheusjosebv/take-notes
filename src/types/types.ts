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
  infoButton: boolean;
  handlePin?: React.MouseEventHandler;
  handleEdit?: React.MouseEventHandler;
  handleDelete?: React.MouseEventHandler;
  handleRecovery?: React.MouseEventHandler;
  handleDuplicate?: React.MouseEventHandler;
  handlePermanentDelete?: React.MouseEventHandler;
}

export interface ContextValue {
  darkTheme: boolean;
  toggleTheme: () => void;
  notes: NoteProps[];
  setNotes: React.Dispatch<React.SetStateAction<NoteProps[]>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  deletedNotes: NoteProps[];
  setDeletedNotes: React.Dispatch<React.SetStateAction<NoteProps[]>>;
  pinnedNotes: NoteProps[];
  setPinnedNotes: React.Dispatch<React.SetStateAction<NoteProps[]>>;
}

export interface providedProps {
  innerRef: React.LegacyRef<HTMLDivElement> | undefined;
  droppableProps: JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLDivElement> &
    React.HTMLAttributes<HTMLDivElement>;
  placeholder:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}
