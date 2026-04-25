import React from 'react';

export default function Footer() {
  return (
    <footer className="z-20 px-8 py-4 flex flex-col md:flex-row items-center justify-between border-t border-white/5 bg-black gap-4 md:gap-0">
      <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-center md:text-left">
        <span className="text-[10px] text-slate-600 uppercase tracking-widest">© 2024 Election Intelligence Agency</span>
        <span className="text-[10px] text-slate-600 uppercase tracking-widest font-mono hidden md:inline">Status: //System_Secure</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        <span className="text-[10px] text-slate-400 font-mono">LIVE_PROTOCOL_V4.2</span>
      </div>
    </footer>
  );
}
