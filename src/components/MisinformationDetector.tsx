import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, CheckCircle, AlertTriangle, Search, Loader2 } from 'lucide-react';
import { checkMisinformation } from '../services/geminiService';

export default function MisinformationDetector() {
  const [claim, setClaim] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleVerify = async () => {
    if (!claim.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await checkMisinformation(claim);
      setResult(res);
    } catch (error: any) {
      alert(error.message || "Failed to verify claim. Module offline.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="verify" className="py-32 relative bg-black">
      <div className="absolute top-0 left-0 w-full h-px bg-white/5" />
      
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] uppercase tracking-widest font-bold mb-6">
            Protocol Security
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
            Misinformation Detector
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Analyze election rumors, claims, or viral messages against verified institutional logic and facts.
          </p>
        </div>

        <div className="bg-white/[0.02] border border-white/10 p-2 rounded-full flex items-center mb-10 max-w-2xl mx-auto backdrop-blur-md shadow-[0_0_30px_rgba(147,51,234,0.1)]">
          <input
            type="text"
            value={claim}
            onChange={(e) => setClaim(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
            placeholder="e.g., Can EVMs be hacked via Bluetooth?"
            className="flex-1 bg-transparent border-none text-white px-6 py-4 focus:outline-none placeholder-slate-600"
          />
          <button
            onClick={handleVerify}
            disabled={loading || !claim.trim()}
            className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-full font-bold uppercase tracking-wide text-xs transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            Analyze
          </button>
        </div>

        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl relative overflow-hidden"
            >
              {/* Verdict Color Indicator */}
              <div className={`absolute top-0 left-0 w-2 h-full ${result.verdict === 'Fact' ? 'bg-green-500' : result.verdict === 'Myth' ? 'bg-red-500' : 'bg-yellow-500'}`} />
              
              <div className="flex items-center gap-4 mb-6">
                {result.verdict === 'Fact' && <CheckCircle className="w-8 h-8 text-green-500" />}
                {result.verdict === 'Myth' && <ShieldAlert className="w-8 h-8 text-red-500" />}
                {result.verdict === 'Partially True' && <AlertTriangle className="w-8 h-8 text-yellow-500" />}
                <h3 className="text-3xl font-bold tracking-tight text-white uppercase">{result.verdict}</h3>
              </div>

              <div className="mb-8">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mb-2">Detailed Analysis</span>
                <p className="text-slate-300 text-lg leading-relaxed">{result.explanation}</p>
              </div>

              <div className="flex flex-col md:flex-row gap-8 border-t border-white/5 pt-8">
                <div className="flex-1">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mb-3">Confidence Level</span>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${result.confidence}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full ${result.confidence > 80 ? 'bg-cyan-400' : 'bg-purple-500'}`}
                    />
                  </div>
                  <div className="text-right mt-2 text-xs font-mono text-cyan-400">{result.confidence}%</div>
                </div>
                
                <div className="flex-1">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mb-3">Keywords Identified</span>
                  <div className="flex flex-wrap gap-2">
                    {result.keywords?.map((kw: string, i: number) => (
                      <span key={i} className="text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-md text-slate-400">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
