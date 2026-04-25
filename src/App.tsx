/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Preloader from './components/Preloader';
import Cursor from './components/Cursor';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Processes from './components/Processes';
import InteractiveGuide from './components/InteractiveGuide';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ChatAssistant from './components/ChatAssistant';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        <div className="bg-dark-bg selection:bg-neon-purple/30 selection:text-white relative">
          <Cursor />
          <ParticleBackground />
          <Navbar />
          <main>
            <Hero />
            <Timeline />
            <Processes />
            <InteractiveGuide />
            <FAQ />
          </main>
          <Footer />
          <ChatAssistant />
        </div>
      )}
    </>
  );
}
