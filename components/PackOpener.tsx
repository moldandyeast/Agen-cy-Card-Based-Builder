import React, { useState, useEffect } from 'react';
import { CardData } from '../types';
import { generatePack } from '../services/geminiService';
import { CardComponent } from './CardComponent';
import { X, Box, Sparkles, Loader2, ArrowRight } from 'lucide-react';

interface Props {
  onOpenPack: (cards: CardData[]) => void;
  onClose: () => void;
}

export const PackOpener: React.FC<Props> = ({ onOpenPack, onClose }) => {
  const [status, setStatus] = useState<'IDLE' | 'OPENING' | 'REVEALED'>('IDLE');
  const [cards, setCards] = useState<CardData[]>([]);

  // Simulate a ritual opening
  const openPack = async () => {
    setStatus('OPENING');
    try {
      const generated = await generatePack();
      // Artificial delay for dramatic effect
      setTimeout(() => {
          setCards(generated);
          onOpenPack(generated);
          setStatus('REVEALED');
      }, 1500);
    } catch (e) {
      console.error(e);
      setStatus('IDLE');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-3xl animate-fade-in">
      
      <button 
        onClick={onClose} 
        className="absolute top-8 right-8 text-zinc-500 hover:text-white transition-colors z-50"
      >
        <X size={32} strokeWidth={1} />
      </button>

      <div className="w-full max-w-7xl px-8 h-full flex flex-col items-center justify-center relative">
        
        {/* STATE: IDLE (THE PACK) */}
        {status === 'IDLE' && (
           <div className="flex flex-col items-center animate-slide-up">
              <button 
                onClick={openPack}
                className="group relative w-64 h-80 bg-gradient-to-br from-zinc-800 to-black rounded-xl border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden hover:scale-105 hover:shadow-orange-500/20 transition-all duration-500"
              >
                  {/* Holographic sheen */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
                  
                  <div className="flex flex-col items-center gap-6 relative z-10">
                      <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.4)] group-hover:shadow-[0_0_50px_rgba(249,115,22,0.6)] transition-shadow">
                          <Box size={32} className="text-black" />
                      </div>
                      <div className="text-center">
                          <h2 className="text-2xl font-bold text-white tracking-tight">Standard Pack</h2>
                          <p className="text-sm text-zinc-500 mt-2 font-mono">5 Components Included</p>
                      </div>
                  </div>
              </button>
              <p className="mt-8 text-zinc-500 font-mono text-xs uppercase tracking-widest">Click to Unbox</p>
           </div>
        )}

        {/* STATE: OPENING (LOADING) */}
        {status === 'OPENING' && (
            <div className="flex flex-col items-center justify-center">
                 <div className="relative">
                    <div className="absolute inset-0 bg-orange-500 blur-3xl opacity-20 rounded-full animate-pulse"></div>
                    <Loader2 size={64} className="text-white animate-spin relative z-10" />
                 </div>
                 <h3 className="mt-8 text-2xl font-light text-white tracking-widest uppercase animate-pulse">Forging Assets...</h3>
            </div>
        )}

        {/* STATE: REVEALED (THE CARDS) */}
        {status === 'REVEALED' && (
           <div className="w-full flex flex-col items-center">
              
              <div className="mb-12 text-center animate-fade-in">
                  <h2 className="text-3xl font-bold text-white mb-2">Acquisition Complete</h2>
                  <p className="text-zinc-400">5 new assets added to your library.</p>
              </div>

              {/* Grid Layout - Solves the "weird" side scroll issue */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full max-w-6xl place-items-center">
                 {cards.map((card, idx) => (
                    <div 
                        key={card.id} 
                        className="w-full animate-slide-up" 
                        style={{ animationDelay: `${idx * 100}ms` }}
                    >
                        <CardComponent card={card} />
                    </div>
                 ))}
              </div>

              <div className="mt-16 flex gap-4 animate-fade-in" style={{ animationDelay: '600ms' }}>
                 <button 
                    onClick={onClose}
                    className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-colors"
                 >
                    Return to Studio
                 </button>
                 <button 
                    onClick={() => { setStatus('IDLE'); }}
                    className="px-8 py-3 border border-white/20 text-white font-bold rounded-lg hover:bg-white/5 transition-colors"
                 >
                    Open Another
                 </button>
              </div>
           </div>
        )}

      </div>
    </div>
  );
};