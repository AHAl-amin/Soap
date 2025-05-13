


import React, { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../../Redux/feature/authApi";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Registration = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, password, confirmPassword, acceptTerms } = formData;

    if (!fullName || !email || !password || !confirmPassword) {
      toast.error("All fields are required.");
      return;
    }

    if (password.trim() !== confirmPassword.trim()) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!acceptTerms) {
      toast.error("You must accept the terms and conditions.");
      return;
    }

    const userData = { fullName, email, password };

    try {
  const response = await register(userData).unwrap();
  console.log('Backend Response (Success):', response); // Log successful response

  toast.success("Registration successful!");
  localStorage.setItem("userEmail", email);
  navigate("/login");
} catch (err) {
  console.error('Backend Error Response:', err); // Log error response
  const errorMessage = err?.data?.message || "Registration failed.";
  const isEmailExists = /email.*exists/i.test(errorMessage);
  toast.error(isEmailExists ? "User already exists." : errorMessage);
}
  };

  return (
    <div className="flex items-center justify-center md:py-36 h-screen py-10 bg-[#0A3161]  lora">
      <div className="bg-white p-8 rounded-lg shadow w-full md:w-1/2 lg:w-1/3">
        <h2 className="text-4xl font-bold text-center text-[#0A3161] mb-2">Create Account</h2>
        <p className="text-center text-gray-500 mb-6 text-xl">
          Enter your credentials to access The Ship Maintenance System
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="fullName"
            placeholder="Enter full name"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#0A3161]"
          />

          <input
            name="email"
            placeholder="Enter email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#0A3161]"
          />

          {/* Password */}
          <div className="relative">
            <input
              name="password"
              placeholder="Enter password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#0A3161]"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              name="confirmPassword"
              placeholder="Enter confirm password"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#0A3161]"
            />
            <span
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {showConfirmPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
            </span>
          </div>

          {/* Terms and Forget */}
          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer text-xl text-gray-600">
              <input
                name="acceptTerms"
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="mr-2"
              />
              Accept all terms & conditions
            </label>
            {/* <Link to="/forgot-password" className="text-xl text-[#0A3161] hover:underline">
              Forgot Password
            </Link> */}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#0A3161] text-white py-3 rounded hover:bg-[#0A3161]/90 transition cursor-pointer"
          >
            {isLoading ? "Creating..." : "Create Account"}
          </button>

          <p className="text-center text-xl text-gray-500 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-[#0A3161] underline">
              Login
            </Link>
          </p>

          <p className="text-center text-sm text-gray-500 mt-4">
            By signing up, I agree to the{" "}
            <Link to="/terms" className="text-[#0A3161] hover:underline">terms of service</Link> and{" "}
            <Link to="/privacy" className="text-[#0A3161] hover:underline">privacy policy</Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Registration;
