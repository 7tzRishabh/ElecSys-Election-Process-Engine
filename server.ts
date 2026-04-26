import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

function getAiClient() {
  if (!aiClient) {
    let apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      apiKey = apiKey.trim().replace(/^["']|["']$/g, '');
    }
    // Fallback to user provided API keys if the env variable is missing or seems invalid
    if (!apiKey || apiKey === "undefined" || apiKey.includes("YOUR_") || apiKey.length < 20) {
      apiKey = "AIzaSyCU_gvIRKXMnwjfM7RGWdYztoMnaUgoXSY"; 
    }
    if (!apiKey || apiKey === "undefined") {
      throw new Error("GEMINI_API_KEY environment variable is missing or invalid. If you deployed this to Cloud Run, please ensure the environment variable is set securely.");
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Add JSON body parsing middleware
  app.use(express.json());

  // API Route for Gemini
  app.post("/api/gemini", async (req, res) => {
    try {
      const ai = getAiClient();
      const { model, contents, config } = req.body;
      const response = await ai.models.generateContent({
        model,
        contents,
        config
      });
      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API Error in backend:", error);
      res.status(500).json({ 
        error: "Failed to process AI request", 
        message: error.message || String(error)
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
