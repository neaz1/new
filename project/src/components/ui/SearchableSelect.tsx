import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';

interface Option {
  id: string;
  name: string;
  code?: string;
  phone?: string;
}

interface SearchableSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

export function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = 'هەڵبژاردن...',
  className = '',
  required = false,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const selectedOption = options.find(opt => opt.id === value);
  
  const filteredOptions = options.filter(option => {
    const searchLower = searchQuery.toLowerCase();
    return (
      option.name.toLowerCase().includes(searchLower) ||
      (option.code?.toLowerCase().includes(searchLower)) ||
      (option.phone?.toLowerCase().includes(searchLower))
    );
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white cursor-pointer flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedOption ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}>
          {selectedOption ? (
            <span className="flex items-center gap-2">
              {selectedOption.code && <span className="text-sm text-gray-500">{selectedOption.code}</span>}
              <span>{selectedOption.name}</span>
              {selectedOption.phone && <span className="text-sm text-gray-500">({selectedOption.phone})</span>}
            </span>
          ) : (
            placeholder
          )}
        </span>
        <Search size={16} className="text-gray-400" />
      </div>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-700 rounded-md shadow-lg border border-gray-200 dark:border-gray-600">
          <div className="p-2">
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
              placeholder="گەڕان بۆ کۆد، ناو یان ژمارە..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <ul className="max-h-60 overflow-auto py-1">
            {filteredOptions.map((option) => (
              <li
                key={option.id}
                className={`px-3 py-2 cursor-pointer text-sm ${
                  option.id === value
                    ? 'bg-primary-50 text-primary-900 dark:bg-primary-900 dark:text-primary-100'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
                }`}
                onClick={() => {
                  onChange(option.id);
                  setIsOpen(false);
                  setSearchQuery('');
                }}
              >
                <div className="flex items-center gap-2">
                  {option.code && <span className="text-sm text-gray-500 dark:text-gray-400">{option.code}</span>}
                  <span>{option.name}</span>
                  {option.phone && <span className="text-sm text-gray-500 dark:text-gray-400">({option.phone})</span>}
                </div>
              </li>
            ))}
            {filteredOptions.length === 0 && (
              <li className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                هیچ ئەنجامێک نەدۆزرایەوە
              </li>
            )}
          </ul>
        </div>
      )}
      
      {/* Hidden select for form validation */}
      <select
        value={value}
        onChange={() => {}}
        required={required}
        className="sr-only"
        aria-hidden="true"
      >
        <option value="">{placeholder}</option>
        {options.map(option => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}