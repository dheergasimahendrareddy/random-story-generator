import React, { useEffect, useRef } from 'react';
import { Save, Share } from 'lucide-react';
import { Genre } from '../types';

interface StoryDisplayProps {
  title: string;
  content: string;
  genre: Genre | null;
  onSave: () => void;
  onShare: () => void;
}

const StoryDisplay: React.FC<StoryDisplayProps> = ({ 
  title, 
  content, 
  genre,
  onSave,
  onShare
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [content]);

  const getGenreBadgeColor = () => {
    switch(genre) {
      case 'Adventure': return 'bg-amber-100 text-amber-800';
      case 'Romance': return 'bg-pink-100 text-pink-800';
      case 'Mystery': return 'bg-purple-100 text-purple-800';
      case 'Science Fiction': return 'bg-blue-100 text-blue-800';
      case 'Fantasy': return 'bg-emerald-100 text-emerald-800';
      case 'Horror': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div 
      ref={contentRef}
      className="mt-8 pt-8 border-t border-gray-200 animate-fadeIn"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        {genre && (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getGenreBadgeColor()}`}>
            {genre}
          </span>
        )}
      </div>
      
      <div className="prose prose-indigo max-w-none">
        {content.split('\n\n').map((paragraph, index) => (
          <p key={index} className="text-gray-700 leading-relaxed mb-4">
            {paragraph}
          </p>
        ))}
      </div>
      
      <div className="mt-6 flex space-x-4">
        <button
          onClick={onSave}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Save className="h-4 w-4 mr-2" />
          Save
        </button>
        <button
          onClick={onShare}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Share className="h-4 w-4 mr-2" />
          Share
        </button>
      </div>
    </div>
  );
};

export default StoryDisplay;