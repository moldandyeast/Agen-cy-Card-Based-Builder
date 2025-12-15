import React, { useState } from 'react';
import { CardData, CardId, Category } from '../types';
import { CardComponent } from './CardComponent';
import { X, LayoutGrid, Palette, Mic, CheckCircle2 } from 'lucide-react';

interface Props {
  collection: CardData[];
  selectedIds: CardId[]; // Renamed from deck to be generic
  onToggleCard: (cardId: CardId) => void;
  onViewCard: (card: CardData) => void;
  onClose: () => void;
  initialFilter?: Category | 'All';
}

export const LibraryBrowser: React.FC<Props> = ({ 
    collection, 
    selectedIds, 
    onToggleCard, 
    onViewCard, 
    onClose,
    initialFilter = 'All'
}) => {
  const [filter, setFilter] = useState<Category | 'All'>(initialFilter);

  const filteredCollection = collection.filter(c => filter === 'All' || c.category === filter);

  return (
    <div className="fixed inset-0 z-50 bg-[#050505] animate-fade-in flex flex-col">
      
      {/* Header */}
      <div className="h-16 border-b border-white/5 bg-black/50 backdrop-blur-md flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-3">
           <LayoutGrid size={20} className="text-white" />
           <h2 className="text-lg font-bold text-white tracking-wide uppercase">Asset Library</h2>
           <span className="text-xs text-glass-text ml-2 font-mono">
              {filteredCollection.length} / {collection.length}
           </span>
        </div>
        <button 
          onClick={onClose}
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Filter Bar */}
      <div className="h-14 border-b border-white/5 bg-black/20 px-8 flex items-center gap-4 shrink-0 overflow-x-auto no-scrollbar">
        {(['All', 'UI', 'Theme', 'Voice'] as const).map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`
               flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all
               ${filter === cat 
                 ? 'bg-white text-black shadow-lg' 
                 : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}
            `}
          >
            {cat === 'Theme' && <Palette size={12} />}
            {cat === 'Voice' && <Mic size={12} />}
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
           {filteredCollection.map(card => (
             <div key={card.id} className="relative">
                <CardComponent 
                  card={card}
                  selected={selectedIds.includes(card.id)}
                  onToggle={() => onToggleCard(card.id)}
                  onView={() => onViewCard(card)}
                />
                {selectedIds.includes(card.id) && (
                   <div className="absolute -top-2 -right-2 bg-snap-yellow text-black rounded-full p-1 shadow-lg z-30">
                      <CheckCircle2 size={16} />
                   </div>
                )}
             </div>
           ))}
        </div>
        {filteredCollection.length === 0 && (
           <div className="w-full h-full flex items-center justify-center opacity-30">
              <span className="font-mono text-sm uppercase">No assets found in this category</span>
           </div>
        )}
      </div>

    </div>
  );
};