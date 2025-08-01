import Replicate from "replicate";
import { jsonrepair } from "jsonrepair";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

function extractJsonFromText(aiOutputArray) {
  const fullText = aiOutputArray.join("");

  // Cari posisi awal dan akhir blok JSON
  const start = fullText.indexOf('{');
  const end = fullText.lastIndexOf('}');

  if (start === -1 || end === -1) {
    throw new Error("Tidak ditemukan blok JSON.");
  }

  const rawJson = fullText.substring(start, end + 1);

  try {
    // Gunakan jsonrepair untuk memperbaiki format JSON yang rusak
    const repaired = jsonrepair(rawJson);
    const parsed = JSON.parse(repaired);
    return parsed;
  } catch (e) {
    console.error("Gagal memperbaiki JSON:", e.message);
    return null;
  }
}


export async function analyzeSentiment(comments) {
  const formattedComments = comments.join('\n- ');
  const input = {
  top_k: 50,
  top_p: 0.9,
  prompt: 
  `You are a multilingual sentiment analysis AI. Analyze the sentiment of the following 50 comments. The comments may be in any language, especially Indonesian, including informal/slang, emojis, and abbreviations (e.g., "ga worth", "parah sih 😭", "gila keren").

  Follow these rules:

  1. Sentiment labels:
    - "positive" → praise or good feedback
    - "neutral" → factual or objective statement
    - "negative" → complaint or criticism

  2. Output format:
  Return ONLY a valid JSON using the structure below (no explanation, no surrounding text, no code block, no markdown).
  - Total counts and keywords should be based on all 50 comments.
  - The 'rawComments' array should only include a representative sample of **20 comments** from the full analysis.

  Output JSON format:
  {
    "positive": number,
    "neutral": number,
    "negative": number,
    "keywords": {
      "positive": [string],
      "negative": [string]
    },
    "rawComments": [
      {
        "text": string,
        "sentiment": "positive" | "neutral" | "negative"
      }
    ]
  }

  Analyze the following comments:
  - ${formattedComments}
  `,
  max_tokens: 1000,
  min_tokens: 0,
  temperature: 0.6,
  presence_penalty: 0,
  frequency_penalty: 0
};

  try {
    const output = await replicate.run("ibm-granite/granite-3.3-8b-instruct", { input });
    const jsonOutput = extractJsonFromText(output);
    return jsonOutput
    

  } catch (error) {
    throw new Error("Sentiment analysis failed :", error);
  }

}
