import React, { useEffect, useState } from "react";
import { CheckCircle2, X, AlertCircle } from "lucide-react";

export const Toast = ({
  message,
  onClose,
  duration = 3000,
  type = "success",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation
    setIsVisible(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const isError =
    type === "error" ||
    message.toLowerCase().includes("error") ||
    message.toLowerCase().includes("failed") ||
    message.toLowerCase().includes("insufficient");

  // SIMPLIFIED VERSION WITH INLINE STYLES FOR DEBUGGING
  return (
    <div
      style={{
        position: "fixed",
        top: "80px",
        right: "24px",
        zIndex: 99999,
        transition: "all 0.3s",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(-16px)",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          border: isError ? "2px solid #fecaca" : "2px solid #bbf7d0",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          minWidth: "300px",
          maxWidth: "500px",
        }}
      >
        {isError ? (
          <AlertCircle size={20} style={{ color: "#ef4444", flexShrink: 0 }} />
        ) : (
          <CheckCircle2 size={20} style={{ color: "#22c55e", flexShrink: 0 }} />
        )}
        <p
          style={{
            fontSize: "14px",
            fontWeight: 500,
            color: "#111827",
            flex: 1,
            margin: 0,
          }}
        >
          {message}
        </p>
        <button
          onClick={onClose}
          style={{
            color: "#9ca3af",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            display: "flex",
            alignItems: "center",
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = "#4b5563")}
          onMouseOut={(e) => (e.currentTarget.style.color = "#9ca3af")}
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};
