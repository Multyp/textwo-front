"use client"

/* Global imports */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ToastContainer, ToastPosition, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
/* Scoped import */
/* Local imports */
import TextInput from '@/components/TextInput';
import PasswordInput from '@/components/PasswordInput';
import { loginRoute } from '@/utils/ApiRoutes';

const Login: React.FC = () => {
  const navigation = useRouter();
  const [values, setValues] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const toastOptions = {
    position: 'bottom-right' as ToastPosition,
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const isLoggedIn = !!localStorage.getItem('token');
    if (isLoggedIn) {
      navigation.push('/home');
    }
  }, [navigation]);

  const toggleShowPassword = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "" || password === "") {
      toast.error("Username and Password are required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      try {
        const { data } = await axios.post(`${loginRoute}`, { username, password });
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        }
        if (data.status === true) {
          localStorage.setItem("token", JSON.stringify(data.user));
          navigation.push("/home");
        }
      } catch (error) {
        console.error("Error logging in:", error);
        toast.error("An error occurred. Please try again later.", toastOptions);
      }
    }
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
        <form onSubmit={handleLogin}>
          <TextInput label="Username" type="text" id="username" value={values.username} onChange={(e) => setValues({ ...values, username: e.target.value })} />
          <PasswordInput
            label="Password"
            id="password"
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            showPassword={showPassword}
            toggleShowPassword={toggleShowPassword}
          />
          <button
            className="w-full bg-fuchsia-600 hover:bg-fuchsia-800 text-white py-2 rounded-md transition duration-300 ease-in-out my-4"
            type="submit"
          >
            Login
          </button>
        </form>
        <div className="text-gray-400 text-center">
          Already have an account? <a href="/register" className="text-fuchsia-400">Register here</a>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
