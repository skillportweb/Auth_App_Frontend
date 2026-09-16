import React from "react";
import { motion } from "framer-motion";

const BACKEND_URL = "http://localhost:8083";

const OAuth2Button = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${BACKEND_URL}/oauth2/authorization/google`;
  };

  const handleGithubLogin = () => {
    window.location.href = `${BACKEND_URL}/oauth2/authorization/github`;
  };

  return (
    <div className="space-y-3">
      <motion.button
        type="button"
        onClick={handleGoogleLogin}
        whileHover={{ y: -2, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="
          flex h-11 w-full items-center justify-center gap-3 rounded-xl
          border border-gray-200 bg-gray-50 text-sm font-medium text-gray-700
          transition-all duration-200 hover:border-gray-300 hover:bg-gray-100
          dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-200
          dark:hover:border-white/20 dark:hover:bg-white/[0.07]
        "
      >
        <GoogleIcon />
        <span>Continue with Google</span>
      </motion.button>

      <motion.button
        type="button"
        onClick={handleGithubLogin}
        whileHover={{ y: -2, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="
          flex h-11 w-full items-center justify-center gap-3 rounded-xl
          border border-gray-200 bg-gray-50 text-sm font-medium text-gray-700
          transition-all duration-200 hover:border-gray-300 hover:bg-gray-100
          dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-200
          dark:hover:border-white/20 dark:hover:bg-white/[0.07]
        "
      >
        <GithubIcon />
        <span>Continue with GitHub</span>
      </motion.button>
    </div>
  );
};

export default OAuth2Button;

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.805 12.23c0-.79-.07-1.55-.2-2.28H12v4.31h5.5a4.7 4.7 0 0 1-2.04 3.09v2.57h3.3c1.93-1.78 3.045-4.4 3.045-7.69Z" fill="#4285F4" />
      <path d="M12 22c2.76 0 5.08-.91 6.77-2.46l-3.3-2.57c-.91.61-2.07.97-3.47.97-2.67 0-4.93-1.8-5.74-4.22H2.85v2.65A10.22 10.22 0 0 0 12 22Z" fill="#34A853" />
      <path d="M6.26 13.72a6.14 6.14 0 0 1 0-3.92V7.15H2.85a10.03 10.03 0 0 0 0 9.22l3.41 2.65 2.05-1.6-2.05-1.58Z" fill="#FBBC05" />
      <path d="M12 5.58c1.5 0 2.85.52 3.91 1.54l2.93-2.93C17.08 2.6 14.76 1.58 12 1.58a10.22 10.22 0 0 0-9.15 5.57l3.41 2.65C7.07 7.38 9.33 5.58 12 5.58Z" fill="#EA4335" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="text-gray-800 dark:text-white"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="
          M12 2 C6.48 2 2 6.58 2 12.25
          C2 16.78 4.87 20.61 8.84 21.97
          C9.34 22.06 9.52 21.75 9.52 21.48
          C9.52 21.24 9.51 20.6 9.5 19.75
          C6.73 20.38 6.14 18.37 6.14 18.37
          C5.69 17.17 5.03 16.85 5.03 16.85
          C4.12 16.21 5.1 16.23 5.1 16.23
          C6.1 16.3 6.63 17.3 6.63 17.3
          C7.52 18.86 8.97 18.41 9.54 18.16
          C9.63 17.51 9.89 17.07 10.18 16.82
          C7.97 16.56 5.65 15.69 5.65 11.72
          C5.65 10.59 6.04 9.66 6.68 8.93
          C6.57 8.67 6.23 7.6 6.77 6.19
          C6.77 6.19 7.61 5.91 9.5 7.1
          C10.3 6.87 11.15 6.75 12 6.75
          C12.85 6.75 13.7 6.87 14.5 7.1
          C16.39 5.91 17.23 6.19 17.23 6.19
          C17.77 7.6 17.43 8.67 17.32 8.93
          C17.96 9.66 18.35 10.59 18.35 11.72
          C18.35 15.7 16.02 16.55 13.81 16.81
          C14.17 17.13 14.49 17.75 14.49 18.7
          C14.49 20.06 14.48 21.15 14.48 21.48
          C14.48 21.76 14.66 22.07 15.17 21.97
          C19.13 20.61 22 16.78 22 12.25
          C22 6.58 17.52 2 12 2Z
        "
      />
    </svg>
  );
}
