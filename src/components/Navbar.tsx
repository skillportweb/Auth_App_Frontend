import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { Moon, Sun, LogOut, User as UserIcon } from "lucide-react";

import { Button } from "./ui/button";
import useAuth from "@/auth/store";

const BRAND_NAME = "Dry Fruit Store";

/* ================= NAV LINK ================= */

const NavItem = ({
  to,
  label,
}: {
  to: string;
  label: string;
}) => (
  <NavLink to={to} end>
    {({ isActive }) => (
      <motion.span
        whileHover={{ y: -1 }}
        transition={{ duration: 0.2 }}
        className={`relative cursor-pointer text-sm transition-colors ${
          isActive
            ? "font-semibold text-orange-600 dark:text-orange-400"
            : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        }`}
      >
        {label}

        {isActive && (
          <motion.span
            layoutId="navbar-active"
            className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
          />
        )}
      </motion.span>
    )}
  </NavLink>
);

const Navbar = () => {
  const checkLogin = useAuth((state) => state.checkLogin);
  const user = useAuth((state) => state.user);
  const logout = useAuth((state) => state.logout);

  const navigate = useNavigate();

  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  /* ================= THEME ================= */

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;

    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  /* ================= CLOSE DROPDOWN ================= */

  useEffect(() => {
    if (!menuOpen) return;

    const handleClick = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [menuOpen]);

  const isLoggedIn = checkLogin();

  const initial =
    user?.name?.trim()?.charAt(0)?.toUpperCase() || "U";

  /* ================= LOGOUT ================= */

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        sticky top-0 z-50
        h-14
        border-b
        border-gray-200
        bg-white/80
        text-gray-900
        shadow-sm
        backdrop-blur-xl
        transition-colors duration-300
        dark:border-white/10
        dark:bg-gray-950/80
        dark:text-white
      "
    >
      {/* Thin gradient accent line */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500" />

      <div className="container mx-auto flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ================= LOGO ================= */}

        <NavLink to="/dashboard">
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 font-semibold"
          >
            <motion.span
              whileHover={{
                rotate: 8,
                scale: 1.08,
              }}
              whileTap={{ scale: 0.95 }}
              className="
                flex h-8 w-8
                items-center justify-center
                rounded-xl
                bg-gradient-to-br
                from-amber-500
                via-orange-500
                to-rose-500
                text-base
                shadow-md
                shadow-orange-500/30
              "
            >
              🥜
            </motion.span>

            <span className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
              {BRAND_NAME}
            </span>
          </motion.div>
        </NavLink>

        {/* ================= RIGHT SIDE ================= */}

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Home link when logged out */}
          {!isLoggedIn && (
            <NavItem
              to="/"
              label="Home"
            />
          )}

          {/* ================= THEME BUTTON ================= */}

          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
          >
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="
                h-9
                w-9
                cursor-pointer
                rounded-xl
                border-gray-200
                bg-white
                text-gray-700
                transition-all duration-200
                hover:border-orange-300
                hover:bg-orange-50
                hover:text-orange-600
                dark:border-gray-800
                dark:bg-gray-900
                dark:text-gray-200
                dark:hover:bg-white/10
              "
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </motion.div>

          {/* ================= LOGGED IN ================= */}

          {isLoggedIn ? (
            <>
              {/* User name */}
              <span
                className="
                  hidden
                  max-w-[140px]
                  truncate
                  text-sm
                  font-medium
                  text-gray-700
                  dark:text-gray-200
                  sm:block
                "
              >
                {user?.name}
              </span>

              {/* User image + dropdown */}
              <div
                ref={menuRef}
                className="relative"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    setMenuOpen((prev) => !prev)
                  }
                  aria-label="Open user menu"
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                  className={`
                    flex h-9 w-9
                    cursor-pointer
                    items-center justify-center
                    rounded-full
                    bg-gradient-to-br
                    from-amber-500
                    to-orange-600
                    text-sm
                    font-bold
                    text-white
                    shadow-md
                    shadow-orange-500/30
                    outline-none
                    ring-2
                    ring-offset-2
                    ring-offset-white
                    transition-all
                    dark:ring-offset-gray-950
                    ${
                      menuOpen
                        ? "ring-orange-400"
                        : "ring-transparent"
                    }
                  `}
                >
                  {initial}
                </motion.button>

                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      role="menu"
                      initial={{
                        opacity: 0,
                        y: -8,
                        scale: 0.96,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        y: -8,
                        scale: 0.96,
                      }}
                      transition={{ duration: 0.15 }}
                      className="
                        absolute right-0 top-12
                        w-48
                        origin-top-right
                        overflow-hidden
                        rounded-2xl
                        border
                        border-gray-200
                        bg-white
                        p-2
                        shadow-xl
                        dark:border-gray-800
                        dark:bg-gray-900
                      "
                    >
                      {/* Profile */}
                      <NavLink
                        to="/dashboard/profile"
                        onClick={() => setMenuOpen(false)}
                        role="menuitem"
                        className="
                          flex w-full items-center gap-2
                          rounded-xl
                          px-3 py-2.5
                          text-sm
                          font-medium
                          text-gray-700
                          transition-colors
                          hover:bg-orange-50
                          hover:text-orange-600
                          dark:text-gray-200
                          dark:hover:bg-orange-500/10
                          dark:hover:text-orange-400
                        "
                      >
                        <UserIcon className="h-4 w-4" />
                        Profile
                      </NavLink>

                      {/* Logout */}
                      <button
                        onClick={handleLogout}
                        role="menuitem"
                        className="
                          flex w-full cursor-pointer items-center gap-2
                          rounded-xl
                          px-3 py-2.5
                          text-sm
                          font-medium
                          text-gray-700
                          transition-colors
                          hover:bg-red-50
                          hover:text-red-600
                          dark:text-gray-200
                          dark:hover:bg-red-500/10
                          dark:hover:text-red-400
                        "
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <>
              {/* ================= LOGIN ================= */}

              <NavLink to="/login">
                <motion.div
                  whileHover={{
                    scale: 1.04,
                    y: -1,
                  }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Button
                    variant="outline"
                    className="
                      h-9
                      cursor-pointer
                      rounded-xl
                      border-gray-200
                      bg-white
                      px-4
                      text-sm
                      text-gray-800
                      transition-all duration-200
                      hover:border-orange-300
                      hover:bg-orange-50
                      hover:text-orange-600
                      dark:border-gray-800
                      dark:bg-gray-900
                      dark:text-white
                      dark:hover:bg-white/10
                    "
                  >
                    Login
                  </Button>
                </motion.div>
              </NavLink>

              {/* ================= SIGNUP ================= */}

              <NavLink to="/signup">
                <motion.div
                  whileHover={{
                    scale: 1.04,
                    y: -1,
                  }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Button
                    className="
                      h-9
                      cursor-pointer
                      rounded-xl
                      border-0
                      bg-gradient-to-r
                      from-amber-500
                      to-orange-500
                      px-4
                      text-sm
                      font-semibold
                      text-white
                      shadow-md
                      shadow-orange-500/30
                      transition-all duration-200
                      hover:from-amber-600
                      hover:to-orange-600
                    "
                  >
                    Signup
                  </Button>
                </motion.div>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;