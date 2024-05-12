"use client"

import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextInput from '@/components/TextInput';
import PasswordInput from '@/components/PasswordInput';
import { registerRoute } from '@/utils/ApiRoutes';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    try {
      const response = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (response.data.status === true) {
        toast.success('Email confirmation sent! Please check your email.');
        // Clear form fields after successful registration
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.error('Error registering:', error);
      toast.error('An error occurred. Please try again later.');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="max-w-md w-full bg-gray-800 border-gray-600 border-2 px-8 py-12 rounded-lg shadow-md">
        <h2 className="text-white text-3xl font-semibold mb-6 flex flex-row gap-4 justify-center">
          <div className="block h-10 w-auto">
            <Image src="https://miguel-dasilva.com/logo.svg" alt="Logo" width={45} height={45} />
          </div>
          Textwo
        </h2>
        <TextInput label="Username" type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <TextInput label="Email" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <PasswordInput
          label="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          showPassword={showPassword}
          toggleShowPassword={toggleShowPassword}
        />
        <TextInput
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          className="w-full bg-fuchsia-600 hover:bg-fuchsia-800 text-white py-2 rounded-md transition duration-300 ease-in-out my-4"
          onClick={handleRegister}
        >
          Register
        </button>
        <div className="text-gray-400 text-center">
          Already have an account? <a href="/login" className="text-fuchsia-400">Login here</a>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
