/* Global import */
import React, { useState, useEffect } from "react";
import Image from 'next/image';
/* Scoped import */
/* Local import */
import Robot from "@/assets/robot.gif";

export default function Welcome() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setUserName(
      await JSON.parse(
        localStorage.getItem("token") as string
      ).username
      );
    }
    fetchData();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center text-white w-full h-screen">
      <Image src={Robot} alt="Robot picture" unoptimized/>
      <h1>
        Welcome, <span className="text-fuchsia-400">{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </div>
  );
}
