import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  ThumbsUp,
  ThumbsDown,
  UploadCloud,
  Download,
} from "lucide-react";
import Button from "../../Shared/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../../Redux/Videos";
import { Toast } from "../../Shared/Toast";

function FinalResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const videoId = location.state?.videoId;
  const videoData = location.state?.videoData;

  const { videos, loading, error } = useSelector((state) => state.videos);
  const [currentVideo, setCurrentVideo] = useState(videoData || null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    // Fetch latest videos to get the generated video
    const fetchData = async () => {
      try {
        await dispatch(fetchVideos()).unwrap();
      } catch (error) {
        // Show toast for API errors
        setToastMessage(error.message || "Failed to fetch videos");
      } finally {
        setIsInitialLoad(false);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    // If we have a video ID, find it in the videos list
    if (videoId && videos.length > 0) {
      const video = videos.find((v) => v.id === videoId);
      if (video) {
        setCurrentVideo(video);
      }
    } else if (!currentVideo && videos.length > 0) {
      // If no specific video, use the most recent one
      setCurrentVideo(videos[0]);
    }
  }, [videoId, videos]);

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleDownload = async () => {
    if (currentVideo?.generated_video) {
      try {
        const response = await fetch(currentVideo.generated_video);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `puremotion-${currentVideo.id}.mp4`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } catch (error) {
        console.error("Download failed:", error);
      }
    }
  };

  // Show loading while fetching videos initially
  if (isInitialLoad || (loading && !currentVideo)) {
    return (
      <div className="max-w-full mx-auto p-4 sm:p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7c602e] mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your video...</p>
      </div>
    );
  }

  // If no video data, show a message
  if (!currentVideo) {
    return (
      <div className="max-w-full mx-auto p-4 sm:p-6 text-center">
        <div className="mb-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-12 hover:text-gray-900 transition-colors uppercase tracking-widest"
          >
            <ChevronLeft size={16} /> Back
          </button>
        </div>
        <p className="text-gray-500">
          No video data found. Please create a new moment.
        </p>
        <Button
          onClick={() => navigate("/dashboard/create-moment")}
          variant="primary"
          className="mt-4"
        >
          Create New Moment
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto p-4 sm:p-6">
      <div className="mb-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-12 hover:text-gray-900 transition-colors uppercase tracking-widest"
        >
          <ChevronLeft size={16} /> Back
        </button>
      </div>

      <div className="rounded-2xl overflow-hidden shadow-sm p-4 sm:p-6">
        <div className="max-w-full mx-auto">
          {/* Show video if generated, otherwise show the uploaded image */}
          <div className="rounded-2xl overflow-hidden bg-gray-100">
            {currentVideo.generated_video ? (
              <video
                src={currentVideo.generated_video}
                controls
                autoPlay
                loop
                className="w-full h-[300px] sm:h-[420px] md:h-[520px] object-cover rounded-2xl"
              />
            ) : (
              <div className="relative">
                <img
                  src={currentVideo.image_one}
                  alt="Uploaded moment"
                  className="w-full h-[300px] sm:h-[420px] md:h-[520px] object-cover rounded-2xl"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-2xl">
                  <div className="text-center text-white">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto mb-4"></div>
                    <p className="text-base sm:text-lg font-semibold">
                      Video is being generated...
                    </p>
                    <p className="text-sm opacity-80 mt-2">
                      This may take a few minutes
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Theme info */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              <span className="font-semibold">{currentVideo.memory_theme}</span>{" "}
              • {currentVideo.theme_style}
              {currentVideo.is_long ? " • 8 seconds" : " • 4 seconds"}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            <Button
              onClick={() => console.log("like")}
              size="sm"
              variant="secondary"
              className="bg-green-500 text-white px-4 py-2 hover:bg-green-600"
            >
              <ThumbsUp size={14} className="mr-2 stroke-[3px]" /> Like
            </Button>

            <Button
              onClick={() => console.log("dislike")}
              size="sm"
              variant="secondary"
              className="bg-red-500 text-white px-4 py-2 hover:bg-red-600"
            >
              <ThumbsDown size={14} className="mr-2 stroke-[3px]" /> Dislike
            </Button>
          </div>

          <div className="mt-6 space-y-3">
            {currentVideo?.generated_video && (
              <Button
                variant="secondary"
                size="lg"
                className="w-full flex items-center justify-center gap-2"
                onClick={handleDownload}
              >
                <Download size={16} /> Download Video
              </Button>
            )}

            {/* <Button
              variant="primary"
              size="lg"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => console.log("share")}
            >
              <UploadCloud size={16} /> Share Now
            </Button> */}
          </div>
        </div>
      </div>

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

export default FinalResult;
