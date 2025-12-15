import React, { useState, useEffect, useCallback } from 'react';
import { CardData, CardId, Category } from './types';
import { INITIAL_STOCK } from './constants';
import { assembleWebsite } from './services/geminiService';
import { PackOpener } from './components/PackOpener';
import { SiteAssembler } from './components/SiteAssembler';
import { CollectionView } from './components/CollectionView';
import { CardDetailModal } from './components/CardDetailModal';
import { LibraryBrowser } from './components/LibraryBrowser';
import { BrandPanel } from './components/BrandPanel';
import { CardForge } from './components/CardForge';
import { Layers, Plus, Hexagon, Grid, Sparkles, Loader2, Play, Hammer, Box, X } from 'lucide-react';

export default function App() {
  const [collection, setCollection] = useState<CardData[]>([]);
  
  // SPLIT STATE
  const [uiDeck, setUiDeck] = useState<CardId[]>([]);
  const [activeThemeId, setActiveThemeId] = useState<CardId | null>(null);
  const [activeVoiceIds, setActiveVoiceIds] = useState<CardId[]>([]);

  const [isPackOpen, setIsPackOpen] = useState(false);
  const [isForgeOpen, setIsForgeOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [libraryFilter, setLibraryFilter] = useState<Category | 'All'>('All');
  
  const [viewingCard, setViewingCard] = useState<CardData | null>(null);
  
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [buildTrigger, setBuildTrigger] = useState(0);

  // Load collection
  useEffect(() => {
    const savedCollection = localStorage.getItem('agency_collection_v2');
    if (savedCollection) {
      setCollection(JSON.parse(savedCollection));
    } else {
      setCollection(INITIAL_STOCK);
      localStorage.setItem('agency_collection_v2', JSON.stringify(INITIAL_STOCK));
    }
  }, []);

  const addToCollection = useCallback((newCards: CardData[]) => {
    setCollection(prev => {
      const updated = [...prev, ...newCards];
      localStorage.setItem('agency_collection_v2', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // MASTER TOGGLE LOGIC
  const toggleCard = (card: CardData) => {
    if (card.category === 'UI') {
        setUiDeck(prev => {
            if (prev.includes(card.id)) return prev.filter(id => id !== card.id);
            if (prev.length >= 5) return prev;
            return [...prev, card.id];
        });
    } else if (card.category === 'Theme') {
        setActiveThemeId(prev => (prev === card.id ? null : card.id));
    } else if (card.category === 'Voice') {
        setActiveVoiceIds(prev => {
            if (prev.includes(card.id)) return prev.filter(id => id !== card.id);
            return [...prev, card.id];
        });
    }
  };

  const isCardSelected = (id: CardId) => {
    return uiDeck.includes(id) || activeThemeId === id || activeVoiceIds.includes(id);
  };

  const getCombinedActiveCards = () => {
    const uiCards = collection.filter(c => uiDeck.includes(c.id));
    const themeCard = activeThemeId ? collection.find(c => c.id === activeThemeId) : null;
    const voiceCards = collection.filter(c => activeVoiceIds.includes(c.id));
    return [...uiCards, ...(themeCard ? [themeCard] : []), ...voiceCards];
  };

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    try { setBuildTrigger(prev => prev + 1); } 
    catch(e) { console.error(e); setIsGenerating(false); }
  };

  const openLibraryWithFilter = (cat: Category | 'All') => {
      setLibraryFilter(cat);
      setIsLibraryOpen(true);
  }

  return (
    <div className="relative h-full w-full flex flex-col font-sans overflow-hidden bg-studio-bg text-zinc-200 selection:bg-white selection:text-black">
      
      {/* 1. HEADER (Glass) */}
      <div className="h-16 px-6 flex items-center justify-between z-30 shrink-0 border-b border-white/5 bg-studio-bg/80 backdrop-blur-md">
        <div className="flex items-center gap-3 select-none">
          <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            <Hexagon size={16} strokeWidth={3} />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold text-white tracking-tight">Agen[+]cy</span>
            <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Architect v2.0</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
            <button 
              onClick={() => openLibraryWithFilter('All')}
              className="h-9 px-4 rounded-lg bg-white/5 border border-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
            >
              <Grid size={14} />
              <span className="hidden sm:inline">Library</span>
            </button>
            
            <div className="w-px h-4 bg-white/10 mx-1"></div>

            <button 
              onClick={() => setIsForgeOpen(true)}
              className="h-9 px-4 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-500 hover:bg-orange-500 hover:text-white transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-wider group"
            >
               <Hammer size={14} className="group-hover:rotate-12 transition-transform" />
               <span>Forge</span>
            </button>
            
            <button 
              onClick={() => setIsPackOpen(true)}
              className="h-9 px-4 rounded-lg bg-white text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-white/5 hover:bg-zinc-200 transition-all flex items-center gap-2"
            >
              <Box size={14} />
              <span>Unbox</span>
            </button>
        </div>
      </div>

      {/* 2. WORKSPACE */}
      <div className="flex-1 flex min-h-0 relative z-10">
          
          {/* Main Canvas */}
          <div className="flex-1 flex flex-col min-w-0 bg-[#050505]">
             <div className="flex-1 relative overflow-hidden">
                <InternalAssemblerWrapper 
                    selectedCards={getCombinedActiveCards()} 
                    prompt={prompt} 
                    trigger={buildTrigger} 
                    onComplete={() => setIsGenerating(false)}
                />
             </div>
             
             {/* FLOATING PROMPT BAR */}
             <div className="shrink-0 z-40 p-6 flex flex-col items-center gap-4 pointer-events-none absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent pt-20">
                
                 {/* Prompt Input */}
                 <div className="pointer-events-auto w-full max-w-2xl relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-zinc-700 via-zinc-400 to-zinc-700 rounded-xl blur opacity-20 group-focus-within:opacity-40 transition duration-700"></div>
                    <div className="relative flex items-center bg-[#0f0f0f] rounded-xl shadow-2xl border border-white/10">
                        <input 
                          type="text"
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                          placeholder="Describe your vision (e.g. 'Minimalist portfolio for a photographer')..."
                          className="flex-1 bg-transparent text-white placeholder-zinc-600 px-5 py-4 outline-none font-medium text-sm"
                        />
                        <button 
                          onClick={handleGenerate}
                          disabled={isGenerating || !prompt}
                          className={`
                            mr-2 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all
                            ${prompt && !isGenerating 
                                ? 'bg-white text-black hover:bg-zinc-200' 
                                : 'bg-white/5 text-zinc-600 cursor-not-allowed'}
                          `}
                        >
                          {isGenerating ? <Loader2 className="animate-spin" size={14}/> : <Play size={14} fill="currentColor" />}
                          <span className="hidden sm:inline">Build</span>
                        </button>
                    </div>
                 </div>

                 {/* Active Deck Strip */}
                 {uiDeck.length > 0 && (
                    <div className="pointer-events-auto flex items-center gap-2 animate-slide-up bg-black/50 backdrop-blur-md rounded-full px-4 py-2 border border-white/5">
                        <span className="text-[10px] uppercase font-bold text-zinc-500 mr-2">Active Stack</span>
                        <div className="flex -space-x-2">
                            {uiDeck.map(id => {
                                const card = collection.find(c => c.id === id);
                                if (!card) return null;
                                return (
                                    <div key={id} className="w-8 h-8 rounded-full border border-zinc-800 bg-zinc-900 flex items-center justify-center text-[8px] overflow-hidden relative shadow-lg">
                                        {/* Simple mini representation */}
                                        <div className="absolute inset-0 bg-white/5"></div>
                                        {card.name.substring(0, 2).toUpperCase()}
                                    </div>
                                )
                            })}
                        </div>
                        <button onClick={() => setUiDeck([])} className="ml-2 p-1 rounded-full hover:bg-white/10 text-zinc-500 hover:text-white transition-colors">
                            <X size={12} />
                        </button>
                    </div>
                 )}
             </div>
          </div>

          {/* RIGHT SIDEBAR (Brand DNA) */}
          <BrandPanel 
             activeThemeId={activeThemeId}
             activeVoiceIds={activeVoiceIds}
             collection={collection}
             onRemoveTheme={() => setActiveThemeId(null)}
             onRemoveVoice={(id) => toggleCard({ id, category: 'Voice' } as any)}
             onOpenLibrary={openLibraryWithFilter}
          />

      </div>

      {/* --- MODALS & OVERLAYS --- */}
      
      {isPackOpen && (
        <PackOpener onOpenPack={addToCollection} onClose={() => setIsPackOpen(false)} />
      )}

      {isForgeOpen && (
        <div className="fixed inset-0 z-50 animate-fade-in bg-black/80 backdrop-blur-sm">
            <CardForge onCardForged={(card) => addToCollection([card])} onClose={() => setIsForgeOpen(false)} />
        </div>
      )}

      {isLibraryOpen && (
        <LibraryBrowser 
          collection={collection}
          selectedIds={[...uiDeck, ...(activeThemeId ? [activeThemeId] : []), ...activeVoiceIds]}
          onToggleCard={(id) => { const card = collection.find(c => c.id === id); if (card) toggleCard(card); }}
          onViewCard={setViewingCard}
          onClose={() => setIsLibraryOpen(false)}
          initialFilter={libraryFilter}
        />
      )}

      {viewingCard && (
        <CardDetailModal 
          card={viewingCard}
          isSelected={isCardSelected(viewingCard.id)}
          onToggleSelect={() => toggleCard(viewingCard)}
          onClose={() => setViewingCard(null)}
        />
      )}

    </div>
  );
}

// Internal Wrapper for async loading
const InternalAssemblerWrapper = ({ selectedCards, prompt, trigger, onComplete }: any) => {
    const [html, setHtml] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (trigger === 0) return; 
        const run = async () => {
            setLoading(true);
            try {
                const res = await assembleWebsite(prompt, selectedCards, html);
                setHtml(res);
            } catch (e) { console.error(e); }
            setLoading(false);
            onComplete();
        };
        run();
    }, [trigger]); 

    return <SiteAssembler selectedCards={selectedCards} prompt={prompt} setPrompt={() => {}} onGenerate={() => {}} loading={loading} htmlContent={html} />;
}