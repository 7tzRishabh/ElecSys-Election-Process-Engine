import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Fingerprint, Lock, Zap } from 'lucide-react';

const cards = [
  {
    icon: <Fingerprint className="w-10 h-10 mb-4 text-neon-cyan" />,
    title: "Voter Authentication",
    desc: "Rigorous identity verification using biometric and physical ID checks ensures one citizen, one vote."
  },
  {
    icon: <Lock className="w-10 h-10 mb-4 text-neon-blue" />,
    title: "Tamper-Proof Ballots",
    desc: "Electronic Voting Machines (EVMs) operate offline, preventing external network interference or hacking."
  },
  {
    icon: <ShieldAlert className="w-10 h-10 mb-4 text-neon-purple" />,
    title: "Security Protocols",
    desc: "Multi-tier security involving armed forces and transparent sealing protocols safeguards the machines."
  },
  {
    icon: <Zap className="w-10 h-10 mb-4 text-white" />,
    title: "Rapid Tabulation",
    desc: "Digital counting ensures rapid, precise, and indisputable results within hours of poll closing."
  }
];

export default function Processes() {
  return (
    <section className="py-32 relative overflow-hidden bg-dark-bg z-0">
      <div className="absolute top-0 left-0 w-full h-px bg-white/5" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-white/5" />
      
      {/* Subtle Shifting Animated Glow */}
      <div className="absolute inset-0 -z-10 opacity-20 flex items-center justify-center pointer-events-none">
        <motion.div 
          className="w-[80%] h-[60%] blur-[120px] rounded-full"
          style={{
            background: 'linear-gradient(90deg, rgba(34,211,238,0.5), rgba(59,130,246,0.5), rgba(147,51,234,0.5))',
            backgroundSize: '200% 200%'
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, ease: "easeInOut", repeat: Infinity }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter"
          >
            Core Mechanisms
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            The technological and operational safeguards that protect the integrity of the vote.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => {
            const isCyan = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className={`group p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex flex-col justify-between hover:bg-white/[0.07] transition-all hover:border-${isCyan ? 'cyan-500/50' : 'purple-500/50'}`}
              >
                <div className="relative z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-6 ${isCyan ? 'bg-cyan-500/20 text-cyan-400' : 'bg-purple-500/20 text-purple-400'}`}>
                    {React.cloneElement(card.icon as React.ReactElement, { className: 'w-5 h-5 mb-0' })}
                  </div>
                  <h3 className="text-sm font-bold text-white uppercase mb-2 tracking-wider">{card.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{card.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
