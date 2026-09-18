import useAuth from "@/auth/store";
import {
  Camera,
  LockKeyhole,
  Trash2,
  UserRound,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

const UserProfile = () => {
  const user = useAuth((state) => state.user);

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
      <main className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6">

        {/* Heading */}
        <div className="mb-5">
          <h1
            className="
              text-2xl
              font-bold
              tracking-tight
              text-gray-900
              dark:text-white
            "
          >
            User Profile
          </h1>

          <p
            className="
              mt-1
              text-sm
              text-gray-500
              dark:text-gray-400
            "
          >
            Manage your profile information and account settings.
          </p>
        </div>

        {/* Profile Information */}
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
          <CardHeader className="pb-4">
            <CardTitle
              className="
                text-base
                text-gray-900
                dark:text-white
              "
            >
              Profile Information
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">

            {/* Profile Picture */}
            <div className="flex flex-col items-center gap-2">
              <Avatar
                className="
                  h-24
                  w-24
                  border-2
                  border-gray-300
                  dark:border-gray-700
                "
              >
                <AvatarImage
                  src={user?.image || ""}
                  alt={user?.name || "User"}
                />

                <AvatarFallback
                  className="
                    bg-gradient-to-br
                    from-purple-600
                    to-blue-500
                    text-2xl
                    font-bold
                    text-white
                  "
                >
                  {getInitials(user?.name)}
                </AvatarFallback>
              </Avatar>

              <Button
                variant="outline"
                size="sm"
                className="
                  cursor-pointer
                  gap-2
                  border-gray-300
                  bg-white
                  text-gray-800
                  hover:bg-gray-100
                  dark:border-gray-700
                  dark:bg-transparent
                  dark:text-white
                  dark:hover:bg-gray-800
                "
              >
                <Camera className="h-3.5 w-3.5" />
                Change Picture
              </Button>
            </div>

            {/* User Information */}
            <div className="grid gap-4 sm:grid-cols-2">

              <ProfileField
                label="Full Name"
                value={user?.name || ""}
              />

              <ProfileField
                label="Email"
                value={user?.email || ""}
              />

              <ProfileField
                label="Provider"
                value={user?.provider || ""}
              />

              <ProfileField
                label="Enabled"
                value={user?.enabled ? "Yes" : "No"}
              />

            </div>

            {/* Edit Profile */}
            <Button
              className="
                w-full
                cursor-pointer
                gap-2
                bg-gray-900
                text-white
                hover:bg-gray-800
                dark:bg-white
                dark:text-gray-900
                dark:hover:bg-gray-200
              "
            >
              <UserRound className="h-4 w-4" />
              Edit Profile
            </Button>

          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card
          className="
            mt-5
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
                text-base
                text-gray-900
                dark:text-white
              "
            >
              Account Settings
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-2.5">

            {/* Change Password */}
            <Button
              variant="outline"
              className="
                h-10
                w-full
                cursor-pointer
                gap-2
                border-gray-300
                bg-white
                text-gray-800
                hover:bg-gray-100
                dark:border-gray-700
                dark:bg-transparent
                dark:text-white
                dark:hover:bg-gray-800
              "
            >
              <LockKeyhole className="h-4 w-4" />
              Change Password
            </Button>

            {/* Delete Account */}
            <Button
              variant="destructive"
              className="
                h-10
                w-full
                cursor-pointer
                gap-2
              "
            >
              <Trash2 className="h-4 w-4" />
              Delete Account
            </Button>

          </CardContent>
        </Card>

      </main>
    </div>
  );
};

/* Profile Field */

type ProfileFieldProps = {
  label: string;
  value: string;
};

const ProfileField = ({
  label,
  value,
}: ProfileFieldProps) => {
  return (
    <div className="space-y-1.5">
      <label
        className="
          text-xs
          font-medium
          text-gray-500
          dark:text-gray-400
        "
      >
        {label}
      </label>

      <Input
        value={value}
        readOnly
        className="
          h-10
          border-gray-200
          bg-gray-50
          text-sm
          text-gray-800
          shadow-none
          focus-visible:ring-1
          focus-visible:ring-gray-300

          dark:border-gray-800
          dark:bg-gray-950
          dark:text-gray-300
          dark:focus-visible:ring-gray-700
        "
      />
    </div>
  );
};

/* User Initials */

const getInitials = (name?: string | null) => {
  if (!name) {
    return "U";
  }

  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

export default UserProfile;