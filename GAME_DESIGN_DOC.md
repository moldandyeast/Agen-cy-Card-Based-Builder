# 📐 Project Code: AGEN[+]CY (Game Design Document)

**Lead Architect:** Gemini 3 Pro
**Design Philosophy:** "Collect Components. Compile Dreams."

---

## 1. The Vision
To turn the tedious process of "finding the right code snippet" into a high-dopamine, visual, and collectible experience. Developers and Designers shouldn't just copy-paste from StackOverflow; they should **unbox** a "Legendary React Navbar" and slot it into their build.

---

## 2. Core Loop Mechanics

### Phase 1: Acquisition (The "Loot")
*   **The Pack:** Users experience a cinematic unboxing event. 5 Cards are generated on the fly.
*   **The Forge:** Users spend creative energy to mint specific assets. "I need a pricing table that looks like a restaurant menu."
*   **Rarity System:**
    *   **Common (Grey):** Functional, clean, standard layouts (Flexbox/Grid).
    *   **Uncommon (Green):** Micro-interactions, hover states, creative typography.
    *   **Rare (Blue):** Complex JS logic (Carousels, Data Viz), Glassmorphism.
    *   **Legendary (Amber):** WebGL, Three.js, Canvas particles, Physics-based interaction.
    *   **Ancient (Pink):** Experimental/Avant-garde code art.

### Phase 2: Curation (The "Deck")
*   **Constraint:** The user cannot simply "throw everything" at the AI. They must select a maximum of **5 UI Cards**. This forces design decisiveness.
*   **Modifiers:**
    *   **Theme Card:** Acts as the "Global State". It overrides colors and fonts of the UI cards.
    *   **Voice Card:** Acts as the "Copywriter". It instructs the AI on how to write the text content.

### Phase 3: Synthesis (The "Build")
*   **Input:** User Prompt ("A landing page for a Cyberpunk Coffee Shop") + The Selected Deck.
*   **Process:** The "Architect" (Gemini 3 Pro) analyzes the code within the cards, the prompt, and the modifiers.
*   **Output:** A live, interactive preview that can be downloaded as a standalone HTML file.

---

## 3. The "Card" Anatomy
A Card is not just a screenshot. It is a **Self-Contained Functional Unit**.

```typescript
interface CardData {
  id: string;
  name: "Neon Button";
  rarity: "Rare";
  category: "UI" | "Theme" | "Voice";
  code: {
    html: "<div>...</div>",
    css: ".btn { ... }", // Scoped styles
    js: "document.querySelector..." // Interactive logic
  }
}
```

### Visual Representation
*   **The Frame:** Obsidian dark metal with rarity-colored glowing borders.
*   **The Shimmer:** Rare+ cards feature a holographic CSS overlay (`mix-blend-mode: overlay`) that reacts to mouse movement.
*   **The Preview:** A scaled-down, live `iframe` rendering the actual code.

---

## 4. AI Orchestration Strategy

### The "Fabricator" (Gemini 2.5 Flash)
*   **Role:** High speed, high creativity.
*   **Task:** Generates the Cards.
*   **Prompt Strategy:** Asked to return structured JSON. Must invent CSS and HTML that works in isolation.

### The "Architect" (Gemini 3 Pro)
*   **Role:** High reasoning, large context window.
*   **Task:** Assembles the Website.
*   **Logic:**
    1.  **Extraction:** Reads CSS variables from the *Theme Card*.
    2.  **Injection:** Places *UI Cards* into a semantic HTML skeleton (Header -> Main -> Footer).
    3.  **Harmonization:** Renames conflicting CSS classes if necessary (though Shadow DOM/Scopes are preferred, the Architect flattens them for the final build).
    4.  **Copywriting:** rewriting innerText based on the *Voice Card*.

---

## 5. UI/UX Direction (The "Obsidian" Aesthetic)
*   **Palette:** Deep blacks (#050505), Dark Zinc (#18181b), and crisp White text.
*   **Typography:** `Inter` for UI, `JetBrains Mono` for code/technical data.
*   **Motion:**
    *   **Unbox:** Staggered `slide-up` animations.
    *   **Hover:** 3D transforms (`perspective: 1000px`).
    *   **Build:** "Matrix-style" text rain or a pulsing loader indicating AI thought process.

---

## 6. Future Expansion Packs
*   **Framework Packs:** React, Vue, Svelte specific exports.
*   **CMS Integration:** Cards that fetch data from Headless CMS.
*   **Multiplayer:** Co-op deck building.
