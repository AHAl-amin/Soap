import { useState } from "react";

import { LuLockKeyhole } from "react-icons/lu";

function NewPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log({ password, confirmPassword });
    // Add your form submission logic here (e.g., API call)
  };

  return (
    <div className="flex items-center justify-between w-full min-h-screen gap-10 nunito">
      
      <div className="w-1/3 mx-auto ">
        

        <div className="shadow rounded px-10 py-20">
          {/* <h2 className="text-[28px] font-medium text-center text-[#012939] mb-6">
            Confirm Password
          </h2> */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <label htmlFor="password" className="block text-gray-400 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder= "Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(password !== "")}
               className="w-full px-4 py-2 border  border-[#5C91B1] rounded pl-10 focus:border-[#5C91B1] focus:ring-0 outline-none"
                aria-required="true"
              />
             
                <LuLockKeyhole className="text-[#959AA6] absolute bottom-3 left-3" />
              
            </div>

            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-400 mb-2"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder= "Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={() => setConfirmPasswordFocused(true)}
                onBlur={() => setConfirmPasswordFocused(confirmPassword !== "")}
                className="w-full px-4 py-2 border  border-[#5C91B1] rounded pl-10 focus:border-[#5C91B1] focus:ring-0 outline-none"
                required
                aria-required="true"
              />
            
                <LuLockKeyhole className="text-[#959AA6] absolute bottom-3 left-3" />
             
            </div>

            <div className="flex justify-center mt-16">
              <button
                type="submit"
                className="bg-[#0A3161] text-white rounded-[8px] mx-auto px-6 py-2 cursor-pointer w-[123px]"
              >
                Confirm
              </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewPassword;