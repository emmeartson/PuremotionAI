import { createBrowserRouter } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import Home from "../Pages/Home/Home";
import { ProtectedRoute } from "./ProtectedRoute";

// Lazy-loaded routes — these won't be included in the initial JS bundle
const FlashbackOnboarding = lazy(() => import("../Pages/FlashbackAI/FlashbackOnboarding"));
const Step5_Login = lazy(() => import("../Pages/FlashbackAI/Step5_Login").then(m => ({ default: m.Step5_Login })));
const Step_PreviewReady = lazy(() => import("../Pages/FlashbackAI/Step_PreviewReady").then(m => ({ default: m.Step_PreviewReady })));
const PricingPage = lazy(() => import("../Pages/Pricing/PricingPage"));
const LoginPage = lazy(() => import("../Pages/Authentication/SignIn"));
const GetCreditPage = lazy(() => import("../Pages/Dashboard/GetCreditPage").then(m => ({ default: m.GetCreditPage })));
const DashboardLayout = lazy(() => import("../Pages/Dashboard/DashboardLayout").then(m => ({ default: m.DashboardLayout })));
const DashboardHome = lazy(() => import("../Pages/Dashboard/DashboardHome").then(m => ({ default: m.DashboardHome })));
const InviteFriendsPage = lazy(() => import("../Pages/Dashboard/InviteFriendsPage").then(m => ({ default: m.InviteFriendsPage })));
const MomentsGallery = lazy(() => import("../Pages/Dashboard/MomentsGallery").then(m => ({ default: m.MomentsGallery })));
const ProfileSettingsPage = lazy(() => import("../Pages/Dashboard/ProfileSettingsPage").then(m => ({ default: m.ProfileSettingsPage })));
const GetCoinPage2 = lazy(() => import("../Pages/Dashboard/GetCoinPage2"));
const Questions = lazy(() => import("../Pages/Dashboard/Survey/Questions"));
const ThankYouPage = lazy(() => import("../Pages/Dashboard/Survey/Thankyou"));
const UpsalePage = lazy(() => import("../Pages/Pricing/UpsalePage"));
const BestDeal = lazy(() => import("../Pages/Pricing/BestDeal"));
const DashboardFlashbackFlow = lazy(() => import("../Pages/Dashboard/DashboardFlashbackFlow"));
const FinalResult = lazy(() => import("../Pages/Dashboard/FinalResult"));
const ContactForm = lazy(() => import("../Pages/Home/ContactForm"));
const PrivacyPolicy = lazy(() => import("../Shared/PrivacyPolicy"));
const TnC = lazy(() => import("../Shared/TnC"));
const Test = lazy(() => import("../Pages/Dashboard/test"));
const PaymentTestPage = lazy(() => import("../Pages/Stripe/PaymentTestPage"));
const Step_onlyemail = lazy(() => import("../Pages/FlashbackAI/Step_onlyemail"));

// Minimal loading fallback — keeps CLS low
const PageLoader = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
    <div style={{ width: 32, height: 32, border: "3px solid #E8D9B8", borderTopColor: "#8B6A2B", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

const L = ({ children }) => <Suspense fallback={<PageLoader />}>{children}</Suspense>;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/flashback",
    element: <L><FlashbackOnboarding /></L>,
  },
  {
    path: "/step-login",
    element: <L><Step_onlyemail /></L>,
  },
  // {
  //   path: "/step-login",
  //   element: <L><Step5_Login /></L>,
  // },
  {
    path: "/step-preview",
    element: <L><Step_PreviewReady /></L>,
  },
  {
    path: "/test",
    element: <L><Test /></L>,
  },
  {
    path: "/pricing",
    element: <L><PricingPage /></L>,
  },
  {
    path: "/upsale",
    element: <L><UpsalePage /></L>,
  },
  {
    path: "/best-deal",
    element: <L><BestDeal /></L>,
  },

  {
    path: "/contact",
    element: <L><ContactForm /></L>,
  },
  {
    path: "/privacy-policy",
    element: <L><PrivacyPolicy /></L>,
  },
  {
    path: "/terms-of-service",
    element: <L><TnC /></L>,
  },
  {
    path: "*",
    element: <Home />,
  },
  {
    path: "/payment-test",
    element: <L><PaymentTestPage /></L>,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <L><DashboardLayout /></L>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <L><DashboardHome /></L>,
      },
      {
        path: "create-moment",
        element: <L><DashboardFlashbackFlow /></L>,
      },
      {
        path: "final-result",
        element: <L><FinalResult /></L>,
      },
      {
        path: "get-Credit",
        element: <L><GetCreditPage /></L>,
      },
      {
        path: "got-Credit",
        element: <L><GetCoinPage2 /></L>,
      },
      {
        path: "invite",
        element: <L><InviteFriendsPage /></L>,
      },
      {
        path: "moments",
        element: <L><MomentsGallery /></L>,
      },
      {
        path: "survey",
        element: <L><Questions /></L>,
      },
      {
        path: "thankyou",
        element: <L><ThankYouPage /></L>,
      },
      {
        path: "settings",
        element: <L><ProfileSettingsPage /></L>,
      },

    ],
  },
]);
