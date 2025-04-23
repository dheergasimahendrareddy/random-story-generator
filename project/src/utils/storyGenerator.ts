import { Genre, StoryConfig, GeneratedStory, StoryTemplate } from '../types';
import { adventureTemplate } from './storyTemplates/adventure';
import { romanceTemplate } from './storyTemplates/romance';
import { mysteryTemplate } from './storyTemplates/mystery';
import { sciFiTemplate } from './storyTemplates/sciFi';
import { fantasyTemplate } from './storyTemplates/fantasy';
import { horrorTemplate } from './storyTemplates/horror';

const getTemplateForGenre = (genre: Genre): StoryTemplate => {
  switch (genre) {
    case 'Adventure': return adventureTemplate;
    case 'Romance': return romanceTemplate;
    case 'Mystery': return mysteryTemplate;
    case 'Science Fiction': return sciFiTemplate;
    case 'Fantasy': return fantasyTemplate;
    case 'Horror': return horrorTemplate;
    default: return adventureTemplate;
  }
};

const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomElements = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const replaceTemplateVariables = (text: string, template: StoryTemplate): string => {
  let result = text;
  
  // Replace character placeholders
  const characters = getRandomElements(template.characters, 3);
  characters.forEach((character, index) => {
    const regex = new RegExp(`\\[CHARACTER${index + 1}\\]`, 'g');
    result = result.replace(regex, character.name);
    
    const descRegex = new RegExp(`\\[CHARACTER${index + 1}_DESC\\]`, 'g');
    result = result.replace(descRegex, character.description);
  });
  
  // Replace setting placeholders
  const settings = getRandomElements(template.settings, 2);
  settings.forEach((setting, index) => {
    const regex = new RegExp(`\\[SETTING${index + 1}\\]`, 'g');
    result = result.replace(regex, setting);
  });
  
  // Replace object placeholders
  const objects = getRandomElements(template.objects, 3);
  objects.forEach((object, index) => {
    const regex = new RegExp(`\\[OBJECT${index + 1}\\]`, 'g');
    result = result.replace(regex, object);
  });
  
  // Replace event placeholders
  const events = getRandomElements(template.events, 2);
  events.forEach((event, index) => {
    const regex = new RegExp(`\\[EVENT${index + 1}\\]`, 'g');
    result = result.replace(regex, event);
  });
  
  return result;
};

const adjustToTargetWordCount = (text: string, targetWordCount: number): string => {
  const paragraphs = text.split('\n\n');
  const currentWordCount = text.split(/\s+/).length;
  
  // If we're within 10% of target, return as is
  if (Math.abs(currentWordCount - targetWordCount) / targetWordCount <= 0.1) {
    return text;
  }
  
  if (currentWordCount > targetWordCount) {
    // Need to reduce word count
    let newParagraphs = [...paragraphs];
    
    while (newParagraphs.join(' ').split(/\s+/).length > targetWordCount * 1.1 && newParagraphs.length > 2) {
      // Remove a random paragraph (not first or last)
      const indexToRemove = Math.floor(Math.random() * (newParagraphs.length - 2)) + 1;
      newParagraphs.splice(indexToRemove, 1);
    }
    
    return newParagraphs.join('\n\n');
  } else {
    // Need to increase word count
    // Add some descriptive sentences to random paragraphs
    const additionalSentences = [
      "The air was filled with anticipation.",
      "It was unlike anything they had experienced before.",
      "Time seemed to stand still in that moment.",
      "The significance of this couldn't be overstated.",
      "This changed everything they thought they knew.",
      "A feeling of wonder washed over everyone present.",
      "The implications were far-reaching and profound.",
      "It was a moment that would be remembered for generations.",
      "A new chapter was beginning before their very eyes.",
      "This unexpected turn of events left everyone speechless."
    ];
    
    let newParagraphs = [...paragraphs];
    let currentCount = newParagraphs.join(' ').split(/\s+/).length;
    
    while (currentCount < targetWordCount * 0.9) {
      // Add a sentence to a random paragraph (not first or last)
      const paragraphIndex = Math.floor(Math.random() * (newParagraphs.length - 2)) + 1;
      const sentenceToAdd = getRandomElement(additionalSentences);
      newParagraphs[paragraphIndex] = newParagraphs[paragraphIndex] + " " + sentenceToAdd;
      
      currentCount = newParagraphs.join(' ').split(/\s+/).length;
    }
    
    return newParagraphs.join('\n\n');
  }
};

export const generateStory = (config: StoryConfig): GeneratedStory => {
  const template = getTemplateForGenre(config.genre);
  
  // Select random parts for the story
  const beginning = getRandomElement(template.beginnings);
  const middle = getRandomElement(template.middles);
  const ending = getRandomElement(template.endings);
  
  // Combine the parts
  let storyText = `${beginning}\n\n${middle}\n\n${ending}`;
  
  // Replace template variables with actual content
  storyText = replaceTemplateVariables(storyText, template);
  
  // Adjust to target word count
  storyText = adjustToTargetWordCount(storyText, config.wordCount);
  
  // Generate a title
  const title = getRandomElement(template.titles);
  
  return {
    title,
    text: storyText
  };
};