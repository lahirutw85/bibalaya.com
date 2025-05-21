
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-dark-bg text-text-light py-8 shadow-inner"> {/* Removed mt-12 */}
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Bible Study Web App. All Rights Reserved.
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Built with React, TypeScript, and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
};