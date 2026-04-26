import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckSquare, Square, BrainCircuit, Loader2 } from 'lucide-react';
import { getReadinessGuidance } from '../services/geminiService';

const checklistItems = [
  { id: 'epic', label: "I possess a valid Voter ID (EPIC) card." },
  { id: 'roll', label: "I have verified my name on the electoral roll online." },
  { id: 'booth', label: "I know the exact location of my assigned polling booth." },
  { id: 'evm', label: "I understand how to operate the EVM and check the VVPAT slip." },
  { id: 'candidate', label: "I have researched the candidates in my constituency." }
];

export default function VoterReadiness() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [guidance, setGuidance] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('voterReadiness');
    if (saved) setCheckedItems(JSON.parse(saved));
  }, []);

  const toggleItem = (id: string) => {
    const newItems = { ...checkedItems, [id]: !checkedItems[id] };
    setCheckedItems(newItems);
    localStorage.setItem('voterReadiness', JSON.stringify(newItems));
    setGuidance(null);
  };

  const calculateScore = () => {
    const truthy = Object.values(checkedItems).filter(Boolean).length;
    return Math.round((truthy / checklistItems.length) * 100);
  };

  const handleAnalyze = async () => {
    setLoading(true);
    const missing = checklistItems.filter(item => !checkedItems[item.id]).map(item => item.label);
    
    try {
      const result = await getReadinessGuidance(missing);
      setGuidance(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="readiness" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] uppercase tracking-widest font-bold mb-6">
              Voter Checklist
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter">
              Am I Ready To Vote?
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Run this diagnostic to ensure all protocols are satisfied before approaching the polling station. Your readiness score is saved locally.
            </p>

            <div className="space-y-4 mb-8">
              {checklistItems.map(item => {
                const isChecked = !!checkedItems[item.id];
                return (
                  <div 
                    key={item.id} 
                    onClick={() => toggleItem(item.id)}
                    className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-colors border ${isChecked ? 'bg-cyan-500/5 border-cyan-500/30' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
                  >
                    {isChecked ? <CheckSquare className="w-6 h-6 text-cyan-400" /> : <Square className="w-6 h-6 text-slate-500" />}
                    <span className={`font-medium ${isChecked ? 'text-white' : 'text-slate-400'}`}>{item.label}</span>
                  </div>
                )
              })}
            </div>

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-wide text-xs transition-all hover:bg-cyan-400 flex items-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <BrainCircuit className="w-4 h-4" />}
              Analyze Deficiencies via AI
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 rounded-3xl blur-[80px] -z-10" />
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
              
              <div className="text-center mb-8 pb-8 border-b border-white/10">
                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-4">Diagnostic Score</div>
                <div className="text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  {calculateScore()}%
                </div>
              </div>

              <div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-4">AI Guidance Terminal</div>
                <div className="min-h-[150px] bg-black/40 rounded-xl p-6 font-mono text-sm leading-relaxed border border-white/5 relative overflow-hidden">
                   {guidance ? (
                     <motion.p 
                       initial={{ opacity: 0 }} 
                       animate={{ opacity: 1 }} 
                       className="text-cyan-100 relative z-10"
                     >
                       {guidance}
                     </motion.p>
                   ) : (
                     <div className="flex h-full items-center justify-center text-slate-600 italic">
                        Select items and click Analyze to receive personalized directives.
                     </div>
                   )}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
