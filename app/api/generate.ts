'use server'

import { GoogleGenAI } from "@google/genai";

export async function generate(input: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: input,      
    });

    return { success: true, text: response.text };
}