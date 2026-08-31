import {
  Camera,
  ImagePlus,
  Trash2,
  UploadCloud,
  LoaderCircle,
} from "lucide-react";

import PredictionResult from "../../features/prediction/PredictionResult";

import { useRef, useState } from "react";

import Button from "../../common/Button";
import Card from "../../common/Card";
import Container from "../../common/Container";
import SectionTitle from "../../common/SectionTitle";

import WebcamCapture from "../../features/upload/WebcamCapture";

import { predictSkinImage } from "../../../services/predictionService";


const MAX_FILE_SIZE = 5 * 1024 * 1024;

const allowedFileTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
];


function ScanSection() {
  const fileInputRef = useRef(null);


  // -------------------------
  // Existing states
  // -------------------------

  const [selectedFile, setSelectedFile] = useState(null);

  const [previewUrl, setPreviewUrl] = useState("");

  const [error, setError] = useState("");

  const [isDragging, setIsDragging] = useState(false);

  const [isWebcamOpen, setIsWebcamOpen] = useState(false);


  // -------------------------
  // AI prediction states
  // -------------------------

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [predictionResult, setPredictionResult] = useState(null);


  // -------------------------
  // Open file picker
  // -------------------------

  function openFilePicker() {
    fileInputRef.current?.click();
  }


  // -------------------------
  // Validate selected image
  // -------------------------

  function validateAndSelectFile(file) {
    setError("");

    // Clear old AI result
    setPredictionResult(null);

    if (!file) {
      return;
    }


    // Check file type
    if (!allowedFileTypes.includes(file.type)) {
      setError(
        "Please select a JPG, PNG, or WebP image."
      );

      return;
    }


    // Check maximum size
    if (file.size > MAX_FILE_SIZE) {
      setError(
        "The selected image must be smaller than 5 MB."
      );

      return;
    }


    // Remove previous preview URL
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }


    // Save image
    setSelectedFile(file);

    // Create browser preview
    setPreviewUrl(
      URL.createObjectURL(file)
    );
  }


  // -------------------------
  // File picker handler
  // -------------------------

  function handleFileChange(event) {
    const file =
      event.target.files?.[0];

    validateAndSelectFile(file);
  }


  // -------------------------
  // Drag handlers
  // -------------------------

  function handleDragOver(event) {
    event.preventDefault();

    setIsDragging(true);
  }


  function handleDragLeave(event) {
    event.preventDefault();

    setIsDragging(false);
  }


  function handleDrop(event) {
    event.preventDefault();

    setIsDragging(false);

    const file =
      event.dataTransfer.files?.[0];

    validateAndSelectFile(file);
  }


  // -------------------------
  // Webcam image handler
  // -------------------------

  function handleWebcamCapture(file) {
    validateAndSelectFile(file);

    setIsWebcamOpen(false);
  }


  // -------------------------
  // Remove selected image
  // -------------------------

  function removeSelectedFile() {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }


    setSelectedFile(null);

    setPreviewUrl("");

    setError("");

    setPredictionResult(null);


    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }


  // -------------------------
  // Start AI analysis
  // -------------------------

  async function handleAnalysis() {
    if (!selectedFile) {
      setError(
        "Please select an image first."
      );

      return;
    }


    try {
      setError("");

      setPredictionResult(null);

      setIsAnalyzing(true);


      // Send image to FastAPI
      const result =
        await predictSkinImage(
          selectedFile
        );


      // Save API response
      setPredictionResult(result);


      console.log(
        "Prediction result:",
        result
      );

    } catch (error) {

      console.error(
        "Prediction failed:",
        error
      );


      setError(
        error.message ||
        "Something went wrong during AI analysis."
      );

    } finally {

      setIsAnalyzing(false);
    }
  }


  return (
    <section
      id="scan"
      className="py-20 sm:py-24"
    >
      <Container>

        <SectionTitle
          eyebrow="Start Your Scan"
          title="Upload a Clear Skin Image"
          description="Choose a well-lit image with the affected area clearly visible. The image will be validated before it is sent for AI analysis."
          align="center"
          className="mx-auto"
        />


        <div className="mx-auto mt-12 max-w-4xl">

          {/* -------------------------
              Webcam
          ------------------------- */}

          {isWebcamOpen && (
            <div className="mb-8">

              <WebcamCapture
                onClose={() =>
                  setIsWebcamOpen(false)
                }
                onCapture={
                  handleWebcamCapture
                }
              />

            </div>
          )}


          <Card
            variant="glass"
            className="border-cyan-500/20"
          >

            {/* Hidden file input */}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="hidden"
            />


            {/* -------------------------
                No image selected
            ------------------------- */}

            {!previewUrl ? (

              <div
                onDragOver={
                  handleDragOver
                }
                onDragLeave={
                  handleDragLeave
                }
                onDrop={
                  handleDrop
                }
                className={`
                  rounded-2xl
                  border-2
                  border-dashed
                  p-8
                  text-center
                  transition
                  sm:p-12

                  ${
                    isDragging
                      ? "border-cyan-400 bg-cyan-500/10"
                      : "border-slate-700 bg-slate-950/30"
                  }
                `}
              >

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400">

                  <UploadCloud
                    size={36}
                  />

                </div>


                <h3 className="mt-6 text-xl font-semibold text-white">

                  Drag and drop your image here

                </h3>


                <p className="mt-2 text-slate-400">

                  Or select an image from your device.

                </p>


                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">

                  <Button
                    onClick={
                      openFilePicker
                    }
                  >

                    <ImagePlus
                      size={18}
                      className="mr-2"
                    />

                    Browse Image

                  </Button>


                  <Button
                    variant="secondary"
                    onClick={() =>
                      setIsWebcamOpen(true)
                    }
                  >

                    <Camera
                      size={18}
                      className="mr-2"
                    />

                    Use Webcam

                  </Button>

                </div>


                <p className="mt-6 text-sm text-slate-500">

                  Supported formats:
                  JPG, PNG and WebP
                  {" · "}
                  Maximum size: 5 MB

                </p>

              </div>

            ) : (

              /* -------------------------
                  Image selected
              ------------------------- */

              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">

                {/* Preview */}

                <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/40">

                  <img
                    src={previewUrl}
                    alt="Selected skin scan preview"
                    className="h-full max-h-[420px] w-full object-contain"
                  />

                </div>


                {/* Image details */}

                <div className="flex flex-col justify-between">

                  <div>

                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">

                      Selected Image

                    </p>


                    <h3 className="mt-3 break-all text-xl font-semibold text-white">

                      {selectedFile?.name}

                    </h3>


                    <p className="mt-2 text-slate-400">

                      Size:{" "}

                      {selectedFile
                        ? (
                            selectedFile.size /
                            1024 /
                            1024
                          ).toFixed(2)
                        : "0.00"}{" "}

                      MB

                    </p>


                    <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/70 p-4">

                      <p className="text-sm leading-6 text-slate-400">

                        Make sure the image is focused,
                        well-lit, and shows only the
                        relevant skin area as clearly
                        as possible.

                      </p>

                    </div>

                  </div>


                  {/* Buttons */}

                  <div className="mt-8 grid gap-3">

                    <Button
                      onClick={
                        handleAnalysis
                      }
                      disabled={
                        !selectedFile ||
                        isAnalyzing
                      }
                    >

                      {isAnalyzing ? (
                        <>
                          <LoaderCircle
                            size={18}
                            className="mr-2 animate-spin"
                          />

                          Analyzing...
                        </>
                      ) : (
                        "Start AI Analysis"
                      )}

                    </Button>


                    <Button
                      variant="secondary"
                      onClick={
                        removeSelectedFile
                      }
                      disabled={
                        isAnalyzing
                      }
                    >

                      <Trash2
                        size={18}
                        className="mr-2"
                      />

                      Remove Image

                    </Button>

                  </div>

                </div>

              </div>

            )}


            {/* -------------------------
                Error message
            ------------------------- */}

            {error && (

              <p
                role="alert"
                className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
              >

                {error}

              </p>

            )}


          

            <PredictionResult result={predictionResult}/>

          </Card>

        </div>

      </Container>
    </section>
  );
}


export default ScanSection;