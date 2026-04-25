import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `You are an expert election educator for the "ElecSys" application.
Explain everything clearly, deeply, and in a structured way.
Always break your answer into the following sections using Markdown formatting:
1.  **Simple Explanation:** A short, ELI5 (Explain Like I'm 5) style overview.
2.  **Step-by-Step:** A detailed, logical breakdown of the process.
3.  **Real-World Example (India):** Concrete examples using the Indian electoral context (e.g., EVMs, VVPAT, Election Commission of India).
4.  **Key Takeaways:** 2-3 bullet points summarizing the most important facts.

Use clear headings. Keep the tone engaging, professional, and educational.`;

export async function explainElectionConcept(prompt: string, context: string = ""): Promise<string> {
  try {
    const fullPrompt = context 
      ? `Context: The user is currently viewing the '${context}' section of the app.\n\nUser Question: ${prompt}` 
      : `User Question: ${prompt}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: fullPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    return response.text || "I'm sorry, I couldn't formulate a response right now. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to get explanation.");
  }
}
