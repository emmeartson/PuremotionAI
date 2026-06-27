import React, { useState, useRef } from "react";
import { Star, Camera, Check, X, Clock, Lock, ArrowRight } from "lucide-react";
import trusted from "../../../public/trusted.png";
import { BsStarFill } from "react-icons/bs";
import { trackAddToCart } from "../../utils/metaPixel";
import imageCompression from 'browser-image-compression';
import heic2any from 'heic2any';

export const Step3_Upload = ({ onNext, selectedTheme }) => {
  const requiresTwoImages = selectedTheme?.requiresTwoImages || false;
  const isLoggedIn = !!localStorage.getItem("access_token");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isLong, setIsLong] = useState(false); // false = 4 seconds, true = 8 seconds
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileTypeError, setFileTypeError] = useState("");
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef(null);
  const submitLockRef = useRef(false);

  const maxFiles = requiresTwoImages ? 2 : 1;
  const allowedImageTypes = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];
  const maxFileSizeBytes = 30 * 1024 * 1024;

  const filterAllowedFiles = (files) => {
    let invalidTypeCount = 0;
    let oversizedCount = 0;

    const validFiles = files.filter((file) => {
      const extension = file.name.split('.').pop().toLowerCase();
      const isHeic = extension === 'heic' || extension === 'heif';
      const isAllowedType = allowedImageTypes.includes(file.type) || isHeic;
      const isAllowedSize = file.size <= maxFileSizeBytes;

      if (!isAllowedType) invalidTypeCount += 1;
      if (isAllowedType && !isAllowedSize) oversizedCount += 1;

      return isAllowedType && isAllowedSize;
    });

    const errorMessages = [];
    if (invalidTypeCount > 0) {
      errorMessages.push("Only JPG, PNG, WEBP, and HEIC images are allowed.");
    }
    if (oversizedCount > 0) {
      errorMessages.push("Each image must be 30 MB or smaller.");
    }

    setFileTypeError(errorMessages.join(" "));

    return validFiles;
  };

  const processAndCompressFiles = async (files) => {
    setIsCompressing(true);
    const processedFiles = [];
    for (const file of files) {
      try {
        let fileToCompress = file;
        const extension = file.name.split('.').pop().toLowerCase();

        if (extension === 'heic' || extension === 'heif' || file.type === 'image/heic' || file.type === 'image/heif') {
          const convertedBlob = await heic2any({
            blob: file,
            toType: "image/jpeg",
            quality: 0.8
          });
          fileToCompress = new File(
            [Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob],
            file.name.replace(/\.(heic|heif)$/i, '.jpg'),
            { type: "image/jpeg" }
          );
        }

        const options = {
          maxSizeMB: 3,
          maxWidthOrHeight: 4096,
          useWebWorker: true,
          fileType: fileToCompress.type
        };
        let compressedFile = await imageCompression(fileToCompress, options);

        // Ensure the file maintains its original name and exact type for the backend
        compressedFile = new File([compressedFile], fileToCompress.name, {
          type: fileToCompress.type,
          lastModified: Date.now(),
        });

        processedFiles.push(compressedFile);
      } catch (error) {
        console.error("Error processing file:", error);
        setFileTypeError("Error processing some images. Please try again with a different format.");
      }
    }
    setIsCompressing(false);
    return processedFiles;
  };

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    const validFiles = filterAllowedFiles(files);

    if (validFiles.length > 0) {
      const remainingSlots = maxFiles - uploadedFiles.length;
      if (remainingSlots > 0) {
        const filesToProcess = validFiles.slice(0, remainingSlots);
        const compressedFiles = await processAndCompressFiles(filesToProcess);
        setUploadedFiles(prev => [...prev, ...compressedFiles]);
      }
    }

    e.target.value = "";
  };

  const handleBrowseClick = (e) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files);
    const validFiles = filterAllowedFiles(files);

    if (validFiles.length > 0) {
      const remainingSlots = maxFiles - uploadedFiles.length;
      if (remainingSlots > 0) {
        const filesToProcess = validFiles.slice(0, remainingSlots);
        const compressedFiles = await processAndCompressFiles(filesToProcess);
        setUploadedFiles(prev => [...prev, ...compressedFiles]);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const removeFile = (index) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleContinue = async () => {
    if (!canProceed || submitLockRef.current) return;

    submitLockRef.current = true;
    setIsSubmitting(true);

    // Meta Pixel: AddToCart on successful upload + continue
    trackAddToCart();

    try {
      await Promise.resolve(onNext({ uploadedFiles, isLong }));
    } finally {
      submitLockRef.current = false;
      setIsSubmitting(false);
    }
  };

  const canProceed = requiresTwoImages
    ? uploadedFiles.length === 2
    : uploadedFiles.length >= 1;

  return (
    <section className="mx-auto max-w-2xl px-5 pt-5 pb-8 sm:px-8 sm:pt-8 sm:pb-10 animate-in fade-in zoom-in-95 duration-500">
      <div className="text-center fade-up">
        <h1 className="font-serif text-3xl text-balance sm:text-5xl text-gray-900">
          {requiresTwoImages ? "Upload two photos" : "Start with a photo you love"}
        </h1>
        <p className="mt-3 text-gray-500">
          {requiresTwoImages
            ? "Upload two images of people to create your memory"
            : "Upload a memory and watch PureMotion bring it back to life."}
        </p>
      </div>

      {/* Upload box */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`mt-5 rounded-3xl border-2 border-dashed bg-[#fbf8f3] px-6 py-7 text-center transition-all sm:p-10 ${
          uploadedFiles.length > 0 ? "border-[#7c602e]" : "border-gray-200 hover:border-[#7c602e]/50"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp,.heic,.heif,image/jpeg,image/png,image/webp,image/heic,image/heif"
          multiple={requiresTwoImages}
          onChange={handleFileSelect}
          className="hidden"
          disabled={isCompressing || isSubmitting}
        />

        {uploadedFiles.length === 0 ? (
          <>
            {isCompressing ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7c602e] mb-4"></div>
                <p className="text-gray-600 font-semibold">Processing image(s)...</p>
              </div>
            ) : (
              <>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm">
                  <Camera className="h-6 w-6" />
                </div>
                <p className="mt-4 text-lg font-medium text-gray-900">
                  Drag & drop your {requiresTwoImages ? "photos" : "photo"} here
                </p>
                <p className="text-xs text-gray-500 mt-1">Or</p>
                <button
                  onClick={handleBrowseClick}
                  disabled={isCompressing || isSubmitting}
                  className="mt-3 rounded-full px-8 py-3 text-base font-medium transition-transform hover:scale-105 active:scale-95"
                  style={{ minHeight: 56, backgroundColor: '#7c602e', color: 'white' }}
                >
                  Browse Photos
                </button>
                <p className="mt-4 text-[11px] text-gray-500">Maximum 30 MB</p>
              </>
            )}
          </>
        ) : (
          <div className="fade-in">
            {isCompressing ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7c602e] mb-4"></div>
                <p className="text-gray-600 font-semibold">Processing image(s)...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="relative group/item fade-in">
                      <div className="mx-auto h-32 w-32 overflow-hidden rounded-2xl shadow-md border border-gray-200">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Upload ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(index);
                        }}
                        disabled={isCompressing || isSubmitting}
                        className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover/item:opacity-100 transition-opacity disabled:opacity-50 z-10"
                      >
                        <X size={14} />
                      </button>
                      <p className="mt-3 text-sm text-gray-500 truncate px-2">{file.name}</p>
                    </div>
                  ))}

                  {uploadedFiles.length < maxFiles && (
                    <div
                      onClick={!(isCompressing || isSubmitting) ? handleBrowseClick : undefined}
                      className={`w-32 h-32 mt-0 mx-auto rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center transition-all ${
                        isCompressing ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-[#7c602e] hover:bg-white"
                      }`}
                    >
                      <Camera className="text-gray-400 mb-2" size={24} />
                      <p className="text-xs text-gray-500 font-medium text-center px-1">
                        Add {requiresTwoImages && uploadedFiles.length === 1 ? "second" : "another"} photo
                      </p>
                    </div>
                  )}
                </div>

                {isSubmitting && (
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#7c602e] px-5 py-2.5 text-sm font-medium text-white">
                    <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Uploading...
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {fileTypeError && (
        <p className="text-xs text-red-600 mt-2 font-medium text-center">{fileTypeError}</p>
      )}

      {/* Social proof under upload box */}
      <p className="mt-4 text-center text-[12px] text-gray-500">
        94% of users successfully upload on this step.
      </p>

      {/* Single trust card */}
      <div className="mt-5 flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-[#fbf8f3] px-5 py-4 text-center sm:flex-row sm:text-left">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#7c602e]/10 text-[#7c602e]">
          <Lock className="h-4 w-4" />
        </div>
        <div className="text-sm">
          <p className="font-semibold text-gray-900">100% private · encrypted · always yours.</p>
          <p className="text-xs text-gray-500">Only used to create your video. Deleted after processing.</p>
        </div>
      </div>

      {/* Time selection (only if not submitting and uploadedFiles exist) */}
      {isLoggedIn && uploadedFiles.length > 0 && !isSubmitting && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock size={18} className="text-[#7c602e]" />
            <span className="text-sm font-semibold text-gray-800">
              Select moment length
            </span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setIsLong(false)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                !isLong
                  ? "bg-[#7c602e] text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              4 Seconds
            </button>
            <button
              onClick={() => setIsLong(true)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                isLong
                  ? "bg-[#7c602e] text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              8 Seconds <span className="text-xs opacity-75">(1+ credit)</span>
            </button>
          </div>
        </div>
      )}

      {/* Continue button (visible after upload logic allows proceeding) */}
      {canProceed && !isSubmitting && (
        <div className="mt-6 flex justify-center fade-in">
          <button
            onClick={handleContinue}
            disabled={isSubmitting || isCompressing}
            className="inline-flex items-center gap-2 rounded-2xl bg-[#8B6A2B] px-8 py-4 text-lg font-semibold text-white shadow-[0_18px_40px_-12px_rgba(139,106,43,0.55)] transition-all hover:bg-[#74591F]"
            style={{ minHeight: 56 }}
          >
            Continue <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </section>
  );
};
