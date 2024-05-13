"use client"

/* Global import */
import React, { useState } from 'react';
/* Scoped import */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSignOutAlt, faUser, faUsers, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
/* Local import */

interface LargeDropdownProps {
  currentUserMail: string;
  dropdownRef: React.RefObject<HTMLDivElement>;
}

interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

interface UserDashboardProps {
  selectedMenu: string;
  onMenuSelect: (menu: string) => void;
  onClose: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ selectedMenu, onMenuSelect, onClose }) => { // Accept onClose prop
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="flex justify-between w-96 bg-white rounded-lg p-4">
        <button className="top-0 right-0 m-2 text-gray-600 hover:text-gray-900" onClick={onClose}> {/* Close button */}
          <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
        </button>
        <div>
          <button className={`text-gray-700 flex items-center mr-4 ${selectedMenu === 'account' && 'font-bold'}`} onClick={() => onMenuSelect('account')}>
            <FontAwesomeIcon icon={faUser} className="h-5 w-5 mr-2" />
            Account
          </button>
          <button className={`text-gray-700 flex items-center mr-4 ${selectedMenu === 'friends' && 'font-bold'}`} onClick={() => onMenuSelect('friends')}>
            <FontAwesomeIcon icon={faUsers} className="h-5 w-5 mr-2" />
            Friends
          </button>
          {/* Add more menu items as needed */}
        </div>
        <div>
          {/* Right side content based on selected menu */}
          {selectedMenu === 'account' && <div>Account details here</div>}
          {selectedMenu === 'friends' && <div>Friends list here</div>}
        </div>
      </div>
    </div>
  );
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg">
        <p className="text-lg">{message}</p>
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 mr-2 bg-gray-300 hover:bg-gray-400 rounded"
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const LargeDropdown: React.FC<LargeDropdownProps> = ({ currentUserMail, dropdownRef }) => {
  const navigation = useRouter();
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('account');

  const handleLogout = () => {
    setShowLogoutConfirmation(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem('token');
    navigation.push("/");
  };

  const cancelLogout = () => {
    setShowLogoutConfirmation(false);
  };

  const handleSettings = () => {
    setShowSettingsModal(true);
  };

  const closeSettingsModal = () => {
    setShowSettingsModal(false);
  };

  return (
    <div ref={dropdownRef} className="absolute right-0 top-auto bottom-full my-4 bg-gray-600 border border-gray-500 border-opacity-80 rounded-md shadow-lg">
      <div className="p-2 justify-center items-center">
        <div className="px-2 py-1 flex items-center justify-center w-full">
          <span className="text-white">{currentUserMail}</span>
        </div>
        <div className="flex w-full py-1 justify-center items-center">
          <div className="border-t border-gray-500 w-full"/>
        </div>
        <div className="pl-3 py-2 flex items-center w-full" onClick={handleSettings}>
          <FontAwesomeIcon icon={faCog} className="h-5 w-5 text-white cursor-pointer mr-2" />
          <span className="text-white cursor-pointer">Settings</span>
        </div>
        <div className="flex w-full py-1 justify-center items-center my-1">
          <div className="border-t border-gray-500 w-full"/>
        </div>
        <div className="pl-3 py-2 flex items-center hover:bg-gray-500 rounded-md w-full" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} className="h-5 w-5 text-white cursor-pointer mr-2" />
          <button className="text-white">Logout</button>
        </div>
      </div>
      {showLogoutConfirmation && (
        <ConfirmationModal
          message="Are you sure you want to logout?"
          onConfirm={confirmLogout}
          onCancel={cancelLogout}
        />
      )}
      {showSettingsModal && (
        <UserDashboard selectedMenu={selectedMenu} onMenuSelect={setSelectedMenu} onClose={closeSettingsModal} />
      )}
    </div>
  );
};

export default LargeDropdown;
