import React from "react";

// PUBLIC_INTERFACE
type SearchBarProps = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

export default function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-lg">
      <input
        className="w-full border border-gray-300 rounded-full py-2 pl-10 pr-10 text-base transition focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none bg-gray-50"
        type="search"
        value={value}
        placeholder={placeholder || "Search notes..."}
        onChange={e => onChange(e.target.value)}
      />
      <span className="absolute left-3 top-2.5 text-gray-400">
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-3.87-3.87" strokeLinecap="round" /></svg>
      </span>
      {value && (
        <button
          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-700"
          aria-label="Clear"
          type="button"
          onClick={() => onChange("")}
        >
          ×
        </button>
      )}
    </div>
  );
}
