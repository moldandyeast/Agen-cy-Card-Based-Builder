import React from 'react';
import { CardData } from '../types';
import { Download, Loader2, RefreshCcw, Sparkles, ExternalLink } from 'lucide-react';

interface Props {
  selectedCards: CardData[];
  prompt: string;
  setPrompt: (s: string) => void;
  onGenerate: () => void;
  loading: boolean;
  htmlContent?: string;
}

export const SiteAssembler: React.FC<Props> = ({ loading, htmlContent }) => {
  
  const handleDownload = () => {
    if (!htmlContent) return;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); 
    a.href = url; 
    a.download = 'agency_site.html';
    document.body.appendChild(a); 
    a.click(); 
    document.body.removeChild(a);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      
      {/* BROWSER FRAME */}
      <div className="w-full h-full max-w-6xl bg-studio-panel rounded-xl shadow-2xl border border-studio-border flex flex-col overflow-hidden relative group">
        
        {/* Browser Chrome */}
        <div className="h-12 bg-studio-bg/50 border-b border-white/5 flex items-center px-4 gap-4 shrink-0 backdrop-blur-md justify-between">
          
          {/* Traffic Lights */}
          <div className="flex gap-2 w-20">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-sm"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-sm"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-sm"></div>
          </div>
          
          {/* Address Bar */}
          <div className="flex-1 flex justify-center max-w-lg">
            <div className="w-full bg-black/20 rounded-md px-4 py-1.5 flex items-center gap-2 justify-center text-xs text-slate-400 font-medium group-hover:bg-black/30 transition-colors cursor-default border border-white/5">
              <span className="text-slate-600">https://</span>
              <span className="text-slate-300">agency.build</span>
              <span className="text-slate-600">/preview</span>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-2 w-20 justify-end">
             <button 
                onClick={handleDownload}
                disabled={!htmlContent}
                className={`
                    flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all
                    ${htmlContent 
                        ? 'bg-white text-black hover:bg-zinc-200 shadow-lg hover:shadow-white/10 active:scale-95 cursor-pointer' 
                        : 'bg-white/5 text-zinc-600 cursor-not-allowed'}
                `}
                title="Download HTML File"
            >
                <Download size={14} strokeWidth={2.5}/>
                <span>Export</span>
            </button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 relative bg-[#050505]">
           {loading && (
             <div className="absolute inset-0 z-20 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                <div className="relative">
                    <div className="absolute inset-0 bg-white/20 blur-xl rounded-full"></div>
                    <Loader2 className="animate-spin mb-4 text-white relative z-10" size={48} />
                </div>
                <span className="font-mono text-sm animate-pulse tracking-widest uppercase text-zinc-400">Forging Agency Site...</span>
             </div>
           )}

           {htmlContent ? (
            <iframe 
              srcDoc={htmlContent}
              className="w-full h-full border-none bg-white"
              sandbox="allow-scripts allow-modals"
              title="Preview"
            />
           ) : (
             <div className="absolute inset-0 flex flex-col items-center justify-center opacity-30 select-none pointer-events-none">
                <div className="w-32 h-32 rounded-full bg-white/5 blur-3xl absolute"></div>
                <div className="relative z-10 flex flex-col items-center">
                    <Sparkles size={48} className="text-zinc-500 mb-4" strokeWidth={1} />
                    <h3 className="text-2xl font-light text-zinc-400 tracking-tight">Canvas Ready</h3>
                    <p className="text-zinc-600 mt-2 text-sm">Select cards and describe your vision below.</p>
                </div>
             </div>
           )}
        </div>
      </div>
      
    </div>
  );
};