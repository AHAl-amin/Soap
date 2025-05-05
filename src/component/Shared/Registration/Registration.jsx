import React, { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form logic
  };

  return (
    <div className="flex items-center justify-center md:py-40 py-8 lora">
      <div className="bg-white p-8 rounded-lg shadow w-full md:w-1/2 lg:w-1/3">
        <h2 className="text-4xl font-bold text-center text-[#0A3161] mb-2">Create Account</h2>
        <p className="text-center text-gray-500 mb-6 text-xl">
          Enter your credentials to access The Ship Maintenance System
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Full Name */}
          <div>
           
            <input
              id="full-name"
              placeholder="Enter full name"
              type="text"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#0A3161]"
            />
          </div>

          {/* Email */}
          <div>
           
            <input
              id="email"
              placeholder="Enter email"
              type="email"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#0A3161]"
            />
          </div>

          {/* Password */}
          <div className="relative">
           
            <input
              id="password"
              placeholder="Enter password"
              type={showPassword ? "text" : "password"}
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
              id="confirm-password"
              placeholder="Enter confirm password"
              type={showConfirmPassword ? "text" : "password"}
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
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-xl text-gray-600">Accept all terms & conditions</span>
            </label>
            <a href="#" className="text-xl text-[#0A3161] hover:underline">
              Forget Password
            </a>
          </div>

          {/* Submit */}
          <button type="submit" className="w-full bg-[#0A3161] text-white py-3 rounded hover:bg-[#0A3161]/90 transition">
            Create Account
          </button>

          <p className="text-center text-xl text-gray-500 mt-4">Already have an account? <Link to="/login" className="font-medium text-xl text-[#0A3161] underline hover:underline cursor-pointer">Login</Link></p> 

          <p className="text-center text-sm text-gray-500 mt-4">
            By logging in, I have read the{" "}
            <a href="#" className="text-[#0A3161] hover:underline">terms of service</a> and{" "}
            <a href="#" className="text-[#0A3161] hover:underline">privacy policy</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registration;
