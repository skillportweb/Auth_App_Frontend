import React from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tags,
  Star,
  TicketPercent,
  Warehouse,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ListTree,
} from "lucide-react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

interface SidebarProps {
  collapsed?: boolean;
  setCollapsed?: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const Sidebar: React.FC<SidebarProps> = ({
  collapsed = false,
  setCollapsed,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  /* =====================================================
     MAIN MENU
  ===================================================== */

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin",
    },
    {
      title: "Products",
      icon: Package,
      path: "/admin/products",
    },
    {
      title: "Categories",
      icon: Tags,
      path: "/admin/categories",
    },
        {
      title: "Sub Categories",
      icon: ListTree,
      path: "/admin/sub-categories",
    },
    {
      title: "Orders",
      icon: ShoppingCart,
      path: "/admin/orders",
    },
    {
      title: "Customers",
      icon: Users,
      path: "/admin/customers",
    },
    {
      title: "Reviews",
      icon: Star,
      path: "/admin/reviews",
    },
    {
      title: "Coupons",
      icon: TicketPercent,
      path: "/admin/coupons",
    },
    {
      title: "Inventory",
      icon: Warehouse,
      path: "/admin/inventory",
    },
    {
      title: "Analytics",
      icon: BarChart3,
      path: "/admin/analytics",
    },
  ];

  /* =====================================================
     SYSTEM MENU
  ===================================================== */

  const bottomItems = [
    {
      title: "Settings",
      icon: Settings,
      path: "/admin/settings",
    },
  ];

  /* =====================================================
     NAVIGATION
     React Router navigation - no page refresh
  ===================================================== */

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  /* =====================================================
     ACTIVE ROUTE
  ===================================================== */

  const isRouteActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside
      className={`
        fixed
        left-0
        z-40

        h-[calc(100vh-70px)]

        overflow-y-auto
        overflow-x-hidden

        /* =========================================
           HIDE SCROLLBAR
           Scrolling still works
        ========================================= */

        [&::-webkit-scrollbar]:hidden
        [scrollbar-width:none]
        [-ms-overflow-style:none]

        border-r
        border-gray-200

        bg-white
        text-gray-700

        shadow-sm

        transition-all
        duration-300

        dark:border-gray-800
        dark:bg-[#0b0d12]
        dark:text-gray-300
        dark:shadow-none

        ${collapsed ? "w-[80px]" : "w-[250px]"}
      `}
    >

      {/* =================================================
          COLLAPSE BUTTON
      ================================================= */}

      <button
        type="button"
        onClick={() =>
          setCollapsed?.(!collapsed)
        }
        aria-label={
          collapsed
            ? "Expand sidebar"
            : "Collapse sidebar"
        }
        className="
          absolute
          -right-3
          top-6
          z-50

          flex
          h-7
          w-7
          items-center
          justify-center

          rounded-full

          border
          border-gray-200

          bg-white
          text-gray-600

          shadow-sm

          transition-all
          duration-200

          hover:border-orange-300
          hover:bg-orange-50
          hover:text-orange-600

          dark:border-gray-700
          dark:bg-[#151922]
          dark:text-gray-300

          dark:hover:border-orange-500/50
          dark:hover:bg-orange-500/10
          dark:hover:text-orange-400
        "
      >
        {collapsed ? (
          <ChevronRight size={16} />
        ) : (
          <ChevronLeft size={16} />
        )}
      </button>

      {/* =================================================
          SIDEBAR CONTENT
      ================================================= */}

      <div className="flex min-h-full flex-col px-3 py-5">

        {/* =================================================
            MAIN MENU
        ================================================= */}

        <div className="flex-1">

          {!collapsed && (
            <p
              className="
                mb-3
                px-3

                text-xs
                font-semibold
                uppercase
                tracking-wider

                text-gray-400

                dark:text-gray-500
              "
            >
              Main Menu
            </p>
          )}

          {/* =================================================
              MENU ITEMS
          ================================================= */}

          <nav className="space-y-1">

            {menuItems.map((item) => {
              const Icon = item.icon;

              const isActive =
                isRouteActive(item.path);

              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() =>
                    handleNavigation(item.path)
                  }
                  title={
                    collapsed
                      ? item.title
                      : undefined
                  }
                  className={`
                    group

                    flex
                    w-full
                    items-center

                    rounded-xl

                    px-3
                    py-3

                    transition-all
                    duration-200

                    ${
                      collapsed
                        ? "justify-center"
                        : "gap-3"
                    }

                    ${
                      isActive
                        ? `
                          bg-orange-500
                          text-white

                          shadow-md
                          shadow-orange-500/20
                        `
                        : `
                          text-gray-600

                          hover:bg-orange-50
                          hover:text-orange-600

                          dark:text-gray-400

                          dark:hover:bg-[#171a21]
                          dark:hover:text-orange-400
                        `
                    }
                  `}
                >

                  {/* Icon */}

                  <Icon
                    size={20}
                    strokeWidth={
                      isActive ? 2.5 : 2
                    }
                    className="shrink-0"
                  />

                  {/* Text */}

                  {!collapsed && (
                    <span className="text-sm font-medium">
                      {item.title}
                    </span>
                  )}

                </button>
              );
            })}

          </nav>
        </div>

        {/* =================================================
            SYSTEM SECTION
        ================================================= */}

        <div
          className="
            mt-4

            border-t
            border-gray-200

            pt-4

            dark:border-gray-800
          "
        >

          {!collapsed && (
            <p
              className="
                mb-3
                px-3

                text-xs
                font-semibold
                uppercase
                tracking-wider

                text-gray-400

                dark:text-gray-500
              "
            >
              System
            </p>
          )}

          {/* =================================================
              SETTINGS
          ================================================= */}

          {bottomItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              isRouteActive(item.path);

            return (
              <button
                key={item.title}
                type="button"
                onClick={() =>
                  handleNavigation(item.path)
                }
                title={
                  collapsed
                    ? item.title
                    : undefined
                }
                className={`
                  flex
                  w-full
                  items-center

                  rounded-xl

                  px-3
                  py-3

                  transition-all
                  duration-200

                  ${
                    collapsed
                      ? "justify-center"
                      : "gap-3"
                  }

                  ${
                    isActive
                      ? `
                        bg-orange-500
                        text-white

                        shadow-md
                        shadow-orange-500/20
                      `
                      : `
                        text-gray-600

                        hover:bg-orange-50
                        hover:text-orange-600

                        dark:text-gray-400

                        dark:hover:bg-[#171a21]
                        dark:hover:text-orange-400
                      `
                  }
                `}
              >

                <Icon
                  size={20}
                  className="shrink-0"
                />

                {!collapsed && (
                  <span className="text-sm font-medium">
                    {item.title}
                  </span>
                )}

              </button>
            );
          })}

          {/* =================================================
              LOGOUT
          ================================================= */}

          <button
            type="button"
            onClick={() => {
              console.log("Logout clicked");

              // Yahan baad mein actual logout:
              // logout();
              // navigate("/login");
            }}
            title={
              collapsed
                ? "Logout"
                : undefined
            }
            className={`
              mt-1

              flex
              w-full
              items-center

              rounded-xl

              px-3
              py-3

              text-red-500

              transition-all
              duration-200

              hover:bg-red-50
              hover:text-red-600

              dark:text-red-400

              dark:hover:bg-red-500/10
              dark:hover:text-red-400

              ${
                collapsed
                  ? "justify-center"
                  : "gap-3"
              }
            `}
          >

            <LogOut
              size={20}
              className="shrink-0"
            />

            {!collapsed && (
              <span className="text-sm font-medium">
                Logout
              </span>
            )}

          </button>

        </div>
      </div>
    </aside>
  );
};

export default Sidebar;