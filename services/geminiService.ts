
import { GoogleGenAI, Type } from "@google/genai";
import { Language, Question, Difficulty } from "../types";

// Always use process.env.API_KEY for initialization
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateQuizQuestions = async (language: Language, difficulty: Difficulty, count: number): Promise<Question[]> => {
  const prompt = `Generate exactly ${count} high-quality multiple-choice questions for the ${language} programming language at the ${difficulty} level. 

  STRICT CONTENT RULES:
  1. NO SPOILERS: The 'question' and 'codeSnippet' fields MUST NOT contain the correct answer, the value being tested, or any text that gives away which option is correct.
  2. CONDITIONAL CODE SNIPPETS: Only provide a 'codeSnippet' if the question is specifically a "What is the output?" or "What does this code do?" type of challenge. For general conceptual or syntax questions (e.g., "Which keyword is used for..."), the 'codeSnippet' field MUST be empty or null.
  3. CODE FORMATTING: If providing a snippet, use '\\n' for new lines and ensure professional indentation.
  4. OPTIONS: Provide exactly 4 plausible, distinct options. Ensure the 'correctAnswerIndex' (0-3) matches the actual correct option.
  5. EXPLANATION: Provide a detailed 'explanation' that will ONLY be shown after the user answers.

  Return the response as a JSON array of objects following the defined schema.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              question: { type: Type.STRING },
              codeSnippet: { type: Type.STRING, description: "Multiline code block. Only use for output-based questions. Otherwise null." },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              correctAnswerIndex: { type: Type.INTEGER },
              explanation: { type: Type.STRING }
            },
            required: ["id", "question", "options", "correctAnswerIndex", "explanation"],
          },
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response received from the model.");
    
    return JSON.parse(text) as Question[];
  } catch (error: any) {
    console.error("Error generating quiz:", error);
    if (error?.message?.includes('429')) throw new Error("Rate limit exceeded. Please wait a moment.");
    throw new Error("An unexpected error occurred while generating the quiz.");
  }
};
