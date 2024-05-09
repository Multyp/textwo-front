/* Global import */
import React from 'react';
/* Scoped import */
/* Local import */

interface TextInputProps {
  label: string;
  type: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({ label, type, id, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-400 text-sm mb-2" htmlFor={id}>
        {label}
      </label>
      <input
        className="w-full px-3 py-2 text-white bg-gray-700 rounded-md focus:outline-none focus:bg-gray-600"
        type={type}
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextInput;
