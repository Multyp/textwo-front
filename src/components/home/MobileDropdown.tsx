/* Global import */
import React from 'react';
/* Scoped import */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
/* Local imports */

interface MobileDropdownProps {
  currentUserMail: string;
  closeDropdown: () => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
}

const MobileDropdown: React.FC<MobileDropdownProps> = ({ currentUserMail, closeDropdown, dropdownRef }) => {
  return (
    <div ref={dropdownRef} className="absolute right-0 top-auto bottom-full my-2 w-full bg-gray-600 border border-gray-500 border-opacity-80 rounded-md shadow-lg">
      <div className="py-1 justify-center">
        <div className="px-4 py-2 flex items-center justify-between">
          <span className="text-white">{currentUserMail}</span>
        </div>
        <div className="flex w-full justify-center items-center">
          <div className="border-t border-gray-500 w-11/12"/>
        </div>
        <div className="px-4 py-2 flex items-center">
          <FontAwesomeIcon icon={faCog} className="h-5 w-5 text-white cursor-pointer mr-2" />
          <span className="text-white">Settings</span>
        </div>
        <div className="flex w-full justify-center items-center">
          <div className="border-t border-gray-500 w-11/12"/>
        </div>
        <div className="px-4 py-2 flex items-center">
          <FontAwesomeIcon icon={faSignOutAlt} className="h-5 w-5 text-white cursor-pointer mr-2" />
          <span className="text-white">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default MobileDropdown;
