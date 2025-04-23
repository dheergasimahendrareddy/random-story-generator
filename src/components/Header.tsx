import React from 'react';
import { BookOpen } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-indigo-600" />
          <h1 className="text-xl font-bold text-gray-800">StoryForge</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition duration-150">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition duration-150">
                Gallery
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition duration-150">
                About
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;