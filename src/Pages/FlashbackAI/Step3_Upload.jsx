import React, { useState, useRef } from "react";
import { Star, Camera, Check, X, Clock } from "lucide-react";
import trusted from "../../../public/trusted.png";
import { BsStarFill } from "react-icons/bs";
import { trackAddToCart } from "../../utils/metaPixel";

export const Step3_Upload = ({ onNext, selectedTheme }) => {
  const requiresTwoImages = selectedTheme?.requiresTwoImages || false;
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isLong, setIsLong] = useState(false); // false = 4 seconds, true = 8 seconds
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileTypeError, setFileTypeError] = useState("");
  const fileInputRef = useRef(null);
  const submitLockRef = useRef(false);

  const maxFiles = requiresTwoImages ? 2 : 1;
  const allowedImageTypes = ["image/jpeg", "image/png"];
  const maxFileSizeBytes = 1 * 1024 * 1024;

  const filterAllowedFiles = (files) => {
    let invalidTypeCount = 0;
    let oversizedCount = 0;

    const validFiles = files.filter((file) => {
      const isAllowedType = allowedImageTypes.includes(file.type);
      const isAllowedSize = file.size <= maxFileSizeBytes;

      if (!isAllowedType) invalidTypeCount += 1;
      if (isAllowedType && !isAllowedSize) oversizedCount += 1;

      return isAllowedType && isAllowedSize;
    });

    const errorMessages = [];
    if (invalidTypeCount > 0) {
      errorMessages.push("Only JPG and PNG images are allowed.");
    }
    if (oversizedCount > 0) {
      errorMessages.push("Each image must be 1 MB or smaller.");
    }

    setFileTypeError(errorMessages.join(" "));

    return validFiles;
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = filterAllowedFiles(files);

    if (validFiles.length > 0) {
      const newFiles = [...uploadedFiles, ...validFiles].slice(0, maxFiles);
      setUploadedFiles(newFiles);
    }

    e.target.value = "";
  };

  const handleBrowseClick = (e) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files);
    const validFiles = filterAllowedFiles(files);

    if (validFiles.length > 0) {
      const newFiles = [...uploadedFiles, ...validFiles].slice(0, maxFiles);
      setUploadedFiles(newFiles);
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
    <div className="max-w-2xl mx-auto text-center animate-in fade-in zoom-in-95 duration-500 px-2 sm:px-0">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-900 mb-3 font-semibold">
        {requiresTwoImages
          ? "Upload two photos"
          : "Start with a photo you love"}
      </h1>
      <p className="text-black text-sm sm:text-base mb-6 sm:mb-8">
        {requiresTwoImages
          ? "Upload two images of people to create your memory"
          : "Upload a special memory to begin the magic."}
      </p>

      {/* Social Proof Badge */}
      <div className="flex flex-row flex-nowrap items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-full w-full sm:w-fit md:mx-auto border-2 border-[#E6D8C4] justify-center sm:justify-start md:justify-center overflow-x-auto sm:overflow-x-visible mb-8">
        <img src={trusted} alt="Trusted" className="w-20 sm:w-20 sm:h-auto" />
        <div className="flex items-center gap-2 sm:gap-3 flex-nowrap whitespace-nowrap justify-center sm:justify-start">
          <span className="text-xs sm:text-sm font-medium text-[#634910]">
            Excellent
          </span>
          <div className="flex items-center text-amber-400 gap-0.5 sm:gap-1">
            <BsStarFill className="text-xs text-[#634910]" />
            <BsStarFill className="text-xs text-[#634910]" />
            <BsStarFill className="text-xs text-[#634910]" />
            <BsStarFill className="text-xs text-[#634910]" />
            <BsStarFill className="text-xs text-[#634910]" />
          </div>
          <span className="text-xs sm:text-sm font-semibold text-[#634910]">
            4.7
          </span>
          <span className="text-gray-400 hidden sm:inline">|</span>
          <span className="text-xs sm:text-sm text-[#634910] hidden sm:inline">
            2,487 Happy Users
          </span>
        </div>
      </div>
      {/* Success Stats */}
      <div className="bg-primary/5 rounded-2xl p-5 sm:p-6 mb-8 flex items-center gap-4 sm:gap-6 max-w-sm mx-auto shadow-md text-left ">
        <div className="text-3xl sm:text-4xl font-serif text-[#7c602e] font-bold">
          94%
        </div>
        <div>
          <div className="text-sm font-bold text-gray-800">
            Upload Success Rate
          </div>
          <p className="text-xs text-black leading-tight">
            Most users upload an image on this step
          </p>
        </div>
      </div>

      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-[#e5d5bc] rounded-[2rem] p-8 sm:p-12 mb-8 cursor-pointer hover:bg-[#fdfcfb] transition-all group relative"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,image/jpeg,image/png"
          multiple={requiresTwoImages}
          onChange={handleFileSelect}
          className="hidden"
        />

        {uploadedFiles.length === 0 ? (
          <>
            <div className="bg-gray-50 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Camera className="text-gray-400" size={28} />
            </div>
            <p className="text-gray-600 font-semibold mb-1">
              Drag & drop your {requiresTwoImages ? "photos" : "photo"} here
            </p>
            <p className="text-gray-400 text-sm mb-6 font-medium">Or</p>
            <button
              onClick={handleBrowseClick}
              className="bg-[#7c602e] text-white px-10 py-2.5 rounded-xl text-sm font-semibold shadow-md hover:bg-[#6b5127] transition-colors"
            >
              Browse
            </button>
          </>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto ">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="relative group/item">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-40 object-cover rounded-xl border-2 border-gray-200"
                  />
                  <button
                    onClick={() => removeFile(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover/item:opacity-100 transition-opacity"
                  >
                    <X size={16} />
                  </button>
                  <p className="text-xs text-gray-500 mt-2 truncate">
                    {file.name}
                  </p>
                </div>
              ))}

              {uploadedFiles.length < maxFiles && (
                <div
                  onClick={handleBrowseClick}
                  className="w-full h-40 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#7c602e] hover:bg-gray-50 transition-all"
                >
                  <Camera className="text-gray-400 mb-2" size={24} />
                  <p className="text-xs text-gray-500 font-medium">
                    Add{" "}
                    {requiresTwoImages && uploadedFiles.length === 1
                      ? "second"
                      : "another"}{" "}
                    photo
                  </p>
                </div>
              )}
            </div>

            {canProceed && (
              <button
                onClick={handleContinue}
                disabled={isSubmitting}
                className={`px-10 py-2.5 rounded-xl text-sm font-semibold shadow-md transition-colors mt-6 ${
                  isSubmitting
                    ? "bg-[#8f7a53] text-white cursor-not-allowed"
                    : "bg-[#7c602e] text-white hover:bg-[#6b5127]"
                }`}
              >
                {isSubmitting ? "Uploading..." : "Continue"}
              </button>
            )}
          </div>
        )}
      </div>

      <p className="text-xs text-gray-500 mb-3">
        Allowed: JPG, PNG. Max size: 1 MB per photo.
      </p>

      {fileTypeError && (
        <p className="text-xs text-red-600 mb-6 font-medium">{fileTypeError}</p>
      )}

      {requiresTwoImages ? (
        <>
          <p className="text-[#7c602e] font-bold mb-2 text-sm sm:text-base">
            Upload Two Images of People
          </p>
          <p className="text-xs text-gray-400 mb-8 max-w-xs mx-auto leading-relaxed">
            This theme requires two images of people to create your special
            memory.
          </p>
        </>
      ) : (
        <>
          <p className="text-[#7c602e] font-bold mb-2 text-sm sm:text-base">
            Start With Just One Photo
          </p>
          <p className="text-xs text-black mb-8 max-w-xs mx-auto leading-relaxed">
            You can upload many more right after onboarding — this first photo
            simply helps us begin.
          </p>
        </>
      )}

      {/* Time selection  */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Clock size={18} className="text-[#7c602e]" />
          <span className="text-sm font-semibold text-gray-800">
            Select moment length
          </span>
        </div>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setIsLong(false)}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              !isLong
                ? "bg-[#7c602e] text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            4 Seconds
          </button>
          <button
            onClick={() => setIsLong(true)}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              isLong
                ? "bg-[#7c602e] text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            8 Seconds <span className="text-xs opacity-75">(1+ credit)</span>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 text-[10px] text-gray-700 font-bold uppercase tracking-widest bg-gray-50/50 py-3 rounded-full border border-gray-100">
        <Check size={14} className="text-green-500 stroke-[3px]" /> AI-guided
        animation styles - no guesswork
      </div>
    </div>
  );
};
