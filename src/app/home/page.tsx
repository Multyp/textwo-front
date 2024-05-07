"use client"

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import MobileLayout from '@/components/home/MobileLayout';
import LargeLayout from '@/components/home/LargeLayout';
import Welcome from '@/components/home/Welcome';

const Home: React.FC = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [isLargeDropdownOpen, setIsLargeDropdownOpen] = useState(false);
  const [currentUserName, setCurrentUserName] = useState('');
  const [currentUserMail, setCurrentUserMail] = useState('');
  const [currentUserImage, setCurrentUserImage] = useState('');
  const [currentChat, setCurrentChat] = useState(undefined);
  const isLoggedIn = !!localStorage.getItem('token');
  const menuRef =  useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const largeDropdownRef = useRef<HTMLDivElement>(null);

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
        <MobileLayout
          currentUserImage={currentUserImage}
          currentUserName={currentUserName}
          currentUserMail={currentUserMail}
          isMenuOpen={isMenuOpen}
          closeMenu={closeMenu}
          isMobileDropdownOpen={isMobileDropdownOpen}
          closeMobileDropdown={closeMobileDropdown}
          menuRef={menuRef}
          mobileDropdownRef={mobileDropdownRef}
          toggleMobileDropdown={toggleMobileDropdown}
        />
        <LargeLayout
          currentUserImage={currentUserImage}
          currentUserName={currentUserName}
          currentUserMail={currentUserMail}
          isMenuOpen={isMenuOpen}
          closeMenu={closeMenu}
          isLargeDropdownOpen={isLargeDropdownOpen}
          closeLargeDropdown={closeLargeDropdown}
          largeDropdownRef={largeDropdownRef}
          toggleLargeDropdown={toggleLargeDropdown}
        />
        <div className="flex-1 bg-gray-700 w-full">
          <div className={`h-16 w-16 flex items-center justify-center cursor-pointer ${isMenuOpen ? "hidden" : "absolute"} md:hidden`} onClick={toggleMenu}>
            <FontAwesomeIcon icon={faBars} className="!h-6 w-6 text-white" />
          </div>
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default Home;
