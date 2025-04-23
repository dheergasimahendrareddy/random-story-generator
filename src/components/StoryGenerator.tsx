import React, { useState } from 'react';
import StoryForm from './StoryForm';
import StoryDisplay from './StoryDisplay';
import LoadingSpinner from './LoadingSpinner';
import { generateStory } from '../utils/storyGenerator';
import { Genre, StoryConfig } from '../types';

const StoryGenerator = () => {
  const [story, setStory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [storyTitle, setStoryTitle] = useState<string | null>(null);
  const [currentGenre, setCurrentGenre] = useState<Genre | null>(null);

  const handleGenerateStory = async (config: StoryConfig) => {
    setLoading(true);
    setStory(null);
    
    // Simulate server processing time
    setTimeout(() => {
      const { text, title } = generateStory(config);
      setStory(text);
      setStoryTitle(title);
      setCurrentGenre(config.genre);
      setLoading(false);
    }, 1500);
  };

  const handleSaveStory = () => {
    if (!story) return;
    
    // Create a blob with the story content
    const blob = new Blob([`${storyTitle}\n\n${story}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = `${storyTitle?.replace(/\s+/g, '-').toLowerCase() || 'story'}.txt`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShareStory = () => {
    if (!story || !storyTitle) return;
    
    if (navigator.share) {
      navigator.share({
        title: storyTitle,
        text: `Check out this story I generated: ${storyTitle}`,
        url: window.location.href
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(`${storyTitle}\n\n${story}`).then(() => {
        alert('Story copied to clipboard!');
      }).catch(err => {
        console.error('Error copying to clipboard:', err);
      });
    }
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300">
      <div className="p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Random Story Generator</h2>
        
        <StoryForm onGenerateStory={handleGenerateStory} />
        
        {loading && (
          <div className="my-8 flex justify-center">
            <LoadingSpinner />
          </div>
        )}
        
        {story && !loading && (
          <StoryDisplay 
            title={storyTitle || 'Untitled Story'} 
            content={story} 
            genre={currentGenre}
            onSave={handleSaveStory}
            onShare={handleShareStory}
          />
        )}
      </div>
    </div>
  );
};

export default StoryGenerator;