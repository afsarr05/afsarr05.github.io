import { onRequest } from "firebase-functions/v2/https";
import fetch from "node-fetch";

export const chatWithAI = onRequest(
  {
    region: "us-central1",
    cors: true,
    secrets: ["OPENAI_API_KEY"],
    maxInstances: 10
  },
  async (req, res) => {
    try {
      console.log("=== Function Called ===");
      console.log("Method:", req.method);
      console.log("Headers:", JSON.stringify(req.headers));
      
      if (req.method === "OPTIONS") {
        res.status(204).send("");
        return;
      }

      if (req.method !== "POST") {
        console.error("Invalid method:", req.method);
        return res.status(405).json({ error: "Method Not Allowed" });
      }

      console.log("Request body:", JSON.stringify(req.body));
      const { messages } = req.body;

      if (!messages) {
        console.error("No messages in request");
        return res.status(400).json({ error: "Messages missing" });
      }

      console.log("Messages count:", messages.length);

      // Trim the API key to remove any whitespace/newlines
      const apiKey = process.env.OPENAI_API_KEY?.trim();
      
      if (!apiKey) {
        console.error("❌ OPENAI_API_KEY not found in environment!");
        return res.status(500).json({ 
          error: { message: "API key not configured" }
        });
      }

      console.log("✅ API key found, length:", apiKey.length);
      console.log("Calling OpenAI API with model: gpt-4o-mini");

      const openAIRequest = {
        model: "gpt-4o-mini",
        messages,
        temperature: 0.7,
        max_tokens: 500
      };

      console.log("OpenAI request:", JSON.stringify(openAIRequest));

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify(openAIRequest)
      });

      console.log("OpenAI response status:", response.status);
      console.log("OpenAI response headers:", JSON.stringify(response.headers.raw()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ OpenAI API error response:", errorText);
        
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch (e) {
          errorData = { error: { message: errorText } };
        }
        
        return res.status(response.status).json({ error: errorData.error });
      }

      const data = await response.json();
      console.log("✅ Success! OpenAI response received");
      console.log("Response data:", JSON.stringify(data));
      
      res.json(data);
      
    } catch (err) {
      console.error("❌ Function error:", err.message);
      console.error("Error name:", err.name);
      console.error("Stack trace:", err.stack);
      res.status(500).json({ error: { message: "AI request failed", details: err.message } });
    }
  }
);