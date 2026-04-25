import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: "How do EVMs (Electronic Voting Machines) prevent hacking?",
    a: "EVMs are standalone machines. They are not connected to the internet, Bluetooth, Wi-Fi, or any other network. Physical tampering is prevented via strict sealing protocols and armed guarding."
  },
  {
    q: "What is VVPAT and why is it important?",
    a: "VVPAT (Voter Verifiable Paper Audit Trail) provides a physical paper slip for 7 seconds after you vote, allowing you to visibly confirm that your vote was cast for your intended candidate."
  },
  {
    q: "Can I vote if I don't have my Voter ID card?",
    a: "Yes. If your name is on the electoral roll, you can use alternative approved photo IDs like a Passport, Driving License, PAN card, or Aadhaar card."
  },
  {
    q: "How is the secrecy of my vote maintained?",
    a: "The voting compartment is shielded. Once you cast your vote, the EVM records it internally without linking it to your identity sequence on the electoral roll."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-32 relative">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold mb-4 uppercase tracking-[0.2em]">Intelligence Hub</h2>
          <p className="text-slate-500 text-sm">Clear answers to common constitutional queries.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border border-white/5 rounded-lg overflow-hidden bg-white/5"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left transition-colors hover:bg-white/5"
                >
                  <span className="font-medium text-sm text-white">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-cyan-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-4 pb-4 text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-2">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
