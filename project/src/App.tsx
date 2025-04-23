import React from 'react';
import StoryGenerator from './components/StoryGenerator';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-purple-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <StoryGenerator />
      </main>
      <Footer />
    </div>
  );
}

export default App;