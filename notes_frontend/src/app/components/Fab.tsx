import React from "react";

// PUBLIC_INTERFACE
type FabProps = {
  onClick: () => void;
  label?: string;
};

export default function Fab({ onClick, label }: FabProps) {
  return (
    <button
      className="fixed z-50 bottom-7 right-7 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all"
      title={label || "New Note"}
      onClick={onClick}
      aria-label={label || "New Note"}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
      </svg>
    </button>
  );
}
