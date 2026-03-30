import React, { useState } from 'react';
import AdvancedIdeaGenerator from '../components/AdvancedIdeaGenerator';

// Existing placeholder for random idea generator - would remain as baseline
const basicRandomIdeas = [
  "Create a viral social media challenge to boost brand awareness.",
  "Develop an AI-powered chatbot for customer engagement.",
  "Launch a targeted email campaign focusing on seasonal promotions.",
  "Host a virtual roundtable with industry experts to generate buzz.",
  "Offer exclusive early access to new product features to select customers.",
  "Create a user-generated content contest with attractive prizes.",
  "Develop interactive webinars showcasing product benefits.",
  "Leverage influencer partnerships to expand reach.",
  "Build a referral program rewarding loyal customers.",
  "Create a microsite showcasing customer success stories."
];

export default function Home() {
  const [randomIdea, setRandomIdea] = useState('');
  const [totalIdeasGenerated, setTotalIdeasGenerated] = useState(0);

  // Handler for random idea generation button click
  const handleRandomIdeaClick = () => {
    const randomIndex = Math.floor(Math.random() * basicRandomIdeas.length);
    const idea = basicRandomIdeas[randomIndex];
    setRandomIdea(idea);
    setTotalIdeasGenerated((prev) => prev + 1);
    console.log('Random idea generated:', idea);
  };

  // Callback from advanced generator to track ideas generated
  const handleAdvancedIdeasGenerated = (count) => {
    setTotalIdeasGenerated((prev) => prev + count);
    console.log(`Advanced ideas generated: ${count}`);
  };

  return (
    <div style={{ maxWidth: 680, margin: 'auto', padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#6c63ff', textAlign: 'center' }}>Randomeer Idea Generator</h1>
      <p style={{ textAlign: 'center' }}>
        Generate instant creative ideas randomly or by providing minimal context.
      </p>

      <section style={{ marginTop: 30, textAlign: 'center' }}>
        <button
          onClick={handleRandomIdeaClick}
          style={{
            backgroundColor: '#6c63ff',
            color: 'white',
            padding: '12px 24px',
            borderRadius: 6,
            fontSize: 16,
            cursor: 'pointer',
            border: 'none'
          }}
          aria-label="Generate random idea"
        >
          Generate Random Idea
        </button>
        {randomIdea && <p style={{ marginTop: 18, fontWeight: 'bold', fontSize: 18, color: '#333' }}>{randomIdea}</p>}
      </section>

      <section style={{ marginTop: 40 }}>
        <AdvancedIdeaGenerator onNewIdeas={handleAdvancedIdeasGenerated} />
      </section>

      <footer style={{ marginTop: 50, textAlign: 'center', color: '#6c63ff', fontStyle: 'italic' }}>
        <p>Total ideas generated this session: {totalIdeasGenerated}</p>
      </footer>
    </div>
  );
}
