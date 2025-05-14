

// import React, { useState } from "react";
// import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
// import { Link, useNavigate } from "react-router-dom";
// import { useLoginMutation } from "../../../Redux/feature/authApi";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [login, { isLoading }] = useLoginMutation();
//   const navigate = useNavigate();

//   const togglePasswordVisibility = () => setShowPassword(!showPassword);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { username, password } = formData;

//     // Validate inputs (trim to avoid whitespace-only submissions)
//     if (!username.trim() || !password.trim()) {
//       toast.error("Please fill in both username and password.");
//       return;
//     }

//     const credentials = { username: username.trim(), password: password.trim() };

//     try {
//       const res = await login(credentials).unwrap();

//       if (res.access_token && res.refresh_token) {
//         localStorage.setItem("access_token", res.access_token);
//         localStorage.setItem("refresh_token", res.refresh_token);
//       } else {
//         console.warn("No access token or refresh token found in response");
//       }

//       toast.success("Login successful!");
//       navigate("/", { replace: true });
//     } catch (err) {
//       toast.error(
//         err?.data?.message || err?.error || "Login failed. Please try again."
//       );
//       console.error("Login error:", err);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center py-8 md:py-20 bg-[#0A3161] min-h-screen lora">
//       <div className="bg-white p-8 rounded-lg shadow w-full max-w-md">
//         <h2 className="text-3xl font-bold text-center text-[#0A3161] mb-2">
//           Welcome
//         </h2>
//         <p className="text-center text-gray-500 mb-6 text-lg">
//           Enter your credentials to access the ship maintenance system
//         </p>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           {/* Email */}
//           <label htmlFor="username" className="sr-only">
//         Enter username
//           </label>
//           <input
//             id="username"
//             name="username"
//             placeholder="Enter username"
//             type="text"
//             value={formData.username}
//             onChange={handleChange}
//             className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#0A3161]"
//             required
//           />

//           {/* Password */}
//           <label htmlFor="password" className="sr-only">
//             Password
//           </label>
//           <div className="relative">
//             <input
//               id="password"
//               name="password"
//               placeholder="Enter password"
//               type={showPassword ? "text" : "password"}
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#0A3161]"
//               required
//             />
//             <button
//               type="button"
//               onClick={togglePasswordVisibility}
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//               aria-label={showPassword ? "Hide password" : "Show password"}
//             >
//               {showPassword ? (
//                 <IoEyeOffOutline size={20} />
//               ) : (
//                 <IoEyeOutline size={20} />
//               )}
//             </button>
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full bg-[#0A3161] text-white py-3 rounded hover:bg-[#0A3161]/90 transition text-lg disabled:opacity-50"
//             aria-label={isLoading ? "Logging in" : "Login"}
//           >
//             {isLoading ? "Logging in..." : "Login"}
//           </button>

//           <p className="text-center text-lg text-gray-500 mt-4">
//             Don't have an account?{" "}
//             <Link
//               to="/registration"
//               className="font-medium text-lg text-[#0A3161] underline hover:underline"
//             >
//               Register
//             </Link>
//           </p>
//           <p className="text-center text-sm text-gray-500">
//             By signing in, you agree to our{" "}
//             <a href="/terms" className="text-[#0A3161] hover:underline">
//               Terms of Service
//             </a>{" "}
//             and{" "}
//             <a href="/privacy" className="text-[#0A3161] hover:underline">
//               Privacy Policy
//             </a>
//           </p>
//         </form>
//       </div>
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         closeOnClick
//         pauseOnHover
//         draggable
//         theme="light"
//       />
//     </div>
//   );
// };

// export default Login;


import  { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../Redux/feature/authApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "", 
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
    const { username, password } = formData;

    if (!username.trim() || !password.trim()) {
      toast.error("Please fill in both username and password.");
      return;
    }

    // Adjust based on backend expectation (username or email)
    // const credentials = { username: username.trim(), password: password.trim() };
    const data = { username, password };
   
    try {
      const res = await login(data).unwrap();

      console.log({res});

      if (res.access_token && res.refresh_token) {
        localStorage.setItem("access_token", res.access_token);
        localStorage.setItem("refresh_token", res.refresh_token);
      } else {
        console.warn("No access token or refresh token found in response", res);
      }

      toast.success("Login successful!");
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Login error details:", {
        status: err.status,
        data: err.data,
        error: err.error,
        message: err.message,
      });
      toast.error(
        err?.data?.message || err?.error || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center py-8 md:py-20 bg-[#0A3161] min-h-screen lora">
      <div className="bg-white p-8 rounded-lg shadow w-full md:w-1/3">
        <h2 className="text-3xl font-bold text-center text-[#0A3161] mb-2">
          Welcome
        </h2>
        <p className="text-center text-gray-500 mb-6 text-lg">
          Enter your credentials to access the ship maintenance system
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="username" className="sr-only">
            Username
          </label>
          <input
            id="username"
            name="username"
            placeholder="Enter username" // Change to "Enter email" if using email
            type="text" // Change to "email" if backend expects email
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#0A3161]"
            required
          />

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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#0A3161] text-white py-3 rounded hover:bg-[#0A3161]/90 transition text-lg disabled:opacity-50 cursor-pointer"
            aria-label={isLoading ? "Logging in" : "Login"}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-lg text-gray-500 mt-4">
            Don't have an account?{" "}
            <Link
              to="/registration"
              className="font-medium text-lg text-[#0A3161] cursor-pointer underline hover:underline"
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