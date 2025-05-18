



import React, { useState, useRef } from "react";
import { useUpdateProfileMutation } from "../../../Redux/feature/ApiSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUserTie, FaEye, FaEyeSlash } from "react-icons/fa";

function Settings() {
  const [activeSection] = useState("password");
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    profileImage: null,
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [updateProfile, { isLoading, error }] = useUpdateProfileMutation();
  const fileInputRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user")) || {};
  
  const username = user?.username || "User";
  console.log(username) // ✅ Username extracted
  const profileImage = user?.profileImage;

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        toast.error("Please upload a JPEG or PNG image.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB.");
        return;
      }

      setFormData((prevData) => ({
        ...prevData,
        profileImage: file,
      }));
      handleImageSubmit(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageSubmit = async (file) => {
    const formDataToSend = new FormData();
    formDataToSend.append("profileImage", file);

    try {
      const response = await updateProfile(formDataToSend).unwrap();
      const newImageUrl = response.profileImageUrl || URL.createObjectURL(file);
      const updatedUser = { ...user, profileImage: newImageUrl };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Profile image updated successfully!");
      setFormData((prevData) => ({
        ...prevData,
        profileImage: null,
      }));
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update profile image.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      toast.error("Please fill in all password fields.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }


    try {
      const response = await updateProfile({
        current_password: formData.currentPassword,
        new_password: formData.newPassword,
      }).unwrap();

      localStorage.setItem("password", formData.newPassword);
      toast.success("Password changed successfully!");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        profileImage: null,
      });
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update password.");
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="rounded-lg md:w-1/2 p-8 w-full">
        <div className="flex gap-4 justify-center items-center mb-8">
          <div
            className="w-24 h-24 rounded-full border-4 border-blue-900 flex items-center justify-center cursor-pointer relative overflow-hidden"
            onClick={handleImageClick}
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUserTie className="text-4xl text-gray-600" />
            )}
          </div>
          <input
            type="file"
            accept="image/jpeg,image/png"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
          <h2 className="mt-4 text-2xl font-bold text-blue-900">
            {username} {/* ✅ Cleaned display */}
          </h2>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-center text-blue-900 mb-4">
            Change Password
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <input
                id="current-password"
                name="currentPassword"
                type={showPasswords.current ? "text" : "password"}
                value={formData.currentPassword}
                onChange={handleInputChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("current")}
                className="absolute right-3 top-10 text-gray-600"
              >
                {showPasswords.current ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="relative">
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                id="new-password"
                name="newPassword"
                type={showPasswords.new ? "text" : "password"}
                value={formData.newPassword}
                onChange={handleInputChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("new")}
                className="absolute right-3 top-10 text-gray-600"
              >
                {showPasswords.new ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="relative">
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type={showPasswords.confirm ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirm")}
                className="absolute right-3 top-10 text-gray-600"
              >
                {showPasswords.confirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

           

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800/80 cursor-pointer transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Saving..." : "Save & Change"}
            </button>
          </form>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
}

export default Settings;
