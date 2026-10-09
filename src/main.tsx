import { createRoot } from "react-dom/client";
import "./index.css";

import {
  BrowserRouter,
  Navigate,
  Outlet,
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

import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import AdminLayout from "./pages/admin/AdminLayout.tsx";
import Products from "./pages/admin/Products.tsx";

import useAuth from "@/auth/store";
import AddProducts from "./pages/admin/forms/AddProducts.tsx";
import Categories from "./pages/admin/Categories.tsx";
import AddCategories from "./pages/admin/forms/AddCategories.tsx";
import SubCategories from "./pages/admin/SubCategories.tsx";
import AddSubCategories from "./pages/admin/forms/AddSubCategories.tsx";
import Orders from "./pages/admin/Orders.tsx";
import Customers from "./pages/admin/Customers.tsx";
import Reviews from "./pages/admin/Reviews.tsx";
import Coupons from "./pages/admin/Coupons.tsx";
import Inventory from "./pages/admin/Inventory.tsx";
import Analytics from "./pages/admin/Analytics.jsx";
import Settings from "./pages/admin/Settings.tsx";
import OrderDetails from "./pages/admin/OrderDetails.tsx";
import AddCoupons from "./pages/admin/forms/AddCoupons.tsx";

/* =========================================================
   ADMIN GUARD
========================================================= */

const AdminRoute = () => {
  const user = useAuth((state) => state.user) as
    | {
      roles?: {
        name: string;
      }[];
    }
    | null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const isAdmin = user.roles?.some(
    (role) => role.name === "ROLE_ADMIN"
  );

  return isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/dashboard" replace />
  );
};

/* =========================================================
   USER GUARD
========================================================= */

const UserRoute = () => {
  const user = useAuth((state) => state.user) as
    | {
      roles?: {
        name: string;
      }[];
    }
    | null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const isAdmin = user.roles?.some(
    (role) => role.name === "ROLE_ADMIN"
  );

  return isAdmin ? (
    <Navigate to="/admin" replace />
  ) : (
    <Outlet />
  );
};

/* =========================================================
   ROUTES
========================================================= */

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>

      {/* =================================================
          ROOT
      ================================================= */}

      <Route path="/" element={<RootLayout />}>

        {/* Home */}
        <Route index element={<App />} />

        {/* =================================================
            AUTHENTICATION
        ================================================= */}

        <Route path="login" element={<Login />} />

        <Route path="signup" element={<Signup />} />

        {/* About */}
        <Route path="about" element={<About />} />

        {/* =================================================
            USER ROUTES
        ================================================= */}

        <Route element={<UserRoute />}>

          {/* User Dashboard */}
          <Route path="dashboard" element={<UserLayout />}>

            {/* /dashboard */}
            <Route index element={<UserHome />} />

            {/* /dashboard/profile */}
            <Route
              path="profile"
              element={<UserProfile />}
            />

          </Route>

          {/* Product Details */}
          <Route
            path="user/product/:id"
            element={<ProductDetails />}
          />

        </Route>

        {/* =================================================
            ADMIN ROUTES
        ================================================= */}

        <Route path="admin" element={<AdminRoute />}>

          {/* Admin Layout */}
          <Route element={<AdminLayout />}>

            {/* /admin */}
            <Route
              index
              element={<AdminDashboard />}
            />
            

            {/* /admin/products */}
            <Route
              path="products"
              element={<Products />}
            />

            <Route
              path="add-products"
              element={<AddProducts />}
            />

            <Route
              path="categories"
              element={<Categories />}
            />
            <Route
              path="add-categories"
              element={<AddCategories />}
            />

            <Route
              path="sub-categories"
              element={<SubCategories />}
            />

            <Route
              path="add-sub-categories"
              element={<AddSubCategories />}
            />

            <Route
              path="orders"
              element={<Orders />}
            />
            <Route
              path="customers"
              element={<Customers />}
            />

              <Route
              path="reviews"
              element={<Reviews />}
            />
            <Route
              path="coupons"
              element={<Coupons />}
            />
            <Route
              path="inventory"
              element={<Inventory />}
            />
            <Route
              path="analytics"
              element={<Analytics />}
            />

             <Route
              path="settings"
              element={<Settings />}
            />
             <Route
              path="order-details"
              element={<OrderDetails />}
            />

             <Route
              path="add-coupons"
              element={<AddCoupons />}
            />

          </Route>

        </Route>

        {/* =================================================
            OAUTH
        ================================================= */}

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