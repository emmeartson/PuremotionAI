import React, { useEffect, useState, useRef } from "react";
import { Sparkles, Star, ShieldCheck, BadgeCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getVideoImageFiles } from "../../Redux/VideoUpload";

const BASE_URL = "api.puremotion.co";

export const Step4_Loading = ({ onNext, isSubmitting }) => {
  const [statusMessage, setStatusMessage] = useState(
    "Starting your video generation...",
  );
  const wsRef = useRef(null);
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [previewSrc, setPreviewSrc] = useState("");

  useEffect(() => {
    try {
      const { image_one } = getVideoImageFiles();
      if (image_one) {
        const url = URL.createObjectURL(image_one);
        setPreviewSrc(url);
        return () => URL.revokeObjectURL(url);
      }
    } catch (e) {
      console.error("Error loading preview image:", e);
    }
  }, []);

  useEffect(() => {
    // Fake progress up to 99% over 60 seconds
    const TOTAL_MS = 60000;
    const start = Date.now();
    const id = setInterval(() => {
      const p = Math.min(99, ((Date.now() - start) / TOTAL_MS) * 100);
      setProgress(p);
    }, 100);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    // Check if user has access_token
    const token = localStorage.getItem("access_token");

    if (!token) {
      // Skip this page if no token
      console.log("Step4_Loading: No access token, skipping loading page");
      onNext();
      return;
    }

    // Connect WebSocket for real-time progress
    const wsUrl = `wss://${BASE_URL}/ws/video-generation-status/?token=${token}`;
    console.log("Step4_Loading: Connecting to WebSocket:", wsUrl);

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("Step4_Loading: WebSocket connected");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Step4_Loading: Progress update:", data);

        // Handle both old format and new format
        let status, message;

        if (data.type === "send_video_status" && data.status_data) {
          // Old format
          status = data.status_data.status;
          message = data.status_data.message;
        } else if (data.status) {
          // New format - direct status and message
          status = data.status;
          message = data.message;
        }

        // Update status message
        if (message) {
          setStatusMessage(message);
        }

        // If video generation is complete
        if (status === "completed" || status === "playing") {
          setProgress(100);
          setTimeout(() => {
            ws.close();
            navigate("/dashboard");
          }, 1000);
        }
      } catch (error) {
        console.error("Step4_Loading: Error parsing WebSocket data:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("Step4_Loading: WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("Step4_Loading: WebSocket disconnected");
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [onNext, navigate]);

  return (
    <section className="relative overflow-hidden w-full animate-in fade-in zoom-in-95 duration-500">
      <div className="absolute inset-0 bg-warm-glow pointer-events-none" />
      <div className="relative mx-auto max-w-2xl px-5 pt-5 pb-8 text-center sm:px-8 sm:pt-8 sm:pb-10">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
          <Sparkles className="h-3.5 w-3.5 animate-pulse" /> Creating something special
        </div>
        <h1 className="font-serif text-3xl text-balance sm:text-5xl">
          Bringing Your Memory <span className="italic text-gradient-gold">Back To Life…</span>
        </h1>
        <p className="mt-3 text-muted-foreground">Please don't close this window. This usually takes under a minute.</p>

        {/* Photo ring with halo */}
        <div className="relative mx-auto mt-4 h-32 w-32 sm:h-44 sm:w-44">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/40 to-primary/10 blur-2xl animate-pulse" />
          <div className="relative h-full w-full rounded-full bg-gradient-gold p-1 animate-soft-zoom">
            <div className="h-full w-full overflow-hidden rounded-full ring-4 ring-background">
              <img src={previewSrc || "/grandfather.jpg"} alt="Uploaded memory" className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="pointer-events-none absolute -inset-2 rounded-full border-2 border-dashed border-primary/40 animate-spin" style={{ animationDuration: "12s" }} />
        </div>

        {/* Rotating stage message / Status message */}
        <div className="mt-4">
          <p className="fade-up text-base font-medium text-foreground sm:text-lg">{statusMessage}</p>
        </div>

        {/* Progress bar */}
        <div className="mx-auto mt-4 h-2 w-full max-w-md overflow-hidden rounded-full bg-border/60">
          <div
            className="h-full rounded-full bg-gradient-gold transition-[width] duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">{Math.floor(progress)}% complete</p>

        {/* Trust strip */}
        <div className="mx-auto mt-4 flex max-w-md flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3 w-3 fill-primary text-primary" />)}</span>
            <span className="font-semibold text-foreground">4.8</span> rating
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BadgeCheck className="h-3.5 w-3.5 text-success" /> 8,000+ happy customers
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-success" /> Private & secure
          </span>
        </div>
      </div>
    </section>
  );
};
