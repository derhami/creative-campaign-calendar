import { GoogleGenAI, Type } from "@google/genai";
import type { CampaignIdea } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
const ideasCache = new Map<string, CampaignIdea[]>();

// Enforce a minimum interval between API calls to avoid rate limiting.
let lastApiCallTimestamp = 0;
const MIN_REQUEST_INTERVAL = 1500; // Increased to 1.5 seconds

export const QUOTA_EXHAUSTED = 'QUOTA_EXHAUSTED';

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    ideas: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: {
            type: Type.STRING,
            description: 'تیتر جذاب و کوتاه برای ایده کمپین'
          },
          description: {
            type: Type.STRING,
            description: 'شرح مختصر و کاربردی ایده کمپین'
          }
        },
        required: ['title', 'description']
      }
    }
  },
  required: ['ideas']
};

export const getCampaignIdeas = async (eventName: string): Promise<CampaignIdea[]> => {
  // 1. Check cache first for instant response
  if (ideasCache.has(eventName)) {
    return ideasCache.get(eventName)!;
  }

  try {
    // 2. Throttle API calls if not in cache
    const now = Date.now();
    const timeSinceLastCall = now - lastApiCallTimestamp;

    if (timeSinceLastCall < MIN_REQUEST_INTERVAL) {
        const delay = MIN_REQUEST_INTERVAL - timeSinceLastCall;
        await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    // Update timestamp right before the new API call
    lastApiCallTimestamp = Date.now();

    const prompt = `برای مناسبت «${eventName}» ۳ ایده کمپین تبلیغاتی خلاقانه و کوتاه برای شبکه‌های اجتماعی پیشنهاد بده. هر ایده شامل یک تیتر جذاب و یک توضیح کوتاه باشد.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: responseSchema,
        },
    });
    
    const jsonText = response.text.trim();
    const parsed = JSON.parse(jsonText);
    
    if (parsed && Array.isArray(parsed.ideas)) {
        // 3. Store in cache on success
        ideasCache.set(eventName, parsed.ideas);
        return parsed.ideas;
    }
    
    console.error("Parsed JSON does not match expected structure:", parsed);
    return [];

  } catch (error) {
    console.error('Error fetching campaign ideas from Gemini API:', error);
    
    // Check for rate limit error in the string representation of the error
    const errorString = String(error).toLowerCase();
    if (errorString.includes('429') || errorString.includes('resource_exhausted')) {
      const quotaError = new Error('API quota exceeded.');
      quotaError.name = QUOTA_EXHAUSTED;
      throw quotaError;
    }
    
    throw new Error('Could not fetch campaign ideas.');
  }
};
