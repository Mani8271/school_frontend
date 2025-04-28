import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoginwithemailInitiate } from "../redux/actions/loginandsignup/LoginwithemailAction";

function Login({ setUser }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showEmailDropdown, setShowEmailDropdown] = useState(false);
  const [showPasswordDropdown, setShowPasswordDropdown] = useState(false);
  const [error, setError] = useState(""); // To show error messages
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const savedCredentials = JSON.parse(localStorage.getItem("userCredentials")) || {};

  const handleSelectEmail = (email) => {
    setFormData((prev) => ({ ...prev, email }));
    setShowEmailDropdown(false);
  };

  const handleSelectPassword = () => {
    setFormData((prev) => ({ ...prev, password: savedCredentials.password }));
    setShowPasswordDropdown(false);
  };

  const handleInputChange = (e) => {

    setFormData({ ...formData, [e.target.name]: e.target.value });
   
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Dispatch the async login action
    dispatch(LoginwithemailInitiate(formData, navigate));

    // Optionally update local storage to prefill credentials next time
    localStorage.setItem("userCredentials", JSON.stringify({
      email: formData.email,
      password: formData.password
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-3xl font-semibold text-center text-gray-800">Welcome Back</h2>

        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Field */}
          <div className="relative">
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Enter your email"
              onChange={handleInputChange}
              onFocus={() => setShowEmailDropdown(true)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {showEmailDropdown && savedCredentials.email && (
              <ul className="absolute left-0 right-0 mt-1 bg-white border rounded shadow-lg z-10">
                <li
                  onMouseDown={() => handleSelectEmail(savedCredentials.email)}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                >
                  {savedCredentials.email}
                </li>
              </ul>
            )}
          </div>

          {/* Password Field */}
          <div className="relative">
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Enter your password"
              onChange={handleInputChange}
              onFocus={() => setShowPasswordDropdown(true)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {showPasswordDropdown && savedCredentials.password && (
              <ul className="absolute left-0 right-0 mt-1 bg-white border rounded shadow-lg z-10">
                <li
                  onMouseDown={handleSelectPassword}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                >
                  ********
                </li>
              </ul>
            )}
          </div>

          <div className="flex justify-between text-sm">
            <Link to="/forgot-password" className="text-blue-500 hover:underline">
              Forgot Password?
            </Link>
            <Link to="/register" className="text-blue-500 hover:underline">
              Create an Account
            </Link>
          </div>

          <button
            type="submit"
            className="w-full p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;




