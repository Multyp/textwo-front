"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Home: React.FC = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentUserName, setCurrentUserName] = useState('');
  const [currentUserMail, setCurrentUserMail] = useState('');
  const [currentUserImage, setCurrentUserImage] = useState('');
  const isLoggedIn = !!localStorage.getItem('token');

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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
        {/* Hamburger menu content */}
        {/* Sidebar for small screens */}
        <div className={`bg-gray-600 h-screen w-64 absolute top-0 left-0 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
          <div className="ml-2 h-12 w-12 absolute items-center justify-center cursor-pointer" onClick={closeMenu}>
            <FontAwesomeIcon icon={faTimes} className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col justify-end h-full">
            <div className="p-4 flex-grow">
              Contacts
            </div>
            {/* User section for mobile */}
            <div className="p-4 flex items-center justify-between">
              <div className="relative w-full">
                <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-500 w-full rounded-md p-2" onClick={toggleDropdown}>
                  <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="User Avatar" className="w-10 h-10 rounded-full" />
                  <span className="text-white">{currentUserName}</span>
                </div>
                {/* Dropdown menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 top-auto bottom-full w-full bg-gray-600 border border-gray-500 border-opacity-80 rounded-md shadow-lg">
                    <div className="py-1 justify-center">
                      {/* Email section */}
                      <div className="px-4 py-2 flex items-center justify-between">
                        <span className="text-white">{currentUserMail}</span>
                      </div>
                      {/* Divider */}
                      <div className="flex w-full justify-center items-center">
                        <div className="border-t border-gray-500 w-11/12"/>
                      </div>
                      {/* Settings section */}
                      <div className="px-4 py-2 flex items-center">
                        <FontAwesomeIcon icon={faCog} className="h-5 w-5 text-white cursor-pointer mr-2" />
                        <span className="text-white">Settings</span>
                      </div>
                      {/* Divider */}
                      <div className="flex w-full justify-center items-center">
                        <div className="border-t border-gray-500 w-11/12"/>
                      </div>
                      {/* Logout section */}
                      <div className="px-4 py-2 flex items-center">
                        <FontAwesomeIcon icon={faSignOutAlt} className="h-5 w-5 text-white cursor-pointer mr-2" />
                        <span className="text-white">Logout</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Sidebar for large screens */}
        <div className="hidden md:flex flex-col justify-end bg-gray-900 h-screen w-64">
          {/* Contacts section */}
          <div className="p-4 flex-grow">Contacts</div>
          {/* User section for large screens */}
          <div className="p-4 flex items-center justify-between">
            <div className="relative w-full">
              <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-500 w-full rounded-md p-2" onClick={toggleDropdown}>
                <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="User Avatar" className="w-10 h-10 rounded-full" />
                <span className="text-white">{currentUserName}</span>
              </div>
              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-auto bottom-full mt-2 w-full bg-gray-600 border border-gray-500 border-opacity-80 rounded-md shadow-lg">
                  <div className="py-1 justify-center">
                    {/* Email section */}
                    <div className="px-4 py-2 flex items-center justify-between">
                      <span className="text-white">{currentUserMail}</span>
                    </div>
                    {/* Divider */}
                    <div className="flex w-full justify-center items-center">
                      <div className="border-t border-gray-500 w-11/12"/>
                    </div>
                    {/* Settings section */}
                    <div className="px-4 py-2 flex items-center">
                      <FontAwesomeIcon icon={faCog} className="h-5 w-5 text-white cursor-pointer mr-2" />
                      <span className="text-white">Settings</span>
                    </div>
                    {/* Divider */}
                    <div className="flex w-full justify-center items-center">
                      <div className="border-t border-gray-500 w-11/12"/>
                    </div>
                    {/* Logout section */}
                    <div className="px-4 py-2 flex items-center">
                      <FontAwesomeIcon icon={faSignOutAlt} className="h-5 w-5 text-white cursor-pointer mr-2" />
                      <span className="text-white">Logout</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Main content area */}
        <div className="flex-1 bg-gray-700 w-full">
          {/* Chat container section */}
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
