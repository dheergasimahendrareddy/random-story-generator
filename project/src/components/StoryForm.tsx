import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { Genre, StoryConfig } from '../types';

interface StoryFormProps {
  onGenerateStory: (config: StoryConfig) => void;
}

const StoryForm: React.FC<StoryFormProps> = ({ onGenerateStory }) => {
  const [genre, setGenre] = useState<Genre>('Adventure');
  const [wordCount, setWordCount] = useState<number>(250);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerateStory({
      genre,
      wordCount
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
            Choose a Genre
          </label>
          <select
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value as Genre)}
            className="block w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
          >
            <option value="Adventure">Adventure</option>
            <option value="Romance">Romance</option>
            <option value="Mystery">Mystery</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Horror">Horror</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="wordCount" className="block text-sm font-medium text-gray-700">
            Word Count: {wordCount}
          </label>
          <input
            type="range"
            id="wordCount"
            min="50"
            max="1000"
            step="50"
            value={wordCount}
            onChange={(e) => setWordCount(Number(e.target.value))}
            className="block w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>50</span>
            <span>500</span>
            <span>1000</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <button
          type="submit"
          className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transform transition duration-200 hover:scale-105 flex items-center space-x-2"
        >
          <Wand2 size={20} />
          <span>Generate Story</span>
        </button>
      </div>
    </form>
  );
};

export default StoryForm;