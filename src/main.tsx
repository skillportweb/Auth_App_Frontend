import { createRoot } from "react-dom/client";
import "./index.css";

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import RootLayout from "./pages/RootLayout.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import About from "./pages/About.tsx";
import App from "./App.tsx";

import UserLayout from "./pages/users/UserLayout.tsx";
import UserHome from "./pages/users/UserHome.tsx";
import UserProfile from "./pages/users/UserProfile.tsx";
import ProductDetails from "./pages/users/ProductDetails.tsx";

import OAuthSeccess from "./pages/OAuthSeccess.tsx";
import OAuthFailure from "./pages/OAuthFailure.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>

      {/* ================= ROOT ================= */}

      <Route path="/" element={<RootLayout />}>

        {/* Home */}
        <Route index element={<App />} />

        {/* Authentication */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        {/* About */}
        <Route path="about" element={<About />} />

        {/* ================= DASHBOARD ================= */}

        <Route path="dashboard" element={<UserLayout />}>

          {/* /dashboard */}
          <Route
            index
            element={<UserHome />}
          />

          {/* /dashboard/profile */}
          <Route
            path="profile"
            element={<UserProfile />}
          />

        </Route>

        {/* ================= PRODUCT DETAILS ================= */}

        {/* /user/product/1 */}
        <Route
          path="user/product/:id"
          element={<ProductDetails />}
        />

        {/* ================= OAUTH ================= */}

        <Route
          path="oauth/success"
          element={<OAuthSeccess />}
        />

        <Route
          path="oauth/failure"
          element={<OAuthFailure />}
        />

      </Route>

    </Routes>
  </BrowserRouter>
);