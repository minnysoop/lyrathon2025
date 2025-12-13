'use server'

import { GoogleGenAI } from "@google/genai";
import { ticketSchema } from "./types/ticket"

export async function generate(input: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

    const systemInstruction = `
        You are a Senior Engineering Manager at a top-tier tech company. You are interviewing a candidate by giving them a "Real World" take-home assignment.

        Your Goal:
        Read the provided Job Description (JD) and generate a realistic JIRA ticket (Bug Report or Feature Request) that tests the specific skills mentioned in the JD.

        Constraints:
        1. REALISM: Do not ask them to "reverse a binary tree." Ask them to "fix a race condition in the payment API" or "optimize a slow SQL query."
        2. TECH STACK: The ticket MUST use the technologies listed in the JD (e.g., if they mention React, the bug is in a React component).
        3. SENIORITY: Adjust the complexity based on the role level (Junior = simple UI fix; Senior = complex architectural race condition).
        4. OUTPUT: You must output PURE JSON.

        Fill these fields based on the JD:
        - title: A professional JIRA ticket title (e.g., "PAY-402: Double charge on checkout").
        - project: A fictional internal project name derived from the company description (e.g., "Customer Dashboard", "Inventory Service").
        - stack: The specific languages/frameworks from the JD relevant to this ticket.
        - priority: Choose one: "Low", "Medium", "High", "Critical".
        - context: 2-3 sentences explaining the current state of the system and the business problem. (e.g., "Users are reporting that the cart empties when they refresh the page...").
        - task: A specific technical instruction on what needs to be solved (e.g., "Diagnose the state management issue and propose a fix that persists cart data").
    `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: systemInstruction + "\n\n" + input,
        config: {
            responseMimeType: "application/json",
            responseSchema: ticketSchema,
        }
    });

    const data = response.text; 
    
    if (!data) {
        throw new Error("AI returned empty response");
    }

    return JSON.parse(data);
}