"use client"

/* Global import */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { ToastContainer, ToastPosition, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
/* Scoped imports */
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { confirmRoute } from "@/utils/ApiRoutes";
/*Local imports */

library.add(faCheckCircle, faTimesCircle, faCircleNotch);

const EmailConfirmation = ({ params }: { params: { token: string } }) => {
  const [confirmationStatus, setConfirmationStatus] = useState<"pending" | "confirmed" | "error">("pending");
  const router = useRouter();

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const response = await axios.get(`${confirmRoute}/${params.token}`);
        if (response.data.msg === "Email confirmed successfully") {
          setConfirmationStatus("confirmed");
          setTimeout(() => {
            router.push("/login");
          }, 5000);
        } else {
          setConfirmationStatus("error");
        }
      } catch (error) {
        setConfirmationStatus("error");
      }
    };

    if (params.token) {
      confirmEmail();
    }
  }, [params.token, router]);

  let message, icon, iconColor;
  switch (confirmationStatus) {
    case "pending":
      message = "Confirming your email...";
      icon = <FontAwesomeIcon icon="circle-notch" className="animate-spin" />;
      iconColor = "text-blue-500";
      break;
    case "confirmed":
      message = "Email confirmed successfully. You will be redirected to the login page shortly.";
      icon = <FontAwesomeIcon icon="check-circle" />;
      iconColor = "text-green-500";
      break;
    case "error":
      message = "There was an error confirming your email.";
      icon = <FontAwesomeIcon icon="times-circle" />;
      iconColor = "text-red-500";
      break;
    default:
      message = "";
      icon = null;
      iconColor = "";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="max-w-md w-full bg-gray-800 border-gray-600 border-2 px-8 py-12 rounded-lg shadow-md mx-5">
        <div className="flex flex-col items-center">
          <h2 className="text-white text-3xl font-semibold mb-6 flex flex-row gap-4 justify-center">
            <div className="block h-10 w-auto">
              <Image src="https://miguel-dasilva.com/logo.svg" alt="Logo" width={45} height={45} />
            </div>
            Textwo
          </h2>
          <div className="flex items-center justify-center mt-6">
            {icon && <span className={`text-4xl ${iconColor} mr-4`}>{icon}</span>}
            <p className="text-white text-lg">{message}</p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EmailConfirmation;
