import React, { useState } from 'react';
import { CardData } from '../types';
import { forgeComponent } from '../services/geminiService';
import { CardComponent } from './CardComponent';
import { X, Hammer, ArrowRight, Loader2 } from 'lucide-react';

interface Props {
  onCardForged: (card: CardData) => void;
  onClose: () => void;
}

export const CardForge: React.FC<Props> = ({ onCardForged, onClose }) => {
  const [prompt, setPrompt] = useState("");
  const [status, setStatus] = useState<'IDLE' | 'FORGING' | 'COMPLETE'>('IDLE');
  const [newCard, setNewCard] = useState<CardData | null>(null);

  const handleForge = async () => {
    if (!prompt.trim()) return;
    setStatus('FORGING');
    try {
        const card = await forgeComponent(prompt);
        setNewCard(card);
        onCardForged(card);
        setStatus('COMPLETE');
    } catch (e) {
        console.error(e);
        setStatus('IDLE');
    }
  };

  return (
    <div className="w-full h-full bg-black/95 backdrop-blur-xl flex flex-col relative animate-fade-in p-6 sm:p-12">
      
      <button 
        onClick={onClose} 
        className="absolute top-6 left-6 text-white bg-white/10 p-2 rounded-full z-50 hover:bg-white/20"
      >
        <X size={24} />
      </button>

      <div className="flex-1 max-w-2xl mx-auto w-full flex flex-col justify-center">
        
        {status === 'IDLE' && (
           <div className="space-y-6 animate-slide-up">
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-500/20">
                    <Hammer size={32} className="text-white" />
                 </div>
                 <div>
                    <h2 className="text-3xl font-bold text-white">Component Forge</h2>
                    <p className="text-zinc-400">Fabricate a specific sandbox element.</p>
                 </div>
              </div>

              <div className="relative">
                 <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe exactly what you need (e.g., 'A cyberpunk countdown timer with neon borders' or 'A minimalistic React login form')..."
                    className="w-full bg-studio-panel border border-white/10 rounded-2xl p-6 text-lg text-white placeholder-zinc-600 outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all h-40 resize-none shadow-inner"
                    autoFocus
                 />
              </div>

              <div className="flex justify-end">
                 <button 
                    onClick={handleForge}
                    disabled={!prompt.trim()}
                    className={`
                       px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-all
                       ${prompt.trim() 
                         ? 'bg-white text-black hover:bg-orange-400 hover:text-white hover:scale-105 shadow-xl' 
                         : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'}
                    `}
                 >
                    <span>Initiate Forge</span>
                    <ArrowRight size={20} strokeWidth={3} />
                 </button>
              </div>
           </div>
        )}

        {status === 'FORGING' && (
           <div className="flex flex-col items-center justify-center gap-6 text-center">
              <div className="relative">
                 <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full"></div>
                 <Loader2 size={64} className="text-orange-500 animate-spin relative z-10" />
              </div>
              <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Forging Asset...</h3>
                  <p className="text-zinc-500 font-mono">Compiling {prompt.substring(0, 20)}...</p>
              </div>
           </div>
        )}

        {status === 'COMPLETE' && newCard && (
           <div className="flex flex-col items-center animate-pop">
              <div className="mb-8 text-center">
                 <h2 className="text-2xl font-bold text-white mb-2">Fabrication Complete</h2>
                 <p className="text-zinc-400">Added to your library.</p>
              </div>
              
              <div className="transform scale-125 mb-12">
                 <CardComponent card={newCard} />
              </div>

              <div className="flex gap-4">
                 <button 
                   onClick={onClose}
                   className="px-8 py-3 bg-zinc-800 text-white rounded-lg font-bold hover:bg-zinc-700"
                 >
                   Close
                 </button>
                 <button 
                   onClick={() => { setStatus('IDLE'); setPrompt(''); }}
                   className="px-8 py-3 bg-white text-black rounded-lg font-bold hover:bg-orange-400 hover:text-white"
                 >
                   Forge Another
                 </button>
              </div>
           </div>
        )}

      </div>
    </div>
  );
};