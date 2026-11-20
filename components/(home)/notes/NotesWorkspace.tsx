
"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  ChevronRight,
  FileText,
  LoaderCircle,
  Plus,
  Save,
  Search,
  Trash2,
  X,
} from "lucide-react";

import { Button, TextField, Input, TextArea, Label } from "@heroui/react";
import { notesApi, type Note } from "@/app/lib/(home)/notes/notes";


const noteColors = [
  { value: "default", label: "Default", className: "bg-default-400" },
  { value: "blue", label: "Blue", className: "bg-blue-500" },
  { value: "green", label: "Green", className: "bg-green-500" },
  { value: "yellow", label: "Yellow", className: "bg-yellow-400" },
  { value: "orange", label: "Orange", className: "bg-orange-500" },
  { value: "red", label: "Red", className: "bg-red-500" },
  { value: "purple", label: "Purple", className: "bg-purple-500" },
];

function getNoteColor(color: string) {
  return (
    noteColors.find((item) => item.value === color) ??
    noteColors[0]
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function NotesWorkspace() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedNote =
    notes.find((note) => note.id === selectedId) ?? null;

  const loadNotes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await notesApi.getAll();

      setNotes(result);

      setSelectedId((current) => {
        if (current && result.some((note) => note.id === current)) {
          return current;
        }

        return null;
      });
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadNotes();
  }, [loadNotes]);

  const createNote = async () => {
    try {
      setError(null);

      const note = await notesApi.create("Untitled");

      setNotes((current) => [note, ...current]);
      setSelectedId(note.id);
    } catch (err) {
      setError(String(err));
    }
  };

  const updateLocalNote = (
    id: string,
    changes: Partial<Note>,
  ) => {
    setNotes((current) =>
      current.map((note) =>
        note.id === id ? { ...note, ...changes } : note,
      ),
    );
  };

  const saveNote = async () => {
    if (!selectedNote) return;

    try {
      setSaving(true);
      setError(null);

      await notesApi.update({
        id: selectedNote.id,
        title: selectedNote.title,
        content: selectedNote.content,
        x: selectedNote.x,
        y: selectedNote.y,
        color: selectedNote.color,
        isPinned: selectedNote.is_pinned,
      });

      await loadNotes();
      setSelectedId(selectedNote.id);
    } catch (err) {
      setError(String(err));
    } finally {
      setSaving(false);
    }
  };

  const deleteNote = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?",
    );

    if (!confirmed) return;

    try {
      setError(null);

      await notesApi.delete(id);

      setNotes((current) =>
        current.filter((note) => note.id !== id),
      );

      if (selectedId === id) {
        setSelectedId(null);
      }
    } catch (err) {
      setError(String(err));
    }
  };

  const filteredNotes = notes.filter((note) => {
    const query = search.toLowerCase();

    return (
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query) ||
      note.id.toLowerCase().includes(query)
    );
  });

  return (
    <main className="flex h-full min-h-0 flex-col gap-6 p-6">
      {/* Header */}
      <header className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FileText size={20} className="text-accent" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Notes
            </h1>
          </div>

          <p className="mt-1 text-sm text-default-500">
            Your thoughts, ideas, and references in one place.
          </p>
        </div>

        <Button onPress={createNote}>
          <Plus size={16} />
          New note
        </Button>
      </header>

      {/* Error */}
      {error && (
        <div className="flex items-center justify-between rounded-lg border border-danger/30 bg-danger/10 p-3 text-sm text-danger">
          {error}
          <button onClick={() => setError(null)}>
            <X size={16} />
          </button>
        </div>
      )}

      {/* Workspace */}
      <section
        className={`grid min-h-0 flex-1 gap-5 ${
          selectedNote
            ? "grid-cols-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
            : "grid-cols-1"
        }`}
      >
        {/* Notes list */}
        <div className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-default-200 bg-content1">
          {/* List toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-default-200 p-4">
            <div>
              <h2 className="font-semibold">All notes</h2>
              <p className="mt-1 text-xs text-default-500">
                {notes.length} {notes.length === 1 ? "note" : "notes"}
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-default-100 px-3">
              <Search size={16} className="text-default-500" />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search notes..."
                className="h-9 w-40 bg-transparent text-sm outline-none placeholder:text-default-400"
              />
            </div>
          </div>

          {/* Column headers */}
          <div className="hidden grid-cols-[minmax(0,1fr)_120px_110px_100px] items-center gap-3 border-b border-default-200 px-5 py-3 text-xs font-medium text-default-500 md:grid">
            <span>NOTE</span>
            <span>DATE</span>
            <span>STATUS</span>
            <span className="text-right">ACTIONS</span>
          </div>

          {/* List */}
          <div className="min-h-0 flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex justify-center py-16">
                <LoaderCircle
                  size={22}
                  className="animate-spin text-default-400"
                />
              </div>
            ) : filteredNotes.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                <div className="rounded-2xl bg-default-100 p-4">
                  <FileText
                    size={28}
                    className="text-default-400"
                  />
                </div>

                <div>
                  <p className="font-medium">
                    {search ? "No matching notes" : "No notes yet"}
                  </p>
                  <p className="mt-1 text-sm text-default-500">
                    {search
                      ? "Try another search term."
                      : "Create your first note to get started."}
                  </p>
                </div>

                {!search && (
                  <Button onPress={createNote}>
                    <Plus size={16} />
                    Create note
                  </Button>
                )}
              </div>
            ) : (
              filteredNotes.map((note) => {
                const color = getNoteColor(note.color);
                const isSelected = selectedId === note.id;

                return (
                  <div
                    key={note.id}
                    className={`group grid grid-cols-1 gap-3 border-b border-default-100 px-5 py-4 transition-colors md:grid-cols-[minmax(0,1fr)_120px_110px_100px] md:items-center md:gap-3 ${
                      isSelected
                        ? "bg-accent/5"
                        : "hover:bg-default-50"
                    }`}
                  >
                    {/* Note title */}
                    <button
                      type="button"
                      onClick={() => setSelectedId(note.id)}
                      className="flex min-w-0 items-center gap-3 text-left"
                    >
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-default-100">
                        <FileText
                          size={18}
                          className="text-default-500"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                          {note.title || "Untitled"}
                        </p>

                        <p className="mt-1 truncate text-xs text-default-500">
                          {note.id}
                        </p>
                      </div>
                    </button>

                    {/* Date */}
                    <div className="flex items-center gap-2 text-xs text-default-500">
                      <CalendarDays size={14} />
                      <span>{formatDate(note.created_at)}</span>
                    </div>

                    {/* Status and color */}
                    <div className="flex items-center gap-2">
                      <span
                        className={`size-2.5 rounded-full ${color.className}`}
                      />

                      <span className="text-xs text-default-600">
                        {note.is_pinned ? "Pinned" : color.label}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-start gap-1 md:justify-end">
                      <Button
                        isIconOnly
                        size="sm"
                        
                        
                        aria-label="Edit note"
                        onPress={() => setSelectedId(note.id)}
                      >
                        <ChevronRight size={17} />
                      </Button>

                      <Button
                        isIconOnly
                        size="sm"
                        
                        
                        aria-label="Delete note"
                        onPress={() => deleteNote(note.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Editor panel */}
        {selectedNote && (
          <div className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-default-200 bg-content1">
            {/* Editor header */}
            <div className="flex items-center justify-between border-b border-default-200 p-4">
              <div className="flex items-center gap-3">
                <Button
                  isIconOnly
                  size="sm"
                  
                  aria-label="Close editor"
                  onPress={() => setSelectedId(null)}
                >
                  <ArrowLeft size={17} />
                </Button>

                <div>
                  <h2 className="text-sm font-semibold">
                    Edit note
                  </h2>
                  <p className="text-xs text-default-500">
                    {selectedNote.id}
                  </p>
                </div>
              </div>

              <Button
                isIconOnly
                size="sm"
                
                aria-label="Close editor"
                onPress={() => setSelectedId(null)}
              >
                <X size={17} />
              </Button>
            </div>

            {/* Editor form */}
            <div className="flex-1 space-y-5 overflow-y-auto p-5">



        <TextField
  value={selectedNote.title}
  onChange={(value) =>
    updateLocalNote(selectedNote.id, {
      title: value,
    })
  }
  className="w-full max-w-64"
>
  <Label>Email</Label>
  <Input placeholder="What you want to do?" />
</TextField>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Note color
                </label>

                <div className="flex flex-wrap gap-2">
                  {noteColors.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      title={color.label}
                      aria-label={color.label}
                      onClick={() =>
                        updateLocalNote(selectedNote.id, {
                          color: color.value,
                        })
                      }
                      className={`flex size-9 items-center justify-center rounded-full border-2 transition-transform hover:scale-110 ${
                        selectedNote.color === color.value
                          ? "border-accent"
                          : "border-transparent"
                      }`}
                    >
                      <span
                        className={`size-4 rounded-full ${color.className}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">
                  Pin this note
                </label>

                <input
                  type="checkbox"
                  checked={selectedNote.is_pinned}
                  onChange={(event) =>
                    updateLocalNote(selectedNote.id, {
                      is_pinned: event.target.checked,
                    })
                  }
                  className="size-4 accent-(--heroui-accent)"
                />
              </div>
<TextArea
      aria-label="Quick project update"
className="w-full"
                value={selectedNote.content}
                onChange={(event) =>
                  updateLocalNote(selectedNote.id, {
                    content: event.target.value,
                  })
                }
                placeholder="Start writing your thoughts..."
                rows={12}
  
    />
              <TextArea
                
              />
            </div>

            {/* Editor footer */}
            <div className="flex items-center justify-between gap-3 border-t border-default-200 p-4">
              <Button
                
                
                onPress={() => deleteNote(selectedNote.id)}
              >
                <Trash2 size={15} />
                Delete
              </Button>

              <Button
               
                onPress={saveNote}
                isDisabled={saving}
              >
                {saving ? (
                  <LoaderCircle size={15} className="animate-spin" />
                ) : (
                  <Save size={15} />
                )}
                Save changes
              </Button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
