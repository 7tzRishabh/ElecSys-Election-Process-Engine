import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrainCircuit, Loader2, X } from 'lucide-react';
import { explainElectionConcept } from '../services/geminiService';
import Markdown from 'react-markdown';

const ELECTION_STEPS = [
  { 
    id: 1, 
    title: 'Voter Registration', 
    desc: 'Enrolling citizens in the electoral roll.',
    details: [
      'Citizens apply for voter ID',
      'Verification process',
      'Added to electoral roll'
    ]
  },
  { 
    id: 2, 
    title: 'Candidate Nomination', 
    desc: 'Candidates file their papers to run for office.',
    details: [
      'Candidates submit forms',
      'Scrutiny by officials',
      'Final candidate list published'
    ]
  },
  { 
    id: 3, 
    title: 'Campaigning', 
    desc: 'Candidates present their manifestos to the public.',
    details: [
      'Parties promote ideas',
      'Public speeches & debates',
      'Awareness among voters'
    ]
  },
  { 
    id: 4, 
    title: 'Voting Day', 
    desc: 'Citizens cast their votes using EVMs securely.',
    details: [
      'Voters cast vote using EVM',
      'Secure and monitored process',
      'Ink mark for verification'
    ]
  },
  { 
    id: 5, 
    title: 'Vote Counting', 
    desc: 'Votes are tallied under strict supervision.',
    details: [
      'Votes counted in centers',
      'Officials monitor process',
      'Transparency ensured'
    ]
  },
  { 
    id: 6, 
    title: 'Result Declaration', 
    desc: 'The final outcome is officially announced.',
    details: [
      'Results announced officially',
      'Winning candidate declared',
      'Government formation begins'
    ]
  }
];

export default function AnimatedExplainer() {
  const [activeStep, setActiveStep] = useState(ELECTION_STEPS[0]);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleSeek = (step: typeof ELECTION_STEPS[0]) => {
    setActiveStep(step);
  };

  const requestAiExplanation = async (stepTitle: string) => {
    setIsAiLoading(true);
    setAiExplanation(null);
    try {
      const prompt = `Explain the "${stepTitle}" phase of an election deeply. Use the standard structure: ELI5, Step-by-Step, Real-World India Example, and Key Takeaways.`;
      const result = await explainElectionConcept(prompt, "Animated Election Explainer");
      setAiExplanation(result);
    } catch (error) {
      setAiExplanation("Error connecting to AI system. Please try again later.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <section id="video-explainer" className="py-32 relative overflow-hidden bg-black">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] uppercase tracking-widest font-bold mb-6">
            Visual Guide
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
            How Elections Work
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Watch the animated breakdown and track the visual timeline. Use the AI module to deep dive into any specific phase.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start z-10 relative">
          
          {/* Animated Card Container */}
          <div className="relative rounded-[12px] overflow-hidden bg-[#030509] border border-[#1e293b]/50 p-8 lg:p-10 shadow-[0_4px_40px_rgba(0,0,0,0.5)] flex flex-col h-full min-h-[450px] lg:min-h-[550px]">
            <style>{`
              @keyframes starFade {
                0%, 100% { opacity: 0; transform: scale(0.5); }
                50% { opacity: 0.8; transform: scale(1.2); }
              }
            `}</style>
            
            {/* Minimalist Background Container */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              {/* Subtle background glow */}
              <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#082f49] blur-[120px] rounded-full opacity-30 z-1" />
              <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#082f49] blur-[120px] rounded-full opacity-20 z-1" />

              {/* Distant cyan particles */}
              <div className="absolute top-[15%] right-[20%] w-1 h-1 rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8] z-2"
                   style={{ animation: 'starFade 4s ease-in-out infinite' }} />
              <div className="absolute top-[40%] left-[10%] w-0.5 h-0.5 rounded-full bg-[#0ea5e9] shadow-[0_0_5px_#0ea5e9] z-2"
                   style={{ animation: 'starFade 6s ease-in-out infinite 2s' }} />
              <div className="absolute bottom-[20%] right-[30%] w-0.5 h-0.5 rounded-full bg-[#38bdf8] shadow-[0_0_6px_#38bdf8] z-2"
                   style={{ animation: 'starFade 5s ease-in-out infinite 1s' }} />
              <div className="absolute bottom-[10%] left-[40%] w-[1.5px] h-[1.5px] rounded-full bg-[#0ea5e9] shadow-[0_0_8px_#0ea5e9] z-2"
                   style={{ animation: 'starFade 7s ease-in-out infinite 3.5s' }} />
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col h-full flex-1">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeStep.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col h-full justify-between flex-1"
                >
                  <div>
                    <h3 className="text-3xl lg:text-4xl font-extrabold mb-8 tracking-tight bg-gradient-to-br from-white via-white to-[#0284c7] bg-clip-text text-transparent">
                      {activeStep.title}
                    </h3>
                    <ul className="space-y-5">
                      {activeStep.details.map((detail, idx) => (
                        <motion.li 
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + idx * 0.1 }}
                          className="flex items-start text-slate-300 text-base lg:text-lg font-medium leading-snug"
                        >
                          <div className="mt-1.5 mr-4 flex-shrink-0 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full border border-[#38bdf8] bg-transparent shadow-[0_0_8px_rgba(56,189,248,0.4)]" />
                          </div>
                          <span>{detail}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => requestAiExplanation(activeStep.title)}
                    className="self-start mt-8 inline-flex items-center gap-2 group"
                  >
                    <div className="flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#0f172a]/80 border border-[#0284c7]/30 hover:border-[#38bdf8]/60 hover:bg-[#1e293b] text-slate-200 text-sm font-semibold transition-all">
                      <BrainCircuit className="w-4 h-4 text-[#38bdf8] group-hover:text-white transition-colors" />
                      Deep Analysis
                    </div>
                  </button>
                </motion.div>
              </AnimatePresence>

              {/* Progress Status Bar Line */}
              <div className="w-full h-[2px] bg-[#1e293b] mt-8 rounded-full overflow-hidden flex-shrink-0">
                 <motion.div 
                   className="h-full bg-gradient-to-r from-[#0284c7] to-[#38bdf8] shadow-[0_0_10px_#38bdf8]"
                   animate={{ width: `${(activeStep.id / ELECTION_STEPS.length) * 100}%` }}
                   transition={{ ease: "easeInOut", duration: 0.5 }}
                 />
              </div>
            </div>
          </div>

          {/* Sync Timeline */}
          <div className="flex flex-col relative w-full h-[600px]">
             {/* AI Explanation Modal/Overlay */}
             <AnimatePresence>
               {aiExplanation || isAiLoading ? (
                 <motion.div 
                   initial={{ opacity: 0, x: 50 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, scale: 0.95 }}
                   className="absolute inset-0 z-20 bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col h-full shadow-2xl"
                 >
                   <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                     <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                         <BrainCircuit className="w-5 h-5" />
                       </div>
                       <div>
                         <h3 className="font-bold text-white tracking-tight uppercase text-sm">AI Deep Analysis</h3>
                         <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">{activeStep.title}</p>
                       </div>
                     </div>
                     <button 
                       onClick={() => setAiExplanation(null)}
                       className="p-2 rounded-full hover:bg-white/10 text-slate-400 transition-colors"
                     >
                       <X className="w-5 h-5" />
                     </button>
                   </div>
                   
                   <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 text-slate-300 relative">
                     {isAiLoading ? (
                       <div className="absolute inset-0 flex flex-col items-center justify-center text-purple-400">
                         <Loader2 className="w-8 h-8 animate-spin mb-4" />
                         <span className="text-xs uppercase tracking-widest font-bold">Synthesizing Data...</span>
                       </div>
                     ) : (
                       <div className="prose prose-invert prose-sm max-w-none 
                                    prose-headings:text-purple-400 prose-headings:font-bold prose-headings:mt-6 first:prose-headings:mt-0
                                    prose-p:leading-relaxed prose-p:mb-4
                                    prose-ul:my-4 prose-li:my-1
                                    prose-strong:text-white">
                         <Markdown>{aiExplanation || ""}</Markdown>
                       </div>
                     )}
                   </div>
                 </motion.div>
               ) : null}
             </AnimatePresence>

             {/* Steps List */}
             <div className="space-y-4 pl-4 overflow-y-auto custom-scrollbar h-full relative">
               {/* Vertical Connecting Line */}
               <div className="absolute left-9 top-6 bottom-6 w-[2px] bg-white/5 -z-10" />

               {ELECTION_STEPS.map((step, idx) => {
                 const isActive = step.id === activeStep.id;
                 const isPast = step.id <= activeStep.id;
                 
                 return (
                   <motion.div 
                     key={step.id} 
                     className={`relative p-6 rounded-2xl border transition-all cursor-pointer group
                                 ${isActive ? 'bg-white/10 border-purple-500/50 shadow-[0_0_30px_rgba(147,51,234,0.15)]' : 
                                 'bg-white/[0.02] border-white/5 hover:border-white/20'}`}
                     onClick={() => handleSeek(step)}
                     whileHover={{ x: 5 }}
                   >
                     {/* Connector Node */}
                     <div className={`absolute top-1/2 -translate-y-1/2 left-[-1.35rem] w-4 h-4 rounded-full border-4 shadow-xl transition-all duration-300
                                     ${isActive ? 'bg-purple-400 border-purple-900 shadow-[0_0_15px_#a855f7]' : 
                                     isPast ? 'bg-cyan-500 border-cyan-900' : 'bg-slate-700 border-black'}`} />

                     <div className="flex justify-between items-start gap-4">
                       <div>
                         <span className={`text-[10px] uppercase font-bold tracking-widest block mb-1 lg:mb-2 
                                        ${isActive ? 'text-purple-400' : isPast ? 'text-cyan-400' : 'text-slate-600'}`}>
                           Phase {idx + 1}
                         </span>
                         <h4 className={`text-lg lg:text-xl font-bold tracking-tight mb-1 lg:mb-2 ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                           {step.title}
                         </h4>
                         <p className={`text-xs lg:text-sm ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                           {step.desc}
                         </p>
                       </div>
                     </div>
                   </motion.div>
                 )
               })}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
