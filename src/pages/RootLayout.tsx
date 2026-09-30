import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";

function RootLayout() {
  return (
    <div>
      <Toaster />

      <Navbar />

      <Outlet />
    </div>
  );
}

export default RootLayout;