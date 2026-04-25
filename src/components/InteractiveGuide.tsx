import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, HelpCircle } from 'lucide-react';

const guideSteps = [
  {
    id: "prep",
    title: "1. Preparation",
    content: "Before voting day, check your name on the electoral roll via the official portal. Bring valid photo ID (Voter ID card, Passport, or Driving License) to the polling booth."
  },
  {
    id: "booth",
    title: "2. Inside the Booth",
    content: "A polling officer will verify your identity. Your finger will be marked with indelible ink to prevent duplicate voting. You will then sign the register."
  },
  {
    id: "vote",
    title: "3. Casting the Vote",
    content: "Proceed to the voting compartment. Press the blue button on the EVM next to your chosen candidate's symbol. A red light will glow, and you'll hear a long beep."
  },
  {
    id: "vvpat",
    title: "4. Verification",
    content: "Look at the VVPAT machine next to the EVM. A printed slip containing the serial number, name, and symbol of your chosen candidate will be visible for 7 seconds before it falls into a sealed drop box."
  }
];

export default function InteractiveGuide() {
  const [activeStep, setActiveStep] = useState(guideSteps[0].id);

  return (
    <section id="guide" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="w-full lg:w-1/2">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter"
            >
              Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Voter Guide</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-400 mb-10 text-lg"
            >
              Select a step below to learn exactly what happens during the voting process.
            </motion.p>

            <div className="space-y-4">
              {guideSteps.map((step, index) => {
                const isActive = activeStep === step.id;
                return (
                  <motion.button
                    key={step.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    onClick={() => setActiveStep(step.id)}
                    className={`w-full text-left p-4 rounded-lg border transition-all duration-300 flex items-center justify-between group ${
                      isActive 
                        ? 'bg-white/10 border-white/20' 
                        : 'bg-white/5 border-white/5 hover:border-white/10'
                    }`}
                  >
                    <span className={`font-semibold text-sm uppercase tracking-wider ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'}`}>
                      {step.title}
                    </span>
                    <Info className={`w-4 h-4 transition-transform ${isActive ? 'text-cyan-400 rotate-12' : 'text-slate-500'}`} />
                  </motion.button>
                )
              })}
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="p-8 md:p-12 min-h-[400px] flex items-center relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 to-black border border-white/5">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <HelpCircle className="w-48 h-48" />
              </div>
              
              <AnimatePresence mode="wait">
                {guideSteps.map((step) => (
                  activeStep === step.id && (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10"
                    >
                      <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Intelligence Hub</h3>
                      <h4 className="text-3xl font-bold mb-4 tracking-tight text-white">{step.title}</h4>
                      <p className="text-slate-400 text-lg leading-relaxed">{step.content}</p>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
