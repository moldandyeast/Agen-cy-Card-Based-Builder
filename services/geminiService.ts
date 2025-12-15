import { GoogleGenAI, Type } from "@google/genai";
import { CardData, CardId } from '../types';

// NOTE: In a real production app, never expose keys on client side.
// This is a PoC using process.env as per instructions.
const apiKey = process.env.API_KEY || ''; 

const ai = new GoogleGenAI({ apiKey });

// Helper to generate UUID
const uuid = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

/**
 * GENERATE PACK (RANDOM)
 */
export const generatePack = async (): Promise<CardData[]> => {
  if (!apiKey) throw new Error("Missing API Key");

  const model = "gemini-2.5-flash";
  
  const prompt = `
    You are a Frontend Architect designed to generate UI component trading cards.
    Generate 5 distinct UI components or Directives.
    
    Rarity Distribution Guide:
    - 2 Common (Functional layouts: Headers, Footers, Pricing, FAQ, Forms)
    - 1 Uncommon (Themes: Define :root vars for colors/fonts)
    - 1 Rare (Voice/Tone: Instructions on how to write copy)
    - 1 Legendary (Complex visuals, Canvas, 3D)

    Cards can be:
    1. UI Components (category: "UI")
    2. Theme Cards (category: "Theme", must define CSS variables)
    3. Voice Cards (category: "Voice", defines Tone/Persona)

    Current Design Trend: Bento Grids, Neo-Brutalism, Dark Mode, Micro-interactions.

    Return the response as a JSON Array.
    For 'Voice' cards, the 'code.js' should be a comment starting with // INSTRUCTION:
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              category: { type: Type.STRING, enum: ["UI", "Theme", "Voice"] },
              rarity: { type: Type.STRING, enum: ["Common", "Uncommon", "Rare", "Legendary", "Ancient"] },
              tech_stack: { type: Type.ARRAY, items: { type: Type.STRING } },
              visual_style: { type: Type.STRING },
              description: { type: Type.STRING },
              code: {
                type: Type.OBJECT,
                properties: {
                  html: { type: Type.STRING },
                  css: { type: Type.STRING },
                  js: { type: Type.STRING },
                },
                required: ["html", "css", "js"]
              }
            },
            required: ["name", "category", "rarity", "tech_stack", "code", "visual_style", "description"]
          }
        }
      }
    });

    const rawCards = JSON.parse(response.text || "[]");
    return rawCards.map((c: any) => ({ ...c, id: uuid() }));
  } catch (error) {
    console.error("Gemini Gacha Error:", error);
    throw error;
  }
};

/**
 * FORGE COMPONENT (SPECIFIC)
 */
export const forgeComponent = async (userPrompt: string): Promise<CardData> => {
    if (!apiKey) throw new Error("Missing API Key");
  
    const model = "gemini-2.5-flash";
    
    const prompt = `
      You are a specialized Component Fabricator.
      Create a SINGLE UI Component Card based strictly on this description: "${userPrompt}".
  
      Requirements:
      - The code must be self-contained (HTML/CSS/JS).
      - If the user asks for a theme, set category to "Theme".
      - If the user asks for a voice/persona, set category to "Voice".
      - Otherwise, default to "UI".
      - Determine rarity based on complexity.
      
      Return ONLY a Single JSON Object (not an array).
    `;
  
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              category: { type: Type.STRING, enum: ["UI", "Theme", "Voice"] },
              rarity: { type: Type.STRING, enum: ["Common", "Uncommon", "Rare", "Legendary", "Ancient"] },
              tech_stack: { type: Type.ARRAY, items: { type: Type.STRING } },
              visual_style: { type: Type.STRING },
              description: { type: Type.STRING },
              code: {
                type: Type.OBJECT,
                properties: {
                  html: { type: Type.STRING },
                  css: { type: Type.STRING },
                  js: { type: Type.STRING },
                },
                required: ["html", "css", "js"]
              }
            },
            required: ["name", "category", "rarity", "tech_stack", "code", "visual_style", "description"]
          }
        }
      });
  
      const rawCard = JSON.parse(response.text || "{}");
      return { ...rawCard, id: uuid() };
    } catch (error) {
      console.error("Forge Error:", error);
      throw error;
    }
  };

/**
 * ASSEMBLE WEBSITE (WORLD CLASS ARCHITECT)
 */
export const assembleWebsite = async (
  prompt: string,
  cards: CardData[],
  previousHtml?: string
): Promise<string> => {
  if (!apiKey) throw new Error("Missing API Key");

  const model = "gemini-3-pro-preview";

  // SEPARATE CARDS INTO TYPES
  const uiCards = cards.filter(c => c.category !== 'Voice');
  const voiceCards = cards.filter(c => c.category === 'Voice');

  // BUILD CONTEXT FOR UI (Code Blocks)
  const codeContext = uiCards.map((c, i) => `
    /* --- COMPONENT CARD ${i + 1}: ${c.name} (${c.category}) --- */
    /* Description: ${c.description} */
    /* Visual Style: ${c.visual_style} */
    
    <style>
    ${c.code.css}
    </style>
    
    <!-- HTML STRUCTURE -->
    ${c.code.html}
    
    <script>
    ${c.code.js}
    </script>
    /* ----------------------------------------------------- */
  `).join('\n\n');

  // BUILD CONTEXT FOR VOICE (Text Instructions)
  const voiceInstructions = voiceCards.map(c => `
    - TONE/PERSONA: ${c.name}
    - INSTRUCTION: ${c.code.js.replace('// INSTRUCTION:', '')}
    - DESCRIPTION: ${c.description}
  `).join('\n');

  let systemInstructions = `
    You are an Elite Creative Technologist and Lead Frontend Engineer.
    Your goal is to build an "Awwwards-winning" Single Page Application (SPA).

    **CORE DIRECTIVE:**
    Synthesize the User's Prompt with the selected Component Cards into a cohesive, production-grade website.
    
    **INPUT CONTEXT:**
    1. USER VISION: "${prompt}"
    
    2. VOICE & TONE SETTINGS (Apply these to all text content):
       ${voiceCards.length > 0 ? voiceInstructions : "Default: Professional, clear, and engaging."}

    3. COMPONENT ARSENAL (Code to Integrate):
       ${uiCards.length > 0 ? codeContext : "No specific UI cards selected. Use your creativity."}
  `;

  if (previousHtml) {
    systemInstructions += `
    4. EXISTING CODEBASE:
       The user is iterating on a previous build.
       - PRESERVE the existing structure unless asked to refactor.
       - INTEGRATE the new cards/prompt into this context.
       
       \`\`\`html
       ${previousHtml}
       \`\`\`
    `;
  } else {
    systemInstructions += `
    4. STATE: Fresh Build. Start from scratch.
    `;
  }

  systemInstructions += `
    **ARCHITECTURAL RULES:**
    1. **Single File Output:** Return ONLY the raw HTML string (with embedded CSS/JS). No markdown blocks.
    2. **Modern Layout:** Use Semantic HTML5 + Tailwind CSS (via CDN) for the main structure (Grid/Flexbox).
    3. **Card Integration (CRITICAL):** 
       - If a card is a **THEME CARD** (category: 'Theme'), extract its :root variables and place them at the very top of your CSS.
       - WEAVE the components into a proper layout (Header -> Hero -> Features -> Footer).
       - Do NOT just paste card code sequentially. Nest them where they belong.
       - Use the "Voice" instructions to rewrite any placeholder text in the cards (e.g. change "Lorem Ipsum" to something matching the persona).
    4. **Visual Consistency:** 
       - Harmonize fonts and colors based on the Theme cards.
    5. **Polish:** 
       - Add smooth entry animations.
       - Ensure responsive design (Mobile-First).
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: systemInstructions,
      config: {
        thinkingConfig: { thinkingBudget: 4096 }
      }
    });

    let html = response.text || "";
    html = html.replace(/```html/g, '').replace(/```/g, '');
    return html;
  } catch (error) {
    console.error("Gemini Assembler Error:", error);
    throw error;
  }
};