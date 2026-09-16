import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";

import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import type LoginData from "@/model/LoginData";
import { toast } from "react-hot-toast";
import useAuth from "@/auth/store";
import OAuth2Button from "../components/OAuth2Button";

/* ================================================= */
/* ================= ANIMATION VARIANTS ============= */
/* ================================================= */

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,

    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -45,
  },

  visible: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeRight: Variants = {
  hidden: {
    opacity: 0,
    x: 45,
  },

  visible: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* ================================================= */
/* ================= LOGIN COMPONENT ================= */
/* ================================================= */

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

const navigate = useNavigate();
const login = useAuth((state) => state.login);
const handleInputChange = (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const { name, value } = event.target;

  setLoginData((prevLoginData) => ({
    ...prevLoginData,
    [name]: value,
  }));
};

const handleFormSubmit = async (
  event: React.FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  const email = loginData.email.trim();
  const password = loginData.password.trim();

  console.log("Login Data:", {
    email,
    password,
  });

  if (email === "") {
    toast.error("Email is required !");
    return;
  }

  if (password === "") {
    toast.error("Password is required !");
    return;
  }
  console.log("Ready to login:", {
    email,
    password,
  });

  try {
    // await loginUser(loginData);
    //use login : useAuth store to login
    await login(loginData);
    toast.success("Login successful !");
    navigate("/dashboard");
  } catch (error) {
    toast.error("Invalid email or password !");
  }
};

  return (
    <main
      className="
        relative
        min-h-[calc(100vh-56px)]
        overflow-hidden

        bg-white
        text-gray-900

        transition-colors
        duration-300

        dark:bg-[#08090b]
        dark:text-white
      "
    >

      {/* ================================================= */}
      {/* ================= BACKGROUND ===================== */}
      {/* ================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Grid */}

        <div
          className="
            absolute
            inset-0

            opacity-[0.035]

            dark:opacity-[0.045]
          "
        >
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(to right, currentColor 1px, transparent 1px),
                linear-gradient(to bottom, currentColor 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Purple Glow */}

        <motion.div
          className="
            absolute
            -left-40
            top-10
            h-[400px]
            w-[400px]
            rounded-full
            bg-purple-500/10
            blur-[130px]

            dark:bg-purple-600/15
          "
          animate={{
            x: [0, 40, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Blue Glow */}

        <motion.div
          className="
            absolute
            -right-40
            bottom-0
            h-[400px]
            w-[400px]
            rounded-full
            bg-blue-500/10
            blur-[130px]

            dark:bg-blue-600/15
          "
          animate={{
            x: [0, -40, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Center Glow */}

        <motion.div
          className="
            absolute
            left-1/2
            top-1/2
            h-[300px]
            w-[300px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-purple-500/5
            blur-[120px]

            dark:bg-purple-500/10
          "
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

      </div>

      {/* ================================================= */}
      {/* ================= MAIN CONTENT =================== */}
      {/* ================================================= */}

      <div
        className="
          relative
          mx-auto
          flex
          min-h-[calc(100vh-56px)]
          max-w-6xl
          items-center

          px-4
          py-10

          sm:px-6
          lg:px-8
        "
      >

        <div className="grid w-full items-center gap-12 lg:grid-cols-2">

          {/* ================================================= */}
          {/* ================= LEFT CONTENT ================== */}
          {/* ================================================= */}

          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="hidden lg:block"
          >

            {/* Badge */}

            <motion.div
              variants={fadeLeft}
              className="
                mb-7
                inline-flex
                items-center
                gap-2
                rounded-full

                border
                border-purple-200
                bg-purple-50

                px-4
                py-2

                text-sm
                text-purple-600

                dark:border-purple-500/20
                dark:bg-purple-500/5
                dark:text-purple-300
              "
            >

              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="h-4 w-4" />
              </motion.div>

              <span>
                Secure Authentication
              </span>

            </motion.div>

            {/* Heading */}

            <motion.h1
              variants={fadeLeft}
              className="
                max-w-xl
                text-5xl
                font-bold
                leading-[1.05]
                tracking-tight

                xl:text-6xl
              "
            >
              Welcome

              <br />

              <motion.span
                className="
                  inline-block
                  bg-gradient-to-r
                  from-purple-600
                  via-violet-500
                  to-blue-600
                  bg-clip-text
                  text-transparent

                  dark:from-purple-300
                  dark:via-violet-400
                  dark:to-blue-400
                "
                animate={{
                  backgroundPosition: [
                    "0% 50%",
                    "100% 50%",
                    "0% 50%",
                  ],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                back.
              </motion.span>
            </motion.h1>

            {/* Description */}

            <motion.p
              variants={fadeLeft}
              className="
                mt-6
                max-w-lg
                text-lg
                leading-8

                text-gray-600

                dark:text-gray-400
              "
            >
              Sign in to your account and continue your journey
              with a secure and modern authentication experience.
            </motion.p>

            {/* Security */}

            <motion.div
              variants={fadeLeft}
              className="mt-10 flex items-center gap-4"
            >

              <motion.div
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                }}
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl

                  border
                  border-emerald-200
                  bg-emerald-50

                  dark:border-emerald-500/20
                  dark:bg-emerald-500/10
                "
              >
                <ShieldCheck
                  className="
                    h-5
                    w-5

                    text-emerald-600

                    dark:text-emerald-400
                  "
                />
              </motion.div>

              <div>

                <p
                  className="
                    text-sm
                    font-medium

                    text-gray-900

                    dark:text-white
                  "
                >
                  Secure & Protected
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Your credentials are protected with modern security.
                </p>

              </div>

            </motion.div>

          </motion.div>

          {/* ================================================= */}
          {/* ================= LOGIN CARD ==================== */}
          {/* ================================================= */}

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeRight}
            className="mx-auto w-full max-w-md"
          >

            {/* Login Card */}

            <motion.div
              className="
                relative
                overflow-hidden
                rounded-3xl

                border
                border-gray-200

                bg-white

                p-6

                shadow-xl
                shadow-gray-200/40

                sm:p-8

                dark:border-white/10
                dark:bg-[#0d1017]
                dark:shadow-black/30
              "
              whileHover={{
                y: -2,
              }}
              transition={{
                duration: 0.25,
              }}
            >

              {/* Card Glow */}

              <motion.div
                className="
                  pointer-events-none
                  absolute
                  -right-20
                  -top-20
                  h-40
                  w-40
                  rounded-full
                  bg-purple-500/10
                  blur-[70px]

                  dark:bg-purple-500/15
                "
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div className="relative">

                {/* Lock Icon */}

                <motion.div
                  initial={{
                    scale: 0.7,
                    opacity: 0,
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                  transition={{
                    delay: 0.2,
                    duration: 0.4,
                  }}
                  whileHover={{
                    scale: 1.08,
                    rotate: 4,
                  }}
                  className="
                    mb-6
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl

                    bg-purple-50
                    text-purple-600

                    dark:bg-purple-500/10
                    dark:text-purple-400
                  "
                >
                  <LockKeyhole className="h-6 w-6" />
                </motion.div>

                {/* Heading */}

                <h2
                  className="
                    text-3xl
                    font-bold
                    tracking-tight

                    text-gray-900

                    dark:text-white
                  "
                >
                  Sign in
                </h2>

                <p
                  className="
                    mt-2
                    text-sm

                    text-gray-500

                    dark:text-gray-400
                  "
                >
                  Enter your email and password to continue.
                </p>

                {/* ================================================= */}
                {/* ================= SOCIAL LOGIN ================== */}
                {/* ================================================= */}

                <div className="mt-7">
                  <OAuth2Button />
                </div>

                {/* ================================================= */}
                {/* ================= DIVIDER ======================== */}
                {/* ================================================= */}

                <div className="my-7 flex items-center gap-3">

                  <div
                    className="
                      h-px
                      flex-1

                      bg-gray-200

                      dark:bg-white/10
                    "
                  />

                  <span
                    className="
                      text-[10px]
                      font-medium
                      tracking-wider

                      text-gray-400
                    "
                  >
                    OR
                  </span>

                  <div
                    className="
                      h-px
                      flex-1

                      bg-gray-200

                      dark:bg-white/10
                    "
                  />

                </div>

                {/* ================================================= */}
                {/* ================= FORM =========================== */}
                {/* ================================================= */}

                <form
                  onSubmit={handleFormSubmit}
                  className="space-y-5"
                >

                  {/* ================= EMAIL ================= */}

                  <div className="space-y-2">

                    <Label
                      htmlFor="email"
                      className="
                        text-sm
                        font-medium

                        text-gray-700

                        dark:text-gray-300
                      "
                    >
                      Email
                    </Label>

                    <div className="relative">

                      <Mail
                        className="
                          pointer-events-none
                          absolute
                          left-3
                          top-1/2
                          h-4
                          w-4
                          -translate-y-1/2

                          text-gray-400
                        "
                      />

                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={loginData.email}
                        onChange={handleInputChange}
                        placeholder="you@example.com"
                        autoComplete="email"
                        className="
                          h-11
                          w-full
                          rounded-xl

                          border
                          border-gray-200

                          bg-gray-50

                          pl-10
                          pr-4

                          text-sm
                          text-gray-900

                          outline-none

                          transition-all
                          duration-200

                          placeholder:text-gray-400

                          focus:border-purple-500
                          focus:ring-2
                          focus:ring-purple-500/10

                          dark:border-white/10
                          dark:bg-white/[0.03]
                          dark:text-white
                          dark:placeholder:text-gray-600
                          dark:focus:border-purple-500
                        "
                      />

                    </div>

                  </div>

                  {/* ================= PASSWORD ================= */}

                  <div className="space-y-2">

                    <div className="flex items-center justify-between">

                      <Label
                        htmlFor="password"
                        className="
                          text-sm
                          font-medium

                          text-gray-700

                          dark:text-gray-300
                        "
                      >
                        Password
                      </Label>

                      <Link
                        to="/forgot-password"
                        className="
                          text-xs
                          font-medium

                          text-purple-600

                          hover:text-purple-700

                          dark:text-purple-400
                          dark:hover:text-purple-300
                        "
                      >
                        Forgot password?
                      </Link>

                    </div>

                    <div className="relative">

                      <LockKeyhole
                        className="
                          pointer-events-none
                          absolute
                          left-3
                          top-1/2
                          h-4
                          w-4
                          -translate-y-1/2

                          text-gray-400
                        "
                      />

                      <input
                        id="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleInputChange}
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        className="
                          h-11
                          w-full
                          rounded-xl

                          border
                          border-gray-200

                          bg-gray-50

                          pl-10
                          pr-11

                          text-sm
                          text-gray-900

                          outline-none

                          transition-all
                          duration-200

                          placeholder:text-gray-400

                          focus:border-purple-500
                          focus:ring-2
                          focus:ring-purple-500/10

                          dark:border-white/10
                          dark:bg-white/[0.03]
                          dark:text-white
                          dark:placeholder:text-gray-600
                          dark:focus:border-purple-500
                        "
                      />

                      {/* Show Password */}

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(
                            (prev) => !prev
                          )
                        }
                        className="
                          absolute
                          right-3
                          top-1/2
                          -translate-y-1/2

                          text-gray-400

                          transition-colors

                          hover:text-gray-700

                          dark:hover:text-white
                        "
                        aria-label={
                          showPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>

                    </div>

                  </div>

                  {/* ================= REMEMBER ME ================= */}

                  <div className="flex items-center gap-2">

                    <input
                      id="remember"
                      type="checkbox"
                      className="
                        h-4
                        w-4
                        cursor-pointer
                        rounded
                        border-gray-300

                        accent-purple-600

                        dark:border-gray-700
                      "
                    />

                    <Label
                      htmlFor="remember"
                      className="
                        cursor-pointer
                        text-xs

                        text-gray-500

                        dark:text-gray-400
                      "
                    >
                      Remember me
                    </Label>

                  </div>

                  {/* ================= LOGIN BUTTON ================= */}

                  <motion.div
                    whileHover={{
                      scale: 1.02,
                      y: -2,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                  >

                    <Button
                      type="submit"
                      className="
                        group
                        h-11
                        w-full
                        rounded-xl

                        bg-gray-900
                        text-white

                        shadow-lg
                        shadow-gray-900/10

                        hover:bg-gray-800

                        dark:bg-white
                        dark:text-black
                        dark:hover:bg-gray-200
                      "
                    >
                      Sign in

                      <ArrowRight
                        className="
                          ml-2
                          h-4
                          w-4
                          transition-transform
                          duration-300

                          group-hover:translate-x-1
                        "
                      />

                    </Button>

                  </motion.div>

                </form>

                {/* ================= SIGNUP ================= */}

                <p
                  className="
                    mt-7
                    text-center
                    text-sm

                    text-gray-500

                    dark:text-gray-400
                  "
                >
                  Don't have an account?{" "}

                  <Link
                    to="/signup"
                    className="
                      font-medium

                      text-purple-600

                      hover:text-purple-700

                      dark:text-purple-400
                      dark:hover:text-purple-300
                    "
                  >
                    Create account
                  </Link>

                </p>

              </div>

            </motion.div>

            {/* ================================================= */}
            {/* ================= SECURITY TEXT ================= */}
            {/* ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.9,
                duration: 0.5,
              }}
              className="
                mt-5
                flex
                items-center
                justify-center
                gap-2

                text-xs
                text-gray-400
              "
            >

              <ShieldCheck
                className="
                  h-3.5
                  w-3.5
                  text-emerald-500
                "
              />

              <span>
                Secure and encrypted authentication
              </span>

            </motion.div>

          </motion.div>

        </div>

      </div>

    </main>
  );
}

export default Login;
