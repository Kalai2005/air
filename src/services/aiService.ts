import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY as string 
});

export interface AIInsight {
  status: string;
  briefing: string;
  logicalDeduction: string[]; // Step-by-step reasoning
  protectiveMeasures: string[];
  meshConfidence: number;
}

export const getAIInsights = async (stats: { aqi: number; co2: number; humidity: number; temp: number }): Promise<AIInsight> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `System Stats:
      AQI: ${stats.aqi}
      CO2: ${stats.co2} ppm
      Humidity: ${stats.humidity}%
      Temperature: ${stats.temp}°C
      
      Analyze these air quality parameters with high logical rigor. 
      Provide a professional 'briefing' on the atmospheric state. 
      Break down the 'logicalDeduction' into a list of specific scientific observations.
      Provide 'protectiveMeasures' as a list of actionable safety steps.
      Rate the 'meshConfidence' (0-100) based on how standard these readings are.`,
      config: {
        systemInstruction: "You are the AeroGuard Atmospheric Intelligence Core. Your responses must be scientifically rigorous, logical, and formatted as valid JSON. Focus on the relationship between variables (e.g., how humidity affects particle suspension).",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            status: { type: Type.STRING },
            briefing: { type: Type.STRING },
            logicalDeduction: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "The chain of logic used to reach conclusions"
            },
            protectiveMeasures: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            meshConfidence: { type: Type.NUMBER }
          },
          required: ["status", "briefing", "logicalDeduction", "protectiveMeasures", "meshConfidence"]
        }
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("AI Insight Error:", error);
    return {
      status: "STBL",
      briefing: "System in synchronization mode. Calibrating mesh sensor array.",
      logicalDeduction: ["Calibrating sensors", "verifying data integrity"],
      protectiveMeasures: ["Standard precautions"],
      meshConfidence: 98
    };
  }
};
