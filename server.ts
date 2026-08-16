import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware for large payload handling (document base64 & images)
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

// Helper to get Gemini Client with recommended User-Agent header
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured in environment.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Structured schema for Ad Output
const adResponseSchema = {
  type: Type.OBJECT,
  properties: {
    languageDetected: {
      type: Type.STRING,
      description: "Detected language of the content: 'bn' for Bengali, 'en' for English",
    },
    productSummary: {
      type: Type.OBJECT,
      properties: {
        productName: { type: Type.STRING },
        category: { type: Type.STRING },
        targetAudience: { type: Type.STRING },
        coreProblemSolved: { type: Type.STRING },
        keyBenefits: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
      },
      required: ["productName", "targetAudience", "coreProblemSolved", "keyBenefits"],
    },
    section1_idea: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        concept: { type: Type.STRING, description: "অ্যাডের কেন্দ্রীয় আইডিয়া/অ্যাঙ্গেল ১-২ লাইনে" },
        uniqueAngle: { type: Type.STRING, description: "কেন এটি প্রতিযোগীদের থেকে আলাদা" },
      },
      required: ["title", "concept", "uniqueAngle"],
    },
    section2_hook: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        hookText: { type: Type.STRING, description: "প্রথম ৩ সেকেন্ডের স্ক্রল থামানোর লাইন" },
        hookStyle: { type: Type.STRING, description: "Hook style (e.g., Question, Shocking Stat, Contrarian Truth)" },
        deliveryTip: { type: Type.STRING, description: "Voice/tone or visual suggestion for delivery" },
      },
      required: ["title", "hookText", "hookStyle", "deliveryTip"],
    },
    section3_painPoint: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        painPointText: { type: Type.STRING, description: "টার্গেট অডিয়েন্সের আসল সমস্যা ও আবেগঘন ফ্রাস্ট্রেশন" },
        emotionalTrigger: { type: Type.STRING, description: "Core emotion tapped into (fear, wasted time, embarrassment, lost money, etc.)" },
      },
      required: ["title", "painPointText", "emotionalTrigger"],
    },
    section4_solution: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        solutionText: { type: Type.STRING, description: "প্রোডাক্ট কীভাবে সমস্যা সমাধান করে - ফলাফল/বেনিফিট কেন্দ্রিক" },
        coreTransformation: { type: Type.STRING, description: "Before-to-after transformation benefit" },
      },
      required: ["title", "solutionText", "coreTransformation"],
    },
    section5_cta: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        ctaText: { type: Type.STRING, description: "স্পষ্ট, urgency-ভিত্তিক অ্যাকশন লাইন" },
        urgencyReason: { type: Type.STRING, description: "Why take action now (discount, limited slots, fast results)" },
      },
      required: ["title", "ctaText", "urgencyReason"],
    },
    section6_fullAdScript: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        durationSeconds: { type: Type.INTEGER, description: "Total duration 30 to 60 seconds" },
        formattedScript: { type: Type.STRING, description: "Full conversational script ready to record" },
        timelineBreakdown: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              timeRange: { type: Type.STRING, description: "e.g. 0:00 - 0:05" },
              section: { type: Type.STRING, description: "Hook / Pain Point / Solution / CTA" },
              visualCue: { type: Type.STRING, description: "Visual directions for video creator" },
              voiceover: { type: Type.STRING, description: "Spoken line / Dialogue" },
            },
            required: ["timeRange", "section", "visualCue", "voiceover"],
          },
        },
      },
      required: ["title", "durationSeconds", "formattedScript", "timelineBreakdown"],
    },
    section7_caption: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        captionText: { type: Type.STRING, description: "সোশ্যাল মিডিয়া পোস্টের আকর্ষণীয় ক্যাপশন ইমোজি সহ" },
        hashtags: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        recommendedPlatform: { type: Type.STRING },
      },
      required: ["title", "captionText", "hashtags"],
    },
    section8_imageAdCopy: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        headline: { type: Type.STRING, description: "ছবির উপর বসানোর পাঞ্চি মূল হেডলাইন" },
        subHeadline: { type: Type.STRING, description: "ছবির সাব-লাইন" },
        wordCount: { type: Type.INTEGER, description: "Total words (max 10-15 words)" },
        badgeText: { type: Type.STRING, description: "Short sticker or callout e.g. 'সীমিত অফার' / 'Limited Offer'" },
        visualSuggestion: { type: Type.STRING, description: "Recommended background visual or color scheme" },
      },
      required: ["title", "headline", "subHeadline", "wordCount", "badgeText"],
    },
  },
  required: [
    "languageDetected",
    "productSummary",
    "section1_idea",
    "section2_hook",
    "section3_painPoint",
    "section4_solution",
    "section5_cta",
    "section6_fullAdScript",
    "section7_caption",
    "section8_imageAdCopy",
  ],
};

// API Route: Generate Ad Concept
app.post("/api/generate-ad", async (req, res) => {
  try {
    const {
      text,
      fileData, // { mimeType, base64, fileName }
      targetLanguage, // 'auto' | 'bn' | 'en'
      angleStyle, // 'curiosity' | 'transformation' | 'contrarian' | 'story' | 'pain-agitate' | 'direct-offer' | 'random'
      tone, // 'energetic' | 'conversational' | 'authoritative' | 'emotional' | 'urgent'
      variationSeed, // random string or index to guarantee freshness
    } = req.body;

    if (!text && !fileData) {
      return res.status(400).json({
        error: "দয়া করে প্রোডাক্ট/সার্ভিস সম্পর্কে টেক্সট লিখুন অথবা ডকুমেন্ট ফাইল আপলোড করুন। (Please provide text or upload a document)",
      });
    }

    const ai = getGeminiClient();

    const systemPrompt = `You are a world-class Expert Ad Copywriter and Direct Response Marketer (inspired by David Ogilvy, Dan Kennedy, Eugene Schwartz, Alex Hormozi, and Russell Brunson).
Your mission is to analyze the provided product/service input (from an uploaded document or text) and generate a 100% UNIQUE, high-converting, irresistible Ad Concept & Campaign Pack.

CRITICAL INSTRUCTIONS:
1. OUTPUT LANGUAGE:
   - If user input is in Bengali or targetLanguage is 'bn', write the ad copy in natural, highly persuasive conversational Bengali (কথ্য বাংলা / প্রাঞ্জল বাংলা যা ফেসবুক ও ভিডিও অ্যাডে দারুণ রূপান্তর আনে).
   - If user input is in English or targetLanguage is 'en', write in high-converting English.
   - If targetLanguage is 'auto', match the language of the provided input text/document.
   
2. 5 CORE PILLARS (Must be individually unique and logically linked):
   - 1. IDEA (মূল কনসেপ্ট): 1-2 lines defining the distinct competitive angle that breaks market noise.
   - 2. HOOK (প্রথম ৩ সেকেন্ডের লাইন): Pattern-interrupt scroll stopper (question, startling stat, or bold contrarian statement).
   - 3. PAIN POINT (সমস্যা চিহ্নিতকরণ): Deep emotional agitation of the customer's real frustration and hidden pain point.
   - 4. SOLUTION (সমাধান): Product benefits and transformation (focus on outcomes, NOT mere features).
   - 5. CALL TO ACTION (CTA): Clear, urgent, risk-reversed action directive.

3. 3 DISTINCT EXTENDED OUTPUTS:
   - 6. FULL AD SCRIPT (৩০-৬০ সেকেন্ডের ভিডিও/অডিও স্ক্রিপ্ট): Natural spoken dialogue with timing brackets and visual cues for video/UGC/audio ads.
   - 7. CAPTION: Irresistible social media post copy with well-placed emojis and relevant hashtags.
   - 8. IMAGE AD COPY: Punchy, high-impact headline + sub-headline strictly within 10-15 words total, suitable for banner/flyer overlay.

4. UNIQUENESS & ANGLE:
   - Selected Angle Style: ${angleStyle || "High-Converting Pattern Interrupt"}
   - Desired Tone: ${tone || "Natural, Engaging & Persuasive"}
   - Variation Seed: ${variationSeed || Date.now()} (Ensure distinct phrasing, fresh hooks, and zero clichés).
`;

    const contents: Array<any> = [];

    // If file provided (PDF, image, text doc, etc.)
    if (fileData && fileData.base64) {
      contents.push({
        inlineData: {
          mimeType: fileData.mimeType || "application/pdf",
          data: fileData.base64,
        },
      });
    }

    const textPrompt = `Here is the product/service input:
${text ? `USER PROVIDED TEXT / PRODUCT DETAILS:\n${text}\n` : ""}
${fileData ? `ATTACHED DOCUMENT NAME: ${fileData.fileName || "Uploaded Document"}\n` : ""}
${targetLanguage && targetLanguage !== "auto" ? `PREFERRED LANGUAGE: ${targetLanguage === "bn" ? "Bengali (বাংলা)" : "English"}\n` : ""}

Generate the complete 8-section Ad Concept now following the structured JSON schema.`;

    contents.push({ text: textPrompt });

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: contents.length === 1 ? contents[0].text : { parts: contents },
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: adResponseSchema,
        temperature: 0.85, // Fresh creative output
      },
    });

    const rawText = response.text;
    if (!rawText) {
      throw new Error("No response received from Gemini.");
    }

    const adData = JSON.parse(rawText);
    return res.json({ success: true, data: adData });
  } catch (err: any) {
    console.error("Error generating ad:", err);
    return res.status(500).json({
      error: err.message || "অ্যাড জেনারেট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
    });
  }
});

// API Route: Quick Refinement (e.g. change tone, make shorter, add stronger hook)
app.post("/api/refine-ad", async (req, res) => {
  try {
    const { currentAd, instruction, targetLanguage } = req.body;
    if (!currentAd || !instruction) {
      return res.status(400).json({ error: "Current ad data and refinement instructions are required." });
    }

    const ai = getGeminiClient();

    const systemPrompt = `You are an Expert Ad Copywriter and Direct Response Marketer.
Refine and enhance the existing Ad Concept based on the user's specific tweak instruction.
Keep the 8 structured sections, maintaining crisp quality and tone.
Instruction: "${instruction}"
Target Language: ${targetLanguage || currentAd.languageDetected || "as original"}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: `CURRENT AD CONCEPT JSON:
${JSON.stringify(currentAd, null, 2)}

INSTRUCTION: ${instruction}`,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: adResponseSchema,
        temperature: 0.8,
      },
    });

    const rawText = response.text;
    if (!rawText) {
      throw new Error("No response received from Gemini.");
    }

    const updatedAd = JSON.parse(rawText);
    return res.json({ success: true, data: updatedAd });
  } catch (err: any) {
    console.error("Error refining ad:", err);
    return res.status(500).json({ error: err.message || "Failed to refine ad concept." });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "AdCraft AI Server" });
});

// Vite middleware & Static Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AdCraft AI server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
