"use client";

import { useState, useMemo } from "react";
import Header from "./components/Header";
import Fab from "./components/Fab";
import NoteModal from "./components/NoteModal";
import NotesList from "./components/NotesList";
import SearchBar from "./components/SearchBar";
import { Note } from "./types";

// Generate a UUID; replace with actual backend IDs in production
const uuid = () => Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 6);

type ModalState = { open: boolean; note: Note | null };

// PUBLIC_INTERFACE
export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<ModalState>({ open: false, note: null });

  // Simulate backend CRUD. Replace with REST API in deployment.
  const addNote = (data: Omit<Note, "id" | "createdAt" | "updatedAt">) => {
    setNotes(ns => [
      {
        id: uuid(),
        title: data.title,
        content: data.content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      ...ns,
    ]);
    setModal({ open: false, note: null });
  };

  const updateNote = (data: Omit<Note, "id" | "createdAt" | "updatedAt">) => {
    setNotes(ns =>
      ns.map(n =>
        modal.note && n.id === modal.note.id
          ? { ...n, ...data, updatedAt: new Date().toISOString() }
          : n
      )
    );
    setModal({ open: false, note: null });
  };

  const deleteNote = (note: Note) => {
    if (window.confirm("Delete this note?")) {
      setNotes(ns => ns.filter(n => n.id !== note.id));
      if (modal.open && modal.note?.id === note.id) {
        setModal({ open: false, note: null });
      }
    }
  };

  const filteredNotes = useMemo(
    () =>
      notes.filter(
        n =>
          n.title.toLowerCase().includes(search.trim().toLowerCase()) ||
          n.content.toLowerCase().includes(search.trim().toLowerCase())
      ),
    [notes, search]
  );

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 pb-20">
        <div className="my-6 flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-center justify-between">
          <SearchBar value={search} onChange={setSearch} />
          <span className="hidden sm:inline-flex text-sm text-gray-400">{notes.length} notes</span>
        </div>
        <NotesList
          notes={filteredNotes}
          onEdit={note => setModal({ open: true, note })}
          onDelete={deleteNote}
        />
      </main>
      <Fab onClick={() => setModal({ open: true, note: null })} />
      <NoteModal
        open={modal.open}
        initialNote={modal.note}
        onClose={() => setModal({ open: false, note: null })}
        onSave={modal.note ? updateNote : addNote}
      />
    </>
  );
}
