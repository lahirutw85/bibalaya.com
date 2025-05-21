
import React, { useState } from 'react';
import { SearchIcon } from '../icons/SearchIcon';

export const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic here
    alert(`Searching for: ${searchTerm}`);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-2xl mx-auto" // Removed my-8
      role="search"
    >
      <label htmlFor="main-search" className="sr-only">Search content</label>
      <div className="relative">
        <input
          id="main-search"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for scriptures, topics, sermons..."
          className="w-full pl-12 pr-4 py-3.5 bg-primary rounded-lg shadow-sm focus:ring-2 focus:ring-white focus:border-transparent transition-shadow text-text-light placeholder-blue-100"
        />
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-text-light" />
        </div>
      </div>
    </form>
  );
};
