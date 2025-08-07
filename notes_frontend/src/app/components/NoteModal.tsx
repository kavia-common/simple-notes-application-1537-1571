import React, { useEffect, useState } from "react";
import { Note } from "../types";

export interface NoteModalProps {
  open: boolean;
  initialNote?: Note | null;
  onClose: () => void;
  onSave: (data: Omit<Note, "id" | "createdAt" | "updatedAt">) => void;
}

export default function NoteModal({ open, initialNote, onClose, onSave }: NoteModalProps) {
  const [title, setTitle] = useState(initialNote?.title || "");
  const [content, setContent] = useState(initialNote?.content || "");
  const [error, setError] = useState("");

  useEffect(() => {
    setTitle(initialNote?.title || "");
    setContent(initialNote?.content || "");
    setError("");
  }, [initialNote, open]);

  if (!open) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    onSave({ title: title.trim(), content });
    setTitle("");
    setContent("");
    setError("");
  };

  const handleClose = () => {
    setTitle(initialNote?.title || "");
    setContent(initialNote?.content || "");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 transition-opacity">
      <div className="bg-white w-full max-w-md mx-4 rounded-lg shadow-2xl p-6 relative animate-fadeIn">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl focus:outline-none"
          onClick={handleClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-lg font-semibold mb-4">{initialNote ? "Edit Note" : "New Note"}</h2>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 outline-none"
              placeholder="Title"
              value={title}
              autoFocus
              maxLength={60}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <textarea
              className="w-full border border-gray-300 rounded px-3 py-2 min-h-[90px] focus:ring-2 focus:ring-blue-400 focus:border-blue-500 outline-none"
              placeholder="Note content"
              value={content}
              maxLength={2048}
              onChange={e => setContent(e.target.value)}
            ></textarea>
          </div>
          {error && <div className="text-red-500 mb-2 text-sm">{error}</div>}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition font-medium"
            >
              {initialNote ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px);}
          to { opacity: 1; transform: none;}
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease; }
      `}</style>
    </div>
  );
}
