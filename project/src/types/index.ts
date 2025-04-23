export type Genre = 'Adventure' | 'Romance' | 'Mystery' | 'Science Fiction' | 'Fantasy' | 'Horror';

export interface StoryConfig {
  genre: Genre;
  wordCount: number;
}

export interface StoryTemplate {
  beginnings: string[];
  middles: string[];
  endings: string[];
  characters: Character[];
  settings: string[];
  objects: string[];
  events: string[];
  titles: string[];
}

export interface Character {
  name: string;
  description: string;
}

export interface GeneratedStory {
  title: string;
  text: string;
}