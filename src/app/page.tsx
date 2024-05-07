"use client"

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-gray-800 w-full">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <img className="block lg:hidden h-8 w-auto" src="https://miguel-dasilva.com/logo.svg" alt="Logo" />
                <img className="hidden lg:block h-8 w-auto" src="https://miguel-dasilva.com/logo.svg" alt="Logo" />
                <span className="text-white px-3 py-2 text-lg font-medium">TexTwo</span>
              </div>
            </div>
            <div className="hidden md:flex items-center">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" className="text-gray-300 hover:bg-gray-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Features</a>
                <a href="#" className="text-gray-300 hover:bg-gray-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Testimonials</a>
                <a href="#" className="text-gray-300 hover:bg-gray-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">FAQ</a>
              </div>
              <div className="ml-4 flex items-center space-x-2 md:ml-6">
                <a href="/login" className="text-white border border-white hover:bg-white hover:text-gray-800 px-4 py-2 rounded-md text-sm font-medium">Login</a>
                <a href="/register" className="text-white bg-fuchsia-600 hover:bg-fuchsia-800 px-4 py-2 rounded-md text-sm font-medium">Register</a>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out" aria-label="Main menu" aria-expanded="false">
                <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
        {/* Responsive Navbar */}
        {isMenuOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 sm:px-3">
              <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Features</a>
              <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Testimonials</a>
              <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">FAQ</a>
            </div>
            <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3">
              <a href="/login" className="text-white border border-white hover:bg-white hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium">Login</a>
              <a href="/register" className="text-white bg-fuchsia-600 hover:bg-fuchsia-800 block px-3 py-2 rounded-md text-base font-medium">Register</a>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="bg-gray-100 min-h-screen">
        {/* Your existing content here */}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 w-full py-8">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-gray-300 text-sm">&copy; 2024 TexTwo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
