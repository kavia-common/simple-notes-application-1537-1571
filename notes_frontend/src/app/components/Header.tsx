import React from "react";

// PUBLIC_INTERFACE
export default function Header() {
  return (
    <header className="w-full py-5 px-6 bg-blue-600 flex items-center shadow-lg mb-5">
      <h1 className="text-white text-2xl font-semibold tracking-tight">
        Simple Notes
      </h1>
    </header>
  );
}
