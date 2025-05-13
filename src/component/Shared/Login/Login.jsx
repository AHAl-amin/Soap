

// import React, { useState } from "react";
// import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
// import { Link, useNavigate } from "react-router-dom";
// import { useLoginMutation } from "../../../Redux/feature/authApi";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
   
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [login, { isLoading }] = useLoginMutation();
//   const navigate = useNavigate();
  

//   const togglePasswordVisibility = () => setShowPassword(!showPassword);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { email, password,} = formData;

//     if (!email || !password) {
//       toast.error("Please fill in both email and password.");
//       return;
//     }

//     const credentials = { email, password };

//     try {
//       const res = await login(credentials).unwrap();
       
//       console.log("backendResponse", res);

//       if (res.access_token && res.refresh_token) {
//         localStorage.setItem("access_token", res.access_token);
//         localStorage.setItem("refresh_token", res.refresh_token);

//         console.log("Access Token:", res.access_token);
//         console.log("Refresh Token:", res.refresh_token);
//       }

      
//       else {
//         console.warn("No access token found in response");
//       }

//       toast.success("Login successful!");
//       navigate("/");
//     } catch (err) {
//       toast.error(
//         err?.data?.message || err?.error || err?.message || "Login failed."
//       );
//       console.log("backendResponse", err);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center md:py-40 py-8 lora bg-[#0A3161] h-screen">
//       <div className="bg-white p-8 rounded-lg shadow w-full md:w-1/2 lg:w-1/3">
//         <h2 className="text-4xl font-bold text-center text-[#0A3161] mb-2">
//           Welcome
//         </h2>
//         <p className="text-center text-gray-500 mb-6 text-xl">
//           Enter your credentials to access the ship maintenance system
//         </p>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           {/* Email */}
//           <label htmlFor="email" className="sr-only">Email</label>
//           <input
//             id="email"
//             name="email"
//             placeholder="Enter email"
//             type="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#0A3161]"
//           />

//           {/* Password */}
//           <label htmlFor="password" className="sr-only">Password</label>
//           <div className="relative">
//             <input
//               id="password"
//               name="password"
//               placeholder="Enter password"
//               type={showPassword ? "text" : "password"}
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#0A3161]"
//             />
//             <span
//               onClick={togglePasswordVisibility}
//               className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
//             >
//               {showPassword ? (
//                 <IoEyeOffOutline size={20} />
//               ) : (
//                 <IoEyeOutline size={20} />
//               )}
//             </span>
//           </div>

//           {/* Remember me & Forgot */}
//           <div className="flex items-center justify-between">
//             <label className="flex items-center">
//               <input
//                 name="rememberMe"
//                 type="checkbox"
//                 checked={formData.rememberMe}
//                 onChange={handleChange}
//                 className="mr-2"
//               />
//               <span className="text-xl text-gray-600">Remember me</span>
//             </label>
//             {/* <Link
//               to="/forgot-password"
//               className="text-xl text-[#0A3161] hover:underline"
//             >
//               Forgot Password?
//             </Link> */}
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full bg-[#0A3161] text-white py-3 rounded hover:bg-[#0A3161]/90 transition text-xl cursor-pointer"
//           >
//             {isLoading ? "Logging in..." : "Login"}
//           </button>

//           <p className="text-center text-xl text-gray-500 mt-4">
//             Don't have an account?{" "}
//             <Link
//               to="/registration"
//               className="font-medium text-xl text-[#0A3161] underline hover:underline"
//             >
//               Register
//             </Link>
//           </p>
//           <p className="text-center text-gray-500">
//             By signing in, you agree to our Terms of Service and Privacy Policy
//           </p>
//         </form>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../Redux/feature/authApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // Validate inputs (trim to avoid whitespace-only submissions)
    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in both email and password.");
      return;
    }

    const credentials = { email: email.trim(), password: password.trim() };

    try {
      const res = await login(credentials).unwrap();

      if (res.access_token && res.refresh_token) {
        localStorage.setItem("access_token", res.access_token);
        localStorage.setItem("refresh_token", res.refresh_token);
      } else {
        console.warn("No access token or refresh token found in response");
      }

      toast.success("Login successful!");
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(
        err?.data?.message || err?.error || "Login failed. Please try again."
      );
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex items-center justify-center py-8 md:py-20 bg-[#0A3161] min-h-screen lora">
      <div className="bg-white p-8 rounded-lg shadow w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-[#0A3161] mb-2">
          Welcome
        </h2>
        <p className="text-center text-gray-500 mb-6 text-lg">
          Enter your credentials to access the ship maintenance system
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            name="email"
            placeholder="Enter email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#0A3161]"
            required
          />

          {/* Password */}
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              placeholder="Enter password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#0A3161]"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <IoEyeOffOutline size={20} />
              ) : (
                <IoEyeOutline size={20} />
              )}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#0A3161] text-white py-3 rounded hover:bg-[#0A3161]/90 transition text-lg disabled:opacity-50"
            aria-label={isLoading ? "Logging in" : "Login"}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-lg text-gray-500 mt-4">
            Don't have an account?{" "}
            <Link
              to="/registration"
              className="font-medium text-lg text-[#0A3161] underline hover:underline"
            >
              Register
            </Link>
          </p>
          <p className="text-center text-sm text-gray-500">
            By signing in, you agree to our{" "}
            <a href="/terms" className="text-[#0A3161] hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-[#0A3161] hover:underline">
              Privacy Policy
            </a>
          </p>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </div>
  );
};

export default Login;