import React from "react";
import { Note } from "../types";

type NotesListProps = {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (note: Note) => void;
};

export default function NotesList({ notes, onEdit, onDelete }: NotesListProps) {
  if (!notes.length) {
    return (
      <div className="py-20 text-center text-gray-400">
        <p className="text-3xl mb-3">📝</p>
        <p className="text-lg">No notes found. Use the <span className="font-semibold">+</span> button to add one!</p>
      </div>
    );
  }

  return (
    <ul className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {notes.map(note => (
        <li
          key={note.id}
          className="bg-white rounded-lg shadow-md p-5 flex flex-col justify-between border border-gray-200 hover:shadow-xl transition cursor-pointer relative"
        >
          <div onClick={() => onEdit(note)}>
            <h3 className="text-blue-700 font-bold mb-1 text-lg truncate">{note.title}</h3>
            <div className="text-gray-700 whitespace-pre-wrap text-sm mb-6 min-h-[2em]">
              {note.content.length > 140
                ? note.content.slice(0, 140) + "…"
                : note.content || <span className="text-gray-400 italic">No content.</span>}
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 absolute right-4 bottom-4">
            <button
              aria-label="Edit"
              className="p-2 rounded hover:bg-blue-50 text-blue-600"
              title="Edit note"
              onClick={e => { e.stopPropagation(); onEdit(note); }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M11 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
                <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
            <button
              aria-label="Delete"
              className="p-2 rounded hover:bg-red-50 text-red-500"
              title="Delete note"
              onClick={e => { e.stopPropagation(); onDelete(note); }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M6 7v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7" />
                <path d="M19 4H5" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
                <path d="M9 4V2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
