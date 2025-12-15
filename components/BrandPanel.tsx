import React from 'react';
import { CardData, CardId } from '../types';
import { Palette, Mic, Plus, X, Fingerprint } from 'lucide-react';

interface Props {
  activeThemeId: CardId | null;
  activeVoiceIds: CardId[];
  collection: CardData[];
  onRemoveTheme: () => void;
  onRemoveVoice: (id: CardId) => void;
  onOpenLibrary: (category: 'Theme' | 'Voice') => void;
}

export const BrandPanel: React.FC<Props> = ({ 
  activeThemeId, 
  activeVoiceIds, 
  collection, 
  onRemoveTheme, 
  onRemoveVoice,
  onOpenLibrary
}) => {
  
  const activeTheme = collection.find(c => c.id === activeThemeId);
  const activeVoices = collection.filter(c => activeVoiceIds.includes(c.id));

  return (
    <div className="w-72 h-full bg-studio-panel border-l border-studio-border flex flex-col shrink-0 z-20">
      
      {/* Header */}
      <div className="h-12 border-b border-white/5 flex items-center px-4 bg-black/10">
        <Fingerprint size={16} className="text-zinc-500 mr-2" />
        <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Brand DNA</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-8">
        
        {/* THEME SECTION */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
             <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
               <Palette size={12} /> Visual Theme
             </label>
             <span className="text-[10px] text-zinc-600">Single Select</span>
          </div>

          {activeTheme ? (
             <div className="relative group bg-gradient-to-br from-purple-500/10 to-pink-500/5 border border-purple-500/30 rounded-xl p-3 transition-all hover:border-purple-500/50">
                <div className="flex items-center gap-3 mb-2">
                   <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300">
                      <Palette size={16} />
                   </div>
                   <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-zinc-200 truncate">{activeTheme.name}</h4>
                      <p className="text-[10px] text-zinc-500 truncate">{activeTheme.visual_style}</p>
                   </div>
                </div>
                <div className="text-[10px] text-zinc-400 leading-relaxed line-clamp-2">
                   {activeTheme.description}
                </div>
                <button 
                   onClick={onRemoveTheme}
                   className="absolute -top-2 -right-2 bg-zinc-800 text-zinc-400 hover:text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity border border-white/10"
                >
                   <X size={12} />
                </button>
             </div>
          ) : (
            <button 
              onClick={() => onOpenLibrary('Theme')}
              className="w-full h-24 border border-dashed border-zinc-700 rounded-xl flex flex-col items-center justify-center text-zinc-500 hover:text-zinc-300 hover:border-zinc-500 hover:bg-white/5 transition-all gap-2 group"
            >
               <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Plus size={16} />
               </div>
               <span className="text-xs font-medium">Select Theme</span>
            </button>
          )}
        </div>

        {/* VOICE SECTION */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
             <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
               <Mic size={12} /> Tone & Voice
             </label>
             <span className="text-[10px] text-zinc-600">Multi Select</span>
          </div>

          <div className="space-y-2">
             {activeVoices.map(voice => (
               <div key={voice.id} className="relative group bg-gradient-to-br from-orange-500/10 to-amber-500/5 border border-orange-500/30 rounded-lg p-3 flex items-start gap-3">
                  <div className="mt-0.5">
                     <Mic size={14} className="text-orange-400" />
                  </div>
                  <div className="flex-1">
                     <h4 className="text-xs font-bold text-zinc-200">{voice.name}</h4>
                     <p className="text-[10px] text-zinc-500 italic mt-0.5">"{voice.description}"</p>
                  </div>
                  <button 
                     onClick={() => onRemoveVoice(voice.id)}
                     className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-white transition-opacity"
                  >
                     <X size={12} />
                  </button>
               </div>
             ))}

             <button 
               onClick={() => onOpenLibrary('Voice')}
               className="w-full py-3 border border-dashed border-zinc-700 rounded-lg flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:border-zinc-500 hover:bg-white/5 transition-all gap-2"
             >
                <Plus size={14} />
                <span className="text-xs font-medium">Add Voice Layer</span>
             </button>
          </div>
        </div>

      </div>
      
      {/* Footer Info */}
      <div className="p-4 border-t border-white/5 bg-black/20">
         <p className="text-[10px] text-zinc-600 leading-relaxed text-center">
            Drag these cards to the canvas or select from library to define the personality of the generated site.
         </p>
      </div>

    </div>
  );
};