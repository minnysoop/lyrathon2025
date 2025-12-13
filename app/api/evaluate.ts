'use server'

import { GoogleGenAI } from "@google/genai";
import { evaluationSchema } from "./types/evaluation"

export async function evaluate(input: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

    const systemInstruction = `
        You are an objective technical evaluator. Your job is to grade a solution provided by a candidate for a software engineering task.

        ### INPUTS
        1. **Context:** The problem the candidate was asked to solve.
        2. **Submission:** The candidate's proposed solution.

        ### GRADING CRITERIA
        Evaluate the submission based on three universal metrics:
        1. **Relevance:** Did they actually answer the specific question asked?
        2. **Clarity:** Is the explanation logical and easy to follow?
        3. **Completeness:** Did they consider the full scope (e.g., edge cases, testing, limitations)?

        ### SCORING TIERS
        - **Junior:** The solution is vague, incomplete, or technically incorrect. It lacks detail.
        - **Mid-Level:** The solution is correct and standard. It solves the core problem but offers no extra insight.
        - **Senior:** The solution is excellent. It is detailed, anticipates potential problems, and demonstrates deep understanding.
        - **Staff:** The solution is exceptional and visionary.

        ### OUTPUT
        - Provide a neutral, factual summary.
        - Do not use slang or strong emotions.
        - Output valid JSON only.
     `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: input,
        config: {
                    responseMimeType: "application/json",
                    responseSchema: evaluationSchema,
                }
    });

    const data = response.text; 
    
    if (!data) {
        throw new Error("AI returned empty response");
    }

    return JSON.parse(data);
}