import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Fingerprint, CheckCircle2, Lock, Box, Database, ArrowRight } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Authentication',
    icon: <Fingerprint className="w-8 h-8" />,
    desc: 'The Polling Officer verifies identity using the Electoral Roll and photo ID. Indelible ink is applied.',
    action: 'Verify Voter',
  },
  {
    id: 2,
    title: 'EVM Ballot',
    icon: <Box className="w-8 h-8" />,
    desc: 'Voter presses the button corresponding to the chosen candidate on the Ballot Unit. A beep confirms the cast.',
    action: 'Cast Vote',
  },
  {
    id: 3,
    title: 'VVPAT Verification',
    icon: <CheckCircle2 className="w-8 h-8" />,
    desc: 'A paper slip prints displaying candidate details. It is visible for 7 seconds through a glass window.',
    action: 'Verify Slip',
  },
  {
    id: 4,
    title: 'Strong Room Storage',
    icon: <Lock className="w-8 h-8" />,
    desc: 'EVMs and VVPATs are sealed in presence of party agents and moved to heavily guarded Strong Rooms.',
    action: 'Seal & Store',
  },
  {
    id: 5,
    title: 'Counting & Result',
    icon: <Database className="w-8 h-8" />,
    desc: 'Votes from the Control Unit are digitally aggregated. VVPAT slips are sampled for secondary verification.',
    action: 'Process Tabulation',
  }
];

export default function ElectionSimulator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [vvpatConfirmed, setVvpatConfirmed] = useState(false);

  useEffect(() => {
    if (currentStep !== 2) {
      setVvpatConfirmed(false);
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(curr => curr + 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
  };

  return (
    <section id="simulator" className="py-32 relative bg-[#030303]">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] uppercase tracking-widest font-bold mb-6">
            Interactive Engine
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
            Election Simulator
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Experience the exact sequence of an electoral vote. Follow the protocol from authentication to the final tally.
          </p>
        </div>

        <div className="bg-black border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden">
          {/* Progress Bar Header */}
          <div className="flex justify-between items-center mb-12 relative z-10">
            {steps.map((step, idx) => {
              const isActive = idx === currentStep;
              const isPast = idx < currentStep;
              return (
                <div key={step.id} className="flex flex-col items-center relative z-10 w-full">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${isActive ? 'bg-cyan-500 border-cyan-400 text-black shadow-[0_0_20px_#22d3ee]' : isPast ? 'bg-white/10 border-cyan-400 text-cyan-400' : 'bg-black border-white/20 text-slate-600'}`}>
                    {step.icon}
                  </div>
                  <div className={`text-[10px] font-bold uppercase tracking-widest mt-4 absolute top-14 w-max transition-colors ${isActive ? 'text-cyan-400' : isPast ? 'text-slate-400' : 'text-slate-700'}`}>
                    {step.title}
                  </div>
                </div>
              );
            })}
            {/* Connecting lines */}
            <div className="absolute top-6 left-0 w-full h-[2px] bg-white/10 -z-10">
               <motion.div 
                 className="h-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
                 animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                 transition={{ duration: 0.5, ease: "easeInOut" }}
               />
            </div>
          </div>

          {/* Active Detail View */}
          <div className="mt-20 min-h-[250px] bg-white/[0.02] border border-white/5 rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] scale-150 pointer-events-none">
              {steps[currentStep].icon}
            </div>
            
            <div className="flex-1 w-full z-10 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 w-full">
                <span className="text-cyan-400 font-mono text-xs mb-2 block uppercase tracking-widest">Phase 0{steps[currentStep].id}</span>
                <h3 className="text-3xl font-bold text-white tracking-tight mb-4">{steps[currentStep].title}</h3>
                <p className="text-slate-400 text-lg leading-relaxed">{steps[currentStep].desc}</p>
              </div>

              {currentStep === 2 && (
                <div className="flex-shrink-0 w-full md:w-auto flex justify-center mt-6 md:mt-0 relative perspective-1000">
                  <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    onClick={() => setVvpatConfirmed(true)}
                    className={`bg-[#e2e8f0] w-40 h-56 rounded-sm shadow-xl p-4 flex flex-col cursor-pointer transition-all duration-300 relative border-l-4 ${vvpatConfirmed ? 'border-green-500 scale-105' : 'border-slate-400 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]'}`}
                  >
                    <div className="text-[10px] text-slate-500 font-mono mb-2 text-center border-b border-slate-300 pb-1">VOTE SLIP</div>
                    <div className="flex-1 flex flex-col items-center justify-center">
                       <span className="text-slate-800 font-bold mb-1">CANDIDATE X</span>
                       <span className="text-slate-600 text-xs">PARTY Y</span>
                    </div>
                    {vvpatConfirmed ? (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute inset-0 bg-green-500/20 flex flex-col items-center justify-center rounded-sm backdrop-blur-[2px]"
                      >
                         <CheckCircle2 className="text-green-600 w-12 h-12 mb-2 bg-white rounded-full p-1 shadow-sm" />
                         <span className="text-green-800 font-bold text-[10px] uppercase tracking-widest bg-white/80 px-2 py-0.5 rounded">Confirmed</span>
                      </motion.div>
                    ) : (
                      <div className="absolute inset-0 bg-transparent flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-white/60 backdrop-blur-[2px] rounded-sm">
                         <Fingerprint className="text-slate-700 w-10 h-10 mb-2 animate-pulse" />
                         <span className="text-slate-800 font-bold text-[10px] uppercase tracking-widest text-center px-2">Click to confirm<br/>visual verification</span>
                      </div>
                    )}
                  </motion.div>
                </div>
              )}
            </div>
            
            <div className="z-10 mt-6 md:mt-0">
              {currentStep < steps.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="bg-cyan-400 text-black px-8 py-4 rounded-full font-bold uppercase tracking-wide text-xs transition-all hover:bg-cyan-300 hover:scale-105 flex items-center gap-2"
                >
                  {steps[currentStep].action}
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleReset}
                  className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-wide text-xs transition-all hover:bg-slate-200"
                >
                  Restart Simulation
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
