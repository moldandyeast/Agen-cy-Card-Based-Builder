import React from 'react';
import { CardData, RARITY_COLORS } from '../types';
import { X, Check, Code, Info, Zap } from 'lucide-react';

interface Props {
  card: CardData;
  isSelected: boolean;
  onToggleSelect: () => void;
  onClose: () => void;
}

export const CardDetailModal: React.FC<Props> = ({ card, isSelected, onToggleSelect, onClose }) => {
  const rarityColor = RARITY_COLORS[card.rarity].split(' ')[0].replace('border-', 'text-');
  
  const srcDoc = `
    <html>
      <head>
        <style>
          body { margin: 0; display: flex; align-items: center; justify-content: center; height: 100vh; background: transparent; overflow: hidden; }
          /* Reset scale for full view */
          ${card.code.css}
        </style>
      </head>
      <body>
        ${card.code.html}
        <script>
          ${card.code.js}
        </script>
      </body>
    </html>
  `;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 animate-pop">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl h-full max-h-[90vh] bg-gray-900 rounded-[2.5rem] overflow-hidden flex flex-col border border-gray-800 shadow-2xl">
        
        {/* Header Actions */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between z-20 pointer-events-none">
          <button 
            onClick={onClose}
            className="pointer-events-auto bg-black/40 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/20 transition-colors"
          >
            <X size={24} />
          </button>
          
          <div className="pointer-events-auto flex gap-2">
            <span className={`px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-sm font-bold ${rarityColor}`}>
              {card.rarity}
            </span>
          </div>
        </div>

        {/* Live Preview Area */}
        <div className="flex-1 relative bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 to-gray-950">
          <iframe 
            srcDoc={srcDoc}
            className="w-full h-full border-none"
            title="Full Preview"
            sandbox="allow-scripts"
          />
        </div>

        {/* Bottom Drawer Info */}
        <div className="bg-gray-900/95 backdrop-blur-xl border-t border-gray-800 p-8 flex flex-col md:flex-row gap-8 items-start md:items-center">
          
          <div className="flex-1 space-y-2">
            <h2 className="text-3xl font-bold text-white">{card.name}</h2>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Code size={14} />
              <span>{card.tech_stack.join(' • ')}</span>
            </div>
            <p className="text-gray-400 max-w-lg text-sm leading-relaxed mt-2">
              {card.description}
            </p>
          </div>

          {/* Action Button */}
          <button 
            onClick={onToggleSelect}
            className={`
              flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all transform active:scale-95
              ${isSelected 
                ? 'bg-snap-yellow text-black shadow-[0_0_20px_rgba(255,252,0,0.4)]' 
                : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'}
            `}
          >
            {isSelected ? (
              <>
                <div className="bg-black text-snap-yellow rounded-full p-1"><Check size={16} strokeWidth={4} /></div>
                Selected
              </>
            ) : (
              <>
                <div className="border-2 border-white/30 rounded-full w-6 h-6"></div>
                Add to Build
              </>
            )}
          </button>

        </div>

      </div>
    </div>
  );
};