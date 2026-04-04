import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../Redux/Config";

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("access_token");
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    if (!token) {
      setStatus("no-token");
      return;
    }

    let mounted = true;
    const checkSubscription = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}accounts/api/subscription-status`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!mounted) return;
        setStatus(res.data?.is_subscribed ? "allowed" : "denied");
      } catch (error) {
        if (!mounted) return;
        setStatus("denied");
      }
    };

    checkSubscription();

    return () => {
      mounted = false;
    };
  }, [token]);

  if (status === "checking") {
    return null; // optionally render a loader
  }

  if (status === "no-token") {
    return <Navigate to="/" replace />;
  }

  if (status === "denied") {
    return <Navigate to="/pricing" replace />;
  }

  return children;
};
