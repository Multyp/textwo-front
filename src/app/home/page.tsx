"use client"

/* Global imports */
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
/* Scoped imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
/* Local imports */
import MobileDropdown from '@/components/home/MobileDropdown';
import LargeDropdown from '@/components/home/LargeDropdown';

const Home: React.FC = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [isLargeDropdownOpen, setIsLargeDropdownOpen] = useState(false);
  const [currentUserName, setCurrentUserName] = useState('');
  const [currentUserMail, setCurrentUserMail] = useState('');
  const [currentUserImage, setCurrentUserImage] = useState('');
  const isLoggedIn = !!localStorage.getItem('token');
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const largeDropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await JSON.parse(localStorage.getItem("token") as string);
      if (data) {
        setCurrentUserName(data.username);
        setCurrentUserMail(data.email);
        setCurrentUserImage(data.avatarImage);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target as Node)) {
        setIsMobileDropdownOpen(false);
      }
      if (largeDropdownRef.current && !largeDropdownRef.current.contains(event.target as Node)) {
        setIsLargeDropdownOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        closeMenu();
        closeMobileDropdown();
        closeLargeDropdown();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMobileDropdown = () => {
    setIsMobileDropdownOpen(!isMobileDropdownOpen);
  };

  const closeMobileDropdown = () => {
    setIsMobileDropdownOpen(false);
  };

  const toggleLargeDropdown = () => {
    setIsLargeDropdownOpen(!isLargeDropdownOpen);
  };

  const closeLargeDropdown = () => {
    setIsLargeDropdownOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-row">
        <div ref={menuRef} className={`bg-gray-900 h-screen w-64 absolute top-0 left-0 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
          <div className="right-0 mt-2 h-12 w-12 absolute flex items-center justify-center cursor-pointer" onClick={closeMenu}>
            <FontAwesomeIcon icon={faTimes} className="!h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col justify-end h-full">
            <div className="p-4 flex-grow">
              Contacts
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className="relative w-full">
                <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-500 w-full rounded-md p-2" onClick={toggleMobileDropdown}>
                  <Image src={`data:image/svg+xml;base64,${currentUserImage}`} alt="User Avatar" className="w-10 h-10 rounded-full" width={50} height={50}/>
                  <span className="text-white">{currentUserName}</span>
                </div>
                {isMobileDropdownOpen && (
                  <MobileDropdown currentUserMail={currentUserMail} closeDropdown={closeMobileDropdown} dropdownRef={mobileDropdownRef}/>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:flex flex-col justify-end bg-gray-900 h-screen w-64">
          <div className="p-4 flex-grow">Contacts</div>
          <div className="p-4 flex items-center justify-between">
            <div className="relative w-full">
              <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-800 w-full rounded-md p-2" onClick={toggleLargeDropdown}>
                <Image src={`data:image/svg+xml;base64,${currentUserImage}`} alt="User Avatar" className="w-10 h-10 rounded-full" width={50} height={50}/>
                <span className="text-white">{currentUserName}</span>
              </div>
              {isLargeDropdownOpen && (
                <LargeDropdown currentUserMail={currentUserMail} dropdownRef={largeDropdownRef}/>
              )}
            </div>
          </div>
        </div>
        <div className="flex-1 bg-gray-700 w-full">
          <div className="h-16 w-16 flex items-center justify-center cursor-pointer md:hidden" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faBars} className="h-6 w-6 text-white" />
          </div>
          <div className="p-4 text-white">Chat Container</div>
        </div>
      </div>
    );
  }

  return null;
};

export default Home;
