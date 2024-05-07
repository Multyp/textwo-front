// MobileLayout.tsx

import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import MobileDropdown from '@/components/home/MobileDropdown';

interface Props {
  currentUserImage: string;
  currentUserName: string;
  currentUserMail: string;
  isMenuOpen: boolean;
  closeMenu: () => void;
  isMobileDropdownOpen: boolean;
  closeMobileDropdown: () => void;
  mobileDropdownRef: React.RefObject<HTMLDivElement>;
  menuRef: React.RefObject<HTMLDivElement>;
  toggleMobileDropdown: () => void;
}

const MobileLayout: React.FC<Props> = ({
  currentUserImage,
  currentUserName,
  currentUserMail,
  isMenuOpen,
  menuRef,
  closeMenu,
  isMobileDropdownOpen,
  closeMobileDropdown,
  mobileDropdownRef,
  toggleMobileDropdown,
}) => {
  return (
    <div ref={menuRef} className={`bg-gray-900 h-screen w-64 absolute top-0 left-0 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
      <div className="flex flex-col justify-end h-full">
        <div className="mt-2 px-4 h-12 w-full flex items-center justify-between text-white">
            Your chats
            <FontAwesomeIcon icon={faTimes} className="!h-6 w-6 text-white cursor-pointer" onClick={closeMenu}/>
        </div>
        <div className="p-4 flex-grow">Contacts</div>
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
  );
};

export default MobileLayout;
