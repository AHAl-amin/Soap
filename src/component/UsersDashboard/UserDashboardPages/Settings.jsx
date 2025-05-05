


import React, { useState } from "react";

function Settings() {
  
  const [activeSection, setActiveSection] = useState("edit"); // "edit" | "password"


  return (
    <div className="flex justify-center md:pt-40 h-full lora">
      <div className="font-lora p-6 md:w-2/3 w-full ">
        <div className="flex items-center gap-4 justify-center pb-8">
          <img
            src="https://i.ibb.co/x2wkVkr/Whats-App-Image-2024-07-04-at-10-43-40-AM.jpg"
            alt="Profile"
            className="w-[120px] h-[120px] rounded-full border-2 border-[#0A3161]"
          />
          <span className="text-[34px] font-semibold text-[#0A3161]">Al-Amin</span>
        </div>

        <div className="mt-4 flex gap-10 justify-center">
        <button
  onClick={() => setActiveSection("edit")}
  className={`text-xl transition hover:text-[#0A3161]/80 ${
    activeSection === "edit"
      ? "text-[#0A3161] underline font-bold"
      : "text-[#0A3161]"
  }`}
>
  Edit Profile
</button>

<button
  onClick={() => setActiveSection("password")}
  className={`text-xl transition hover:text-[#0A3161]/80 ${
    activeSection === "password"
      ? "text-[#0A3161] underline font-bold"
      : "text-[#0A3161]"
  }`}
>
  Change Password
</button>



        </div>

        {activeSection === "edit" && (
          <div className="mt-6">
            <h2 className="font-semibold text-[#0A3161] mb-4 text-center text-2xl">Edit Your Profile</h2>
            <div className="flex flex-col gap-3">
              <label htmlFor="username" className="text-xl text-[#0A3161]">User Name</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your name"
                className="w-full p-2 border border-gray-300  rounded focus:outline-none focus:border-[#0A3161]"
              />
              <button className="mt-2 bg-[#0A3161] text-white px-4 py-2 rounded hover:bg-[#0A3161]/90 transition cursor-pointer">
                Save & Change
              </button>
            </div>
          </div>
        )}

        {activeSection === "password" && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-[#0A3161] mb-4 text-center">Change Password</h2>
            <div className="flex flex-col gap-3">
              <label htmlFor="current-password" className="text-xl text-[#0A3161]">Current Password</label>
              <input
                id="current-password"
                placeholder="Enter current password"
                type="password"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#0A3161]"
              />

              <label htmlFor="new-password" className="text-xl text-[#0A3161]">New Password</label>
              <input
                id="new-password"
                placeholder="Enter new password"
                type="password"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#0A3161]"
              />

              <label htmlFor="confirm-password" className="text-xl text-[#0A3161]">Confirm New Password</label>
              <input
                id="confirm-password"
                placeholder="Enter confirm new password"
                type="password"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#0A3161]"
              />

              <button className="mt-2 bg-[#0A3161] text-white px-4 py-2 rounded hover:bg-[#0A3161]/90 transition cursor-pointer">
                Save & Change
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Settings;
