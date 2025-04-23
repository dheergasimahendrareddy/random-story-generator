import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      <p className="text-gray-600 font-medium">Crafting your unique story...</p>
    </div>
  );
};

export default LoadingSpinner;