import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className="
        min-h-screen
        bg-gray-50
        text-gray-900
        transition-colors
        duration-300

        dark:bg-[#08090b]
        dark:text-white
      "
    >

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <main
        className={`
          min-h-screen
          transition-all
          duration-300

          ${collapsed ? "ml-[78px]" : "ml-[250px]"}
        `}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;