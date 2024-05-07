"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import TextInput from '@/components/TextInput';
import PasswordInput from '@/components/PasswordInput';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Perform login functionality here
    console.log("Logging in with username:", username, "and password:", password);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="max-w-md w-full bg-gray-800 border-gray-600 border-2 px-8 py-12 rounded-lg shadow-md mx-5">
        <h2 className="text-white text-3xl font-semibold mb-6 flex flex-row gap-4 justify-center">
          <div className="block h-10 w-auto">
            <Image src="https://miguel-dasilva.com/logo.svg" alt="Logo" width={45} height={45} />
          </div>
          Textwo
        </h2>
        <TextInput label="Username" type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <PasswordInput
          label="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          showPassword={showPassword}
          toggleShowPassword={toggleShowPassword}
        />
        <button
          className="w-full bg-fuchsia-600 hover:bg-fuchsia-800 text-white py-2 rounded-md transition duration-300 ease-in-out my-4"
          onClick={handleLogin}
        >
          Login
        </button>
        <div className="text-gray-400 text-center">
          Already have an account? <a href="/register" className="text-fuchsia-400">Register here</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
