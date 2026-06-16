import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Initialize Gemini SDK with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

/**
 * 1. Generate Project Concept (Design Thinking Guide)
 * Empathize, Define, Ideate base mapping
 */
app.post('/api/project/generate-concept', async (req, res) => {
  const { sdg, observations, targetAudience } = req.body;

  if (!sdg || !observations) {
    return res.status(400).json({ error: 'SDG and observations are required' });
  }

  try {
    const prompt = `You are an AI and Sustainability mentor for the 1M1B - IBM SkillsBuild Virtual Internship.
Based on the student's selected SDG and environmental observations, guide them through the Design Thinking framework.

Student Input:
- Target SDG: ${sdg}
- Observations/Problem in their surroundings: ${observations}
- Target Audience/Users: ${targetAudience || 'General local community'}

Respond with a strictly formatted JSON object matching this schema:
{
  "projectTitle": "A concise, literal, human-friendly title of the project (no marketing jargon)",
  "empathize": {
    "userPains": ["3 major pains or challenges faced by the target users"],
    "currentGaps": "Why is the current approach manual, slow, or ineffective?"
  },
  "define": {
    "problemStatement": "A clean definition matching: 'How might we use AI to _____ so that _____ can become more sustainable?'"
  },
  "ideate": {
    "aiApproach": "What type of AI application is best (e.g. Classifier, RAG Assistant, Chatbot, Predictive Alert, Automation Agent)? Describe briefly.",
    "aiJustification": "Why is AI uniquely suited for this instead of a simple static database or manual method?"
  }
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          required: ['projectTitle', 'empathize', 'define', 'ideate'],
          properties: {
            projectTitle: { type: Type.STRING },
            empathize: {
              type: Type.OBJECT,
              required: ['userPains', 'currentGaps'],
              properties: {
                userPains: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                currentGaps: { type: Type.STRING }
              }
            },
            define: {
              type: Type.OBJECT,
              required: ['problemStatement'],
              properties: {
                problemStatement: { type: Type.STRING }
              }
            },
            ideate: {
              type: Type.OBJECT,
              required: ['aiApproach', 'aiJustification'],
              properties: {
                aiApproach: { type: Type.STRING },
                aiJustification: { type: Type.STRING }
              }
            }
          }
        }
      }
    });

    const data = JSON.parse(response.text || '{}');
    res.json(data);
  } catch (error: any) {
    console.error('Error generating concept:', error);
    res.status(500).json({ error: error.message || 'Failed to generate project concept' });
  }
});

/**
 * 2. Simulate AI Prototype
 * Runs a simulated user query against their custom prompt and mock RAG databases.
 */
app.post('/api/project/simulate-ai', async (req, res) => {
  const { systemPrompt, testMessage, knowledgeBase, aiType } = req.body;

  if (!systemPrompt || !testMessage) {
    return res.status(400).json({ error: 'System prompt and test message are required' });
  }

  try {
    const ragContext = knowledgeBase && knowledgeBase.trim() 
      ? `\n[SIMULATED KNOWLEDGE BASE CONTEXT (RAG)]:\n${knowledgeBase}\nUse the facts above first to answer the query if relevant. Keep output grounded in these facts.`
      : '';

    const instruction = `You are the user's simulated AI prototype. You must act strictly according to the system rules provided below.

System Rules for this AI:
"""
${systemPrompt}
"""
${ragContext}

The user is testing your prototype. Address their message following the persona, role, and instructions of the sustainability solution specified above. Maintain a professional, actionable, and encouraging tone. Let the user know if any information is out of scope.

User Text: "${testMessage}"`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: instruction,
    });

    res.json({ output: response.text });
  } catch (error: any) {
    console.error('Error simulating AI:', error);
    res.status(500).json({ error: error.message || 'Failed to simulate AI prototype' });
  }
});

/**
 * 3. Generate Responsible AI Checklist & Impact Report
 * Analysis of Fairness, Transparency, Ethics, Privacy
 */
app.post('/api/project/generate-assessment', async (req, res) => {
  const { projectTitle, sdg, problemStatement, aiApproach } = req.body;

  try {
    const prompt = `You are a Responsible AI ethical auditor. Analyze the following sustainability project and generate a practical, actionable assessment based on the four pillars of Responsible AI: Fairness, Transparency, Ethics, and Privacy.

Project Details:
- Title: ${projectTitle || 'Sustainability Tool'}
- SDG Alignment: ${sdg}
- Problem: ${problemStatement}
- AI Type: ${aiApproach}

Provide your response as a JSON matching this exact structure:
{
  "fairness": {
    "goal": "Explain how this AI avoids biases (e.g., regional language, data gaps) and ensures fair inclusion.",
    "checklists": ["2-3 physical steps the student can take to ensure fairness"]
  },
  "transparency": {
    "goal": "Explain how the model's choices/insights remain glass-box and verifiable to the average local user.",
    "checklists": ["2-3 practical ways of explaining outcomes, citing sources, or adding helpful tooltips"]
  },
  "ethics": {
    "goal": "State the potential risks (such as hallucinations, false alerts, misleading guidance) and how to protect users.",
    "checklists": ["2-3 protocols to guard against harmful advice or actions"]
  },
  "privacy": {
    "goal": "Analyze whether data collection is safe and how to avoid processing personal identifiable information (PII).",
    "checklists": ["2-3 specific rules, e.g. local data stripping, only reading public readings instead of user files"]
  },
  "expectedImpact": {
    "environmental": "Estimated ecological, resource, or carbon reduction outcome.",
    "social": "Estimated benefits to target citizens or community users."
  }
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          required: ['fairness', 'transparency', 'ethics', 'privacy', 'expectedImpact'],
          properties: {
            fairness: {
              type: Type.OBJECT,
              required: ['goal', 'checklists'],
              properties: {
                goal: { type: Type.STRING },
                checklists: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            },
            transparency: {
              type: Type.OBJECT,
              required: ['goal', 'checklists'],
              properties: {
                goal: { type: Type.STRING },
                checklists: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            },
            ethics: {
              type: Type.OBJECT,
              required: ['goal', 'checklists'],
              properties: {
                goal: { type: Type.STRING },
                checklists: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            },
            privacy: {
              type: Type.OBJECT,
              required: ['goal', 'checklists'],
              properties: {
                goal: { type: Type.STRING },
                checklists: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            },
            expectedImpact: {
              type: Type.OBJECT,
              required: ['environmental', 'social'],
              properties: {
                environmental: { type: Type.STRING },
                social: { type: Type.STRING }
              }
            }
          }
        }
      }
    });

    const data = JSON.parse(response.text || '{}');
    res.json(data);
  } catch (error: any) {
    console.error('Error generating assessment:', error);
    res.status(500).json({ error: error.message || 'Failed to complete responsible AI assessment' });
  }
});

// Serve Vite SPA in development, or compiled production files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
} else {
  // ESM dynamic import to prevent bundling problems in dev
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa'
  });
  app.use(vite.middlewares);
}

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Fullstack Server] Running on http://localhost:${PORT}`);
});
