import React from 'react';
import { CardData, CardId } from '../types';
import { CardComponent } from './CardComponent';

interface Props {
  collection: CardData[];
  deck: CardId[];
  onViewCard: (card: CardData) => void;
  onToggleCard: (cardId: CardId) => void;
}

export const CollectionView: React.FC<Props> = ({ collection, deck, onViewCard, onToggleCard }) => {
  
  // Sort cards based on the order they appear in the 'deck' array to respect user selection sequence
  const displayOrder = deck
    .map(id => collection.find(c => c.id === id))
    .filter(c => c !== undefined) as CardData[];

  if (displayOrder.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-zinc-600 font-medium uppercase tracking-widest gap-2">
        <span className="text-[10px]">Canvas Empty</span>
        <span className="text-[9px] opacity-50">Add cards from Library (+)</span>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center gap-4 px-4 overflow-x-auto overflow-y-hidden no-scrollbar snap-x snap-mandatory">
      {displayOrder.map((card, index) => (
        <div key={card.id} className="shrink-0 snap-start flex flex-col justify-center h-[90%] py-1 relative group">
           {/* Number Badge for Sequencing */}
           <div className="absolute -top-1 -left-1 w-5 h-5 bg-zinc-800 border border-zinc-700 text-zinc-400 rounded-full flex items-center justify-center text-[9px] font-mono z-20 shadow-lg">
             {index + 1}
           </div>

           <div className="transform origin-center transition-all hover:scale-105 h-full">
            <div className="scale-75 origin-left">
                <CardComponent 
                    card={card} 
                    selected={true} // Always show as selected in the deck view
                    onToggle={() => onToggleCard(card.id)} // Toggling removes it
                    onView={() => onViewCard(card)}
                    mini
                />
            </div>
          </div>
        </div>
      ))}
      <div className="w-8 shrink-0"></div>
    </div>
  );
};