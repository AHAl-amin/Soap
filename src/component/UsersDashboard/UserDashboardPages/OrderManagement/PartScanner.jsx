

import React, { useState, useRef, useEffect } from 'react';
import { BiUpload } from 'react-icons/bi';
import { FiCamera } from 'react-icons/fi';
import { PiImageThin } from 'react-icons/pi';
import { MdOutlineCameraswitch } from "react-icons/md";

function PartScanner() {
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [isUploadActive, setIsUploadActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isCameraIconVisible, setIsCameraIconVisible] = useState(true);
  const [facingMode, setFacingMode] = useState("environment"); // default to back camera

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
        };
        streamRef.current = stream;
        setIsStreaming(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Could not access camera. Please ensure camera permissions are granted.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsStreaming(false);
  };

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

  const handleUploadClick = () => {
    setIsUploadActive(true);
    setIsCameraActive(false);
    setUploadedImage(null);
    stopCamera();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type) && file.size <= 10 * 1024 * 1024) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    } else {
      alert('Please upload a PNG, JPG, or JPEG image up to 10MB.');
    }
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className="lora md:p-10 p-6 lg:w-[80%] md:w-[90%] w-full mx-auto">
      <h2 className="text-[34px] text-[#0A3161] font-semibold">Part Scanner</h2>
      <p className="text-[#9E9E9E] text-xl">Use your camera or upload an image to identify ship parts</p>

      <div className="bg-[#EEEEEE] flex justify-between rounded-xl mb-6 my-10">
        <button
          onClick={() => {
            setIsCameraActive(true);
            setIsUploadActive(false);
            setUploadedImage(null);
            stopCamera();
            setIsCameraIconVisible(true);
          }}
          className={`text-center w-1/2 flex justify-center items-center gap-2 py-3 rounded-lg ${
            isCameraActive ? 'bg-[#0A3161] text-white' : 'bg-transparent text-[#0A3161]'
          }`}
        >
          <FiCamera />
          <span>Camera</span>
        </button>

        <button
          onClick={handleUploadClick}
          className={`text-center w-1/2 flex justify-center items-center gap-2 py-3 rounded-lg ${
            isUploadActive ? 'bg-[#0A3161] text-white' : 'bg-transparent text-[#0A3161]'
          }`}
        >
          <BiUpload />
          <span>Upload</span>
        </button>
      </div>

      <div className="md:h-130 h-60 bg-[#0A31614D] rounded-lg flex items-center justify-center p-4 relative">
        {isCameraIconVisible && !uploadedImage && !isUploadActive && (
          <FiCamera className="text-[120px] absolute text-gray-500" />
        )}

        {isCameraActive ? (
          uploadedImage ? (
            <img src={uploadedImage} alt="Captured" className="h-full object-contain rounded-lg" />
          ) : (
            <video ref={videoRef} autoPlay playsInline className="h-full object-contain rounded-lg" />
          )
        ) : uploadedImage ? (
          <img src={uploadedImage} alt="Uploaded" className="h-full object-contain rounded-lg" />
        ) : (
          <div className="text-gray-600 text-center">
            <PiImageThin className="text-[120px] mx-auto" />
            <p>Upload an image (PNG, JPG, or JPEG up to 10MB)</p>
          </div>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        className="w-full mt-4 py-3 bg-[#0A3161] text-white rounded-lg flex items-center justify-center gap-2"
        onClick={() => {
          setIsCameraIconVisible(false);
          if (isUploadActive) {
            fileInputRef.current && fileInputRef.current.click();
          } else {
            setIsCameraActive(true);
            setIsUploadActive(false);
            setUploadedImage(null);
            if (!isStreaming) {
              startCamera();
            } else {
              captureImage();
            }
          }
        }}
      >
        {isUploadActive ? (
          <>
            <BiUpload />
            <span>Upload</span>
          </>
        ) : (
          <>
            <FiCamera />
            <span>{isStreaming ? 'Capture' : 'Start Camera'}</span>
          </>
        )}
      </button>

      {/* Toggle Camera Button */}
      {isStreaming && (
        <button
          onClick={() => {
            stopCamera();
            setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
            setTimeout(() => startCamera(), 300);
            
          }}
          className=" mt-2 py-2 text-white text-[20px]  cursor-pointer rounded-lg absolute md:bottom-54 md:right-132 right-16 bottom-50"
        >
          <MdOutlineCameraswitch />
        </button>
      )}
    </div>
  );
}

export default PartScanner;