import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router";
import { Moon, Sun } from "lucide-react";

import { Button } from "./ui/button";
import useAuth from "@/auth/store";

const Navbar = () => {
  const checkLogin = useAuth((state) => state.checkLogin);
  const user = useAuth((state) => state.user);
  const logout = useAuth((state) => state.logout);

  const navigate = useNavigate();

  const [isDark, setIsDark] = useState(false);

  /* ================= THEME ================= */

  useEffect(() => {
    const darkMode =
      document.documentElement.classList.contains("dark");

    setIsDark(darkMode);
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

  const isLoggedIn = checkLogin();

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
        bg-white/90
        text-gray-900
        backdrop-blur-xl
        transition-colors duration-300
        dark:border-white/10
        dark:bg-[#08090b]/90
        dark:text-white
      "
    >
      <div
        className="
          container mx-auto
          flex h-full
          items-center
          justify-between
          px-4
          sm:px-6
          lg:px-8
        "
      >
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
              whileTap={{
                scale: 0.95,
              }}
              className="
                flex h-7 w-7
                items-center justify-center
                rounded-md
                bg-gradient-to-r
                from-purple-600
                to-blue-500
                text-sm
                font-bold
                text-white
                shadow-sm
                shadow-purple-500/20
              "
            >
              A
            </motion.span>

            <span
              className="
                text-base
                tracking-tight
                text-gray-900
                dark:text-white
              "
            >
              Auth App
            </span>
          </motion.div>
        </NavLink>

        {/* ================= NAVIGATION ================= */}

        <div className="flex items-center gap-3 sm:gap-5">

          {/* ================= HOME ================= */}

          {!isLoggedIn && (
            <NavLink to="/">
              {({ isActive }) => (
                <motion.span
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.2 }}
                  className={`
                    relative
                    cursor-pointer
                    text-sm
                    transition-colors
                    ${
                      isActive
                        ? "font-medium text-purple-600 dark:text-purple-400"
                        : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    }
                  `}
                >
                  Home

                  {isActive && (
                    <motion.span
                      layoutId="navbar-active"
                      className="
                        absolute
                        -bottom-1
                        left-0
                        h-0.5
                        w-full
                        rounded-full
                        bg-purple-600
                        dark:bg-purple-400
                      "
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
                rounded-lg
                border-gray-300
                bg-white
                text-gray-700
                transition-all duration-200
                hover:bg-gray-100
                dark:border-gray-700
                dark:bg-transparent
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

          {isLoggedIn ? (
            <>
              {/* ================= LOGGED IN ================= */}

              <NavLink
                to="/dashboard/profile"
                className="
                  text-sm
                  font-medium
                  text-gray-700
                  transition-colors
                  hover:text-purple-600
                  dark:text-gray-200
                  dark:hover:text-purple-400
                "
              >
                {user?.name}
              </NavLink>

              {/* ================= LOGOUT ================= */}

              <Button
                variant="outline"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="
                  h-9
                  cursor-pointer
                  rounded-lg
                  border-gray-300
                  bg-white
                  px-4
                  text-sm
                  text-gray-800
                  transition-all duration-200
                  hover:border-gray-400
                  hover:bg-gray-100
                  dark:border-gray-700
                  dark:bg-transparent
                  dark:text-white
                  dark:hover:border-gray-600
                  dark:hover:bg-white/10
                "
              >
                Logout
              </Button>
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
                  whileTap={{
                    scale: 0.96,
                  }}
                >
                  <Button
                    variant="outline"
                    className="
                      h-9
                      cursor-pointer
                      rounded-lg
                      border-gray-300
                      bg-white
                      px-4
                      text-sm
                      text-gray-800
                      transition-all duration-200
                      hover:border-gray-400
                      hover:bg-gray-100
                      dark:border-gray-700
                      dark:bg-transparent
                      dark:text-white
                      dark:hover:border-gray-600
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
                  whileTap={{
                    scale: 0.96,
                  }}
                >
                  <Button
                    className="
                      h-9
                      cursor-pointer
                      rounded-lg
                      border-gray-300
                      bg-white
                      px-4
                      text-sm
                      text-gray-800
                      transition-all duration-200
                      hover:border-gray-400
                      hover:bg-gray-100
                      dark:border-gray-700
                      dark:bg-transparent
                      dark:text-white
                      dark:hover:border-gray-600
                      dark:hover:bg-white/10
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