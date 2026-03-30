import Head from 'next/head';
import { useEffect, useState } from 'react';
import { AIIdeaGeneratorForm } from '@/components/AIIdeaGeneratorForm';
import { Button } from '@/components/ui/button';

const basicIdeas = [
  "Create a viral social media challenge for SaaS marketers.",
  "Develop an interactive webinar series about growth hacking techniques.",
  "Design a personalized marketing campaign based on AI predictions.",
  "Launch a customer referral program with gamified rewards.",
  "Build a chatbot that helps marketers generate content ideas instantly.",
  "Create a virtual conference focused on emerging SaaS trends.",
  "Develop an AI tool for personalized email subject line generation.",
  "Design a monthly newsletter featuring niche SaaS growth tactics.",
];

export default function Home() {
  const [randomIdea, setRandomIdea] = useState('');

  function generateRandomIdea() {
    const random = basicIdeas[Math.floor(Math.random() * basicIdeas.length)];
    setRandomIdea(random);
  }

  // Analytics track simulation
  useEffect(() => {
    if (randomIdea) {
      console.log(`User generated basic idea: ${randomIdea}`);
    }
  }, [randomIdea]);

  return (
    <>
      <Head>
        <title>Randomeer - AI-Powered Idea Generator</title>
        <meta name="description" content="Generate creative AI-powered idea prompts tailored for SaaS marketing." />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-purple-800 to-purple-900 text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold mb-4">Randomeer</h1>
        <p className="mb-6 max-w-xl text-center">
          AI-powered random idea generator to spark your SaaS marketing creativity.
        </p>

        <section className="mb-10">
          <Button onClick={generateRandomIdea} className="bg-purple-700 hover:bg-purple-600">
            Generate Random Idea
          </Button>
          {randomIdea && (
            <div className="mt-4 p-4 bg-purple-700 rounded max-w-xl">
              {randomIdea}
            </div>
          )}
        </section>

        <section className="w-full max-w-xl">
          <h2 className="text-2xl font-semibold mb-4 text-center">Or generate personalized ideas</h2>
          <AIIdeaGeneratorForm />
        </section>
      </main>
    </>
  );
}
