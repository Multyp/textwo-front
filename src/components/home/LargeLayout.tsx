"use client"

/* Global imports */
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
/* Scoped import */
/* Local imports */
import LargeDropdown from '@/components/home/LargeDropdown';
import { getUsersRoute } from '@/utils/ApiRoutes';

interface User {
  _id: string;
  username: string;
  email: string;
  avatarImage: string;
}

interface Props {
  currentUserId: string;
  currentUserImage: string;
  currentUserName: string;
  currentUserMail: string;
  isMenuOpen: boolean;
  closeMenu: () => void;
  isLargeDropdownOpen: boolean;
  closeLargeDropdown: () => void;
  largeDropdownRef: React.RefObject<HTMLDivElement>;
  toggleLargeDropdown: () => void;
}

const LargeLayout: React.FC<Props> = ({
  currentUserId,
  currentUserImage,
  currentUserName,
  currentUserMail,
  isMenuOpen,
  closeMenu,
  isLargeDropdownOpen,
  closeLargeDropdown,
  largeDropdownRef,
  toggleLargeDropdown,
}) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${getUsersRoute}/${currentUserId}`);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  });

  return (
    <div className="hidden md:flex flex-col justify-end bg-gray-900 h-screen w-64">
      <div className="p-4 flex-grow">
      {users.map(user => (
          <div key={user._id} className="hover:bg-gray-800 p-2 cursor-pointer rounded-md flex items-center">
            <Image src={`data:image/svg+xml;base64,${user.avatarImage}`} alt={`${user.username}'s Avatar`} className="w-10 h-10 rounded-full" width={50} height={50}/>
            <span className="text-white ml-2">{user.username}</span>
          </div>
        ))}
      </div>
      <div className="flex w-full justify-center items-center">
        <div className="border-t-2 border-gray-700 w-11/12"/>
      </div>
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
  );
};

export default LargeLayout;
