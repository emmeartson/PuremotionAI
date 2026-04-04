import React, { useEffect, useState } from "react";
import { ImagePlus, Upload, Play, Clock, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos, deleteVideo } from "../../Redux/Videos";
import { Toast } from "../../Shared/Toast";

export const DashboardHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { videos, loading, error } = useSelector((state) => state.videos);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null); // { videoId, videoTitle }
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    dispatch(fetchVideos())
      .unwrap()
      .catch((error) => {
        // Show toast for API errors
        console.log("API Error caught - Full object:", error);
        console.log("API Error caught - Type:", typeof error);
        console.log("API Error caught - Keys:", Object.keys(error || {}));
        console.log("API Error caught - error.message:", error?.message);
        console.log("API Error caught - error.error:", error?.error);

        // Try different ways to get the message
        const errorMsg =
          error?.message ||
          error?.error ||
          JSON.stringify(error) ||
          "Failed to fetch videos";
        console.log("Setting toast message to:", errorMsg);
        setToastMessage(errorMsg);
      });
  }, [dispatch]);

  // Also show toast when Redux error state changes
  useEffect(() => {
    if (error) {
      console.log("Redux error state:", error);
      setToastMessage(error);
    }
  }, [error]);

  const handleVideoClick = (video) => {
    navigate("/dashboard/final-result", { state: { videoData: video } });
  };

  const handleDeleteVideo = (e, video) => {
    e.stopPropagation();
    setConfirmDelete({
      videoId: video.id,
      videoTitle: video.memory_theme,
    });
  };

  const confirmDeleteVideo = async () => {
    if (!confirmDelete) return;

    setDeletingId(confirmDelete.videoId);
    setConfirmDelete(null);

    try {
      await dispatch(deleteVideo(confirmDelete.videoId)).unwrap();
      setToastMessage("Video deleted successfully");
    } catch (error) {
      console.log("Delete error caught - Full object:", error);
      console.log("Delete error - error.message:", error?.message);
      const errorMsg =
        error?.message || error?.error || "Failed to delete video";
      console.log("Setting delete toast to:", errorMsg);
      setToastMessage(errorMsg);
    } finally {
      setDeletingId(null);
    }
  };

  const cancelDelete = () => {
    setConfirmDelete(null);
  };

  return (
    <div className="flex flex-col h-full bg-[#fdfcfb]/50 pb-24 sm:pb-28 lg:pb-0">
      {/* Promo Banner */}
      <div className="bg-[#f2ede4]/60 p-3 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 border-b border-[#e5d5bc]/20">
        <Link to="/dashboard/invite" className="inline-block">
          <p className="text-[13px] font-medium text-gray-700 bg-white/70 px-4 py-1.5 rounded-full shadow-sm hover:shadow-md transition-all">
            Get free 10 Credits
          </p>
        </Link>

        {/* TEST BUTTON - Remove after testing */}
        {/* <button
          onClick={() =>
            setToastMessage(
              "Credit Balance: Insufficient credits. Required: 1, Available: 0",
            )
          }
          className="text-[13px] font-medium text-white bg-red-500 px-4 py-1.5 rounded-full shadow-sm hover:shadow-md transition-all"
        >
          Test Toast
        </button> */}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#7c602e] border-t-transparent"></div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => dispatch(fetchVideos())}
              className="text-[#7c602e] underline"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Videos Grid */}
      {!loading && !error && videos.length > 0 && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4 sm:gap-6">
            {videos.map((video) => (
              <div
                key={video.id}
                onClick={() => handleVideoClick(video)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                  <img
                    src={video.image_one}
                    alt={video.memory_theme}
                    className="w-full h-full object-cover"
                  />

                  {/* Delete button */}
                  <button
                    onClick={(e) => handleDeleteVideo(e, video)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
                    disabled={deletingId === video.id}
                  >
                    {deletingId === video.id ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>

                  {/* Play overlay */}
                  {video.generated_video ? (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white/90 rounded-full p-4">
                        <Play
                          size={32}
                          className="text-[#7c602e] fill-[#7c602e]"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="text-white text-center">
                        <Clock
                          size={24}
                          className="mx-auto mb-2 animate-pulse"
                        />
                        <p className="text-xs font-semibold">Processing...</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {video.memory_theme}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {video.theme_style} • {video.is_long ? "8s" : "4s"}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(video.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && videos.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 sm:p-8">
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm mb-8">
            <ImagePlus size={48} strokeWidth={1.5} className="text-gray-400" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-medium text-gray-900 mb-3">
            You haven't added any moments yet
          </h2>
          <p className="text-sm text-gray-400 font-medium">
            Upload your photo to bring it life and start memory collection
          </p>
        </div>
      )}

      {/* Upload Action Button */}
      <div
        onClick={() => navigate("/dashboard/create-moment")}
        className="p-4 sm:p-8 sm:pb-12 flex justify-center fixed bottom-0 left-0 right-0 lg:left-20 z-20 pb-20"
      >
        <button className="bg-[#7c602e] hover:bg-[#634d25] text-white w-full max-w-md py-3.5 sm:py-4 rounded-xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-[#7c602e]/20 active:scale-[0.98] transition-all">
          <span>Create PureMotion</span>
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={cancelDelete}
          />

          <div className="relative bg-white rounded-2xl p-6 mx-4 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Delete Video?
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "
              <span className="font-semibold">{confirmDelete.videoTitle}</span>
              "? This action cannot be undone.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={cancelDelete}
                className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteVideo}
                className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast notification */}
      {toastMessage && (
        <>
          {console.log("Rendering toast with message:", toastMessage)}
          <Toast
            message={toastMessage}
            onClose={() => setToastMessage(null)}
            duration={5000}
          />
        </>
      )}

      {/* DEBUG: Fixed test box - REMOVE AFTER TESTING */}
      {/* <div
        className="hidden sm:block"
        style={{
          position: "fixed",
          top: "100px",
          right: "20px",
          backgroundColor: "red",
          color: "white",
          padding: "20px",
          zIndex: 99999,
          fontSize: "16px",
          fontWeight: "bold",
          border: "3px solid yellow",
          borderRadius: "10px",
        }}
      >
        TEST BOX - Can you see this?
      </div> */}
    </div>
  );
};
