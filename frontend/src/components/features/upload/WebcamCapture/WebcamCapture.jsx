import { Camera, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import Button from "../../../common/Button";
import Card from "../../../common/Card";

function WebcamCapture({ onClose, onCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  async function startCamera() {
    try {
      setError("");
      setIsLoading(true);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (cameraError) {
      setError(
        "Unable to access the camera. Please check your browser permissions."
      );

      console.error(cameraError);
    } finally {
      setIsLoading(false);
    }
  }

  function stopCamera() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });

      streamRef.current = null;
    }
  }

  function capturePhoto() {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      setError("Unable to capture the image.");
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          setError("Unable to create the captured image.");
          return;
        }

        const capturedFile = new File(
          [blob],
          `dermaai-capture-${Date.now()}.jpg`,
          {
            type: "image/jpeg",
          }
        );

        stopCamera();
        onCapture(capturedFile);
      },
      "image/jpeg",
      0.9
    );
  }

  useEffect(() => {
    startCamera();

    return () => {
      stopCamera();
    };
  }, []);

  function handleClose() {
    stopCamera();
    onClose();
  }

  return (
    <Card variant="glass" className="border-cyan-500/20">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Webcam Capture
          </p>

          <h3 className="mt-2 text-xl font-semibold text-white">
            Position the affected area clearly
          </h3>
        </div>

        <button
          type="button"
          onClick={handleClose}
          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          aria-label="Close webcam"
        >
          <X size={20} />
        </button>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-800 bg-black">
        {isLoading && (
          <div className="flex min-h-80 items-center justify-center text-slate-400">
            Starting camera...
          </div>
        )}

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full ${isLoading ? "hidden" : "block"}`}
        />
      </div>

      <canvas
        ref={canvasRef}
        className="hidden"
      />

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
        >
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>

        <Button onClick={capturePhoto}>
          <Camera size={18} className="mr-2" />
          Capture Photo
        </Button>
      </div>
    </Card>
  );
}

export default WebcamCapture;