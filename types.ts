export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Legendary' | 'Ancient';
export type Category = 'UI' | 'Theme' | 'Voice';
export type CardId = string;

export interface CardCode {
  html: string;
  css: string;
  js: string;
}

export interface CardData {
  id: CardId;
  name: string;
  category: Category;
  rarity: Rarity;
  tech_stack: string[];
  code: CardCode;
  visual_style: string;
  description: string;
}

export const RARITY_COLORS: Record<Rarity, string> = {
  Common: 'border-slate-400 shadow-slate-500/10 text-slate-400',
  Uncommon: 'border-emerald-500 shadow-emerald-500/20 text-emerald-400',
  Rare: 'border-blue-500 shadow-blue-500/30 text-blue-400',
  Legendary: 'border-amber-500 shadow-amber-500/40 text-amber-400',
  Ancient: 'border-purple-600 shadow-purple-600/50 text-purple-400',
};

export const RARITY_BG: Record<Rarity, string> = {
    Common: 'bg-slate-900',
    Uncommon: 'bg-emerald-950',
    Rare: 'bg-blue-950',
    Legendary: 'bg-amber-950',
    Ancient: 'bg-purple-950',
  };