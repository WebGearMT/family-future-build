import React from 'react';
import { Search, RotateCcw, Lightbulb, ArrowRight } from 'lucide-react';

interface EmptySearchComponentProps {
  searchTerm?: string;
  selectedCategory?: string;
  onClearSearch?: () => void;
  onClearFilters?: () => void;
  onClearAll?: () => void;
  suggestions?: string[];
  customMessage?: string;
  showSuggestions?: boolean;
  className?: string;
}

const EmptySearchComponent: React.FC<EmptySearchComponentProps> = ({
  searchTerm = '',
  selectedCategory = 'All',
  onClearSearch,
  onClearFilters,
  onClearAll,
  suggestions = ['electronics', 'fashion', 'shipping', 'groceries'],
  customMessage,
  showSuggestions = true,
  className = ''
}) => {
  const hasActiveSearch = searchTerm.length > 0;
  const hasActiveFilter = selectedCategory !== 'All';
  const hasAnyFilters = hasActiveSearch || hasActiveFilter;

  const handleSuggestionClick = (suggestion: string) => {
    // This would typically be handled by the parent component
    console.log(`Suggested search: ${suggestion}`);
  };

  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 ${className}`}>
      {/* Animated Search Icon */}
      <div className="relative mb-8">
        <div className="w-32 h-32 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
          <Search className="w-16 h-16 text-blue-400" />
        </div>
        
        {/* Floating question mark */}
        <div className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-100 border-2 border-yellow-200 rounded-full flex items-center justify-center animate-bounce">
          <span className="text-yellow-600 text-lg font-bold">?</span>
        </div>
        
        {/* Search ripple effect */}
        <div className="absolute inset-0 rounded-full border-2 border-blue-200 animate-ping opacity-20"></div>
      </div>

      {/* Main Message */}
      <div className="text-center mb-8 max-w-md">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          {customMessage || 'No results found'}
        </h3>
        
        <div className="space-y-2">
          {hasActiveSearch && (
            <p className="text-gray-600">
              No results for <span className="font-semibold text-blue-600">"{searchTerm}"</span>
            </p>
          )}
          
          {hasActiveFilter && selectedCategory !== 'All' && (
            <p className="text-gray-600">
              in <span className="font-semibold text-green-600">{selectedCategory}</span> category
            </p>
          )}
          
          {!hasAnyFilters && (
            <p className="text-gray-600">
              Try adjusting your search terms or explore different categories.
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      {hasAnyFilters && (
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {hasActiveSearch && onClearSearch && (
            <button
              onClick={onClearSearch}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <RotateCcw className="w-4 h-4" />
              Clear Search
            </button>
          )}
          
          {hasActiveFilter && onClearFilters && (
            <button
              onClick={onClearFilters}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <RotateCcw className="w-4 h-4" />
              Clear Filters
            </button>
          )}
          
          {hasAnyFilters && onClearAll && (
            <button
              onClick={onClearAll}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <RotateCcw className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>
      )}

      {/* Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="w-full max-w-md">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-blue-900">Try searching for:</h4>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="bg-white hover:bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border border-blue-200 hover:border-blue-300 flex items-center gap-1 group shadow-sm hover:shadow-md"
                >
                  {suggestion}
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Alternative Actions */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 mb-4">Still can't find what you're looking for?</p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center text-sm">
          <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
            Browse all categories
          </button>
          <span className="hidden sm:inline text-gray-300">•</span>
          <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
            Contact support
          </button>
          <span className="hidden sm:inline text-gray-300">•</span>
          <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
            Request new deals
          </button>
        </div>
      </div>
    </div>
  );
};

// Example usage component
const ExampleUsage: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('nonexistent product');
  const [selectedCategory, setSelectedCategory] = React.useState('Electronics');

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">EmptySearchComponent Demo</h1>
        
        {/* Demo Controls */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-lg font-semibold mb-4">Demo Controls</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Term:
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter search term..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category:
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Books">Books</option>
              </select>
            </div>
          </div>
        </div>

        {/* Component Demo */}
        <div className="bg-white rounded-lg shadow-lg">
          <EmptySearchComponent
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            onClearSearch={() => setSearchTerm('')}
            onClearFilters={() => setSelectedCategory('All')}
            onClearAll={() => {
              setSearchTerm('');
              setSelectedCategory('All');
            }}
            suggestions={['electronics', 'fashion', 'books', 'home & garden']}
            showSuggestions={true}
          />
        </div>

        {/* Usage Examples */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Usage Examples</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-medium text-gray-900">Basic Usage:</h3>
              <pre className="bg-gray-100 p-3 rounded mt-2 overflow-x-auto">
{`<EmptySearchComponent 
  searchTerm="shoes"
  onClearSearch={() => setSearchTerm('')}
/>`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900">With Custom Message:</h3>
              <pre className="bg-gray-100 p-3 rounded mt-2 overflow-x-auto">
{`<EmptySearchComponent 
  customMessage="No products match your criteria"
  suggestions={['laptops', 'phones', 'tablets']}
  onClearAll={() => resetFilters()}
/>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptySearchComponent;
