import React from 'react';
import Image from 'next/image';
import LargeDropdown from '@/components/home/LargeDropdown';

interface Props {
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
  return (
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
  );
};

export default LargeLayout;
