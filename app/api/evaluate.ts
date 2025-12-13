'use server'

import { GoogleGenAI } from "@google/genai";
import { evaluationSchema } from "./types/evaluation"


import Evaluation from "@/app/types/Evaluation"
// Mock evaluation generator based on solution
function generateEvaluation(solution: string): Evaluation {
    const wordCount = solution.trim().split(/\s+/).length;
    const hasDebugging = solution.toLowerCase().includes("debug") || solution.toLowerCase().includes("reproduce");
    const hasEdgeCases = solution.toLowerCase().includes("edge") || solution.toLowerCase().includes("concurrent");
    const hasTesting = solution.toLowerCase().includes("test");

    const level = wordCount > 100 ? "Senior-Level Signal: Strong" :
        wordCount > 50 ? "Mid-Level Signal: Good" :
            "Junior-Level Signal: Developing";

    const strengths: string[] = [];
    const gaps: string[] = [];

    if (hasDebugging) {
        strengths.push("Clear debugging strategy");
        strengths.push("Systematic approach to problem-solving");
    } else {
        gaps.push("Missing detailed debugging approach");
    }

    if (hasEdgeCases) {
        strengths.push("Good understanding of edge cases and concurrency");
    } else {
        gaps.push("Could expand on edge case handling");
    }

    if (hasTesting) {
        strengths.push("Considers testing strategy");
    } else {
        gaps.push("No mention of testing strategy");
    }

    if (wordCount > 80) {
        strengths.push("Thorough and detailed explanation");
    }

    if (!solution.toLowerCase().includes("backend") && !solution.toLowerCase().includes("server")) {
        gaps.push("Could consider backend/server-side implications");
    }

    const summary = wordCount > 100
        ? "This response demonstrates strong real-world reasoning and would likely perform well in a production engineering environment. The candidate shows senior-level thinking with attention to system design and edge cases."
        : wordCount > 50
            ? "This response shows solid engineering fundamentals and practical problem-solving skills. With more depth on system-level concerns, this could reach senior-level quality."
            : "This response demonstrates basic understanding of the problem. Consider expanding on debugging methodology, edge cases, and system-level implications to strengthen the answer.";


    const signals = {
        systemThinking: hasEdgeCases ? 4 : 2,
        debugging: hasDebugging ? 4 : 2,
        communication: wordCount > 80 ? 4 : wordCount > 50 ? 3 : 2,
        riskAwareness: hasTesting ? 3 : 1,
    };

    return { level, strengths, gaps, summary, signals };
}

// TODO: add signals for recruiter judgement (see loc 56-60)
export async function evaluate(ticketContext: string, userSolution: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

    const systemPrompt = `
        You are a skeptical Senior CTO grading a candidate's architecture plan.
        
        ### THE RULES
        - **Junior:** Focuses only on syntax, misses the "big picture", no testing mentioned.
        - **Mid-Level:** Solves the problem correctly but doesn't mention trade-offs or scalability.
        - **Senior:** Mentions edge cases, testing strategies, error handling, and performance impact.
        - **Staff:** Asks "Why are we doing this?", proposes system-wide architectural changes.

        ### YOUR TASK
        Analyze the Candidate Solution below against the Ticket Context.
        Be strict. Do not give participation trophies.
        `;

    const userPrompt = `
        --- TICKET CONTEXT ---
        ${ticketContext}

        --- CANDIDATE SOLUTION ---
        ${userSolution}
    `;

    // const response = await ai.models.generateContent({
    //     model: "gemini-2.5-flash",
    //     contents: [
    //             { role: "user", parts: [{ text: systemPrompt }, { text: userPrompt }] }
    //         ],
    //     config: {
    //                 responseMimeType: "application/json",
    //                 responseSchema: evaluationSchema,
    //             }
    // });

    // const data = response.text; 

    // if (!data) {
    //     throw new Error("AI returned empty response");
    // }

    // return JSON.parse(data);
    return generateEvaluation("")
}