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
1. REALISM: Do not ask them to "reverse a binary tree." Ask them to "design a strategy to handle race conditions in the payment API" or "outline a plan to optimize a slow SQL query."
2. TECH STACK: The ticket MUST use the technologies listed in the JD (e.g., if they mention React, the problem is related to React architecture or lifecycle).
3. NO CODE ACCESS: The candidate cannot see or edit the actual codebase. The task must be solvable through architectural planning, root cause analysis, debugging strategies, or writing pseudo-code/technical specs.
4. SENIORITY: Adjust the complexity based on the role level (Junior = explain a UI rendering issue; Senior = design a migration plan for a legacy service).
5. OUTPUT: You must output PURE JSON.

Fill these fields based on the JD:
- title: A professional JIRA ticket title (e.g., "PAY-402: Double charge on checkout").
- project: A fictional internal project name derived from the company description (e.g., "Customer Dashboard", "Inventory Service").
- stack: The specific languages/frameworks from the JD relevant to this ticket.
- priority: Choose one: "Low", "Medium", "High", "Critical".
- context: 2-3 sentences explaining the observed behavior and the business impact. (e.g., "Customer support reports that the cart intermittently empties on refresh during high traffic...").
- task: A specific instruction asking the candidate to propose a solution or diagnose the issue without writing implementation code. (e.g., "Draft a technical plan to diagnose the state loss and propose an architecture that persists data across reloads," or "Explain how you would investigate this memory leak and what tools you would use.").
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
    //     return {
    //             title: "🔐 Implement OAuth refresh token rotation",
    //             project: "Authentication Service",
    //             stack: "Node.js, Express, JWT, Redis",
    //             priority: "Critical",
    //             context: `We need to implement refresh token rotation to improve
    // security. Currently, refresh tokens never expire and
    // aren't tracked server-side. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

    // The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
    //             task: `Describe the architecture changes needed and how you'd
    // handle edge cases like concurrent refresh requests. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
    //         }
}


