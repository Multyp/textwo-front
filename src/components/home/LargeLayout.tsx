import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import LargeDropdown from '@/components/home/LargeDropdown';
import { getUsersRoute } from '@/utils/ApiRoutes';

interface User {
  _id: string;
  username: string;
  email: string;
  avatarImage: string;
}

interface Props {
  currentUser: User;
  isMenuOpen: boolean;
  closeMenu: () => void;
  isLargeDropdownOpen: boolean;
  closeLargeDropdown: () => void;
  largeDropdownRef: React.RefObject<HTMLDivElement>;
  toggleLargeDropdown: () => void;
  setCurrentChat: (user: string) => void;
  currentChat: string | undefined;
}

const LargeLayout: React.FC<Props> = ({
  currentUser,
  isMenuOpen,
  closeMenu,
  isLargeDropdownOpen,
  closeLargeDropdown,
  largeDropdownRef,
  toggleLargeDropdown,
  setCurrentChat,
  currentChat,
}) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${getUsersRoute}/${currentUser._id}`);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [currentUser._id]);

  const handleUserClick = (user: User) => {
    if (user._id !== currentChat) {
      setCurrentChat(user._id);
    }
  };

  return (
    <div className="hidden md:flex flex-col justify-end bg-gray-900 h-screen w-64 border-r-2 border-gray-500">
      <div className="p-4 flex-grow">
        {users.map(user => (
          <div key={user._id} className="hover:bg-gray-800 p-2 cursor-pointer rounded-md flex items-center" onClick={() => handleUserClick(user)}>
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
            <Image src={`data:image/svg+xml;base64,${currentUser.avatarImage}`} alt="User Avatar" className="w-10 h-10 rounded-full" width={50} height={50}/>
            <span className="text-white">{currentUser.username}</span>
          </div>
          {isLargeDropdownOpen && (
            <LargeDropdown currentUserMail={currentUser.email} dropdownRef={largeDropdownRef}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default LargeLayout;
