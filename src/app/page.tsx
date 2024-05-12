"use client"

/* Global imports */
import React, { useState } from 'react';
import Image from 'next/image';
/* Scoped imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
/* Local imports */
import DevelopmentBar from '@/components/DevelopmentBar';
import DeveloperSection from '@/components/DeveloperSection';
import Navbar from '@/components/Navbar';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu}/>

      <main className="bg-gray-100 min-h-screen w-full">
        {/* Hero Section */}
        <section className="flex flex-col flex-grow items-center justify-evenly py-16 lg:flex-row">
          <div className="flex flex-col items-center mb-8 lg:mb-0 lg:w-1/3 lg:max-w-sm">
            {/* SVG Illustration 1 */}
            <Image src="/undraw_chatting_re_j55r.svg" alt="Feature 1 - Messaging" className="w-48 h-48 lg:w-64 lg:h-64 mb-2" width={0} height={0} draggable={false} />
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800">Messaging</h2>
            <p className="text-base text-center lg:text-lg my-4 text-gray-600">Message anyone you want, from anywhere. Create your account now and talk with your friends !</p>
          </div>
          <div className="flex flex-col items-center mb-8 lg:mb-0 lg:w-1/3 lg:max-w-sm">
            {/* SVG Illustration 2 */}
            <Image src="/undraw_secure_login_pdn4.svg" alt="Feature 2 - Security" className="w-48 h-48 lg:w-64 lg:h-64 mb-2"  width={0} height={0} draggable={false} />
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800">Security</h2>
            <p className="text-base text-center lg:text-lg my-4 text-gray-600">At textwo, our main focus is security. Your messages are encrypted end-to end, ensuring nobody can steal your data !</p>
          </div>
          <div className="flex flex-col items-center mb-8 lg:mb-0 lg:w-1/3 lg:max-w-sm">
            {/* SVG Illustration 3 */}
            <Image src="/undraw_real_time_collaboration_c62i.svg" alt="Feature 3 - Real time" className="w-48 h-48 lg:w-64 lg:h-64 mb-2"  width={0} height={0} draggable={false} />
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800">Real time</h2>
            <p className="text-base text-center lg:text-lg my-4 text-gray-600">You send annd receive messages in real time, no need to refresh your page. Just send your text and wait for the answer !</p>
          </div>
        </section>

        {/* Developer Section */}
        <DeveloperSection />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 w-full py-8">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-gray-300 text-sm">&copy; 2024 TexTwo. All rights reserved. Illustrations by <a href="https://undraw.co/" className=" text-fuchsia-500 hover:text-fuchsia-300">Undraw</a>.</p>
        </div>
      </footer>

    </div>
  );
}
