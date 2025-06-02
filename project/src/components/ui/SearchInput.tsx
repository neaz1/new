import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { cn } from '../../utils/cn';

interface SearchInputProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
}

export function SearchInput({ 
  placeholder = 'گەڕان...', 
  onSearch,
  className
}: SearchInputProps) {
  const [query, setQuery] = useState('');

  // When query becomes empty, trigger search
  useEffect(() => {
    if (query === '') {
      onSearch('');
    }
  }, [query, onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    // Optionally trigger search on each change
    onSearch(newQuery);
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={cn("relative", className)}
    >
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type="search"
          className="block w-full p-2 ps-10 text-sm border border-gray-300 rounded-lg bg-white focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder={placeholder}
          value={query}
          onChange={handleChange}
        />
      </div>
    </form>
  );
}