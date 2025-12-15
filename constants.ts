import { CardData } from './types';

// Helper to generate UUID-like strings
const uuid = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

const THEME_PREVIEW_HTML = `
<div class="theme-preview">
  <div class="swatches">
    <div class="swatch" style="background: var(--bg-primary)"></div>
    <div class="swatch" style="background: var(--bg-secondary)"></div>
    <div class="swatch" style="background: var(--accent-primary)"></div>
    <div class="swatch" style="background: var(--text-primary)"></div>
  </div>
  <div class="typo">
    <h1>Aa</h1>
    <p>Theme Preview</p>
  </div>
</div>
`;

const THEME_PREVIEW_CSS = `
.theme-preview {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  width: 100%; height: 100%; padding: 20px;
  background: var(--bg-primary); color: var(--text-primary);
}
.swatches { display: flex; gap: 10px; margin-bottom: 15px; }
.swatch { width: 30px; height: 30px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 2px 5px rgba(0,0,0,0.2); }
.typo h1 { margin: 0; font-size: 2rem; font-family: var(--font-heading); }
.typo p { margin: 0; opacity: 0.7; font-size: 0.8rem; font-family: var(--font-body); }
`;

export const INITIAL_STOCK: CardData[] = [
  // =========================================================================
  // 📐 DESIGN ENGINEERING CARDS (ORIGINAL + NEW)
  // =========================================================================
  {
    id: uuid(),
    name: "Bento Grid Layout",
    category: "UI",
    rarity: "Rare",
    tech_stack: ["Grid", "Responsive"],
    visual_style: "Apple-style",
    description: "A complex, asymmetrical grid layout for showcasing features or portfolio items.",
    code: {
      html: `
        <div class="bento-grid">
           <div class="cell large"><h3>Main Focus</h3><p>The primary feature goes here.</p></div>
           <div class="cell"><h3>Speed</h3><div class="icon">⚡</div></div>
           <div class="cell"><h3>Secure</h3><div class="icon">🔒</div></div>
           <div class="cell wide"><h3>Integration</h3><p>Seamlessly connects with your workflow.</p></div>
        </div>
      `,
      css: `
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(2, minmax(180px, auto));
          gap: 1.5rem;
          padding: 2rem;
          max-width: 1000px;
          margin: 0 auto;
        }
        .cell {
          background: var(--bg-secondary);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 24px;
          padding: 2rem;
          display: flex; flex-direction: column; justify-content: space-between;
          transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .cell:hover { transform: scale(1.02); }
        .large { grid-column: span 2; grid-row: span 2; background: linear-gradient(135deg, var(--bg-secondary), var(--bg-primary)); }
        .wide { grid-column: span 2; }
        .cell h3 { font-size: 1.2rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.5rem; }
        .cell p { font-size: 0.9rem; color: var(--text-secondary); }
        .cell .icon { font-size: 2.5rem; align-self: flex-end; }
        @media (max-width: 768px) { .bento-grid { grid-template-columns: 1fr; } .large, .wide { grid-column: span 1; } }
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Command Palette (Ctrl+K)",
    category: "UI",
    rarity: "Legendary",
    tech_stack: ["JS", "Modal"],
    visual_style: "Utility",
    description: "A hidden command menu triggered by keyboard shortcut.",
    code: {
      html: `
        <div class="cmd-overlay" id="cmd-palette">
          <div class="cmd-modal">
            <input type="text" placeholder="Type a command..." autofocus>
            <div class="cmd-list">
              <div class="cmd-item"><span>Go to Home</span><span class="key">↵</span></div>
              <div class="cmd-item"><span>Search Documentation</span><span class="key">S</span></div>
              <div class="cmd-item"><span>Dark Mode Toggle</span><span class="key">D</span></div>
            </div>
          </div>
        </div>
        <div style="padding: 2rem; text-align: center; opacity: 0.5;">Press <strong>Ctrl + K</strong> to open</div>
      `,
      css: `
        .cmd-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(2px);
          display: flex; justify-content: center; align-items: flex-start; padding-top: 10vh;
          opacity: 0; pointer-events: none; transition: 0.2s; z-index: 9999;
        }
        .cmd-overlay.open { opacity: 1; pointer-events: auto; }
        .cmd-modal {
          width: 500px; background: var(--bg-secondary); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px; box-shadow: 0 20px 50px rgba(0,0,0,0.5); overflow: hidden;
          transform: scale(0.95); transition: 0.2s;
        }
        .cmd-overlay.open .cmd-modal { transform: scale(1); }
        .cmd-modal input {
          width: 100%; padding: 16px; background: transparent; border: none; border-bottom: 1px solid rgba(255,255,255,0.1);
          color: var(--text-primary); font-size: 1.1rem; outline: none;
        }
        .cmd-item {
          padding: 12px 16px; display: flex; justify-content: space-between; color: var(--text-secondary);
          cursor: pointer; border-left: 2px solid transparent;
        }
        .cmd-item:hover { background: var(--bg-primary); color: var(--text-primary); border-left-color: var(--accent-primary); }
        .key { font-size: 0.8rem; background: rgba(255,255,255,0.1); padding: 2px 6px; rounded: 4px; }
      `,
      js: `
        document.addEventListener('keydown', (e) => {
          if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            document.getElementById('cmd-palette').classList.toggle('open');
            document.querySelector('.cmd-modal input').focus();
          }
          if (e.key === 'Escape') {
            document.getElementById('cmd-palette').classList.remove('open');
          }
        });
      `
    }
  },
  {
    id: uuid(),
    name: "Glitch Text Effect",
    category: "UI",
    rarity: "Rare",
    tech_stack: ["CSS Animation"],
    visual_style: "Cyberpunk",
    description: "Text that distorts and shifts chromatically.",
    code: {
      html: `
        <div class="glitch-wrapper">
          <h1 class="glitch" data-text="CYBER_SYSTEM">CYBER_SYSTEM</h1>
        </div>
      `,
      css: `
        .glitch-wrapper { display: flex; justify-content: center; padding: 4rem; background: #000; }
        .glitch {
          color: white; font-size: 4rem; font-weight: bold; position: relative;
          text-transform: uppercase; letter-spacing: 0.1em;
        }
        .glitch::before, .glitch::after {
          content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        }
        .glitch::before {
          left: 2px; text-shadow: -2px 0 #ff00c1; clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim 5s infinite linear alternate-reverse;
        }
        .glitch::after {
          left: -2px; text-shadow: -2px 0 #00fff9; clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim2 5s infinite linear alternate-reverse;
        }
        @keyframes glitch-anim {
          0% { clip: rect(12px, 9999px, 5px, 0); }
          50% { clip: rect(65px, 9999px, 100px, 0); }
          100% { clip: rect(2px, 9999px, 85px, 0); }
        }
        @keyframes glitch-anim2 {
          0% { clip: rect(89px, 9999px, 2px, 0); }
          50% { clip: rect(2px, 9999px, 55px, 0); }
          100% { clip: rect(10px, 9999px, 120px, 0); }
        }
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Typewriter Effect",
    category: "UI",
    rarity: "Uncommon",
    tech_stack: ["JS"],
    visual_style: "Minimal",
    description: "Text that types itself out character by character.",
    code: {
      html: `
        <div class="type-container">
          <span id="typewriter"></span><span class="cursor">|</span>
        </div>
      `,
      css: `
        .type-container { font-family: monospace; font-size: 2rem; color: var(--text-primary); padding: 4rem; min-height: 100px; }
        .cursor { animation: blink 1s infinite; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `,
      js: `
        const text = "Building the future, one pixel at a time...";
        const el = document.getElementById('typewriter');
        let i = 0;
        function type() {
          if (i < text.length) {
            el.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 50 + Math.random() * 50);
          }
        }
        type();
      `
    }
  },
  {
    id: uuid(),
    name: "Image Compare Slider",
    category: "UI",
    rarity: "Rare",
    tech_stack: ["JS", "Input"],
    visual_style: "Interactive",
    description: "Slider to compare two images (Before/After).",
    code: {
      html: `
        <div class="img-comp-container">
          <div class="img-comp-img">
            <div class="label">AFTER</div>
            <!-- Using colored divs for demo, replace with <img> in production -->
            <div style="width: 100%; height: 100%; background: linear-gradient(to right, #ff00cc, #333399);"></div>
          </div>
          <div class="img-comp-img overlay">
            <div class="label">BEFORE</div>
            <div style="width: 100%; height: 100%; background: linear-gradient(to right, #444, #999);"></div>
          </div>
          <input type="range" min="0" max="100" value="50" class="slider" oninput="slide(this.value)">
        </div>
      `,
      css: `
        .img-comp-container { position: relative; height: 300px; width: 100%; overflow: hidden; border-radius: 12px; }
        .img-comp-img { position: absolute; width: 100%; height: 100%; overflow: hidden; }
        .img-comp-img.overlay { width: 50%; border-right: 2px solid white; z-index: 2; }
        .label { position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.5); color: white; padding: 4px 8px; font-size: 10px; font-weight: bold; pointer-events: none; }
        .slider { 
          position: absolute; width: 100%; height: 100%; top: 0; left: 0; margin: 0; opacity: 0; cursor: col-resize; z-index: 10;
        }
      `,
      js: `
        window.slide = function(val) {
          document.querySelector('.overlay').style.width = val + "%";
        }
      `
    }
  },
  {
    id: uuid(),
    name: "Spotlight Card",
    category: "UI",
    rarity: "Legendary",
    tech_stack: ["JS", "Mouse Event"],
    visual_style: "Interactive",
    description: "A card that reveals a radial gradient spotlight following your mouse cursor.",
    code: {
      html: `
        <div class="spotlight-container">
          <div class="spotlight-card">
            <div class="spotlight-content">
              <h3>Hover Me</h3>
              <p>A beam of light follows your cursor, revealing the border and texture.</p>
            </div>
          </div>
        </div>
      `,
      css: `
        .spotlight-container { padding: 4rem; display: flex; justify-content: center; }
        .spotlight-card {
          position: relative;
          width: 300px; height: 350px;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .spotlight-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 40%);
          z-index: 1;
          opacity: 0;
          transition: opacity 0.5s;
        }
        .spotlight-card:hover::before { opacity: 1; }
        .spotlight-content {
          position: relative; z-index: 2;
          padding: 2rem; height: 100%;
          display: flex; flex-direction: column; justify-content: flex-end;
          color: var(--text-primary);
        }
        .spotlight-content h3 { font-size: 1.5rem; margin-bottom: 0.5rem; }
        .spotlight-content p { color: var(--text-secondary); font-size: 0.9rem; }
      `,
      js: `
        const card = document.querySelector('.spotlight-card');
        if(card) {
          card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', \`\${x}px\`);
            card.style.setProperty('--mouse-y', \`\${y}px\`);
          });
        }
      `
    }
  },
  {
    id: uuid(),
    name: "Magnetic Button",
    category: "UI",
    rarity: "Rare",
    tech_stack: ["Physics"],
    visual_style: "Minimal",
    description: "A button that physically pulls towards your cursor before snapping back.",
    code: {
      html: `
        <div style="padding: 4rem; text-align: center;">
          <button class="magnetic-btn"><span>Magnetism</span></button>
        </div>
      `,
      css: `
        .magnetic-btn {
          position: relative;
          padding: 1.5rem 3rem;
          background: var(--text-primary);
          color: var(--bg-primary);
          border: none;
          border-radius: 100px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.1s;
        }
      `,
      js: `
        const btn = document.querySelector('.magnetic-btn');
        if(btn) {
          btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = \`translate(\${x * 0.3}px, \${y * 0.5}px)\`;
          });
          btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
          });
        }
      `
    }
  },
  {
    id: uuid(),
    name: "Code Snippet Window",
    category: "UI",
    rarity: "Common",
    tech_stack: ["Pre/Code"],
    visual_style: "Developer",
    description: "A beautiful terminal-like window for displaying code snippets.",
    code: {
      html: `
        <div class="code-window">
          <div class="window-header">
            <span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span>
            <span class="filename">app.config.ts</span>
          </div>
          <pre><code>
const config = {
  theme: 'dark',
  plugins: [
    'animation',
    'typography'
  ]
};
export default config;
          </code></pre>
        </div>
      `,
      css: `
        .code-window {
          background: #1e1e1e;
          border-radius: 12px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          overflow: hidden;
          font-family: 'Fira Code', monospace;
          max-width: 500px;
          margin: 2rem auto;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .window-header {
          background: #252526;
          padding: 12px 16px;
          display: flex; align-items: center; gap: 8px;
        }
        .dot { width: 12px; height: 12px; border-radius: 50%; }
        .red { background: #ff5f56; } .yellow { background: #ffbd2e; } .green { background: #27c93f; }
        .filename { margin-left: 12px; font-size: 0.8rem; color: #888; }
        pre { margin: 0; padding: 20px; color: #d4d4d4; font-size: 0.9rem; line-height: 1.5; overflow-x: auto; }
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Infinite Marquee",
    category: "UI",
    rarity: "Uncommon",
    tech_stack: ["CSS Animation"],
    visual_style: "Motion",
    description: "A scrolling text banner that loops infinitely.",
    code: {
      html: `
        <div class="marquee-wrap">
          <div class="marquee">
            <span>DESIGN ENGINEERING • CREATIVE TECHNOLOGY • UI/UX • </span>
            <span>DESIGN ENGINEERING • CREATIVE TECHNOLOGY • UI/UX • </span>
          </div>
        </div>
      `,
      css: `
        .marquee-wrap {
          width: 100%;
          overflow: hidden;
          background: var(--accent-primary);
          color: var(--bg-primary);
          padding: 1rem 0;
          white-space: nowrap;
        }
        .marquee {
          display: inline-block;
          animation: marquee 20s linear infinite;
        }
        .marquee span {
          font-size: 2rem;
          font-weight: 900;
          padding-right: 2rem;
          text-transform: uppercase;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Glass Tilt Card",
    category: "UI",
    rarity: "Rare",
    tech_stack: ["3D Transform"],
    visual_style: "Frosted",
    description: "A glassmorphism card that tilts in 3D space on hover.",
    code: {
      html: `
        <div class="tilt-wrap">
          <div class="tilt-card">
            <h4>Glass</h4>
            <p>Hover to see the parallax depth effect.</p>
          </div>
        </div>
      `,
      css: `
        .tilt-wrap { perspective: 1000px; padding: 4rem; display: flex; justify-content: center; }
        .tilt-card {
          width: 280px; height: 180px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 2rem;
          color: var(--text-primary);
          transition: transform 0.1s;
          transform-style: preserve-3d;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
        }
        .tilt-card:hover { transform: rotateX(10deg) rotateY(-10deg); }
        .tilt-card h4 { transform: translateZ(20px); font-size: 1.5rem; margin-bottom: 0.5rem; }
        .tilt-card p { transform: translateZ(10px); color: var(--text-secondary); }
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Interactive Globe",
    category: "UI",
    rarity: "Legendary",
    tech_stack: ["SVG"],
    visual_style: "Wireframe",
    description: "A spinning wireframe globe animation.",
    code: {
      html: `
        <div class="globe-container">
           <div class="globe"></div>
        </div>
      `,
      css: `
        .globe-container { display: flex; justify-content: center; padding: 4rem; perspective: 800px; }
        .globe {
          width: 200px; height: 200px;
          border-radius: 50%;
          border: 1px solid var(--accent-primary);
          position: relative;
          animation: spin 10s linear infinite;
          transform-style: preserve-3d;
        }
        .globe::before, .globe::after {
          content: ''; position: absolute; inset: 0; border-radius: 50%;
          border: 1px solid var(--accent-primary);
        }
        .globe::before { transform: rotateY(60deg); }
        .globe::after { transform: rotateY(-60deg); }
        @keyframes spin { from { transform: rotateY(0deg) rotateX(20deg); } to { transform: rotateY(360deg) rotateX(20deg); } }
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Stacked Notifications",
    category: "UI",
    rarity: "Uncommon",
    tech_stack: ["Stack"],
    visual_style: "Clean",
    description: "A vertical stack of notification cards with depth.",
    code: {
      html: `
        <div class="stack-wrapper">
           <div class="n-card n-1"><span>New Order</span><small>Just now</small></div>
           <div class="n-card n-2"><span>Message</span><small>2m ago</small></div>
           <div class="n-card n-3"><span>System Update</span><small>1h ago</small></div>
        </div>
      `,
      css: `
        .stack-wrapper { position: relative; height: 200px; width: 300px; margin: 0 auto; margin-top: 2rem; }
        .n-card {
          position: absolute; width: 100%; padding: 1rem 1.5rem;
          background: var(--bg-secondary); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          display: flex; justify-content: space-between; align-items: center;
          color: var(--text-primary);
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          transition: 0.3s;
        }
        .n-card small { color: var(--text-secondary); }
        .n-1 { top: 0; z-index: 3; transform: scale(1); }
        .n-2 { top: 15px; z-index: 2; transform: scale(0.95); opacity: 0.7; }
        .n-3 { top: 30px; z-index: 1; transform: scale(0.90); opacity: 0.4; }
        .stack-wrapper:hover .n-1 { transform: translateY(-10px); }
        .stack-wrapper:hover .n-2 { transform: translateY(0) scale(1); opacity: 1; }
        .stack-wrapper:hover .n-3 { transform: translateY(10px) scale(0.95); opacity: 0.7; }
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Grainy Gradient Blob",
    category: "UI",
    rarity: "Rare",
    tech_stack: ["SVG Filter"],
    visual_style: "Texture",
    description: "Organic, moving gradient blob with film grain texture.",
    code: {
      html: `
        <div class="blob-stage">
          <div class="blob"></div>
          <svg style="display: none;">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
            </filter>
          </svg>
        </div>
      `,
      css: `
        .blob-stage {
          width: 100%; height: 300px;
          display: flex; justify-content: center; align-items: center;
          overflow: hidden; background: var(--bg-primary);
          position: relative;
        }
        .blob {
          width: 300px; height: 300px;
          background: linear-gradient(45deg, var(--accent-primary), #ff00cc);
          border-radius: 50%;
          filter: blur(40px);
          animation: morph 8s ease-in-out infinite;
          opacity: 0.6;
        }
        .blob-stage::after {
          content: ""; position: absolute; inset: 0;
          filter: url(#noise); opacity: 0.15; pointer-events: none;
        }
        @keyframes morph {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: translate(0,0); }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; transform: translate(20px, -20px); }
        }
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Minimal Social Bar",
    category: "UI",
    rarity: "Common",
    tech_stack: ["Flex"],
    visual_style: "Icon",
    description: "Clean row of social icons with hover glow.",
    code: {
      html: `
        <div class="social-row">
           <div class="s-icon">TW</div>
           <div class="s-icon">IG</div>
           <div class="s-icon">LI</div>
           <div class="s-icon">GH</div>
        </div>
      `,
      css: `
        .social-row { display: flex; gap: 1rem; justify-content: center; padding: 2rem; }
        .s-icon {
          width: 40px; height: 40px;
          border-radius: 50%;
          border: 1px solid var(--text-secondary);
          display: flex; align-items: center; justify-content: center;
          color: var(--text-secondary);
          font-size: 0.8rem; font-weight: bold;
          cursor: pointer;
          transition: 0.3s;
        }
        .s-icon:hover {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
          box-shadow: 0 0 15px var(--accent-primary);
        }
      `,
      js: ``
    }
  },

  // =========================================================================
  // 🗣️ VOICE & TONE CARDS
  // =========================================================================
  {
    id: uuid(),
    name: "Professional Corp",
    category: "Voice",
    rarity: "Common",
    tech_stack: ["Tone"],
    visual_style: "Trustworthy",
    description: "Stable. Secure. Enterprise. We facilitate synergy.",
    code: {
      html: ``,
      css: ``,
      js: `// INSTRUCTION: Write copy that is formal, concise, and business-oriented. Use words like 'Facilitate', 'Synergy', 'Enterprise', 'Scalable'. Avoid slang.`
    }
  },
  {
    id: uuid(),
    name: "Gen-Z Chaos",
    category: "Voice",
    rarity: "Rare",
    tech_stack: ["Tone"],
    visual_style: "Vibes",
    description: "no cap just vibes fr ✨ chaotic energy only.",
    code: {
      html: ``,
      css: ``,
      js: `// INSTRUCTION: Use lowercase headings, emojis, Gen-Z slang (no cap, fr, bet), and a casual, authentic tone.`
    }
  },
  {
    id: uuid(),
    name: "Luxury Minimal",
    category: "Voice",
    rarity: "Uncommon",
    tech_stack: ["Tone"],
    visual_style: "Elegant",
    description: "Whispered elegance. Less is infinitely more.",
    code: {
      html: ``,
      css: ``,
      js: `// INSTRUCTION: Use very few words. Short sentences. Focus on elegance, exclusivity, and sensory details.`
    }
  },
  {
    id: uuid(),
    name: "Pirate Captain",
    category: "Voice",
    rarity: "Legendary",
    tech_stack: ["Tone"],
    visual_style: "Nautical",
    description: "Ahoy matey! Talk like a swashbuckling captain of the high seas.",
    code: {
      html: ``,
      css: ``,
      js: `// INSTRUCTION: Write all copy in the style of an 18th-century pirate. Use terms like 'Ahoy', 'Matey', 'Treasure', 'Plunder'.`
    }
  },
  {
    id: uuid(),
    name: "Friendly Robot",
    category: "Voice",
    rarity: "Rare",
    tech_stack: ["Tone"],
    visual_style: "Binary",
    description: "Beep boop. I am here to assist. Efficient and polite.",
    code: {
      html: ``,
      css: ``,
      js: `// INSTRUCTION: Write copy that sounds like a helpful, slightly stiff AI robot. Start sentences with 'Affirmative' or 'Processing'.`
    }
  },
  {
    id: uuid(),
    name: "Startup Bro",
    category: "Voice",
    rarity: "Common",
    tech_stack: ["Tone"],
    visual_style: "Hustle",
    description: "Disrupting the industry. Crushing it. Let's go!",
    code: {
      html: ``,
      css: ``,
      js: `// INSTRUCTION: High energy, focus on 'disruption', 'scaling', 'shipping'. Use rocket emojis. Everything is 'game-changing'.`
    }
  },
  {
    id: uuid(),
    name: "Academic Scholar",
    category: "Voice",
    rarity: "Uncommon",
    tech_stack: ["Tone"],
    visual_style: "Formal",
    description: "Empirically proven, rigorous, and citation-needed.",
    code: {
      html: ``,
      css: ``,
      js: `// INSTRUCTION: Use complex vocabulary, passive voice, and rigorous tone. References to data and studies.`
    }
  },
  {
    id: uuid(),
    name: "Zen Master",
    category: "Voice",
    rarity: "Rare",
    tech_stack: ["Tone"],
    visual_style: "Calm",
    description: "Breath in. Breath out. Balance in all things.",
    code: {
      html: ``,
      css: ``,
      js: `// INSTRUCTION: Peaceful, slow pacing. Use metaphors of nature, water, and balance. Calming tone.`
    }
  },
  {
    id: uuid(),
    name: "Hype Beast",
    category: "Voice",
    rarity: "Rare",
    tech_stack: ["Tone"],
    visual_style: "Loud",
    description: "LITERALLY THE BEST THING EVER!!! 🔥🔥🔥",
    code: {
      html: ``,
      css: ``,
      js: `// INSTRUCTION: USE CAPS LOCK FREQUENTLY. Multiple exclamation marks. Extreme enthusiasm. Fire emojis.`
    }
  },
  {
    id: uuid(),
    name: "Noir Detective",
    category: "Voice",
    rarity: "Legendary",
    tech_stack: ["Tone"],
    visual_style: "Gritty",
    description: "It was a dark and stormy night...",
    code: {
      html: ``,
      css: ``,
      js: `// INSTRUCTION: Gritty, cynical narration. Short, punchy sentences. Metaphors about shadows and rain.`
    }
  },

  // =========================================================================
  // 🎨 THEME CARDS (30 NEW SCHEMES)
  // =========================================================================
  {
    id: uuid(),
    name: "Dracula",
    category: "Theme",
    rarity: "Rare",
    tech_stack: ["CSS Vars"],
    visual_style: "Code/Dark",
    description: "A dark theme for vampires and developers.",
    code: {
      html: `<!-- Global Theme Applied -->${THEME_PREVIEW_HTML}`,
      css: `
        :root {
          --bg-primary: #282a36;
          --bg-secondary: #44475a;
          --text-primary: #f8f8f2;
          --text-secondary: #6272a4;
          --accent-primary: #ff79c6; /* Pink */
          --accent-secondary: #bd93f9; /* Purple */
          --font-heading: 'Fira Code', monospace;
          --font-body: 'Arial', sans-serif;
          --radius: 4px;
        }
        body { background-color: var(--bg-primary); color: var(--text-primary); font-family: var(--font-body); }
        ${THEME_PREVIEW_CSS}
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Nord",
    category: "Theme",
    rarity: "Rare",
    tech_stack: ["CSS Vars"],
    visual_style: "Arctic",
    description: "An arctic, north-bluish color palette.",
    code: {
      html: `<!-- Global Theme Applied -->${THEME_PREVIEW_HTML}`,
      css: `
        :root {
          --bg-primary: #2e3440;
          --bg-secondary: #3b4252;
          --text-primary: #eceff4;
          --text-secondary: #d8dee9;
          --accent-primary: #88c0d0; /* Frost */
          --accent-secondary: #81a1c1;
          --font-heading: 'Rubik', sans-serif;
          --font-body: 'Rubik', sans-serif;
          --radius: 6px;
        }
        body { background-color: var(--bg-primary); color: var(--text-primary); font-family: var(--font-body); }
        ${THEME_PREVIEW_CSS}
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Solarized Light",
    category: "Theme",
    rarity: "Uncommon",
    tech_stack: ["CSS Vars"],
    visual_style: "Low Contrast",
    description: "Precision colors for machines and people.",
    code: {
      html: `<!-- Global Theme Applied -->${THEME_PREVIEW_HTML}`,
      css: `
        :root {
          --bg-primary: #fdf6e3;
          --bg-secondary: #eee8d5;
          --text-primary: #657b83;
          --text-secondary: #93a1a1;
          --accent-primary: #268bd2; /* Blue */
          --accent-secondary: #d33682; /* Magenta */
          --font-heading: 'Arial', sans-serif;
          --font-body: 'Arial', sans-serif;
          --radius: 2px;
        }
        body { background-color: var(--bg-primary); color: var(--text-primary); font-family: var(--font-body); }
        ${THEME_PREVIEW_CSS}
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Monokai",
    category: "Theme",
    rarity: "Common",
    tech_stack: ["CSS Vars"],
    visual_style: "Vibrant Dark",
    description: "High contrast, colorful code aesthetic.",
    code: {
      html: `<!-- Global Theme Applied -->${THEME_PREVIEW_HTML}`,
      css: `
        :root {
          --bg-primary: #272822;
          --bg-secondary: #3e3d32;
          --text-primary: #f8f8f2;
          --text-secondary: #75715e;
          --accent-primary: #a6e22e; /* Green */
          --accent-secondary: #f92672; /* Pink */
          --font-heading: 'Impact', sans-serif;
          --font-body: 'Verdana', sans-serif;
          --radius: 0px;
        }
        body { background-color: var(--bg-primary); color: var(--text-primary); font-family: var(--font-body); }
        ${THEME_PREVIEW_CSS}
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Gruvbox",
    category: "Theme",
    rarity: "Uncommon",
    tech_stack: ["CSS Vars"],
    visual_style: "Retro",
    description: "Bright colors with a retro groove.",
    code: {
      html: `<!-- Global Theme Applied -->${THEME_PREVIEW_HTML}`,
      css: `
        :root {
          --bg-primary: #282828;
          --bg-secondary: #3c3836;
          --text-primary: #ebdbb2;
          --text-secondary: #a89984;
          --accent-primary: #fe8019; /* Orange */
          --accent-secondary: #b8bb26; /* Green */
          --font-heading: 'Courier', monospace;
          --font-body: 'Courier', monospace;
          --radius: 0px;
        }
        body { background-color: var(--bg-primary); color: var(--text-primary); font-family: var(--font-body); }
        ${THEME_PREVIEW_CSS}
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Synthwave 84",
    category: "Theme",
    rarity: "Legendary",
    tech_stack: ["CSS Vars"],
    visual_style: "Neon",
    description: "Outrun aesthetics from the 1980s future.",
    code: {
      html: `<!-- Global Theme Applied -->${THEME_PREVIEW_HTML}`,
      css: `
        :root {
          --bg-primary: #2b213a;
          --bg-secondary: #241b2f;
          --text-primary: #ff7edb;
          --text-secondary: #b6b1b1;
          --accent-primary: #36f9f6; /* Cyan */
          --accent-secondary: #f9d86c; /* Yellow */
          --font-heading: 'Orbitron', sans-serif;
          --font-body: 'Roboto', sans-serif;
          --radius: 12px;
        }
        body { background-color: var(--bg-primary); color: var(--text-primary); font-family: var(--font-body); }
        button { box-shadow: 0 0 10px var(--accent-primary); }
        ${THEME_PREVIEW_CSS}
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Coffee Shop",
    category: "Theme",
    rarity: "Common",
    tech_stack: ["CSS Vars"],
    visual_style: "Warm",
    description: "Cozy browns and creams.",
    code: {
      html: `<!-- Global Theme Applied -->${THEME_PREVIEW_HTML}`,
      css: `
        :root {
          --bg-primary: #fff0db;
          --bg-secondary: #ead8c0;
          --text-primary: #3b2f2f;
          --text-secondary: #6f4e37;
          --accent-primary: #6f4e37; /* Coffee */
          --accent-secondary: #a0522d;
          --font-heading: 'Garamond', serif;
          --font-body: 'Garamond', serif;
          --radius: 8px;
        }
        body { background-color: var(--bg-primary); color: var(--text-primary); font-family: var(--font-body); }
        ${THEME_PREVIEW_CSS}
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Oceanic",
    category: "Theme",
    rarity: "Common",
    tech_stack: ["CSS Vars"],
    visual_style: "Deep Sea",
    description: "Deep teals and aqua accents.",
    code: {
      html: `<!-- Global Theme Applied -->${THEME_PREVIEW_HTML}`,
      css: `
        :root {
          --bg-primary: #0f172a;
          --bg-secondary: #1e293b;
          --text-primary: #f1f5f9;
          --text-secondary: #94a3b8;
          --accent-primary: #06b6d4; /* Cyan */
          --accent-secondary: #0ea5e9;
          --font-heading: 'Inter', sans-serif;
          --font-body: 'Inter', sans-serif;
          --radius: 16px;
        }
        body { background-color: var(--bg-primary); color: var(--text-primary); font-family: var(--font-body); }
        ${THEME_PREVIEW_CSS}
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Lavender Haze",
    category: "Theme",
    rarity: "Uncommon",
    tech_stack: ["CSS Vars"],
    visual_style: "Pastel",
    description: "Soft purples and floating clouds.",
    code: {
      html: `<!-- Global Theme Applied -->${THEME_PREVIEW_HTML}`,
      css: `
        :root {
          --bg-primary: #f3e8ff;
          --bg-secondary: #e9d5ff;
          --text-primary: #581c87;
          --text-secondary: #7e22ce;
          --accent-primary: #d8b4fe;
          --accent-secondary: #c084fc;
          --font-heading: 'Nunito', sans-serif;
          --font-body: 'Nunito', sans-serif;
          --radius: 20px;
        }
        body { background-color: var(--bg-primary); color: var(--text-primary); font-family: var(--font-body); }
        ${THEME_PREVIEW_CSS}
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Bumblebee",
    category: "Theme",
    rarity: "Rare",
    tech_stack: ["CSS Vars"],
    visual_style: "High Vis",
    description: "Stark black and yellow.",
    code: {
      html: `<!-- Global Theme Applied -->${THEME_PREVIEW_HTML}`,
      css: `
        :root {
          --bg-primary: #111111;
          --bg-secondary: #222222;
          --text-primary: #ffffff;
          --text-secondary: #cccccc;
          --accent-primary: #eab308; /* Yellow */
          --accent-secondary: #ca8a04;
          --font-heading: 'Oswald', sans-serif;
          --font-body: 'Oswald', sans-serif;
          --radius: 0px;
        }
        body { background-color: var(--bg-primary); color: var(--text-primary); font-family: var(--font-body); }
        ${THEME_PREVIEW_CSS}
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Mint Chip",
    category: "Theme",
    rarity: "Common",
    tech_stack: ["CSS Vars"],
    visual_style: "Fresh",
    description: "Cool mint greens and chocolate browns.",
    code: {
      html: `<!-- Global Theme Applied -->${THEME_PREVIEW_HTML}`,
      css: `
        :root {
          --bg-primary: #ecfdf5;
          --bg-secondary: #d1fae5;
          --text-primary: #064e3b;
          --text-secondary: #065f46;
          --accent-primary: #10b981; /* Emerald */
          --accent-secondary: #34d399;
          --font-heading: 'Quicksand', sans-serif;
          --font-body: 'Quicksand', sans-serif;
          --radius: 12px;
        }
        body { background-color: var(--bg-primary); color: var(--text-primary); font-family: var(--font-body); }
        ${THEME_PREVIEW_CSS}
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Cherry Blossom",
    category: "Theme",
    rarity: "Uncommon",
    tech_stack: ["CSS Vars"],
    visual_style: "Floral",
    description: "Pink petals and white backgrounds.",
    code: {
      html: `<!-- Global Theme Applied -->${THEME_PREVIEW_HTML}`,
      css: `
        :root {
          --bg-primary: #fff1f2;
          --bg-secondary: #ffe4e6;
          --text-primary: #881337;
          --text-secondary: #9f1239;
          --accent-primary: #fb7185; /* Rose */
          --accent-secondary: #f43f5e;
          --font-heading: 'Playfair Display', serif;
          --font-body: 'Lato', sans-serif;
          --radius: 8px;
        }
        body { background-color: var(--bg-primary); color: var(--text-primary); font-family: var(--font-body); }
        ${THEME_PREVIEW_CSS}
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Corporate Trust",
    category: "Theme",
    rarity: "Common",
    tech_stack: ["CSS Vars"],
    visual_style: "Business",
    description: "Standard Navy Blue and White.",
    code: {
      html: `<!-- Global Theme Applied -->${THEME_PREVIEW_HTML}`,
      css: `
        :root {
          --bg-primary: #ffffff;
          --bg-secondary: #f8fafc;
          --text-primary: #1e293b;
          --text-secondary: #475569;
          --accent-primary: #1d4ed8; /* Blue */
          --accent-secondary: #2563eb;
          --font-heading: 'Roboto', sans-serif;
          --font-body: 'Roboto', sans-serif;
          --radius: 4px;
        }
        body { background-color: var(--bg-primary); color: var(--text-primary); font-family: var(--font-body); }
        ${THEME_PREVIEW_CSS}
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Slate Minimal",
    category: "Theme",
    rarity: "Common",
    tech_stack: ["CSS Vars"],
    visual_style: "Grey",
    description: "Shades of grey for a brutalist look.",
    code: {
      html: `<!-- Global Theme Applied -->${THEME_PREVIEW_HTML}`,
      css: `
        :root {
          --bg-primary: #e2e8f0;
          --bg-secondary: #cbd5e1;
          --text-primary: #0f172a;
          --text-secondary: #334155;
          --accent-primary: #64748b; /* Slate */
          --accent-secondary: #94a3b8;
          --font-heading: 'Helvetica', sans-serif;
          --font-body: 'Helvetica', sans-serif;
          --radius: 0px;
        }
        body { background-color: var(--bg-primary); color: var(--text-primary); font-family: var(--font-body); }
        ${THEME_PREVIEW_CSS}
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "High Contrast",
    category: "Theme",
    rarity: "Uncommon",
    tech_stack: ["CSS Vars"],
    visual_style: "A11y",
    description: "Maximum readability black and white.",
    code: {
      html: `<!-- Global Theme Applied -->${THEME_PREVIEW_HTML}`,
      css: `
        :root {
          --bg-primary: #000000;
          --bg-secondary: #ffffff;
          --text-primary: #ffffff;
          --text-secondary: #ffff00;
          --accent-primary: #ffffff;
          --accent-secondary: #ffff00;
          --font-heading: 'Verdana', sans-serif;
          --font-body: 'Verdana', sans-serif;
          --radius: 0px;
        }
        body { background-color: var(--bg-primary); color: var(--text-primary); font-family: var(--font-body); }
        .swatch { border: 2px solid white; }
        ${THEME_PREVIEW_CSS}
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Sepia Photography",
    category: "Theme",
    rarity: "Rare",
    tech_stack: ["CSS Vars"],
    visual_style: "Vintage",
    description: "Old photo aesthetic.",
    code: {
      html: `<!-- Global Theme Applied -->${THEME_PREVIEW_HTML}`,
      css: `
        :root {
          --bg-primary: #f5e6d3;
          --bg-secondary: #e6d3b3;
          --text-primary: #4b3621;
          --text-secondary: #6e543c;
          --accent-primary: #a0522d; /* Sienna */
          --accent-secondary: #cd853f;
          --font-heading: 'Courier New', monospace;
          --font-body: 'Courier New', monospace;
          --radius: 2px;
        }
        body { background-color: var(--bg-primary); color: var(--text-primary); font-family: var(--font-body); }
        ${THEME_PREVIEW_CSS}
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Gameboy",
    category: "Theme",
    rarity: "Legendary",
    tech_stack: ["CSS Vars"],
    visual_style: "8-bit",
    description: "Green dot matrix nostalgia.",
    code: {
      html: `<!-- Global Theme Applied -->${THEME_PREVIEW_HTML}`,
      css: `
        :root {
          --bg-primary: #8bac0f;
          --bg-secondary: #9bbc0f;
          --text-primary: #0f380f;
          --text-secondary: #306230;
          --accent-primary: #0f380f;
          --accent-secondary: #306230;
          --font-heading: 'Press Start 2P', monospace;
          --font-body: 'Press Start 2P', monospace;
          --radius: 0px;
        }
        body { background-color: var(--bg-primary); color: var(--text-primary); font-family: var(--font-body); letter-spacing: -1px; }
        ${THEME_PREVIEW_CSS}
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Blueprint",
    category: "Theme",
    rarity: "Rare",
    tech_stack: ["CSS Vars"],
    visual_style: "Technical",
    description: "Architectural blue and white lines.",
    code: {
      html: `<!-- Global Theme Applied -->${THEME_PREVIEW_HTML}`,
      css: `
        :root {
          --bg-primary: #1e3a8a;
          --bg-secondary: #172554;
          --text-primary: #ffffff;
          --text-secondary: #bfdbfe;
          --accent-primary: #60a5fa;
          --accent-secondary: #3b82f6;
          --font-heading: 'Courier', monospace;
          --font-body: 'Courier', monospace;
          --radius: 0px;
        }
        body { background-color: var(--bg-primary); color: var(--text-primary); font-family: var(--font-body); background-image: radial-gradient(#60a5fa 1px, transparent 1px); background-size: 20px 20px; }
        ${THEME_PREVIEW_CSS}
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Hacker Terminal",
    category: "Theme",
    rarity: "Legendary",
    tech_stack: ["CSS Vars"],
    visual_style: "Matrix",
    description: "Phosphor green on black CRT.",
    code: {
      html: `<!-- Global Theme Applied -->${THEME_PREVIEW_HTML}`,
      css: `
        :root {
          --bg-primary: #000000;
          --bg-secondary: #0a0a0a;
          --text-primary: #00ff00;
          --text-secondary: #008f00;
          --accent-primary: #00ff00;
          --accent-secondary: #008f00;
          --font-heading: 'VT323', monospace;
          --font-body: 'VT323', monospace;
          --radius: 0px;
        }
        body { background-color: var(--bg-primary); color: var(--text-primary); font-family: var(--font-body); text-shadow: 0 0 5px #00ff00; }
        ${THEME_PREVIEW_CSS}
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Sunset Gradient",
    category: "Theme",
    rarity: "Uncommon",
    tech_stack: ["CSS Vars"],
    visual_style: "Warm",
    description: "Fading from orange to purple.",
    code: {
      html: `<!-- Global Theme Applied -->${THEME_PREVIEW_HTML}`,
      css: `
        :root {
          --bg-primary: #4a1c40;
          --bg-secondary: #7e2e53;
          --text-primary: #fbbf24;
          --text-secondary: #fca5a5;
          --accent-primary: #f59e0b; /* Amber */
          --accent-secondary: #d97706;
          --font-heading: 'Poppins', sans-serif;
          --font-body: 'Poppins', sans-serif;
          --radius: 12px;
        }
        body { background-color: var(--bg-primary); color: var(--text-primary); font-family: var(--font-body); background: linear-gradient(to bottom, #4a1c40, #b91c1c); }
        ${THEME_PREVIEW_CSS}
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Cotton Candy",
    category: "Theme",
    rarity: "Common",
    tech_stack: ["CSS Vars"],
    visual_style: "Fun",
    description: "Playful pinks and blues.",
    code: {
      html: `<!-- Global Theme Applied -->${THEME_PREVIEW_HTML}`,
      css: `
        :root {
          --bg-primary: #fff0f5;
          --bg-secondary: #e0f2fe;
          --text-primary: #ec4899;
          --text-secondary: #0ea5e9;
          --accent-primary: #f472b6;
          --accent-secondary: #38bdf8;
          --font-heading: 'Comic Neue', sans-serif;
          --font-body: 'Comic Neue', sans-serif;
          --radius: 24px;
        }
        body { background-color: var(--bg-primary); color: var(--text-primary); font-family: var(--font-body); }
        ${THEME_PREVIEW_CSS}
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Dark Matter",
    category: "Theme",
    rarity: "Rare",
    tech_stack: ["CSS Vars"],
    visual_style: "Sci-Fi",
    description: "Deep grey with aggressive red accents.",
    code: {
      html: `<!-- Global Theme Applied -->${THEME_PREVIEW_HTML}`,
      css: `
        :root {
          --bg-primary: #0f0f0f;
          --bg-secondary: #1a1a1a;
          --text-primary: #e5e5e5;
          --text-secondary: #a3a3a3;
          --accent-primary: #dc2626; /* Red */
          --accent-secondary: #b91c1c;
          --font-heading: 'Rajdhani', sans-serif;
          --font-body: 'Rajdhani', sans-serif;
          --radius: 2px;
        }
        body { background-color: var(--bg-primary); color: var(--text-primary); font-family: var(--font-body); }
        ${THEME_PREVIEW_CSS}
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Royal Gold",
    category: "Theme",
    rarity: "Legendary",
    tech_stack: ["CSS Vars"],
    visual_style: "Regal",
    description: "Deep purple and gold leaf.",
    code: {
      html: `<!-- Global Theme Applied -->${THEME_PREVIEW_HTML}`,
      css: `
        :root {
          --bg-primary: #2e1065;
          --bg-secondary: #4c1d95;
          --text-primary: #fef08a;
          --text-secondary: #e9d5ff;
          --accent-primary: #fbbf24; /* Gold */
          --accent-secondary: #f59e0b;
          --font-heading: 'Cinzel', serif;
          --font-body: 'Lato', sans-serif;
          --radius: 4px;
        }
        body { background-color: var(--bg-primary); color: var(--text-primary); font-family: var(--font-body); }
        ${THEME_PREVIEW_CSS}
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Eucalyptus",
    category: "Theme",
    rarity: "Uncommon",
    tech_stack: ["CSS Vars"],
    visual_style: "Spa",
    description: "Calming grey-greens.",
    code: {
      html: `<!-- Global Theme Applied -->${THEME_PREVIEW_HTML}`,
      css: `
        :root {
          --bg-primary: #f0fdf4;
          --bg-secondary: #dcfce7;
          --text-primary: #14532d;
          --text-secondary: #166534;
          --accent-primary: #4ade80;
          --accent-secondary: #22c55e;
          --font-heading: 'Raleway', sans-serif;
          --font-body: 'Raleway', sans-serif;
          --radius: 12px;
        }
        body { background-color: var(--bg-primary); color: var(--text-primary); font-family: var(--font-body); }
        ${THEME_PREVIEW_CSS}
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Graphite",
    category: "Theme",
    rarity: "Common",
    tech_stack: ["CSS Vars"],
    visual_style: "Sketch",
    description: "Pencil lead greys.",
    code: {
      html: `<!-- Global Theme Applied -->${THEME_PREVIEW_HTML}`,
      css: `
        :root {
          --bg-primary: #374151;
          --bg-secondary: #4b5563;
          --text-primary: #f3f4f6;
          --text-secondary: #9ca3af;
          --accent-primary: #d1d5db;
          --accent-secondary: #9ca3af;
          --font-heading: 'Open Sans', sans-serif;
          --font-body: 'Open Sans', sans-serif;
          --radius: 4px;
        }
        body { background-color: var(--bg-primary); color: var(--text-primary); font-family: var(--font-body); }
        ${THEME_PREVIEW_CSS}
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Azure Sky",
    category: "Theme",
    rarity: "Common",
    tech_stack: ["CSS Vars"],
    visual_style: "Bright",
    description: "Clear blue sky colors.",
    code: {
      html: `<!-- Global Theme Applied -->${THEME_PREVIEW_HTML}`,
      css: `
        :root {
          --bg-primary: #eff6ff;
          --bg-secondary: #dbeafe;
          --text-primary: #1e3a8a;
          --text-secondary: #3b82f6;
          --accent-primary: #2563eb;
          --accent-secondary: #1d4ed8;
          --font-heading: 'Montserrat', sans-serif;
          --font-body: 'Montserrat', sans-serif;
          --radius: 8px;
        }
        body { background-color: var(--bg-primary); color: var(--text-primary); font-family: var(--font-body); }
        ${THEME_PREVIEW_CSS}
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Crimson Guard",
    category: "Theme",
    rarity: "Rare",
    tech_stack: ["CSS Vars"],
    visual_style: "Aggressive",
    description: "Bold red on black.",
    code: {
      html: `<!-- Global Theme Applied -->${THEME_PREVIEW_HTML}`,
      css: `
        :root {
          --bg-primary: #000000;
          --bg-secondary: #111111;
          --text-primary: #ef4444;
          --text-secondary: #b91c1c;
          --accent-primary: #dc2626;
          --accent-secondary: #991b1b;
          --font-heading: 'Anton', sans-serif;
          --font-body: 'Roboto Condensed', sans-serif;
          --radius: 0px;
        }
        body { background-color: var(--bg-primary); color: var(--text-primary); font-family: var(--font-body); text-transform: uppercase; }
        ${THEME_PREVIEW_CSS}
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Electric Violet",
    category: "Theme",
    rarity: "Rare",
    tech_stack: ["CSS Vars"],
    visual_style: "Digital",
    description: "Shocking purple and white.",
    code: {
      html: `<!-- Global Theme Applied -->${THEME_PREVIEW_HTML}`,
      css: `
        :root {
          --bg-primary: #ffffff;
          --bg-secondary: #f3e8ff;
          --text-primary: #7c3aed;
          --text-secondary: #8b5cf6;
          --accent-primary: #6d28d9;
          --accent-secondary: #5b21b6;
          --font-heading: 'Exo 2', sans-serif;
          --font-body: 'Exo 2', sans-serif;
          --radius: 10px;
        }
        body { background-color: var(--bg-primary); color: var(--text-primary); font-family: var(--font-body); }
        ${THEME_PREVIEW_CSS}
      `,
      js: ``
    }
  },
  // =========================================================================
  // ✨ EXISTING & VISUAL EFFECTS
  // =========================================================================
  {
    id: uuid(),
    name: "Cyberpunk Neon",
    category: "Theme",
    rarity: "Legendary",
    tech_stack: ["CSS Vars"],
    visual_style: "Dark/Neon",
    description: "High contrast dark mode with neon pink and cyan accents.",
    code: {
      html: `<!-- Global Theme Applied -->${THEME_PREVIEW_HTML}`,
      css: `
        :root {
          --bg-primary: #050505;
          --bg-secondary: #121212;
          --text-primary: #ffffff;
          --text-secondary: #b3b3b3;
          --accent-primary: #ff00ff;
          --accent-secondary: #00ffff;
          --font-heading: 'Courier New', monospace;
          --font-body: 'Arial', sans-serif;
          --radius: 0px; /* Sharp edges */
        }
        body { background-color: var(--bg-primary); color: var(--text-primary); font-family: var(--font-body); }
        h1, h2, h3 { font-family: var(--font-heading); text-transform: uppercase; letter-spacing: 2px; }
        button { border-radius: var(--radius); }
        ${THEME_PREVIEW_CSS}
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Forest Hike",
    category: "Theme",
    rarity: "Uncommon",
    tech_stack: ["CSS Vars"],
    visual_style: "Natural",
    description: "Deep greens, earthy browns, and off-white paper tones.",
    code: {
      html: `<!-- Global Theme Applied -->${THEME_PREVIEW_HTML}`,
      css: `
        :root {
          --bg-primary: #fcfcfc;
          --bg-secondary: #e8ede6;
          --text-primary: #1a2e1a;
          --text-secondary: #4a5d4a;
          --accent-primary: #2d5a27;
          --accent-secondary: #8fbc8f;
          --font-heading: 'Georgia', serif;
          --font-body: 'Helvetica', sans-serif;
          --radius: 8px;
        }
        body { background-color: var(--bg-primary); color: var(--text-primary); font-family: var(--font-body); }
        ${THEME_PREVIEW_CSS}
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Sunset Blvd",
    category: "Theme",
    rarity: "Rare",
    tech_stack: ["CSS Vars"],
    visual_style: "Gradient",
    description: "Warm oranges, purples and deep reds.",
    code: {
      html: `<!-- Global Theme Applied -->${THEME_PREVIEW_HTML}`,
      css: `
        :root {
          --bg-primary: #2d1b2e;
          --bg-secondary: #4a2c40;
          --text-primary: #ffecd1;
          --text-secondary: #c9a7b5;
          --accent-primary: #ff6b6b;
          --accent-secondary: #feca57;
          --font-heading: 'Outfit', sans-serif;
          --font-body: 'Outfit', sans-serif;
          --radius: 12px;
        }
        body { background-color: var(--bg-primary); color: var(--text-primary); font-family: var(--font-body); }
        ${THEME_PREVIEW_CSS}
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Retro Computer",
    category: "Theme",
    rarity: "Common",
    tech_stack: ["CSS Vars"],
    visual_style: "Beige/Boxy",
    description: "Old school Windows 95 beige aesthetic.",
    code: {
      html: `<!-- Global Theme Applied -->${THEME_PREVIEW_HTML}`,
      css: `
        :root {
          --bg-primary: #c0c0c0;
          --bg-secondary: #dfdfdf;
          --text-primary: #000000;
          --text-secondary: #444444;
          --accent-primary: #000080;
          --accent-secondary: #008080;
          --font-heading: 'Courier New', monospace;
          --font-body: 'Tahoma', sans-serif;
          --radius: 0px;
        }
        body { background-color: var(--bg-primary); color: var(--text-primary); font-family: var(--font-body); }
        button { border: 2px outset #fff; background: #c0c0c0; color: black; }
        button:active { border: 2px inset #fff; }
        ${THEME_PREVIEW_CSS}
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Swiss International",
    category: "Theme",
    rarity: "Rare",
    tech_stack: ["CSS Vars"],
    visual_style: "Minimalist",
    description: "Bold typography, grid layouts, and vibrant red accents on white.",
    code: {
      html: `<!-- Global Theme Applied -->${THEME_PREVIEW_HTML}`,
      css: `
        :root {
          --bg-primary: #ffffff;
          --bg-secondary: #f4f4f4;
          --text-primary: #000000;
          --text-secondary: #333333;
          --accent-primary: #ff3300; /* Swiss Red */
          --accent-secondary: #000000;
          --font-heading: 'Helvetica Neue', 'Arial', sans-serif;
          --font-body: 'Helvetica Neue', 'Arial', sans-serif;
          --radius: 0px;
        }
        body { background-color: var(--bg-primary); color: var(--text-primary); font-family: var(--font-body); }
        h1 { font-weight: 900; letter-spacing: -1px; }
        ${THEME_PREVIEW_CSS}
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Luxury Gold",
    category: "Theme",
    rarity: "Legendary",
    tech_stack: ["CSS Vars"],
    visual_style: "High-End",
    description: "Black and Gold palette for premium brands.",
    code: {
      html: `<!-- Global Theme Applied -->${THEME_PREVIEW_HTML}`,
      css: `
        :root {
          --bg-primary: #0a0a0a;
          --bg-secondary: #141414;
          --text-primary: #f0f0f0;
          --text-secondary: #999999;
          --accent-primary: #d4af37; /* Gold */
          --accent-secondary: #f2d06b;
          --font-heading: 'Playfair Display', serif;
          --font-body: 'Lato', sans-serif;
          --radius: 4px;
        }
        body { background-color: var(--bg-primary); color: var(--text-primary); font-family: var(--font-body); }
        h1, h2 { font-family: var(--font-heading); font-style: italic; }
        ${THEME_PREVIEW_CSS}
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Aurora Gradient",
    category: "UI",
    rarity: "Rare",
    tech_stack: ["Animation"],
    visual_style: "Ethereal",
    description: "Moving mesh gradient background.",
    code: {
      html: `<div class="aurora-bg"><div class="content">AURORA</div></div>`,
      css: `
        .aurora-bg {
          width: 100%; height: 100%; min-height: 400px;
          background: #000;
          position: relative;
          overflow: hidden;
          display: flex; justify-content: center; align-items: center;
          color: white; font-weight: bold; font-family: sans-serif;
          border-radius: var(--radius, 12px);
        }
        .aurora-bg::before {
          content: '';
          position: absolute;
          top: -50%; left: -50%;
          width: 200%; height: 200%;
          background: radial-gradient(circle at center, #7d2ae8 0%, transparent 50%),
                      radial-gradient(circle at top left, #2a9fe8 0%, transparent 40%),
                      radial-gradient(circle at bottom right, #e82a89 0%, transparent 40%);
          filter: blur(80px);
          animation: aurora-spin 10s linear infinite;
          opacity: 0.7;
        }
        @keyframes aurora-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .content { position: relative; z-index: 10; font-size: 2rem; }
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Matrix Rain",
    category: "UI",
    rarity: "Ancient",
    tech_stack: ["Canvas"],
    visual_style: "Hacker",
    description: "Iconic green code rain effect.",
    code: {
      html: `<canvas id="matrix"></canvas>`,
      css: `
        #matrix { width: 100%; height: 300px; background: black; border-radius: var(--radius, 12px); }
      `,
      js: `
        const c = document.getElementById("matrix");
        if(c) {
          const ctx = c.getContext("2d");
          c.width = c.offsetWidth;
          c.height = c.offsetHeight;
          const chars = "01010101";
          const font_size = 14;
          const columns = c.width / font_size;
          const drops = [];
          for (let x = 0; x < columns; x++) drops[x] = 1;
          function draw() {
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, c.width, c.height);
            ctx.fillStyle = "#0F0";
            ctx.font = font_size + "px monospace";
            for (let i = 0; i < drops.length; i++) {
              const text = chars[Math.floor(Math.random() * chars.length)];
              ctx.fillText(text, i * font_size, drops[i] * font_size);
              if (drops[i] * font_size > c.height && Math.random() > 0.975) drops[i] = 0;
              drops[i]++;
            }
          }
          setInterval(draw, 33);
        }
      `
    }
  },
  {
    id: uuid(),
    name: "Sticky Glass Navbar",
    category: "UI",
    rarity: "Rare",
    tech_stack: ["Backdrop"],
    visual_style: "Glass",
    description: "A responsive navigation bar that stays fixed at the top with a blur effect.",
    code: {
      html: `
        <nav class="glass-nav">
          <div class="logo">BRAND</div>
          <div class="links">
            <a href="#">Work</a>
            <a href="#">About</a>
            <a href="#" class="cta">Connect</a>
          </div>
        </nav>
      `,
      css: `
        .glass-nav {
          position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
          width: 90%; max-width: 1200px;
          display: flex; justify-content: space-between; align-items: center;
          padding: 1rem 2rem;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 100px;
          z-index: 1000;
        }
        .glass-nav .logo { font-weight: bold; font-size: 1.2rem; color: var(--text-primary, #fff); }
        .glass-nav .links a { margin-left: 2rem; text-decoration: none; color: var(--text-secondary, #ccc); transition: 0.3s; }
        .glass-nav .links a:hover { color: var(--text-primary, #fff); }
        .glass-nav .links .cta { background: var(--accent-primary, #fff); color: #000 !important; padding: 0.5rem 1.5rem; border-radius: 50px; font-weight: bold; }
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Hero: Split Screen",
    category: "UI",
    rarity: "Common",
    tech_stack: ["Flexbox"],
    visual_style: "Modern",
    description: "Classic hero section with text on left, image on right.",
    code: {
      html: `
        <section class="hero-split">
          <div class="hero-text">
            <h1>Design the Future</h1>
            <p>Build faster, iterate stronger, and ship your dreams with our platform.</p>
            <button class="btn-primary">Get Started</button>
          </div>
          <div class="hero-visual">
            <div class="placeholder-box">Visual Asset</div>
          </div>
        </section>
      `,
      css: `
        .hero-split {
          display: flex; align-items: center; justify-content: space-between;
          min-height: 80vh; padding: 4rem 10%;
          gap: 4rem;
        }
        .hero-text { flex: 1; }
        .hero-text h1 { font-size: 3.5rem; line-height: 1.1; margin-bottom: 1.5rem; color: var(--text-primary); }
        .hero-text p { font-size: 1.2rem; color: var(--text-secondary); margin-bottom: 2rem; max-width: 500px; }
        .hero-visual { flex: 1; height: 400px; background: var(--bg-secondary); border-radius: var(--radius, 12px); display: flex; align-items: center; justify-content: center; }
        .btn-primary { background: var(--accent-primary, blue); color: white; padding: 12px 24px; border: none; border-radius: var(--radius, 4px); font-size: 1rem; cursor: pointer; }
        @media (max-width: 768px) { .hero-split { flex-direction: column; text-align: center; } }
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Feature Grid (3-Col)",
    category: "UI",
    rarity: "Common",
    tech_stack: ["Grid"],
    visual_style: "Clean",
    description: "A standard 3-column grid to showcase product features.",
    code: {
      html: `
        <section class="feature-grid">
           <div class="feature-card">
              <div class="icon">⚡</div>
              <h3>Fast Performance</h3>
              <p>Optimized for speed and efficiency.</p>
           </div>
           <div class="feature-card">
              <div class="icon">🛡️</div>
              <h3>Secure by Default</h3>
              <p>Enterprise grade security built in.</p>
           </div>
           <div class="feature-card">
              <div class="icon">🎨</div>
              <h3>Customizable</h3>
              <p>Make it truly yours with themes.</p>
           </div>
        </section>
      `,
      css: `
        .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; padding: 4rem 10%; }
        .feature-card { padding: 2rem; background: var(--bg-secondary); border-radius: var(--radius); text-align: center; border: 1px solid rgba(255,255,255,0.05); }
        .feature-card .icon { font-size: 3rem; margin-bottom: 1rem; }
        .feature-card h3 { margin-bottom: 0.5rem; color: var(--text-primary); }
        .feature-card p { color: var(--text-secondary); font-size: 0.9rem; }
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Testimonial Slider",
    category: "UI",
    rarity: "Uncommon",
    tech_stack: ["Flex", "Scroll"],
    visual_style: "Card",
    description: "Horizontal scrolling testimonials.",
    code: {
      html: `
        <section class="testimonials">
          <div class="t-card">"The best tool I've ever used." <br><span>- Jane D.</span></div>
          <div class="t-card">"Incredible performance boost." <br><span>- John S.</span></div>
          <div class="t-card">"A game changer for our team." <br><span>- Mike R.</span></div>
        </section>
      `,
      css: `
        .testimonials { display: flex; gap: 20px; overflow-x: auto; padding: 2rem 5%; scroll-snap-type: x mandatory; }
        .t-card { min-width: 300px; padding: 2rem; background: var(--bg-secondary); border-radius: var(--radius); scroll-snap-align: center; font-style: italic; color: var(--text-primary); border-left: 4px solid var(--accent-primary); }
        .t-card span { display: block; margin-top: 1rem; font-weight: bold; color: var(--text-secondary); font-style: normal; }
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Stats Row",
    category: "UI",
    rarity: "Common",
    tech_stack: ["Flex"],
    visual_style: "Big Type",
    description: "Display impressive numbers horizontally.",
    code: {
      html: `
        <div class="stats-row">
           <div class="stat"><span>10k+</span>Users</div>
           <div class="stat"><span>99%</span>Uptime</div>
           <div class="stat"><span>500+</span>Components</div>
        </div>
      `,
      css: `
        .stats-row { display: flex; justify-content: space-around; padding: 4rem 0; background: var(--bg-secondary); margin: 2rem 0; flex-wrap: wrap; }
        .stat { text-align: center; color: var(--text-secondary); font-size: 1rem; }
        .stat span { display: block; font-size: 3.5rem; font-weight: 800; color: var(--accent-primary); line-height: 1; margin-bottom: 0.5rem; }
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "CTA Section",
    category: "UI",
    rarity: "Common",
    tech_stack: ["Gradient"],
    visual_style: "Bold",
    description: "A high-impact Call to Action block.",
    code: {
      html: `
        <section class="cta-block">
           <h2>Ready to start building?</h2>
           <p>Join thousands of developers today.</p>
           <button>Get Started Now</button>
        </section>
      `,
      css: `
        .cta-block { text-align: center; padding: 5rem 2rem; background: linear-gradient(135deg, var(--bg-secondary), var(--bg-primary)); border-radius: var(--radius); margin: 4rem 5%; border: 1px solid var(--accent-primary); }
        .cta-block h2 { font-size: 2.5rem; margin-bottom: 1rem; color: var(--text-primary); }
        .cta-block button { padding: 15px 30px; font-size: 1.2rem; background: var(--accent-primary); color: white; border: none; border-radius: 50px; cursor: pointer; margin-top: 2rem; transition: transform 0.2s; }
        .cta-block button:hover { transform: scale(1.05); }
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Pricing Table: Triple",
    category: "UI",
    rarity: "Uncommon",
    tech_stack: ["Flexbox"],
    visual_style: "Clean",
    description: "Three pricing cards with center highlighted.",
    code: {
      html: `
        <section class="pricing-grid">
          <div class="price-card">
            <h3>Starter</h3>
            <div class="price">$0</div>
            <ul><li>1 Project</li><li>Community Support</li></ul>
            <button>Free</button>
          </div>
          <div class="price-card popular">
            <div class="badge">POPULAR</div>
            <h3>Pro</h3>
            <div class="price">$29</div>
            <ul><li>Unlimited Projects</li><li>Priority Support</li></ul>
            <button>Go Pro</button>
          </div>
          <div class="price-card">
            <h3>Enterprise</h3>
            <div class="price">$99</div>
            <ul><li>Custom Solutions</li><li>24/7 Support</li></ul>
            <button>Contact</button>
          </div>
        </section>
      `,
      css: `
        .pricing-grid { display: flex; gap: 2rem; justify-content: center; align-items: center; padding: 4rem 2rem; flex-wrap: wrap; }
        .price-card {
          background: var(--bg-secondary, #f4f4f4); padding: 2rem; border-radius: var(--radius, 12px);
          width: 300px; text-align: center; color: var(--text-primary); position: relative;
          border: 1px solid transparent;
        }
        .price-card.popular { border: 2px solid var(--accent-primary, blue); transform: scale(1.05); }
        .price-card .badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--accent-primary, blue); color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: bold; }
        .price { font-size: 3rem; font-weight: bold; margin: 1rem 0; }
        .price-card ul { list-style: none; padding: 0; margin-bottom: 2rem; color: var(--text-secondary); }
        .price-card button { width: 100%; padding: 10px; background: var(--bg-primary); border: 1px solid var(--text-primary); cursor: pointer; border-radius: var(--radius, 4px); }
        .price-card.popular button { background: var(--accent-primary); color: white; border: none; }
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Masonry Gallery",
    category: "UI",
    rarity: "Uncommon",
    tech_stack: ["Columns"],
    visual_style: "Modern",
    description: "Pinterest-style masonry layout for images.",
    code: {
      html: `
        <div class="masonry">
          <div class="item" style="height: 200px; background: #ccc;"></div>
          <div class="item" style="height: 300px; background: #bbb;"></div>
          <div class="item" style="height: 150px; background: #aaa;"></div>
          <div class="item" style="height: 250px; background: #999;"></div>
          <div class="item" style="height: 200px; background: #888;"></div>
          <div class="item" style="height: 350px; background: #777;"></div>
        </div>
      `,
      css: `
        .masonry { column-count: 3; column-gap: 1rem; padding: 2rem; }
        .item { break-inside: avoid; margin-bottom: 1rem; border-radius: var(--radius, 8px); width: 100%; transition: transform 0.3s; }
        .item:hover { transform: scale(1.02); }
        @media (max-width: 768px) { .masonry { column-count: 2; } }
        @media (max-width: 480px) { .masonry { column-count: 1; } }
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "FAQ Accordion",
    category: "UI",
    rarity: "Common",
    tech_stack: ["HTML Details"],
    visual_style: "Clean",
    description: "Accessible collapsible FAQ sections.",
    code: {
      html: `
        <div class="faq-section">
          <h2>Frequently Asked</h2>
          <details>
            <summary>How does this work?</summary>
            <p>Magic and code combined.</p>
          </details>
          <details>
            <summary>Is it free?</summary>
            <p>Yes, totally free forever.</p>
          </details>
          <details>
            <summary>Can I export?</summary>
            <p>Absolutely. Click download.</p>
          </details>
        </div>
      `,
      css: `
        .faq-section { max-width: 600px; margin: 0 auto; padding: 2rem; }
        .faq-section h2 { margin-bottom: 2rem; text-align: center; color: var(--text-primary); }
        details {
          background: var(--bg-secondary); margin-bottom: 10px; border-radius: var(--radius, 8px);
          overflow: hidden;
        }
        summary { padding: 15px; cursor: pointer; font-weight: bold; color: var(--text-primary); list-style: none; }
        details[open] summary { border-bottom: 1px solid rgba(0,0,0,0.1); }
        details p { padding: 15px; color: var(--text-secondary); margin: 0; }
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Mega Footer",
    category: "UI",
    rarity: "Common",
    tech_stack: ["Grid"],
    visual_style: "Solid",
    description: "A 4-column footer with links and a newsletter signup.",
    code: {
      html: `
        <footer class="mega-footer">
          <div class="col">
            <h3>Brand</h3>
            <p>Building the next generation.</p>
          </div>
          <div class="col">
            <h4>Product</h4>
            <a href="#">Features</a>
            <a href="#">Pricing</a>
          </div>
          <div class="col">
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Careers</a>
          </div>
          <div class="col">
            <h4>Stay Updated</h4>
            <input type="email" placeholder="Email...">
            <button>Subscribe</button>
          </div>
        </footer>
      `,
      css: `
        .mega-footer {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 3rem;
          padding: 4rem 10%; background: var(--bg-secondary, #111); color: var(--text-primary, #fff);
        }
        .col h3, .col h4 { margin-bottom: 1rem; color: var(--text-primary); }
        .col a { display: block; margin-bottom: 0.5rem; text-decoration: none; color: var(--text-secondary); }
        .col a:hover { color: var(--accent-primary); }
        .col input { width: 100%; padding: 8px; margin-bottom: 8px; border-radius: 4px; border: 1px solid #333; }
        .col button { width: 100%; padding: 8px; background: var(--accent-primary, blue); color: white; border: none; border-radius: 4px; cursor: pointer; }
      `,
      js: ``
    }
  },
  {
    id: uuid(),
    name: "Contact Floating",
    category: "UI",
    rarity: "Uncommon",
    tech_stack: ["CSS"],
    visual_style: "Material",
    description: "A clean contact form with floating labels.",
    code: {
      html: `
        <form class="contact-float">
          <div class="group"><input type="text" required><label>Name</label></div>
          <div class="group"><input type="email" required><label>Email</label></div>
          <div class="group"><textarea required></textarea><label>Message</label></div>
          <button type="button">Send Message</button>
        </form>
      `,
      css: `
        .contact-float { max-width: 400px; margin: 0 auto; padding: 2rem; }
        .group { position: relative; margin-bottom: 1.5rem; }
        .group input, .group textarea { width: 100%; padding: 10px; background: transparent; border: none; border-bottom: 2px solid var(--text-secondary); color: var(--text-primary); font-size: 1rem; }
        .group input:focus, .group textarea:focus { outline: none; border-bottom-color: var(--accent-primary); }
        .group label { position: absolute; top: 10px; left: 0; color: var(--text-secondary); transition: 0.2s; pointer-events: none; }
        .group input:focus ~ label, .group input:valid ~ label, .group textarea:focus ~ label, .group textarea:valid ~ label { top: -20px; font-size: 0.8rem; color: var(--accent-primary); }
        button { background: var(--accent-primary); color: white; border: none; padding: 12px 24px; width: 100%; border-radius: var(--radius, 4px); cursor: pointer; }
      `,
      js: ``
    }
  }
];