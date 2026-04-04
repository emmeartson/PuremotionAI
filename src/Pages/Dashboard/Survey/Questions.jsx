import React, { useState } from "react";
import Button from "../../../Shared/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { submitSurvey } from "../../../Redux/Questions";
import { Toast } from "../../../Shared/Toast";

function Questions() {
  const [satisfaction, setSatisfaction] = useState("");
  const [reason, setReason] = useState("");
  const [ease, setEase] = useState("");
  const [unclear, setUnclear] = useState("");
  const [stopped, setStopped] = useState("");
  const [improvement, setImprovement] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const reasons = [
    {
      label: "I wanted to bring an old family photo to life",
      value: "family_photo",
    },
    {
      label: "I wanted to surprise someone with a meaningful memory",
      value: "surprise_someone",
    },
    { label: "I was curious after seeing an ad or post", value: "curious" },
    {
      label: "I wanted to preserve memories before they fade",
      value: "preserve_memories",
    },
    { label: "I was testing it out to see how it works", value: "testing" },
  ];

  const easeOptions = [
    { label: "Very easy", value: 1 },
    { label: "Somewhat easy", value: 2 },
    { label: "Neutral", value: 3 },
    { label: "Somewhat confusing", value: 4 },
    { label: "Very confusing", value: 5 },
  ];

  const unclearOptions = [
    { label: "Uploading a photo", value: "uploading_photo" },
    { label: "Choosing an animation style", value: "choosing_animation" },
    { label: "Understanding pricing & credits", value: "pricing_credits" },
    { label: "Knowing what happens after upload", value: "upload_after" },
    { label: "Checkout & payment", value: "checkout_payment" },
    { label: "I didn't feel confused", value: "none" },
  ];

  const stoppedOptions = [
    {
      label: "I wasn't sure what the final video would look like",
      value: "final_video",
    },
    { label: "I was unsure if it was worth the price", value: "price_worth" },
    {
      label: "I was worried about privacy or security",
      value: "privacy_security",
    },
    { label: "I didn't have the right photo ready", value: "wrong_photo" },
    { label: "The process felt too long", value: "process_too_long" },
    { label: "Nothing - I was happy to continue", value: "nothing" },
  ];

  const submit = async (e) => {
    e.preventDefault();

    // Validate all fields are filled
    if (
      !satisfaction ||
      !reason ||
      !ease ||
      !unclear ||
      !stopped ||
      !improvement
    ) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    setLoading(true);
    try {
      const surveyData = {
        satisfaction_level: parseInt(satisfaction) + 1, // Convert 0-4 index to 1-5
        reason_for_trying: reason,
        ease_of_understanding: ease,
        unclear_part: unclear,
        almost_stopped: stopped,
        change_suggestion: improvement,
      };

      await dispatch(submitSurvey(surveyData)).unwrap();
      navigate("/dashboard/thankyou");
    } catch (error) {
      console.error("Survey submission failed:", error);

      // Check for "Survey already submitted" error
      if (error.error === "Survey already submitted.") {
        setToast({ message: "Survey already submitted." });
        setLoading(false);
        return;
      }

      if (error.code === "token_not_valid" || error.code === "no_token") {
        alert("Your session has expired. Please log in again.");
        navigate("/step-login");
      } else {
        alert(error.message || "Failed to submit survey. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {toast && (
        <Toast message={toast.message} onClose={() => setToast(null)} />
      )}
      <form
        onSubmit={submit}
        className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6"
      >
        <h1 className="text-lg sm:text-xl font-semibold leading-snug">
          Complete a Short Survey & Receive 4 Free Video Credits
        </h1>

        <section className="space-y-3">
          <label className="text-sm sm:text-md font-bold">
            Are you satisfied with our service?
          </label>
          <div className="flex items-center flex-wrap gap-2 sm:gap-3">
            {["😃", "🙂", "😐", "😕", "☹️"].map((emo, i) => (
              <button
                type="button"
                key={i}
                onClick={() => setSatisfaction(String(i))}
                className={`w-9 h-9 rounded-md flex items-center justify-center border ${
                  satisfaction === String(i)
                    ? "border-[#7c602e] bg-[#f7efe2]"
                    : "border-gray-200"
                }`}
              >
                <span className="text-lg">{emo}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <label className="text-sm sm:text-md font-bold">
            What best describes why you tried PureMotion?
          </label>
          <div className="bg-white border rounded-lg p-4 space-y-2">
            {reasons.map((r) => (
              <label key={r.value} className="flex items-start gap-3">
                <input
                  type="radio"
                  name="reason"
                  value={r.value}
                  checked={reason === r.value}
                  onChange={() => setReason(r.value)}
                  className="mt-1"
                />
                <span className="text-sm text-gray-700">{r.label}</span>
              </label>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <label className="text-sm sm:text-md font-bold">
            How easy was it to understand what PureMotion does?
          </label>
          <div className="bg-white border rounded-lg p-4 space-y-2">
            {easeOptions.map((opt) => (
              <label key={opt.value} className="flex items-start gap-3">
                <input
                  type="radio"
                  name="ease"
                  value={opt.value}
                  checked={ease === opt.value}
                  onChange={() => setEase(opt.value)}
                  className="mt-1"
                />
                <span className="text-sm text-gray-700">{opt.label}</span>
              </label>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <label className="text-sm sm:text-md font-bold">
            Which part of the website felt most unclear or confusing?
          </label>
          <div className="bg-white border rounded-lg p-4 space-y-2">
            {unclearOptions.map((opt) => (
              <label key={opt.value} className="flex items-start gap-3">
                <input
                  type="radio"
                  name="unclear"
                  value={opt.value}
                  checked={unclear === opt.value}
                  onChange={() => setUnclear(opt.value)}
                  className="mt-1"
                />
                <span className="text-sm text-gray-700">{opt.label}</span>
              </label>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <label className="text-sm sm:text-md font-bold">
            What almost stopped you from continuing today?
          </label>
          <div className="bg-white border rounded-lg p-4 space-y-2">
            {stoppedOptions.map((opt) => (
              <label key={opt.value} className="flex items-start gap-3">
                <input
                  type="radio"
                  name="stopped"
                  value={opt.value}
                  checked={stopped === opt.value}
                  onChange={() => setStopped(opt.value)}
                  className="mt-1"
                />
                <span className="text-sm text-gray-700">{opt.label}</span>
              </label>
            ))}
          </div>
        </section>

        <div>
          <section className="space-y-2 mb-6">
            <label className="text-sm font-bold">
              If you could change ONE thing about PureMotion, what would it be?
            </label>
            <textarea
              value={improvement}
              onChange={(e) => setImprovement(e.target.value)}
              placeholder="Tell us one thing you'd change"
              className="w-full border rounded-md p-2 h-10 text-sm resize-none bg-white"
            />
          </section>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Share feedback"}
          </Button>
        </div>
      </form>
    </>
  );
}

export default Questions;
