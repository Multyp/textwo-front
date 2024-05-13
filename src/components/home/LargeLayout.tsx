/* Global import */
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
/* Scoped imports */
/* Local imports */
import LargeDropdown from '@/components/home/LargeDropdown';
import { getUsersRoute } from '@/utils/ApiRoutes';
import User from '@/types/User';

interface Props {
  currentUser: User;
  isLargeDropdownOpen: boolean;
  largeDropdownRef: React.RefObject<HTMLDivElement>;
  toggleLargeDropdown: () => void;
  setCurrentChat: (user: User) => void;
  currentChat: User | undefined;
}

const LargeLayout: React.FC<Props> = ({
  currentUser,
  isLargeDropdownOpen,
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
    if (user !== currentChat) {
      setCurrentChat(user);
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
      <div className="px-4 py-2 flex items-center justify-between">
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
