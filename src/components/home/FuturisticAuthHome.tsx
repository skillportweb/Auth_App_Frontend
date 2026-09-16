import React from "react";
import {
  ArrowRight,
  Check,
  Code2,
  Fingerprint,
  GitBranch,
  KeyRound,
  Lock,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Zap,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

/* ================================================= */
/* ================= ANIMATION VARIANTS ============= */
/* ================================================= */

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeDown: Variants = {
  hidden: {
    opacity: 0,
    y: -30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeRight: Variants = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* ================================================= */
/* ================= MAIN COMPONENT ================= */
/* ================================================= */

function FuturisticAuthHome() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-gray-900 transition-colors duration-300 dark:bg-[#08090b] dark:text-white">

      {/* ================================================= */}
      {/* ================= BACKGROUND ===================== */}
      {/* ================================================= */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

        {/* Purple Glow */}

        <motion.div
          className="absolute left-[5%] top-[10%] h-80 w-80 rounded-full bg-purple-500/5 blur-[140px] dark:bg-purple-600/10"
          animate={{
            x: [0, 40, 0],
            y: [0, 30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Blue Glow */}

        <motion.div
          className="absolute right-[5%] top-[35%] h-96 w-96 rounded-full bg-blue-500/5 blur-[150px] dark:bg-blue-600/10"
          animate={{
            x: [0, -40, 0],
            y: [0, 35, 0],
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Violet Glow */}

        <motion.div
          className="absolute bottom-[5%] left-[40%] h-80 w-80 rounded-full bg-violet-500/5 blur-[140px] dark:bg-violet-600/10"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

      </div>

      {/* ================================================= */}
      {/* ================= HERO ========================== */}
      {/* ================================================= */}

      <section className="relative flex min-h-[calc(100vh-76px)] items-center overflow-hidden">

        {/* Grid Background */}

        <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] dark:opacity-[0.06]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(to right, currentColor 1px, transparent 1px),
                linear-gradient(to bottom, currentColor 1px, transparent 1px)
              `,
              backgroundSize: "70px 70px",
            }}
          />
        </div>

        {/* Center Glow */}

        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-[150px] dark:bg-purple-600/10"
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

        {/* Container */}

        <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">

          <motion.div
            className="mx-auto max-w-5xl text-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >

            {/* Badge */}

            <motion.div
              variants={fadeDown}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-sm text-purple-600 backdrop-blur dark:border-purple-500/20 dark:bg-purple-500/5 dark:text-purple-300"
              whileHover={{
                scale: 1.05,
                borderColor: "rgba(168,85,247,0.5)",
              }}
            >

              <motion.div
                animate={{
                  rotate: [0, 15, -15, 0],
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

              <span>Next Generation Authentication</span>

            </motion.div>

            {/* Heading */}

            <motion.h1
              variants={fadeUp}
              className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
            >

              Secure.
              <span className="text-gray-400 dark:text-gray-500">
                {" "}
                Fast.
              </span>

              <br />

              <motion.span
                className="inline-block bg-gradient-to-r from-gray-900 via-purple-600 to-blue-600 bg-clip-text text-transparent dark:from-white dark:via-purple-300 dark:to-blue-400"
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
                Futuristic.
              </motion.span>

            </motion.h1>

            {/* Description */}

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-gray-600 sm:text-xl dark:text-gray-400"
            >
              The next-generation authentication platform built for
              modern applications. Simple authentication with powerful
              security.
            </motion.p>

            {/* Buttons */}

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >

              {/* Primary Button */}

              <motion.div
                whileHover={{
                  scale: 1.05,
                  y: -3,
                }}
                whileTap={{
                  scale: 0.96,
                }}
              >
                <Button
                  size="lg"
                  className="group h-12 rounded-xl bg-gray-900 px-7 text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                >
                  Get Started

                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </motion.div>

              {/* Secondary Button */}

              <motion.div
                whileHover={{
                  scale: 1.05,
                  y: -3,
                }}
                whileTap={{
                  scale: 0.96,
                }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-xl border-gray-300 bg-gray-50 px-7 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:bg-white/[0.03] dark:text-white dark:hover:bg-white/10"
                >
                  Learn More
                </Button>
              </motion.div>

            </motion.div>

            {/* Trust Points */}

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-500"
            >
              <TrustItem text="Secure by design" />
              <TrustItem text="Easy integration" />
              <TrustItem text="Modern stack" />
            </motion.div>

          </motion.div>

        </div>
      </section>

      {/* ================================================= */}
      {/* ================= FEATURES ====================== */}
      {/* ================================================= */}

      <section
        id="features"
        className="border-y border-gray-200 bg-gray-50/70 py-24 dark:border-white/5 dark:bg-white/[0.015]"
      >

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <SectionHeader
            label="Powerful Features"
            title={
              <>
                Everything you need
                <br />

                <span className="text-gray-500 dark:text-gray-500">
                  to secure your application.
                </span>
              </>
            }
            description="Authentication tools designed to make your application secure, scalable and easy to maintain."
          />

          {/* Feature Cards */}

          <motion.div
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
          >

            <AnimatedFeatureCard
              icon={<ShieldCheck />}
              title="Secure Authentication"
              description="Protect your users with secure and reliable authentication mechanisms."
            />

            <AnimatedFeatureCard
              icon={<KeyRound />}
              title="JWT Security"
              description="Stateless token-based authentication designed for modern applications."
            />

            <AnimatedFeatureCard
              icon={<Fingerprint />}
              title="OAuth Support"
              description="Allow users to authenticate using trusted third-party providers."
            />

            <AnimatedFeatureCard
              icon={<Zap />}
              title="Fast & Reliable"
              description="A lightweight authentication flow focused on speed and reliability."
            />

          </motion.div>

        </div>
      </section>

      {/* ================================================= */}
      {/* ================= AUTHENTICATION ================= */}
      {/* ================================================= */}

      <section className="bg-white py-24 dark:bg-[#08090b]">

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid items-center gap-14 lg:grid-cols-2">

            {/* Left */}

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.25,
              }}
              variants={fadeLeft}
            >

              <p className="mb-3 text-sm uppercase tracking-[0.25em] text-purple-600 dark:text-purple-400">
                Authentication
              </p>

              <h2 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl dark:text-white">
                One platform.
                <br />

                <span className="text-purple-600 dark:text-purple-400">
                  Multiple ways to authenticate.
                </span>
              </h2>

              <p className="mt-6 max-w-xl leading-7 text-gray-600 dark:text-gray-400">
                Give your users a smooth authentication experience while
                keeping your application protected with modern security
                standards.
              </p>

              <div className="mt-8 space-y-4">

                <CheckItem text="Email & Password Authentication" />
                <CheckItem text="OAuth 2.0 Authentication" />
                <CheckItem text="JWT Based Authorization" />
                <CheckItem text="Protected Application Routes" />

              </div>

            </motion.div>

            {/* Right */}

            <motion.div
              className="relative"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              variants={fadeRight}
            >

              {/* Glow */}

              <motion.div
                className="absolute -inset-8 rounded-full bg-purple-500/5 blur-[100px] dark:bg-purple-600/10"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                className="relative grid grid-cols-2 gap-4"
                variants={staggerContainer}
              >

                <AnimatedAuthMethodCard
                  icon={<MailIcon />}
                  title="Email"
                  description="Simple & secure"
                />

                <AnimatedAuthMethodCard
                  icon={<GitBranch />}
                  title="GitHub"
                  description="OAuth authentication"
                />

                <AnimatedAuthMethodCard
                  icon={<KeyRound />}
                  title="JWT"
                  description="Token security"
                />

                <AnimatedAuthMethodCard
                  icon={<Lock />}
                  title="Protected"
                  description="Secure access"
                />

              </motion.div>

            </motion.div>

          </div>

        </div>
      </section>

      {/* ================================================= */}
      {/* ================= HOW IT WORKS ================== */}
      {/* ================================================= */}

      <section className="border-y border-gray-200 bg-gray-50/70 py-24 dark:border-white/5 dark:bg-white/[0.015]">

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <SectionHeader
            label="How It Works"
            title={
              <>
                Authentication made
                <span className="text-purple-600 dark:text-purple-400">
                  {" "}
                  simple.
                </span>
              </>
            }
            description="A simple authentication flow designed for modern applications."
          />

          {/* Steps */}

          <motion.div
            className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
          >

            <AnimatedStep
              number="01"
              icon={<UserCheck />}
              title="Create Account"
              description="Create your account with a simple signup process."
            />

            <AnimatedStep
              number="02"
              icon={<ShieldCheck />}
              title="Verify Identity"
              description="Secure the account with verification and security checks."
            />

            <AnimatedStep
              number="03"
              icon={<Lock />}
              title="Authenticate"
              description="Login securely using your preferred authentication method."
            />

            <AnimatedStep
              number="04"
              icon={<Code2 />}
              title="Access Application"
              description="Access protected resources securely after authentication."
            />

          </motion.div>

        </div>
      </section>

      {/* ================================================= */}
      {/* ================= SECURITY ======================= */}
      {/* ================================================= */}

      <section className="bg-white py-24 dark:bg-[#08090b]">

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 p-8 md:p-14 dark:border-white/10 dark:bg-[#0d1017]"
            initial={{
              opacity: 0,
              y: 50,
              scale: 0.98,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >

            {/* Glow */}

            <motion.div
              className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-purple-500/5 blur-[120px] dark:bg-purple-600/10"
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

            <div className="relative grid items-center gap-14 lg:grid-cols-2">

              {/* Left */}

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                variants={fadeLeft}
              >

                <motion.div
                  className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-200 bg-purple-50 dark:border-purple-500/20 dark:bg-purple-500/10"
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                  }}
                >
                  <ShieldCheck className="h-7 w-7 text-purple-600 dark:text-purple-400" />
                </motion.div>

                <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white">
                  Security isn't
                  <br />

                  <span className="text-purple-600 dark:text-purple-400">
                    an option.
                  </span>
                </h2>

                <p className="mt-6 max-w-xl leading-7 text-gray-600 dark:text-gray-400">
                  Build your application on a strong authentication
                  foundation using modern security technologies and
                  well-defined authentication flows.
                </p>

              </motion.div>

              {/* Right */}

              <motion.div
                className="grid gap-4 sm:grid-cols-2"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
              >

                <AnimatedSecurityCard
                  title="JWT Authentication"
                  description="Stateless token based security"
                />

                <AnimatedSecurityCard
                  title="OAuth 2.0"
                  description="Modern third-party authentication"
                />

                <AnimatedSecurityCard
                  title="Secure Passwords"
                  description="Protected credential handling"
                />

                <AnimatedSecurityCard
                  title="Protected Routes"
                  description="Secure application resources"
                />

              </motion.div>

            </div>

          </motion.div>

        </div>
      </section>

      {/* ================================================= */}
      {/* ================= TECH STACK ==================== */}
      {/* ================================================= */}

      <section className="border-y border-gray-200 bg-gray-50/70 py-20 dark:border-white/5 dark:bg-transparent">

        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">

          <SectionHeader
            label="Built With"
            title={<>Modern technology stack</>}
            description="Built using technologies designed for modern web applications."
          />

          <motion.div
            className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
          >

            {[
              "React",
              "TypeScript",
              "Tailwind CSS",
              "shadcn/ui",
              "zustand for State Management",
              "Spring Boot",
              "Spring Security",
              "MySQL",
              "JWT",
            ].map((technology) => (
              <motion.div
                key={technology}
                variants={cardVariant}
                whileHover={{
                  y: -5,
                  scale: 1.04,
                }}
                className="cursor-default rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm text-gray-600 transition-colors hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-400 dark:hover:border-purple-500/40 dark:hover:bg-purple-500/[0.06] dark:hover:text-white"
              >
                {technology}
              </motion.div>
            ))}

          </motion.div>

        </div>
      </section>

      {/* ================================================= */}
      {/* ================= CTA =========================== */}
      {/* ================================================= */}

      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8 dark:bg-[#08090b]">

        <div className="container mx-auto">

          <motion.div
            className="relative overflow-hidden rounded-3xl border border-purple-200 bg-gradient-to-br from-purple-50 via-white to-blue-50 px-6 py-16 text-center dark:border-purple-500/20 dark:from-purple-950/40 dark:via-[#0d1017] dark:to-blue-950/30 md:px-12"
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >

            {/* Glow */}

            <motion.div
              className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-[120px] dark:bg-purple-600/10"
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="relative"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
              }}
              variants={staggerContainer}
            >

              {/* Icon */}

              <motion.div variants={fadeUp}>
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles className="mx-auto mb-6 h-8 w-8 text-purple-600 dark:text-purple-400" />
                </motion.div>
              </motion.div>

              {/* Heading */}

              <motion.h2
                variants={fadeUp}
                className="text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white"
              >
                Ready to get started?
              </motion.h2>

              {/* Description */}

              <motion.p
                variants={fadeUp}
                className="mx-auto mt-5 max-w-xl text-gray-600 dark:text-gray-400"
              >
                Build a secure authentication experience for your
                next-generation application.
              </motion.p>

              {/* Button */}

              <motion.div
                variants={fadeUp}
                className="mt-8"
                whileHover={{
                  scale: 1.05,
                  y: -3,
                }}
                whileTap={{
                  scale: 0.96,
                }}
              >
                <Button
                  size="lg"
                  className="group h-12 rounded-xl bg-gray-900 px-8 text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                >
                  Get Started

                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </motion.div>

            </motion.div>

          </motion.div>

        </div>
      </section>

      {/* ================================================= */}
      {/* ================= FOOTER ======================== */}
      {/* ================================================= */}

      <footer className="border-t border-gray-200 bg-white py-10 dark:border-white/5 dark:bg-[#08090b]">

        <motion.div
          className="container mx-auto flex flex-col gap-5 px-4 text-sm text-gray-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8"
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
        >

          <div>

            <span className="font-semibold text-gray-900 dark:text-white">
              Auth App
            </span>

            <span className="ml-2">
              Secure authentication for modern applications.
            </span>

          </div>

          <div className="flex gap-6">

            <motion.span
              whileHover={{
                y: -2,
              }}
              className="cursor-pointer transition-colors hover:text-gray-900 dark:hover:text-white"
            >
              Privacy
            </motion.span>

            <motion.span
              whileHover={{
                y: -2,
              }}
              className="cursor-pointer transition-colors hover:text-gray-900 dark:hover:text-white"
            >
              Terms
            </motion.span>

            <motion.span
              whileHover={{
                y: -2,
              }}
              className="cursor-pointer transition-colors hover:text-gray-900 dark:hover:text-white"
            >
              Documentation
            </motion.span>

          </div>

        </motion.div>

      </footer>

    </main>
  );
}

export default FuturisticAuthHome;

/* ================================================= */
/* ================= SECTION HEADER ================= */
/* ================================================= */

interface SectionHeaderProps {
  label: string;
  title: React.ReactNode;
  description: string;
}

function SectionHeader({
  label,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <motion.div
      className="mx-auto mb-16 max-w-2xl text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.3,
      }}
      variants={fadeUp}
    >

      <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-purple-600 dark:text-purple-400">
        {label}
      </p>

      <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
        {title}
      </h2>

      <p className="mt-5 text-gray-600 dark:text-gray-400">
        {description}
      </p>

    </motion.div>
  );
}

/* ================================================= */
/* ================= TRUST ITEM ===================== */
/* ================================================= */

function TrustItem({
  text,
}: {
  text: string;
}) {
  return (
    <motion.span
      className="flex items-center gap-2"
      whileHover={{
        y: -2,
      }}
    >
      <Check className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
      {text}
    </motion.span>
  );
}

/* ================================================= */
/* ================= FEATURE CARD =================== */
/* ================================================= */

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function AnimatedFeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <motion.div
      variants={cardVariant}
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
    >

      <Card className="group h-full border-gray-200 bg-white transition-colors duration-300 hover:border-purple-300 hover:bg-purple-50/50 dark:border-white/10 dark:bg-white/[0.025] dark:hover:border-purple-500/30 dark:hover:bg-purple-500/[0.04]">

        <CardContent className="p-6">

          <motion.div
            className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600 transition-colors group-hover:bg-purple-100 dark:bg-purple-500/10 dark:text-purple-400 dark:group-hover:bg-purple-500/20"
            whileHover={{
              scale: 1.1,
              rotate: 5,
            }}
          >
            {icon}
          </motion.div>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>

          <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-500">
            {description}
          </p>

        </CardContent>

      </Card>

    </motion.div>
  );
}

/* ================================================= */
/* ================= CHECK ITEM ===================== */
/* ================================================= */

function CheckItem({
  text,
}: {
  text: string;
}) {
  return (
    <motion.div
      className="flex items-center gap-3"
      initial={{
        opacity: 0,
        x: -20,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.4,
      }}
      whileHover={{
        x: 5,
      }}
    >

      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-500/10">
        <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
      </div>

      <span className="text-sm text-gray-700 dark:text-gray-300">
        {text}
      </span>

    </motion.div>
  );
}

/* ================================================= */
/* ================= AUTH METHOD ==================== */
/* ================================================= */

function AnimatedAuthMethodCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      variants={cardVariant}
      whileHover={{
        y: -7,
        scale: 1.03,
      }}
      className="group rounded-2xl border border-gray-200 bg-gray-50 p-6 transition-colors duration-300 hover:border-purple-300 hover:bg-purple-50/50 dark:border-white/10 dark:bg-white/[0.025] dark:hover:border-purple-500/30"
    >

      <motion.div
        className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition-colors group-hover:bg-purple-100 group-hover:text-purple-600 dark:bg-white/5 dark:text-gray-300 dark:group-hover:bg-purple-500/10 dark:group-hover:text-purple-400"
        whileHover={{
          scale: 1.1,
          rotate: 5,
        }}
      >
        {icon}
      </motion.div>

      <h3 className="font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>

      <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
        {description}
      </p>

    </motion.div>
  );
}

/* ================================================= */
/* ================= STEP =========================== */
/* ================================================= */

function AnimatedStep({
  number,
  icon,
  title,
  description,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      variants={cardVariant}
      whileHover={{
        y: -6,
      }}
      className="relative"
    >

      <div className="mb-6 flex items-center gap-4">

        <motion.div
          className="flex h-12 w-12 items-center justify-center rounded-full border border-purple-200 bg-purple-50 text-purple-600 dark:border-purple-500/30 dark:bg-purple-500/10 dark:text-purple-400"
          whileHover={{
            scale: 1.1,
            rotate: 8,
          }}
        >
          {icon}
        </motion.div>

        <span className="text-xs font-bold tracking-widest text-gray-400 dark:text-gray-600">
          {number}
        </span>

      </div>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-500">
        {description}
      </p>

    </motion.div>
  );
}

/* ================================================= */
/* ================= SECURITY CARD ================== */
/* ================================================= */

function AnimatedSecurityCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <motion.div
      variants={cardVariant}
      whileHover={{
        y: -5,
        scale: 1.02,
      }}
      className="rounded-2xl border border-gray-200 bg-white p-5 transition-colors duration-300 hover:border-purple-300 dark:border-white/10 dark:bg-black/20 dark:hover:border-purple-500/20"
    >

      <motion.div
        className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-500/10"
        whileHover={{
          scale: 1.1,
        }}
      >
        <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
      </motion.div>

      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-gray-600 dark:text-gray-500">
        {description}
      </p>

    </motion.div>
  );
}

/* ================================================= */
/* ================= MAIL ICON ====================== */
/* ================================================= */

function MailIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
      />

      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}