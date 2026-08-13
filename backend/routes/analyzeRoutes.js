import express from 'express';
import pool from '../config/db.js';
import { GoogleGenAI } from '@google/genai';

const router = express.Router();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.post('/', async (req, res) => {
  try {
    const { userId, code, language, errorMessage, level, features } = req.body;

    if (!userId) {
      return res.status(401).json({ error: 'User must be logged in to analyze.' });
    }

    const prompt = `
      You are an expert programming assistant. Analyze the following code and error to find the bug.
      Language: ${language}
      Error Message: ${errorMessage || 'None provided'}
      Code:
      ${code}

      Explanation Level: ${level}
      Requested Features: 
      - Explain Cause: ${features.explainCause}
      - Suggest Fix: ${features.suggestFix}
      - Show Corrected Code: ${features.correctedCode}

      Respond strictly in JSON format with EXACTLY these 5 keys (use empty strings for disabled features or if not applicable):
      {
        "severity": "Evaluate the bug severity as exactly 'High', 'Medium', or 'Low' (High for critical errors/crashes, Medium for basic runtime errors or missing variables, Low for missing characters like ;, ,, =, or })",
        "whatWentWrong": "Brief description of the error",
        "rootCause": "Detailed explanation of the root cause based on the explanation level",
        "suggestedFix": "Step-by-step suggested fix",
        "correctedCode": "The corrected code"
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const rawText = response.text.replace(/```json\n?|```/g, '').trim();
    const aiResult = JSON.parse(rawText);

    const severity = aiResult.severity || (errorMessage ? 'High' : 'Medium');

    const [dbResult] = await pool.query(
      `INSERT INTO debug_history 
        (user_id, language, severity, code_snippet, error_message, root_cause, suggested_fix, is_saved, explanation_level, feature_explain_cause, feature_suggest_fix, feature_show_corrected_code, what_went_wrong, corrected_code) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId, 
        language, 
        severity, 
        code, 
        errorMessage || '', 
        aiResult.rootCause || null, 
        aiResult.suggestedFix || null, 
        false, 
        level, 
        features.explainCause ? 1 : 0, 
        features.suggestFix ? 1 : 0, 
        features.correctedCode ? 1 : 0,
        aiResult.whatWentWrong || aiResult.what_went_wrong || null,
        aiResult.correctedCode || aiResult.corrected_code || null
      ]
    );

    res.json({
      id: dbResult.insertId,
      ...aiResult
    });

  } catch (error) {
    console.error('AI Analysis Error:', error);
    res.status(500).json({ error: 'Failed to analyze code.', details: error.message, stack: error.stack });
  }
});

export default router;
