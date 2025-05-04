

// import React, { useState, useRef } from 'react';
// import { BiUpload } from 'react-icons/bi';
// import { FiCamera } from 'react-icons/fi';
// import { PiImageThin } from 'react-icons/pi';

// function PartScanner() {
//   // Set Camera as active by default
//   const [isCameraActive, setIsCameraActive] = useState(true);
//   const [isUploadActive, setIsUploadActive] = useState(false);
//   const [uploadedImage, setUploadedImage] = useState(null); // State to store uploaded image URL
//   const fileInputRef = useRef(null); // Ref to trigger file input click

//   const handleCameraClick = () => {
//     setIsCameraActive(true);
//     setIsUploadActive(false);
//     setUploadedImage(null); // Clear uploaded image when switching to Camera
//   };

//   const handleUploadClick = () => {
//     setIsUploadActive(true);
//     setIsCameraActive(false);
//   };

//   // Handle div click to trigger file input
//   const handleDivClick = () => {
//     if (isUploadActive && fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   // Handle file selection and image preview
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file && ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type) && file.size <= 10 * 1024 * 1024) {
//       const imageUrl = URL.createObjectURL(file);
//       setUploadedImage(imageUrl);
//     } else {
//       alert('Please upload a PNG, JPG, or JPEG image up to 10MB.');
//     }
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
//       <div
//         className="w-full h-120 bg-[#0A31614D] rounded-lg flex flex-col items-center justify-center cursor-pointer"
//         onClick={handleDivClick}
//       >
//         {isCameraActive ? (
//           <div className="text-center text-gray-600 text-[120px]">
//             <FiCamera />
//           </div>
//         ) : (
//           <div className="text-gray-600 c">
//             {uploadedImage ? (
//               <img
//                 src={uploadedImage}
//                 alt="Uploaded"
//                 className="max-h-60 object-contain rounded-lg"
//               />
//             ) : (
//               <>
//                 <PiImageThin className="text-[120px] mx-auto" />
//                 <p className="text-center">Upload an image</p>
//                 <p className="text-center">PNG, JPG, or JPEG up to 10MB</p>
//               </>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Hidden File Input */}
//       <input
//         type="file"
//         accept="image/png, image/jpeg, image/jpg"
//         ref={fileInputRef}
//         onChange={handleFileChange}
//         className="hidden"
//       />

//       {/* Dynamic Select File Button */}
//       <button
//         className="w-full mt-4 py-3 bg-[#0A3161] text-white rounded-lg flex items-center justify-center space-x-2"
//         onClick={handleDivClick}
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


import React, { useState, useRef, useEffect } from 'react';
import { BiUpload } from 'react-icons/bi';
import { FiCamera } from 'react-icons/fi';
import { PiImageThin } from 'react-icons/pi';

function PartScanner() {
  // State management
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [isUploadActive, setIsUploadActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null); // Stores captured or uploaded image URL
  const [isStreaming, setIsStreaming] = useState(false); // Tracks if camera stream is active
  const fileInputRef = useRef(null); // Ref for file input
  const videoRef = useRef(null); // Ref for video element
  const canvasRef = useRef(null); // Ref for canvas to capture image
  const streamRef = useRef(null); // Ref to store camera stream for cleanup

  // Start camera stream
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsStreaming(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Could not access camera. Please ensure camera permissions are granted.');
    }
  };

  // Stop camera stream
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      setIsStreaming(false);
    }
  };

  // Capture image from video stream
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);
      const imageUrl = canvasRef.current.toDataURL('image/jpeg');
      setUploadedImage(imageUrl);
      stopCamera();
    }
  };

  // Handle camera button click
  const handleCameraClick = () => {
    setIsCameraActive(true);
    setIsUploadActive(false);
    setUploadedImage(null);
    stopCamera(); // Stop any existing stream
  };

  // Handle upload button click
  const handleUploadClick = () => {
    setIsUploadActive(true);
    setIsCameraActive(false);
    stopCamera(); // Stop camera when switching to upload
  };

  // Handle div click (camera or upload)
  const handleDivClick = () => {
    if (isCameraActive) {
      if (isStreaming) {
        captureImage(); // Capture image if stream is active
      } else {
        startCamera(); // Start camera if not streaming
      }
    } else if (isUploadActive && fileInputRef.current) {
      fileInputRef.current.click(); // Trigger file input for upload
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

  // Cleanup on component unmount
  useEffect(() => {
    return () => stopCamera(); // Stop camera when component unmounts
  }, []);

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

      {/* Image Display Area */}
      <div
        className="w-full h-120 bg-[#0A31614D] rounded-lg flex flex-col items-center justify-center cursor-pointer relative"
        onClick={handleDivClick}
      >
        {isCameraActive ? (
          isStreaming ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="max-h-60 object-contain rounded-lg"
            />
          ) : uploadedImage ? (
            <img
              src={uploadedImage}
              alt="Captured"
              className="max-h-60 object-contain rounded-lg"
            />
          ) : (
            <div className="text-center text-gray-600 text-[120px]">
              <FiCamera />
            </div>
          )
        ) : (
          <div className="text-gray-600 text-center">
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

      {/* Hidden Canvas for Image Capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Dynamic Select File Button */}
      <button
        className="w-full mt-4 py-3 bg-[#0A3161] text-white rounded-lg flex items-center justify-center space-x-2"
        onClick={handleDivClick}
      >
        {isCameraActive ? (
          <>
            <FiCamera />
            <span>{isStreaming ? 'Capture' : 'Camera'}</span>
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