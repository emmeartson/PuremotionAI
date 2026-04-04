import React, { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { Step1_Themes } from "../FlashbackAI/Step1_Themes";
import { Step2_Style } from "../FlashbackAI/Step2_Style";
import { Step3_Upload } from "../FlashbackAI/Step3_Upload";
import { Step4_Loading } from "../FlashbackAI/Step4_Loading";
import { StepIndicator } from "../FlashbackAI/StepIndicator";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Toast } from "../../Shared/Toast";
import {
  uploadVideo,
  saveVideoFormData,
  clearVideoFormData,
} from "../../Redux/VideoUpload";
import Test from "./test";

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

export default function DashboardFlashbackFlow() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Check if redirected from FlashbackOnboarding with skipToLoading flag
  const skipToLoading = location.state?.skipToLoading;
  const redirectVideoId = location.state?.videoId;

  const [step, setStep] = useState(skipToLoading ? 4 : 1);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState("Default");
  const [isSubmitting, setIsSubmitting] = useState(
    skipToLoading ? true : false,
  );
  const [error, setError] = useState(null);
  const [videoId, setVideoId] = useState(redirectVideoId || null);
  const [toastMessage, setToastMessage] = useState(null);

  // If redirected with video ID, set it
  useEffect(() => {
    if (skipToLoading && redirectVideoId) {
      console.log(
        "DashboardFlashbackFlow: Redirected from onboarding with video ID:",
        redirectVideoId,
      );
    }
  }, [skipToLoading, redirectVideoId]);

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate("/dashboard");
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

      // Determine if it's a single image theme
      const singleImage = !selectedTheme?.requiresTwoImages;

      // Save all data to localStorage
      const formData = {
        memory_theme: themeNameMap[selectedTheme?.id] || selectedTheme?.name,
        theme_style: selectedStyle,
        is_long: duration,
        single_image: singleImage,
        image_one_file: files[0],
        image_two_file: files.length > 1 ? files[1] : null,
      };

      await saveVideoFormData(formData);
      console.log("DashboardFlashbackFlow: Video form data saved");

      // Submit video immediately since user is logged in
      setIsSubmitting(true);
      setError(null);

      try {
        console.log("DashboardFlashbackFlow: Submitting video...");
        const result = await dispatch(uploadVideo()).unwrap();
        console.log(
          "DashboardFlashbackFlow: Video submitted successfully:",
          result,
        );
        // Store video ID for later use
        if (result?.id) {
          setVideoId(result.id);
        }
        // Move to loading screen to show progress
        handleNext();
      } catch (err) {
        console.error("DashboardFlashbackFlow: Video upload failed:", err);
        console.log("DashboardFlashbackFlow: Error type:", typeof err);
        console.log(
          "DashboardFlashbackFlow: Error keys:",
          Object.keys(err || {}),
        );
        console.log("DashboardFlashbackFlow: err.message:", err?.message);
        const errorMsg =
          err?.message ||
          err?.error ||
          "Failed to upload video. Please try again.";
        console.log(
          "DashboardFlashbackFlow: Setting error/toast to:",
          errorMsg,
        );
        setError(errorMsg);
        setToastMessage(errorMsg);
        setIsSubmitting(false);
      }
    }
  };

  const handleLoadingComplete = () => {
    // WebSocket has confirmed completion, navigate to result
    navigate("/dashboard/final-result", {
      state: { videoId },
    });
  };

  return (
    <div className="min-h-screen bg-[#fdfcfb] font-sans overflow-x-hidden">
      {/* Navigation Header */}
      <header className="px-4 sm:px-6 md:px-12 py-4 sm:py-5 md:py-6 flex items-center justify-between border-b border-gray-100 bg-white/70 backdrop-blur-md sticky top-0 z-50">
        <button
          onClick={handleBack}
          className="text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-1 text-xs sm:text-sm font-bold uppercase tracking-wider"
        >
          <ChevronLeft size={16} className="sm:w-[18px] sm:h-[18px]" /> Back
        </button>

        <div className="text-lg sm:text-2xl font-serif tracking-tight text-[#7c602e] font-bold">
          PureMotion
        </div>

        <div className="text-gray-400 text-xs sm:text-sm font-bold tabular-nums">
          {Math.min(step, 4)} of 4
        </div>
      </header>

      {/* Error Message */}
      {error && (
        <div className="max-w-md mx-4 sm:mx-auto mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
          <button onClick={() => setError(null)} className="ml-2 underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Main Container */}
      <main className="pt-8 sm:pt-10 md:pt-12 pb-20 sm:pb-24 px-4 sm:px-6 max-w-5xl mx-auto overflow-hidden">
        {/* Step dots only show for first 4 steps */}
        {step <= 4 && <StepIndicator currentStep={step} totalSteps={4} />}

        <div className="mt-6 sm:mt-8">
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
          {step === 4 && (
            <Test onNext={handleLoadingComplete} isSubmitting={isSubmitting} />
          )}
        </div>
      </main>

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
