import React from 'react';
import { ScrollText } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <ScrollText className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-semibold text-gray-900">
              Estate Planning
            </span>
          </div>
          <div className="hidden sm:flex space-x-8">
            <a href="#personal" className="text-gray-600 hover:text-gray-900">
              Personal Info
            </a>
            <a href="#spouse" className="text-gray-600 hover:text-gray-900">
              Spouse Info
            </a>
            <a href="#children" className="text-gray-600 hover:text-gray-900">
              Children
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};