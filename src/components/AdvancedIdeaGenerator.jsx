import React, { useState, useEffect } from 'react';

// Simulated AI-powered advanced idea generator logic (mocked for MVP)
const generateAdvancedIdea = async (context) => {
  // Simulate API call delay
  await new Promise((r) => setTimeout(r, 700));

  // Basic validation
  if (!context.industry || !context.goal || !context.contentType) {
    throw new Error('Please fill in all context fields to generate personalized ideas.');
  }

  // Generate mock personalized ideas based on inputs
  const ideas = [
    `Build an AI-powered chatbot for ${context.industry} that helps automate customer engagement to achieve ${context.goal}.`,
    `Create a personalized video campaign focused on ${context.contentType} to increase conversion in the ${context.industry} sector with goal: ${context.goal}.`,
    `Develop interactive content like quizzes or surveys in ${context.industry} to boost user interaction, targeting the objective of ${context.goal}.`,
    `Launch a webinar series tailored for ${context.industry} professionals emphasizing ${context.goal} through effective ${context.contentType}.`,
    `Design a gamified mobile app feature for ${context.industry} leveraging ${context.contentType} to support ${context.goal}.`
  ];

  // Rotate ideas randomly
  const shuffled = ideas.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
};

const AdvancedIdeaGenerator = ({ onNewIdeas }) => {
  const [inputs, setInputs] = useState({ industry: '', goal: '', contentType: '' });
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState([]);
  const [error, setError] = useState(null);
  const [badgeCount, setBadgeCount] = useState(0);

  // A/B testing: Feature enabled group tracking
  useEffect(() => {
    // Possible random assignment for A/B could be implemented here
  }, []);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleGenerateClick = async () => {
    setError(null);
    setLoading(true);
    try {
      const newIdeas = await generateAdvancedIdea(inputs);
      setIdeas(newIdeas);
      onNewIdeas(newIdeas.length);

      // Update gamification badge count
      setBadgeCount((count) => count + newIdeas.length);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="advanced-idea-generator" style={{ marginTop: 20, padding: 20, border: '2px solid #6c63ff', borderRadius: 8, backgroundColor: '#f0f0ff' }}>
      <h3 style={{ color: '#6c63ff' }}>Advanced AI-Powered Idea Generator</h3>
      <p>Enter minimal context to get personalized creative ideas.</p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <input
          type="text"
          name="industry"
          placeholder="Industry (e.g. SaaS Marketing)"
          value={inputs.industry}
          onChange={handleChange}
          style={{ flex: '1 1 200px', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
          aria-label="Industry input"
        />
        <input
          type="text"
          name="goal"
          placeholder="Campaign Goal (e.g. lead generation)"
          value={inputs.goal}
          onChange={handleChange}
          style={{ flex: '1 1 200px', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
          aria-label="Goal input"
        />
        <input
          type="text"
          name="contentType"
          placeholder="Content Type (e.g. video, email)"
          value={inputs.contentType}
          onChange={handleChange}
          style={{ flex: '1 1 200px', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
          aria-label="Content type input"
        />
      </div>
      <button
        onClick={handleGenerateClick}
        disabled={loading}
        style={{
          marginTop: 15,
          padding: '10px 20px',
          borderRadius: 6,
          backgroundColor: '#6c63ff',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
        aria-label="Generate personalized ideas"
      >
        {loading ? 'Generating...' : 'Generate Personalized Ideas'}
      </button>
      {error && <p style={{ color: 'red', marginTop: 15 }}>{error}</p>}

      {ideas.length > 0 && (
        <div style={{ marginTop: 20 }} aria-live="polite">
          <h4>Your Customized Ideas</h4>
          <ul style={{ listStyleType: 'disc', paddingLeft: 20 }}>
            {ideas.map((idea, idx) => (
              <li key={idx} style={{ marginBottom: 10 }}>{idea}</li>
            ))}
          </ul>
          <p style={{ fontStyle: 'italic', color: '#444' }}>
            {"Badge Progress: "}
            <strong>{badgeCount} ideas generated</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default AdvancedIdeaGenerator;
