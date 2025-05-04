

// import React, { useState } from 'react';
// import { BiUpload } from 'react-icons/bi';
// import { FiCamera } from 'react-icons/fi';
// import { PiImageThin } from 'react-icons/pi';

// function PartScanner() {
//   // Set Camera as active by default
//   const [isCameraActive, setIsCameraActive] = useState(true);
//   const [isUploadActive, setIsUploadActive] = useState(false);

//   const handleCameraClick = () => {
//     setIsCameraActive(true);
//     setIsUploadActive(false); // Deactivate the other button
//   };

//   const handleUploadClick = () => {
//     setIsUploadActive(true);
//     setIsCameraActive(false); // Deactivate the other button
//   };

//   return (
//     <div className="lora p-10">
//       <h2 className="text-[34px] text-[#0A3161] font-semibold">Part Scanner</h2>
//       <p className="text-[#9E9E9E] text-xl">Use your camera or upload an image to identify ship parts</p>
//       <div className="bg-[#EEEEEE] flex justify-between rounded-xl mb-6 my-10">
//         <button
//           onClick={handleCameraClick}
//           className={`text-center w-1/2 flex justify-center items-center flex-row gap-2 cursor-pointer py-3 rounded-lg ${
//             isCameraActive ? 'bg-[#0A3161] text-white' : 'bg-transparent text-[#0A3161]'
//           }`}
//         >
//           <FiCamera />
//           <span>Camera</span>
//         </button>
//         <button
//           onClick={handleUploadClick}
//           className={`text-center w-1/2 flex justify-center items-center flex-row gap-2 cursor-pointer py-3 rounded-lg ${
//             isUploadActive ? 'bg-[#0A3161] text-white' : 'bg-transparent text-[#0A3161]'
//           }`}
//         >
//           <BiUpload />
//           <span>Upload</span>
//         </button>
//       </div>

//       {/* Image Upload Area */}
//       <div className="w-full h-100 bg-[#0A31614D] rounded-lg flex flex-col items-center justify-center">
//         {isCameraActive ? (
//           <div className="text-center text-gray-600 text-[120px] cursor-pointer">
//             <FiCamera />
//           </div>
//         ) : (
//           <div className="text-gray-600 cursor-pointer">
//             <PiImageThin className="text-[120px] ml-10" />
//             <p className="text-center">Upload an image</p>
//             <p className="text-center">PNG, JPG, or JPEG up to 10MB</p>
//           </div>
//         )}
//       </div>

//       {/* Dynamic Select File Button */}
//       <button
//         className="w-full mt-4 py-3 bg-[#0A3161] text-white rounded-lg flex items-center justify-center space-x-2"
//       >
//         {isCameraActive ? (
//           <>
//             <FiCamera />
//             <span>Camera</span>
//           </>
//         ) : (
//           <>
//             <BiUpload />
//             <span>Upload</span>
//           </>
//         )}
//       </button>
//     </div>
//   );
// }

// export default PartScanner;


import React, { useState, useRef } from 'react';
import { BiUpload } from 'react-icons/bi';
import { FiCamera } from 'react-icons/fi';
import { PiImageThin } from 'react-icons/pi';

function PartScanner() {
  // Set Camera as active by default
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [isUploadActive, setIsUploadActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null); // State to store uploaded image URL
  const fileInputRef = useRef(null); // Ref to trigger file input click

  const handleCameraClick = () => {
    setIsCameraActive(true);
    setIsUploadActive(false);
    setUploadedImage(null); // Clear uploaded image when switching to Camera
  };

  const handleUploadClick = () => {
    setIsUploadActive(true);
    setIsCameraActive(false);
  };

  // Handle div click to trigger file input
  const handleDivClick = () => {
    if (isUploadActive && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle file selection and image preview
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type) && file.size <= 10 * 1024 * 1024) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    } else {
      alert('Please upload a PNG, JPG, or JPEG image up to 10MB.');
    }
  };

  return (
    <div className="lora p-10">
      <h2 className="text-[34px] text-[#0A3161] font-semibold">Part Scanner</h2>
      <p className="text-[#9E9E9E] text-xl">Use your camera or upload an image to identify ship parts</p>
      <div className="bg-[#EEEEEE] flex justify-between rounded-xl mb-6 my-10">
        <button
          onClick={handleCameraClick}
          className={`text-center w-1/2 flex justify-center items-center flex-row gap-2 cursor-pointer py-3 rounded-lg ${
            isCameraActive ? 'bg-[#0A3161] text-white' : 'bg-transparent text-[#0A3161]'
          }`}
        >
          <FiCamera />
          <span>Camera</span>
        </button>
        <button
          onClick={handleUploadClick}
          className={`text-center w-1/2 flex justify-center items-center flex-row gap-2 cursor-pointer py-3 rounded-lg ${
            isUploadActive ? 'bg-[#0A3161] text-white' : 'bg-transparent text-[#0A3161]'
          }`}
        >
          <BiUpload />
          <span>Upload</span>
        </button>
      </div>

      {/* Image Upload Area */}
      <div
        className="w-full h-120 bg-[#0A31614D] rounded-lg flex flex-col items-center justify-center cursor-pointer"
        onClick={handleDivClick}
      >
        {isCameraActive ? (
          <div className="text-center text-gray-600 text-[120px]">
            <FiCamera />
          </div>
        ) : (
          <div className="text-gray-600 c">
            {uploadedImage ? (
              <img
                src={uploadedImage}
                alt="Uploaded"
                className="max-h-60 object-contain rounded-lg"
              />
            ) : (
              <>
                <PiImageThin className="text-[120px] mx-auto" />
                <p className="text-center">Upload an image</p>
                <p className="text-center">PNG, JPG, or JPEG up to 10MB</p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Dynamic Select File Button */}
      <button
        className="w-full mt-4 py-3 bg-[#0A3161] text-white rounded-lg flex items-center justify-center space-x-2"
        onClick={handleDivClick}
      >
        {isCameraActive ? (
          <>
            <FiCamera />
            <span>Camera</span>
          </>
        ) : (
          <>
            <BiUpload />
            <span>Upload</span>
          </>
        )}
      </button>
    </div>
  );
}

export default PartScanner;