

import React, { useState, useRef, useEffect } from 'react';

import { FiCamera } from 'react-icons/fi';
import { PiImageThin } from 'react-icons/pi';
import { MdOutlineCameraswitch } from 'react-icons/md';
import ReactMarkdown from 'react-markdown';
import { useAiMutation } from '../../../../Redux/feature/ApiSlice';
import { BiUpload } from 'react-icons/bi';

function PartScanner() {
  const [mode, setMode] = useState('camera'); // 'camera' or 'upload'
  const [previewUrl, setPreviewUrl] = useState(null);
  const [aiResponse, setAiResponse] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [facingMode, setFacingMode] = useState('environment');
  const [isLoading, setIsLoading] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const streamRef = useRef(null);

  const [aiRequest] = useAiMutation();

  // Start Camera Stream
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => videoRef.current.play();
        streamRef.current = stream;
        setIsStreaming(true);
      }
    } catch (err) {
      console.error('Camera error:', err);
      alert('Cannot access camera. Check permissions.');
    }
  };

  // Stop Camera Stream
  const stopCamera = () => {
    streamRef.current?.getTracks().forEach(track => track.stop());
    streamRef.current = null;
    setIsStreaming(false);
  };

  // Capture Image from Camera
  const captureImage = async () => {
    if (videoRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      ctx.drawImage(videoRef.current, 0, 0);
      const base64Image = canvasRef.current.toDataURL('image/jpeg');
      setPreviewUrl(base64Image);
      stopCamera();
      await sendImageToAI(base64Image);
    }
  };

  // File Upload Handler
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

  

    const imageUrl = URL.createObjectURL(file);
    setPreviewUrl(imageUrl);
    await sendImageToAI(file);
  };

  // Convert base64 to Blob
  const base64ToBlob = (base64) => {
    const byteString = atob(base64.split(',')[1]);
    const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
    return new Blob([ab], { type: mimeString });
  };

  // Send Image to AI Backend
  const sendImageToAI = async (image) => {
    setIsLoading(true);
    setAiResponse('');

    try {
      const formData = new FormData();

      if (typeof image === 'string') {
        const blob = base64ToBlob(image);
        formData.append('image_path', blob, 'captured.jpg');
      } else {
        formData.append('image_path', image);
      }
       for (let pair of formData.entries()) {
                console.log(`${pair[0]}: ${pair[1]}`);
            }

      const result = await aiRequest(formData).unwrap();
      setTimeout(() => {
        setAiResponse(result.result || 'No response received.');
        setIsLoading(false);
      }, 800);
    } catch (err) {
      console.error('AI Error:', err);
      setTimeout(() => {
        setAiResponse('Sorry, an error occurred.');
        setIsLoading(false);
      }, 800);
    }
  };

  // Start camera when switching to camera mode
  useEffect(() => {
    if (mode === 'camera' && !previewUrl &&  isStreaming) {
      startCamera();
    }
    return () => stopCamera();
  }, [mode, facingMode]);

  return (
    <div className="lora md:p-10 p-6 lg:w-[80%] md:w-[90%] w-full mx-auto">
      <h2 className="text-[34px] text-[#0A3161] font-semibold">Part Scanner</h2>
      <p className="text-[#9E9E9E] text-xl">Use your camera or upload an image to identify ship parts</p>

      {/* Mode Toggle Buttons */}
      <div className="bg-[#EEEEEE] flex justify-between rounded-xl mb-6 my-10">
        <button
          onClick={() => {
            setMode('camera');
            setPreviewUrl(null);
            setAiResponse('');
            stopCamera();
          }}
          className={`w-1/2 flex justify-center items-center gap-2 py-3 rounded-lg ${mode === 'camera' ? 'bg-[#0A3161] text-white' : 'bg-transparent text-[#0A3161]'}`}
        >
          <FiCamera />
          <span>Camera</span>
        </button>

        <button
          onClick={() => {
            setMode('upload');
            setPreviewUrl(null);
            setAiResponse('');
            stopCamera();
          }}
          className={`w-1/2 flex justify-center items-center gap-2 py-3 rounded-lg ${mode === 'upload' ? 'bg-[#0A3161] text-white' : 'bg-transparent text-[#0A3161]'}`}
        >
          <BiUpload />
          <span>Upload</span>
        </button>
      </div>

      {/* Preview Area */}
      <div className="md:h-130 h-60 bg-[#0A31614D] rounded-lg flex items-center justify-center p-4 relative">
        {mode === 'camera' && !previewUrl && (
          <FiCamera className="text-[120px] absolute text-gray-500" />
        )}
        {mode === 'camera' && previewUrl ? (
          <img src={previewUrl} alt="Captured" className="h-full object-contain rounded-lg" />
        ) : mode === 'camera' ? (
          <video ref={videoRef} autoPlay playsInline className="h-full object-contain rounded-lg" />
        ) : previewUrl ? (
          <img src={previewUrl} alt="Uploaded" className="h-full object-contain rounded-lg" />
        ) : (
          <div className="text-gray-600 text-center">
            <PiImageThin className="text-[120px] mx-auto" />
            <p>Upload an image (PNG, JPG, or JPEG up to 5MB)</p>
          </div>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />
      <input
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Primary Action Button */}
      <button
        className="w-full mt-4 py-3 bg-[#0A3161] text-white rounded-lg flex items-center justify-center gap-2"
        onClick={() => {
          if (mode === 'upload') {
            fileInputRef.current && fileInputRef.current.click();
          } else {
            if (!isStreaming) startCamera();
            else captureImage();
          }
        }}
      >
        {mode === 'upload' ? (
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

      {/* Camera Flip Button */}
      {isStreaming && (
        <button
          onClick={() => {
            stopCamera();
            setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
            setTimeout(startCamera, 300);
          }}
          className="mt-2 py-2 text-white text-[20px] cursor-pointer rounded-lg absolute md:bottom-54 md:right-132 right-16 bottom-50"
        >
          <MdOutlineCameraswitch />
        </button>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="mt-6 flex items-start space-x-3">
          <div className="px-5 py-4 rounded-lg bg-[#0A31611A] text-black shadow-sm">
            <div className="flex space-x-1">
              <div
                className="w-2 h-2 bg-[#0a316194] rounded-full animate-bounce"
                style={{ animationDelay: '0ms' }}
              ></div>
              <div
                className="w-2 h-2 bg-[#093163ce] rounded-full animate-bounce"
                style={{ animationDelay: '150ms' }}
              ></div>
              <div
                className="w-2 h-2 bg-[#0A3161] rounded-full animate-bounce"
                style={{ animationDelay: '300ms' }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* AI Response Display */}
      {aiResponse && (
        <div className="mt-6 flex items-start space-x-3">
          <div className="px-5 py-4 rounded-lg bg-[#0A31611A] text-black shadow-sm w-full">
            <ReactMarkdown>{aiResponse}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

export default PartScanner;