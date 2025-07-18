"use client";
import React, { useState } from "react";

const LibraryFilter = ({ onFilter }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ title });
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-4 mb-6">
      <input
        type="text"
        placeholder="Search by title..."
        className="px-4 py-2 border border-brand-beige rounded-md bg-brand-light-beige focus:outline-none focus:ring-2 focus:ring-brand-warm-brown font-poppins"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit" className="btn-primary px-6 py-2">
        Filter
      </button>
    </form>
  );
};

export default LibraryFilter; 