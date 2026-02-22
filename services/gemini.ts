
import { GoogleGenAI, Type } from "@google/genai";
import { PromptModel } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generatePromptFromImage = async (
  base64Image: string,
  modelType: PromptModel
): Promise<string> => {
  let promptInstruction = "";

  if (modelType === PromptModel.GEMINI_PROMPT) {
    promptInstruction = `
Analyze the provided image and generate a structured description for the following categories. 
Maintain 100% identical facial identity for the subject.
Respond ONLY with the filled version of this template:
+Important Identity Rules
[Describe rules based on the image]
+Subject & Outfit (Editable)
[Describe subject]
+Pose & Body Position (Editable)
[Describe pose]
+Setting & Environment (Editable)
[Describe setting]
+Lighting
[Describe lighting]
+Camera & Composition (Editable)
[Describe camera]
+Atmosphere
[Describe atmosphere]
`;
  } else {
    switch (modelType) {
      case PromptModel.STRUCTURED:
        promptInstruction = "Deconstruct this image into a structured prompt. Format: Subject: [details], Environment: [details], Visual Style: [lighting, camera, medium, colors].";
        break;
      case PromptModel.GRAPHIC_DESIGN:
        promptInstruction = "Analyze the graphic design elements. Describe layout, typography, color palette, and visual hierarchy.";
        break;
      case PromptModel.JSON:
        promptInstruction = "Analyze this image and output a JSON object describing its core components: subject, background, lighting, artistic_style, and predominant_colors.";
        break;
      case PromptModel.FLUX:
        promptInstruction = "Generate a concise, natural language prompt optimized for Flux.1 models.";
        break;
      case PromptModel.MIDJOURNEY:
        promptInstruction = "Write a Midjourney-optimized prompt with descriptive keywords and parameters like --ar, --v 6.0.";
        break;
      case PromptModel.STABLE_DIFFUSION:
        promptInstruction = "Create a Stable Diffusion prompt with comma-separated tags and keyword weighting.";
        break;
      default:
        promptInstruction = "Provide a detailed natural language description to recreate this image with AI.";
        break;
    }
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: base64Image.split(',')[1] } },
          { text: promptInstruction }
        ]
      }
    });
    const aiOutput = response.text || "Generation failed.";
    if (modelType === PromptModel.GEMINI_PROMPT) {
      return `Generate an ultra hyper-realistic portrait...\n\n${aiOutput}\n\n+Quality: 8K... --ar 3:4`;
    }
    return aiOutput;
  } catch (error) {
    throw new Error("Failed to communicate with AI.");
  }
};

export const enhancePrompt = async (input: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Enhance this prompt for AI art generation: "${input}"`,
  });
  return response.text || "Failed to enhance.";
};

export const analyzePromptQuality = async (prompt: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Provide 3 short, helpful bullet points to improve this AI image prompt: "${prompt}"`,
  });
  return response.text || "No suggestions available.";
};

export const generateRandomIdea = async (): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: "Generate one creative, vivid, and detailed AI image prompt (e.g. fantasy, sci-fi, or abstract). Return ONLY the prompt text.",
  });
  return response.text || "A mysterious forest at dawn, cinematic lighting.";
};

export const generateRemixPrompt = async (imageA: string, imageB: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { mimeType: 'image/jpeg', data: imageA.split(',')[1] } },
        { inlineData: { mimeType: 'image/jpeg', data: imageB.split(',')[1] } },
        { text: "Analyze both images. Create a single descriptive prompt that blends the core elements of both in a creative way." }
      ]
    }
  });
  return response.text || "A fusion of both styles and subjects.";
};

export const generateImageFromText = async (prompt: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts: [{ text: prompt }] },
    config: { imageConfig: { aspectRatio: "1:1" } }
  });
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
  }
  throw new Error("No image data.");
};

export const analyzeStyleFromImage = async (base64Image: string): Promise<any> => {
  const prompt = `Analyze the provided image and deconstruct its artistic DNA. 
  Identify the following attributes: 
  Artistic Movement, Style/Genre, Artist Influence, Lighting, Color Palette, and Composition. 
  Return the result as a JSON object where each key is a category and the value is an array of string tags.`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: base64Image.split(',')[1] } },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            movements: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Artistic Movement" },
            genres: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Style/Genre" },
            influences: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Artist Influence" },
            lighting: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Lighting" },
            palette: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Color Palette" },
            composition: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Composition" },
          },
          required: ["movements", "genres", "influences", "lighting", "palette", "composition"]
        }
      }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    throw new Error("Failed to analyze style.");
  }
};

export const extractPaletteFromImage = async (base64Image: string): Promise<string[]> => {
  const prompt = `Analyze the provided image and extract a professional color palette of the 7 most dominant and harmonious colors.
  Return the result as a JSON object containing a property 'palette' which is an array of 7 Hex color strings (e.g. ["#FFFFFF", "#000000"]).`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: base64Image.split(',')[1] } },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            palette: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING }, 
              description: "Array of dominant hex color codes" 
            },
          },
          required: ["palette"]
        }
      }
    });
    const result = JSON.parse(response.text || "{}");
    return result.palette || [];
  } catch (error) {
    throw new Error("Failed to extract color palette.");
  }
};

export const generateLogoConcept = async (
  brandName: string,
  industry: string,
  colorStyle: string,
  iconStyle: string
): Promise<string> => {
  const prompt = `Create a high-quality, professional logo for a brand named "${brandName}". 
  The industry is "${industry}". 
  The color mood should be "${colorStyle}". 
  The icon style must be "${iconStyle}". 
  The logo should be clean, modern, and minimalist. 
  It should include the icon and the brand name in a professional font. 
  Vector art style, isolated on a white background.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
      config: { imageConfig: { aspectRatio: "1:1" } }
    });
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
    }
    throw new Error("No image data.");
  } catch (error) {
    throw new Error("Logo generation failed.");
  }
};

export const generateSeamlessPattern = async (
  description: string,
  style: string
): Promise<string> => {
  const prompt = `Create a professional, high-quality, perfectly seamless repeating pattern of "${description}" in "${style}" style. 
  The image MUST be tileable, where the top edge matches the bottom and the left edge matches the right edge exactly. 
  Flat design, professional artistic quality, isolated elements on a harmonious background. Square 1:1 ratio.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
      config: { imageConfig: { aspectRatio: "1:1" } }
    });
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
    }
    throw new Error("No image data.");
  } catch (error) {
    throw new Error("Pattern generation failed.");
  }
};
