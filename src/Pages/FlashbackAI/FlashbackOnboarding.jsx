import React, { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { Step1_Themes } from "./Step1_Themes";
import { Step2_Style } from "./Step2_Style";
import { Step3_Upload } from "./Step3_Upload";
import { Step4_Loading } from "./Step4_Loading";
import { Step5_Final } from "./Step5_Final";
import { StepIndicator } from "./StepIndicator";
import Header from "../../Shared/Header";
import AnnouncementBar from "../../Shared/AnnouncementBar";
import Footer from "../../Shared/Footer";
import { Step5_Login } from "./Step5_Login";
import { Toast } from "../../Shared/Toast";
import {
  saveVideoFormData,
  clearVideoFormData,
  uploadVideo,
} from "../../Redux/VideoUpload";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Map theme IDs to API memory_theme values
const themeNameMap = {
  relive: "Relive",
  "age-shift": "Age Shift",
  cartoon: "Cartoon",
  polaroid: "Polaroid Style Video",
  drawing_to_live: "Drawing to live",
  wedding: "Wedding",
  valentine: "Valentine",
  "dog-video": "Dog Video",
};

export default function FlashbackOnboarding() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState("Default");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isLong, setIsLong] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Clear any previous video form data when starting fresh
  useEffect(() => {
    clearVideoFormData();
  }, []);

  // Ensure page starts at the top whenever this onboarding mounts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const handleBack = () => {
    if (step === 1) {
      navigate("/");
    } else if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleNext = () => setStep(step + 1);

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
    handleNext();
  };

  const handleStyleSelect = (data) => {
    if (data?.styleName) {
      setSelectedStyle(data.styleName);
    }
    handleNext();
  };

  const handleUploadComplete = async (data) => {
    if (data) {
      const { uploadedFiles: files, isLong: duration } = data;
      setUploadedFiles(files);
      setIsLong(duration);

      // Create preview URL for the first image
      if (files && files.length > 0) {
        const previewUrl = URL.createObjectURL(files[0]);
        setPreviewImage(previewUrl);
      }

      // Determine if it's a single image theme
      const singleImage = !selectedTheme?.requiresTwoImages;

      // Save all data to localStorage for later submission
      const formData = {
        memory_theme: themeNameMap[selectedTheme?.id] || selectedTheme?.name,
        theme_style: selectedStyle,
        is_long: duration,
        single_image: singleImage,
        // Store file references - we'll handle actual files when submitting
        image_one_file: files[0],
        image_two_file: files.length > 1 ? files[1] : null,
      };

      // saveVideoFormData is now async - await it
      await saveVideoFormData(formData);
      console.log("FlashbackOnboarding: Video form data saved to localStorage");

      // Check if user is already logged in
      const token = localStorage.getItem("access_token");
      if (token) {
        // User is logged in, submit video immediately
        console.log(
          "FlashbackOnboarding: User is logged in, submitting video...",
        );
        setIsSubmitting(true);

        try {
          const result = await dispatch(uploadVideo()).unwrap();
          console.log(
            "FlashbackOnboarding: Video submitted successfully:",
            result,
          );

          // Navigate to dashboard loading page to show progress
          navigate("/dashboard/create-moment", {
            state: {
              skipToLoading: true,
              videoId: result?.id,
            },
          });
        } catch (error) {
          console.error("FlashbackOnboarding: Video upload failed:", error);
          console.log("FlashbackOnboarding: Error type:", typeof error);
          console.log(
            "FlashbackOnboarding: Error keys:",
            Object.keys(error || {}),
          );
          console.log("FlashbackOnboarding: error.message:", error?.message);
          const errorMsg =
            error?.message ||
            error?.error ||
            "Video upload failed. Please try again.";
          console.log("FlashbackOnboarding: Setting toast to:", errorMsg);
          setToastMessage(errorMsg);
          setIsSubmitting(false);
          // Continue to next step to show error or allow retry
          handleNext();
        }
      } else {
        // User not logged in, continue normal flow
        handleNext();
      }
    }
  };

  const handleLoadingComplete = () => {
    handleNext();
  };

  return (
    <div className="min-h-screen bg-[#fdfcfb] font-sans selection:bg-[#7c602e]/20">
      <AnnouncementBar />
      {/* Navigation Header */}
      <header className="px-4 sm:px-6 md:px-12 py-4 sm:py-5 md:py-6 flex items-center justify-between gap-3 border-b border-gray-100 bg-white/70 backdrop-blur-md sticky top-0 z-50">
        <button
          onClick={handleBack}
          className="text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-1 text-xs sm:text-sm font-bold uppercase tracking-wider"
        >
          <ChevronLeft size={18} /> Back
        </button>

        <Link to="/">
          <div className="text-lg sm:text-xl md:text-2xl font-serif tracking-tight text-[#7c602e] font-bold">
            PureMotion
          </div>
        </Link>

        <div className="text-gray-400 text-xs sm:text-sm font-bold tabular-nums">
          {Math.min(step, 4)} of 4
        </div>
      </header>

      {/* Main Container */}
      <main className="pt-8 sm:pt-10 md:pt-12 pb-20 sm:pb-24 px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Step dots only show for first 4 steps */}
        {step <= 4 && <StepIndicator currentStep={step} totalSteps={4} />}

        <div className="mt-8">
          {step === 1 && <Step1_Themes onSelectTheme={handleThemeSelect} />}
          {step === 2 && (
            <Step2_Style
              onNext={handleStyleSelect}
              selectedTheme={selectedTheme}
            />
          )}
          {step === 3 && (
            <Step3_Upload
              onNext={handleUploadComplete}
              selectedTheme={selectedTheme}
            />
          )}
          {step === 4 && <Step4_Loading onNext={handleLoadingComplete} />}
          {step === 5 && (
            <Step5_Final onNext={handleNext} previewImage={previewImage} />
          )}
        </div>
      </main>
      <Footer />

      {/* Toast notification */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
          duration={5000}
        />
      )}
    </div>
  );
}
