import { useState } from "react";
import {
  Activity,
  BarChart3,
  CheckCircle2,
  ShieldCheck,
  Users,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/services/AuthServices";
import useAuth from "@/auth/store";
import type User from "@/model/User";
import toast from "react-hot-toast";

const UserHome = () => {
  const user = useAuth((state) => state.user);

  const [user1, setUser1] = useState<User | null>(null);

  const getUserData = async () => {
    try {
      const response = await getCurrentUser(user?.email);

      setUser1(response);
      toast.success("You are able to access secured APIs");
    } catch (error) {
      console.log(error);
      toast.error("Error in getting data");
    }
  };

  const stats = [
    {
      title: "Total Logins",
      value: "1,245",
      icon: Users,
    },
    {
      title: "Security Score",
      value: "98%",
      icon: ShieldCheck,
    },
    {
      title: "Active Sessions",
      value: "12",
      icon: Activity,
    },
  ];

  const activities = [
    "Logged in from Chrome (Windows)",
    "Password updated",
    "New device added to trusted list",
    "Logged out from Safari (iPhone)",
  ];

  return (
    <div
      className="
        min-h-[calc(100vh-56px)]
        bg-gray-50
        text-gray-900
        transition-colors duration-300
        dark:bg-gray-950
        dark:text-white
      "
    >
      <main className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">

        {/* Heading */}
        <section className="mb-6">
          <h1
            className="
              text-3xl
              font-bold
              tracking-tight
              text-gray-900
              sm:text-4xl
              dark:text-white
            "
          >
            Dashboard Overview
          </h1>

          <p
            className="
              mt-2
              text-sm
              text-gray-500
              dark:text-gray-400
            "
          >
            Welcome back, {user?.name}. Here's your account activity
            overview.
          </p>
        </section>

        {/* Stats */}
        <section className="mb-6 grid gap-4 md:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <Card
                key={stat.title}
                className="
                  border-gray-200
                  bg-white
                  shadow-sm
                  transition-colors duration-300
                  dark:border-gray-800
                  dark:bg-gray-900/80
                "
              >
                <CardContent className="flex items-center gap-4 p-5">
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-gray-100
                      dark:bg-gray-800
                    "
                  >
                    <Icon
                      className="
                        h-6
                        w-6
                        text-gray-600
                        dark:text-gray-300
                      "
                    />
                  </div>

                  <div>
                    <p
                      className="
                        text-sm
                        text-gray-500
                        dark:text-gray-400
                      "
                    >
                      {stat.title}
                    </p>

                    <h2
                      className="
                        mt-1
                        text-2xl
                        font-bold
                        text-gray-900
                        dark:text-white
                      "
                    >
                      {stat.value}
                    </h2>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </section>

        {/* Recent Activity */}
        <section>
          <Card
            className="
              border-gray-200
              bg-white
              shadow-sm
              transition-colors duration-300
              dark:border-gray-800
              dark:bg-gray-900/80
            "
          >
            <CardHeader className="pb-3">
              <CardTitle
                className="
                  flex
                  items-center
                  gap-2
                  text-base
                  text-gray-900
                  dark:text-white
                "
              >
                <BarChart3
                  className="
                    h-5
                    w-5
                    text-gray-600
                    dark:text-gray-300
                  "
                />

                Recent Activity
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                {activities.map((activity, index) => (
                  <div
                    key={index}
                    className="
                      flex
                      items-center
                      gap-3
                      text-sm
                      text-gray-500
                      dark:text-gray-400
                    "
                  >
                    <span
                      className="
                        text-gray-400
                        dark:text-gray-600
                      "
                    >
                      •
                    </span>

                    <span>{activity}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Get Current User */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <Button
            onClick={getUserData}
            variant="outline"
            className="
              cursor-pointer
              border-gray-300
              bg-white
              px-8
              text-gray-800
              transition-all duration-200
              hover:bg-gray-100
              dark:border-gray-700
              dark:bg-transparent
              dark:text-white
              dark:hover:bg-gray-800
            "
          >
            Get current user
          </Button>

          <p
            className="
              text-sm
              font-medium
              text-gray-700
              dark:text-gray-300
            "
          >
            {user1?.name}
          </p>
        </div>

        {/* Authentication Status */}
        <div
          className="
            mt-6
            flex
            items-center
            justify-center
            gap-2
            text-xs
            text-gray-500
            dark:text-gray-500
          "
        >
          <CheckCircle2 className="h-4 w-4 text-green-500" />

          Authentication system is active
        </div>

      </main>
    </div>
  );
};

export default UserHome;