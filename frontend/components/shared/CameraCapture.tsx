import React, { useRef, useEffect, useState } from 'react';

interface CameraCaptureProps {
  onCapture: (imageDataUrl: string) => void;
  onClose: () => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let activeStream: MediaStream | null = null;
    const startCamera = async () => {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          activeStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
          setStream(activeStream);
          if (videoRef.current) {
            videoRef.current.srcObject = activeStream;
          }
        } else {
            setError('Camera access not supported by your browser.');
        }
      } catch (err) {
        console.error("Error accessing camera: ", err);
        setError('Could not access camera. Please check permissions.');
      }
    };

    startCamera();

    return () => {
      // Cleanup: stop the stream when the component unmounts
      if (activeStream) {
        activeStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL('image/png');
        onCapture(imageDataUrl);
      }
    }
  };
  
  const handleClose = () => {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black z-[120] flex flex-col items-center justify-center">
        {error ? (
             <div className="text-white text-center p-4">
                <p className="text-lg mb-4">{error}</p>
                <button onClick={handleClose} className="bg-gray-700 text-white px-6 py-2 rounded-lg">Close</button>
            </div>
        ) : (
            <>
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                <canvas ref={canvasRef} className="hidden" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 flex justify-around items-center">
                    <button onClick={handleClose} className="text-white text-sm">Cancel</button>
                    <button onClick={handleCapture} className="w-16 h-16 bg-white rounded-full border-4 border-gray-400 focus:outline-none" aria-label="Take Photo"></button>
                    <div className="w-12"></div>
                </div>
            </>
        )}
    </div>
  );
};

export default CameraCapture;