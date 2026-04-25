import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Users, FileUser, Vote, Scale, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    icon: <Users className="w-8 h-8 text-neon-blue" />,
    title: "Voter Registration",
    description: "Citizens register to vote, ensuring their eligibility and presence on the electoral roll.",
    date: "Months Prior"
  },
  {
    icon: <FileUser className="w-8 h-8 text-neon-purple" />,
    title: "Candidate Nomination",
    description: "Political parties and independents submit their nominations to run for respective offices.",
    date: "Weeks Prior"
  },
  {
    icon: <Vote className="w-8 h-8 text-neon-cyan" />,
    title: "Polling Day",
    description: "Registered voters cast their ballots at designated polling stations securely.",
    date: "Election Day"
  },
  {
    icon: <Scale className="w-8 h-8 text-neon-blue" />,
    title: "Counting & VVPAT Check",
    description: "Votes are systematically counted under observation, often cross-verified with paper trails.",
    date: "Post Election"
  },
  {
    icon: <CheckCircle2 className="w-8 h-8 text-neon-purple" />,
    title: "Declaration of Results",
    description: "Final verified tally is published and the winners are formally declared by the commission.",
    date: "Final Outcome"
  }
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="py-32 relative">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter"
          >
            How Elections Work
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            A step-by-step breakdown of the democratic process, from registration to the final tally.
          </motion.p>
        </div>

        <div ref={containerRef} className="relative mt-12">
          {/* Connecting Line */}
          <div className="absolute left-[39px] md:left-[51px] top-4 bottom-4 w-0.5 bg-white/10 hidden sm:block">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-cyan-400 origin-top shadow-[0_0_15px_#22d3ee]"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-12">
            {steps.map((step, index) => {
              return (
                <div key={index} className="relative flex items-center flex-col sm:flex-row pl-20 sm:pl-28 md:pl-32">
                  
                  {/* Center Node */}
                  <div className="absolute left-0 sm:left-[30px] md:left-[38px] top-4 flex justify-center w-6 h-6">
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="w-4 h-4 rounded-full bg-dark-bg border-2 border-white/40 z-10 relative mt-1"
                    >
                      <motion.div 
                        className="absolute inset-[2px] rounded-full bg-cyan-400 opacity-0"
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.3 }}
                      />
                    </motion.div>
                  </div>

                  {/* Content Container */}
                  <div className="w-full">
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md hover:bg-white/[0.07] transition-all"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                          {React.cloneElement(step.icon as React.ReactElement, { className: 'w-5 h-5' })}
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{step.date}</span>
                          <h3 className="text-lg font-bold text-white uppercase tracking-wider">{step.title}</h3>
                        </div>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
