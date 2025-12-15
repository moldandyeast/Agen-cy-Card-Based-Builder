import React from 'react';
import { CardData, RARITY_COLORS } from '../types';
import { Check, Maximize2, Palette, Mic, Layout, Sparkles, Terminal } from 'lucide-react';

interface CardProps {
  card: CardData;
  selected?: boolean;
  onToggle?: () => void;
  onView?: (e: React.MouseEvent) => void;
  mini?: boolean;
}

export const CardComponent: React.FC<CardProps> = ({ card, selected, onToggle, onView, mini }) => {
  
  // Dynamic border coloring based on rarity/category
  const getBorderColor = () => {
    if (selected) return 'border-white ring-1 ring-white shadow-[0_0_20px_rgba(255,255,255,0.2)]';
    switch (card.rarity) {
        case 'Ancient': return 'border-pink-500/50 hover:border-pink-400';
        case 'Legendary': return 'border-amber-500/50 hover:border-amber-400';
        case 'Rare': return 'border-blue-500/50 hover:border-blue-400';
        default: return 'border-white/10 hover:border-white/30';
    }
  };

  const getCategoryIcon = () => {
    switch (card.category) {
      case 'Voice': return <Mic size={12} className={selected ? 'text-black' : 'text-zinc-400'} />;
      case 'Theme': return <Palette size={12} className={selected ? 'text-black' : 'text-zinc-400'} />;
      default: return <Layout size={12} className={selected ? 'text-black' : 'text-zinc-400'} />;
    }
  };

  // Improved Sandboxing scaling
  const srcDoc = `
    <html>
      <head>
        <style>
          body { 
            margin: 0; 
            overflow: hidden; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            height: 100vh; 
            background: transparent; 
            font-family: sans-serif;
          }
          #preview-root { 
            transform: scale(0.4); 
            transform-origin: center; 
            width: 250%; 
            height: 250%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          ${card.code.css}
        </style>
      </head>
      <body>
        <div id="preview-root">${card.code.html}</div>
      </body>
    </html>
  `;

  return (
    <div 
      onClick={onToggle}
      className={`
        relative group cursor-pointer transition-all duration-300 ease-out
        aspect-[3/4] w-full max-w-[240px]
        rounded-xl
        border
        flex flex-col
        overflow-hidden
        bg-[#0a0a0a]
        ${getBorderColor()}
        ${selected ? 'scale-[1.02] -translate-y-1' : 'hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl'}
      `}
    >
      
      {/* Rare/Legendary/Ancient Holographic Effect */}
      {['Rare', 'Legendary', 'Ancient'].includes(card.rarity) && (
        <div className="holo-overlay" />
      )}

      {/* HEADER */}
      <div className={`h-9 px-3 flex items-center justify-between border-b transition-colors ${selected ? 'bg-white border-white' : 'bg-black/40 border-white/5'}`}>
         <div className="flex items-center gap-2 overflow-hidden">
            {getCategoryIcon()}
            <span className={`text-[10px] font-bold uppercase tracking-wider truncate ${selected ? 'text-black' : 'text-zinc-400'}`}>
                {card.category}
            </span>
         </div>
         {selected && <div className="bg-black rounded-full p-0.5"><Check size={10} className="text-white"/></div>}
      </div>

      {/* PREVIEW AREA */}
      <div className="flex-1 relative bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 to-black overflow-hidden">
        
        {/* Render Logic */}
        {card.category === 'UI' || card.category === 'Theme' ? (
           <>
            <iframe 
              title={card.name}
              srcDoc={srcDoc}
              className="w-full h-full pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity"
              sandbox="allow-scripts"
              tabIndex={-1}
            />
            {/* Interaction Shield (prevents iframe capturing clicks) */}
            <div className="absolute inset-0 bg-transparent" />
           </>
        ) : (
           /* VOICE CARDS VISUALIZATION */
           <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative">
             <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
             <Mic size={32} className="text-zinc-700 mb-4" />
             <p className="text-xs text-zinc-400 font-medium italic leading-relaxed z-10">
               "{card.description.substring(0, 60)}..."
             </p>
           </div>
        )}
        
        {/* Fullscreen Hover Button */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all z-20">
            <button 
              onClick={(e) => { e.stopPropagation(); onView && onView(e); }}
              className="p-1.5 rounded-lg bg-black/60 text-white hover:bg-white hover:text-black border border-white/10 backdrop-blur-md transition-colors"
              title="Inspect Code"
            >
              <Maximize2 size={14} />
            </button>
        </div>
      </div>

      {/* FOOTER INFO */}
      <div className="p-3 bg-black/40 border-t border-white/5 backdrop-blur-md">
         <div className="flex justify-between items-start mb-1">
            <h3 className="text-xs font-bold text-zinc-200 leading-tight line-clamp-1">{card.name}</h3>
         </div>
         <div className="flex justify-between items-center">
             <span className="text-[9px] text-zinc-500 font-mono truncate max-w-[60%]">
                 {card.tech_stack[0]}
             </span>
             <span className={`text-[9px] font-bold ${RARITY_COLORS[card.rarity].split(' ')[2]}`}>
                 {card.rarity.toUpperCase()}
             </span>
         </div>
      </div>

    </div>
  );
};