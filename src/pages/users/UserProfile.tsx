
import { useState } from "react";
import useAuth from "@/auth/store";
import {
  Camera,
  UserRound,
  MapPin,
  Mail,
  Phone,
  Globe,
  MapPinned,
  LockKeyhole,
  Trash2,
  Save,
  BriefcaseBusiness,
  Building2,
  Pencil,
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
  CardDescription,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const UserProfile = () => {
  const user = useAuth((state) => state.user);

  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    designation: "",
    company: "",
    address: "",
    city: "",
    state: "",
    country: "India",
    postalCode: "",
    website: "",
  });

  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // TODO: Call your update profile API here.
    // Send profile object to backend.
    console.log("Updated Profile:", profile);
    setIsEditing(false);
  };

  const getInitials = (name?: string | null) => {
    if (!name) return "U";

    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const ProfileField = ({
    label,
    field,
    icon: Icon,
    placeholder,
    type = "text",
  }: {
    label: string;
    field: keyof typeof profile;
    icon: React.ElementType;
    placeholder?: string;
    type?: string;
  }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </Label>

      <div className="relative">
        <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

        <Input
          type={type}
          value={profile[field]}
          onChange={(e) => handleChange(field, e.target.value)}
          readOnly={!isEditing}
          placeholder={placeholder}
          className="h-11 pl-10 border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-950 dark:text-white read-only:cursor-default"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-56px)] bg-gray-50 text-gray-900 transition-colors dark:bg-gray-950 dark:text-white">
      <main className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">

        {/* Page Heading */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              My Profile
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage your personal information and account details.
            </p>
          </div>

          <Button
            onClick={() => {
              if (isEditing) {
                handleSave();
              } else {
                setIsEditing(true);
              }
            }}
            className="gap-2 bg-[#094A77] text-white hover:bg-[#073b60]"
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            ) : (
              <>
                <Pencil className="h-4 w-4" />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        {/* Profile Overview */}
        <Card className="overflow-visible border-gray-200 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-5 sm:flex-row">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-white shadow-md dark:border-gray-800">
                  <AvatarImage src={user?.image || ""} />
                  <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-500 text-2xl font-bold text-white">
                    {getInitials(profile.name)}
                  </AvatarFallback>
                </Avatar>

                {isEditing && (
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 rounded-full bg-[#094A77] p-2 text-white shadow-md"
                    aria-label="Change profile picture"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-xl font-bold">
                  {profile.name || "Your Name"}
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {profile.email}
                </p>

                <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                    {user?.provider || "Account"}
                  </span>

                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                    user?.enabled
                      ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                      : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
                  }`}>
                    {user?.enabled ? "Active Account" : "Inactive Account"}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="border-gray-200 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-50 p-2 dark:bg-blue-950">
                <UserRound className="h-5 w-5 text-[#094A77] dark:text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-base">Personal Information</CardTitle>
                <CardDescription>
                  Your basic personal and contact details.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="grid gap-5 sm:grid-cols-2">
            <ProfileField
              label="Full Name"
              field="name"
              icon={UserRound}
              placeholder="Enter your full name"
            />

            <ProfileField
              label="Email Address"
              field="email"
              icon={Mail}
              placeholder="Enter email"
              type="email"
            />

            <ProfileField
              label="Phone Number"
              field="phone"
              icon={Phone}
              placeholder="Enter phone number"
              type="tel"
            />

            <ProfileField
              label="Designation"
              field="designation"
              icon={BriefcaseBusiness}
              placeholder="e.g. Software Developer"
            />

            <ProfileField
              label="Company"
              field="company"
              icon={Building2}
              placeholder="Enter company name"
            />

            <ProfileField
              label="Website"
              field="website"
              icon={Globe}
              placeholder="https://example.com"
            />
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card className="border-gray-200 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-50 p-2 dark:bg-blue-950">
                <MapPin className="h-5 w-5 text-[#094A77] dark:text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-base">Address & Location</CardTitle>
                <CardDescription>
                  Add your residential or business address.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-5">
            <ProfileField
              label="Street Address"
              field="address"
              icon={MapPin}
              placeholder="House no, street, area"
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <ProfileField
                label="City"
                field="city"
                icon={Building2}
                placeholder="Enter city"
              />

              <ProfileField
                label="State"
                field="state"
                icon={MapPinned}
                placeholder="Enter state"
              />

              <ProfileField
                label="Country"
                field="country"
                icon={Globe}
                placeholder="Enter country"
              />

              <ProfileField
                label="Postal / ZIP Code"
                field="postalCode"
                icon={MapPin}
                placeholder="Enter postal code"
              />
            </div>

            <Separator className="dark:bg-gray-800" />

            <div className="flex flex-col gap-3 rounded-lg border border-dashed border-gray-300 p-4 dark:border-gray-700 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <MapPinned className="mt-1 h-5 w-5 text-[#094A77] dark:text-blue-400" />
                <div>
                  <p className="text-sm font-semibold">
                    Location Preferences
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Your location details can be used for profile and address management.
                  </p>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                disabled={!isEditing}
                className="gap-2"
                onClick={() => {
                  // TODO: Integrate browser geolocation if required.
                  navigator.geolocation?.getCurrentPosition(
                    (position) => {
                      console.log({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                      });
                    },
                    (error) => console.error(error)
                  );
                }}
              >
                <MapPin className="h-4 w-4" />
                Use Current Location
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Account Security */}
        <Card className="border-gray-200 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="text-base">Account Security</CardTitle>
            <CardDescription>
              Manage your password and account access.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="h-11 w-full justify-start gap-3"
            >
              <LockKeyhole className="h-4 w-4" />
              Change Password
            </Button>

            <Button
              variant="destructive"
              className="h-11 w-full justify-start gap-3"
            >
              <Trash2 className="h-4 w-4" />
              Delete Account
            </Button>
          </CardContent>
        </Card>

        {/* Bottom Actions */}
        {isEditing && (
          <div className="flex justify-end gap-3 pb-6">
            <Button
              variant="outline"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>

            <Button
              onClick={handleSave}
              className="gap-2 bg-[#094A77] text-white hover:bg-[#073b60]"
            >
              <Save className="h-4 w-4" />
              Save Profile
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserProfile;
