import React, { useState, useEffect } from 'react';
import { Tag, Clock, Percent, Gift, Star, Search, Filter, AlertCircle, RefreshCw } from 'lucide-react';


interface FetchState {
  loading: boolean;
  error: string | null;
  lastFetch: Date | null;
}


// Error Component
  const ErrorComponent = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <AlertCircle className="w-16 h-16 text-red-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to Load Vouchers</h3>
      <p className="text-gray-500 mb-4 text-center">{fetchState.error}</p>
      <button
        onClick={handleRetry}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
      >
        Try Again
      </button>
    </div>
  );
  
export default ErrorComponent;
