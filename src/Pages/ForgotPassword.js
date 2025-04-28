import React, { useState } from "react";
import { FaGoogle, FaFacebook, FaInstagram } from 'react-icons/fa';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ForgetpasswordIntiate } from "../redux/actions/loginandsignup/ForgetpasswordAction";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [email, setEmail] = useState("");
  const [New_Password, setPassword] = useState("");
  const [Confirm_Password, setConfirmPassword] = useState("");

  const ForgotPasswordHandler = (event) => {
    event.preventDefault();
    dispatch(ForgetpasswordIntiate({ email: email.trim().toLowerCase(), newPassword: New_Password }, navigate));
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">Reset Password</h2>
        <form className="space-y-4" onSubmit={ForgotPasswordHandler}>
          <label htmlFor="Username" className="block font-semibold text-gray-600">Username:</label>
          <input
            type="text"
            id="Username"
            name="email"
            value={email}
            placeholder="Email or Phone Number"
            required
            onChange={(e) => setEmail(e.target.value)}
            pattern="^(\+?\d{1,3}[- ]?)?\d{10}$|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            title="Please enter a valid email address or a 10-digit phone number"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label htmlFor="New_Password" className="block font-semibold text-gray-600">New Password:</label>
          <input
            type="password"
            id="New_Password"
            name="New_Password"
            value={New_Password}
            placeholder="Enter your new password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label htmlFor="Confirm_Password" className="block font-semibold text-gray-600">Confirm Password:</label>
          <input
            type="password"
            id="Confirm_Password"
            name="Confirm_Password"
            value={Confirm_Password}
            placeholder="Confirm your new password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full py-2 font-semibold text-white transition duration-300 bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Reset Password
          </button>
        </form>

        <div className="my-4 text-center text-gray-500">or</div>
        
        <div className="flex justify-center space-x-4">
          <a href="https://accounts.google.com" aria-label="Login with Google">
            <FaGoogle className="text-2xl text-red-500 transition duration-300 hover:text-red-700" />
          </a>
          <a href="https://www.facebook.com" aria-label="Login with Facebook">
            <FaFacebook className="text-2xl text-blue-600 transition duration-300 hover:text-blue-800" />
          </a>
          <a href="https://www.instagram.com" aria-label="Login with Instagram">
            <FaInstagram className="text-2xl text-pink-500 transition duration-300 hover:text-pink-700" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
