

// import { useState } from "react";


// import login_img from '../../../assets/image/hhhh.png';
// import { LuLockKeyhole } from "react-icons/lu";
// import { MdEmail } from "react-icons/md";

// function Login() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [emailFocused, setEmailFocused] = useState(false);
//     const [passwordFocused, setPasswordFocused] = useState(false);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log({ email, password });
//     };

//     return (
//         <div className="flex items-center justify-between w-full min-h-screen gap-10 nunito">
//             <div className="w-1/2 h-screen">
//                 <img
//                     src={login_img}
//                     alt="Registration illustration"
//                     className="w-full h-screen p-10"
//                 />
//             </div>
//             <div className="w-1/2 lg:px-40">
//                 <div className="text-center mb-6">
//                     <h1 className="text-3xl text-[#000000]">ChaskiX</h1>
//                     <p className="text-3xl text-[#000000]">Logo here</p>
//                 </div>

//                 <h2 className="text-[40px] font-semibold text-center text-[#012939] mb-6">
//                     Welcome Back to ChaskiX
//                 </h2>

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div className="relative">
//                         <label className="block text-gray-700 mb-2">Email</label>
//                         <input
//                             type="email"
//                             placeholder={emailFocused ? "" : "user@gmail.com"}
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             onFocus={() => setEmailFocused(true)}
//                             onBlur={() => setEmailFocused(email !== "")}
//                             className="w-full px-4 py-2 border bg-[#F8FCFF] border-[#5C91B1] rounded pl-10"
//                             required
//                         />
//                         {!emailFocused && (
//                             <MdEmail className="text-[#959AA6] bottom-[12px] left-3 absolute" />
//                         )}
//                     </div>

//                     <div className="relative">
//                         <label className="block text-gray-700 mb-2">Password</label>
//                         <input
//                             type="password"
//                             placeholder={passwordFocused ? "" : "Password"}
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             onFocus={() => setPasswordFocused(true)}
//                             onBlur={() => setPasswordFocused(password !== "")}
//                             className="w-full px-4 py-2 border bg-[#F8FCFF] border-[#5C91B1] rounded pl-10"
//                             required
//                         />
//                         {!passwordFocused && (
//                             <LuLockKeyhole className="text-[#959AA6] absolute bottom-[14px] left-3" />
//                         )}
//                     </div>
//                     <p className="text-[16px] text-[#1B97D8] text-end underline">Forget Password?</p>

//                     <div className="flex justify-center mt-16">
//                         <button
//                             type="submit"
//                             className="bg-[#1B97D8] text-white rounded mx-auto px-6 py-2 cursor-pointer"
//                         >
//                             Login
//                         </button>
//                     </div>

//                     <p className="text-center text-gray-600 mt-6">
//                         Don’t have account?{" "}
//                         <a href="#" className="text-[#1B97D8] border rounded-lg p-1 border-[#1B97D8]">
//                             Sign Up
//                         </a>
//                     </p>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Login;




import React, { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Login = () => {
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
        <h2 className="text-4xl font-bold text-center text-[#0A3161] mb-2">Welcome </h2>
        <p className="text-center text-gray-500 mb-6 text-xl">
        Enter your credentials to access the ship maintenance system        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
     

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

    

          {/* Terms and Forget */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-xl text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-xl text-[#0A3161] hover:underline cursor-pointer">
              Forget Password
            </a>
          </div>

          {/* Submit */}
          <button type="submit" className="w-full bg-[#0A3161] text-white py-3 rounded hover:bg-[#0A3161]/90 transition text-xl cursor-pointer">
            Login
          </button>

          <p className="text-center text-xl text-gray-500 mt-4">
           Don't have an account? <Link to="/registration" className="font-medium text-xl text-[#0A3161] underline hover:underline cursor-pointer">Register</Link>
          </p>
          <p className="text-center text-gray-500">By signing in, you agree to our Terms of Service and Privacy Policy</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
