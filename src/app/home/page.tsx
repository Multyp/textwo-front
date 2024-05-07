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
        <div className={`bg-gray-600 h-screen w-64 absolute top-0 left-0 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
          <div className="ml-2 h-12 w-12 absolute items-center justify-center cursor-pointer" onClick={closeMenu}>
            <FontAwesomeIcon icon={faTimes} className="h-6 w-6 text-white" />
          </div>
          {/* User section */}
          <div className="flex flex-col justify-end h-full">
            {/* Contacts section */}
            <div className="p-4 flex-grow">
              Contacts
            </div>
            {/* User section */}
            <div className="p-4 flex items-center justify-between">
              {/* User's card with image and username */}
              <div className="relative w-full">
                <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-500 w-full rounded-md p-2" onClick={toggleDropdown}>
                  <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="User Avatar" className="w-10 h-10 rounded-full" />
                  <span className="text-white">{currentUserName}</span>
                </div>
                {/* Dropdown menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 top-auto bottom-full mt-2 w-48 bg-gray-600 rounded-md shadow-lg">
                    <div className="py-1">
                      {/* Email section */}
                      <div className="px-4 py-2 flex items-center justify-between">
                        <span className="text-white">{currentUserMail}</span>
                      </div>
                      {/* Divider */}
                      <div className="border-t border-gray-700"></div>
                      {/* Settings section */}
                      <div className="px-4 py-2 flex items-center justify-between">
                        <span className="text-white">Settings</span>
                        <FontAwesomeIcon icon={faCog} className="h-5 w-5 text-white cursor-pointer" />
                      </div>
                      {/* Logout section */}
                      <div className="px-4 py-2 flex items-center justify-between">
                        <span className="text-white">Logout</span>
                        <FontAwesomeIcon icon={faSignOutAlt} className="h-5 w-5 text-white cursor-pointer" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Sidebar */}
        <div className="hidden md:block bg-gray-600 h-screen w-64">
          {/* Contacts section */}
          <div className="p-4">Contacts</div>
          {/* User section */}
          <div className="p-4 cursor-pointer">User</div>
        </div>
        {/* Main content area */}
        <div className="flex-1 bg-gray-800 w-full">
          {/* Chat container section */}
          <div
            className="h-16 w-16 flex items-center justify-center cursor-pointer md:hidden"
            onClick={toggleMenu}
          >
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
