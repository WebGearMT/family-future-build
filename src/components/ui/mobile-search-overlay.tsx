import React from "react";

interface MobileSearchOverlayProps {
  showMobileSearch: boolean;
  searchTerm: string;
  searchTitle?: string;
  placeholder?: string;
  onClose: () => void;
  onSearchTermChange: (term: string) => void;
  onSearch: () => void;
  mobileSearchRef: React.RefObject<HTMLInputElement | null>;
}

export const MobileSearchOverlay: React.FC<MobileSearchOverlayProps> = ({
  showMobileSearch,
  searchTerm,
  searchTitle = "Search",
  placeholder = "Search by name, category, or company...",
  onClose,
  onSearchTermChange,
  onSearch,
  mobileSearchRef,
}) => {
  if (!showMobileSearch) return null;

  const handleSearch = () => {
    onSearch();
    onClose();
  };

  const handleClear = () => {
    onSearchTermChange("");
    onClose();
  };

  return (
    <div
      className="mobile-search-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="mobile-search-container">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{searchTitle}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        <input
          ref={mobileSearchRef}
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          className="mobile-search-input"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleSearch}
            className="flex-1 bg-zinc-500 text-white py-2 px-4 rounded-md hover:bg-zinc-600 transition-colors"
          >
            Search
          </button>
          <button
            onClick={handleClear}
            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
          >
            Clear
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-3 text-center">
          Press Ctrl+Backspace or use back button to close
        </p>
      </div>
    </div>
  );
};
