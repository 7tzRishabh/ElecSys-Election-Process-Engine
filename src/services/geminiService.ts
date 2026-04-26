const SYSTEM_INSTRUCTION = `You are an expert election educator and analyst for the "ElecSys" application.
Do not give shallow answers. Always explain deeply, logically, and with real-world context.
When replying generically, break your answer into:
1.  **Simple Explanation:** ELI5 style.
2.  **Step-by-Step:** Detailed logic.
3.  **Real-World Example (India):** Concrete Indian electoral context (EVMs, VVPAT, ECI).
4.  **Key Takeaways:** 2-3 bullets.`;

async function callBackendGemini(model: string, contents: any, config?: any) {
  const response = await fetch("/api/gemini", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ model, contents, config }),
  });
  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data.message || data.error || response.statusText;
    if (typeof errorMsg === 'string' && errorMsg.includes("API key not valid")) {
      throw new Error("Invalid API Key: Please check your GEMINI_API_KEY environment variable in Cloud Run.");
    }
    throw new Error(`Backend API Error: ${errorMsg}`);
  }
  return data;
}

export async function explainElectionConcept(prompt: string, context: string = ""): Promise<string> {
  try {
    const fullPrompt = context 
      ? `Context: The user is currently viewing the '${context}' section of the app.\n\nUser Question: ${prompt}` 
      : `User Question: ${prompt}`;

    const response = await callBackendGemini(
      "gemini-2.5-flash",
      fullPrompt,
      { systemInstruction: SYSTEM_INSTRUCTION }
    );

    return response.text || "Error processing request.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message && error.message.includes("API Key") ? error.message : "Failed to get explanation.");
  }
}

export async function checkMisinformation(claim: string): Promise<any> {
  try {
    const prompt = `Analyze this election-related claim: "${claim}".
    Return ONLY a valid JSON object without markdown formatting, using this exact structure:
    {
      "verdict": "Myth" | "Fact" | "Partially True",
      "explanation": "Detailed explanation of why. Use India context if applicable.",
      "confidence": 95,
      "keywords": ["keyword1", "keyword2"]
    }`;
    
    const response = await callBackendGemini(
      "gemini-2.5-flash",
      prompt,
      { systemInstruction: "You are a highly accurate, impartial misinformation detector. Only output pure JSON." }
    );

    const text = response.text || "{}";
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanText);
  } catch (error: any) {
    console.error("Gemini JSON Error:", error);
    throw new Error(error.message && error.message.includes("API Key") ? error.message : "Failed to verify claim.");
  }
}

export async function getReadinessGuidance(missingItems: string[]): Promise<string> {
  if (missingItems.length === 0) return "You are fully ready to vote! Remember to carry your voter ID.";
  try {
    const prompt = `A user is preparing to vote but is missing these readiness checks: ${missingItems.join(', ')}.
    Provide personalized, encouraging, and highly specific guidance on how they can resolve these in the Indian election context. Keep it under 150 words.`;
    
    const response = await callBackendGemini("gemini-2.5-flash", prompt);
    return response.text || "Please review the missing items and contact local authorities.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    if (error.message && error.message.includes("API Key")) {
        return error.message;
    }
    return "Error generating guidance. Please consult official election portals.";
  }
}

export async function generateQuizQuestion(): Promise<any> {
  try {
    const prompt = `Generate a challenging multiple-choice question about the Indian election process (EVMs, VVPAT, ECI, protocols).
    Return ONLY a valid JSON object without markdown formatting, using this exact structure:
    {
      "question": "The question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 2,
      "explanation": "Why this is correct."
    }`;
    
    const response = await callBackendGemini(
      "gemini-2.5-flash",
      prompt,
      { systemInstruction: "You are an election quiz master. Only output pure JSON." }
    );

    const text = response.text || "{}";
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanText);
  } catch (error: any) {
    console.error("Gemini JSON Error:", error);
    throw new Error(error.message && error.message.includes("API Key") ? error.message : "Failed to generate quiz.");
  }
}
