/* Global import */
import React from 'react';
/* Scoped import */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
/* Local import */

interface PasswordInputProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  toggleShowPassword: (event: Event) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ label, id, value, onChange, showPassword, toggleShowPassword }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-400 text-sm mb-2" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <input
          className="w-full px-3 py-2 text-white bg-gray-700 rounded-md focus:outline-none focus:bg-gray-600"
          type={showPassword ? 'text' : 'password'}
          id={id}
          value={value}
          onChange={onChange}
        />
        <button
          className="absolute inset-y-0 right-0 pr-2 flex items-center focus:outline-none"
          onClick={() => toggleShowPassword}
        >
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="h-5 w-5 text-gray-200 p-1 rounded-md hover:bg-gray-500 bg-opacity-50" />
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
