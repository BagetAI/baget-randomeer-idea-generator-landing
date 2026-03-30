import type { NextApiRequest, NextApiResponse } from 'next';

const baseIdeas = [
  "Create a viral social media challenge for SaaS marketers.",
  "Develop an interactive webinar series about growth hacking techniques.",
  "Design a personalized marketing campaign based on AI predictions.",
  "Launch a customer referral program with gamified rewards.",
  "Build a chatbot that helps marketers generate content ideas instantly.",
  "Create a virtual conference focused on emerging SaaS trends.",
  "Develop an AI tool for personalized email subject line generation.",
  "Design a monthly newsletter featuring niche SaaS growth tactics.",
];

// Simple function to tailor ideas based on minimal user input
function personalizeIdeas(input: { industry?: string; goal?: string; contentType?: string }) {
  let personalized = [...baseIdeas];

  if (input.industry) {
    personalized.push(`Tailor a campaign specifically for the ${input.industry} industry targeting early adopters.`);
  }
  if (input.goal) {
    personalized.push(`Create content focusing on achieving ${input.goal} through innovative storytelling.`);
  }
  if (input.contentType) {
    personalized.push(`Produce a series of engaging ${input.contentType} pieces showcasing customer success.`);
  }

  personalized.push("Use AI to analyze competitors' marketing strategies and optimize your campaign.");

  return personalized;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  const { industry, goal, contentType } = req.body || {};

  if (!industry && !goal && !contentType) {
    // Return random basic idea if no input
    const randomIdea = baseIdeas[Math.floor(Math.random() * baseIdeas.length)];
    return res.status(200).json({ idea: randomIdea });
  }

  const ideas = personalizeIdeas({ industry, goal, contentType });
  const selectedIdea = ideas[Math.floor(Math.random() * ideas.length)];
  res.status(200).json({ idea: selectedIdea });
}
