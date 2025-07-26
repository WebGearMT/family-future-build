import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized: React.FC = () => {
  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Access Denied
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-md">
          You don't have permission to access this page. This area is restricted to administrators only.
        </p>
        <Link 
          to="/index.tsx"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;