import { useState } from "react";
import {
  Store,
  Mail,
  Phone,
  MapPin,
  Globe,
  Bell,
  ShieldCheck,
  ShoppingBag,
  Save,
  CreditCard,
} from "lucide-react";

export default function Settings() {
  const [emailNotifications, setEmailNotifications] =
    useState(true);

  const [orderNotifications, setOrderNotifications] =
    useState(true);

  const [lowStockNotifications, setLowStockNotifications] =
    useState(true);

  const [settings, setSettings] = useState({
    storeName: "Dry Fruit Store",
    email: "admin@dryfruitstore.com",
    phone: "+91 98765 43210",
    address: "Delhi NCR, India",
    currency: "INR",
    timezone: "Asia/Kolkata",
    orderPrefix: "ORD",
    lowStockLimit: "10",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Settings saved:", {
      ...settings,
      emailNotifications,
      orderNotifications,
      lowStockNotifications,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#08090b] dark:text-white">
      <div className="mx-auto max-w-[1600px]">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-7">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
              <Store size={19} />
            </div>

            <span className="text-[12px] font-semibold text-orange-500">
              Store Management
            </span>
          </div>

          <h1 className="text-[28px] font-bold tracking-tight sm:text-[34px]">
            Settings
          </h1>

          <p className="mt-2 text-[12px] text-gray-500 dark:text-gray-400">
            Manage your store preferences and configuration.
          </p>
        </div>

        {/* =================================================
            STORE INFORMATION
        ================================================= */}

        <div className="mb-5 rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0d1017]">

          <div className="flex items-center gap-3 border-b border-gray-200 px-5 py-5 dark:border-white/10">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
              <Store size={18} />
            </div>

            <div>
              <h2 className="text-[16px] font-bold">
                Store Information
              </h2>

              <p className="mt-1 text-[10px] text-gray-500 dark:text-gray-400">
                Basic information about your store.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">

            {/* STORE NAME */}
            <div>
              <label className="mb-2 block text-[12px] font-medium">
                Store Name
              </label>

              <div className="relative">
                <Store
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="storeName"
                  value={settings.storeName}
                  onChange={handleChange}
                  className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-[12px] outline-none transition-colors focus:border-orange-500 dark:border-white/10 dark:bg-white/[0.03]"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="mb-2 block text-[12px] font-medium">
                Store Email
              </label>

              <div className="relative">
                <Mail
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-[12px] outline-none transition-colors focus:border-orange-500 dark:border-white/10 dark:bg-white/[0.03]"
                />
              </div>
            </div>

            {/* PHONE */}
            <div>
              <label className="mb-2 block text-[12px] font-medium">
                Phone Number
              </label>

              <div className="relative">
                <Phone
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="phone"
                  value={settings.phone}
                  onChange={handleChange}
                  className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-[12px] outline-none transition-colors focus:border-orange-500 dark:border-white/10 dark:bg-white/[0.03]"
                />
              </div>
            </div>

            {/* ADDRESS */}
            <div>
              <label className="mb-2 block text-[12px] font-medium">
                Store Address
              </label>

              <div className="relative">
                <MapPin
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="address"
                  value={settings.address}
                  onChange={handleChange}
                  className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-[12px] outline-none transition-colors focus:border-orange-500 dark:border-white/10 dark:bg-white/[0.03]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            REGIONAL SETTINGS
        ================================================= */}

        <div className="mb-5 rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0d1017]">

          <div className="flex items-center gap-3 border-b border-gray-200 px-5 py-5 dark:border-white/10">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
              <Globe size={18} />
            </div>

            <div>
              <h2 className="text-[16px] font-bold">
                Regional Settings
              </h2>

              <p className="mt-1 text-[10px] text-gray-500 dark:text-gray-400">
                Configure currency and timezone.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">

            {/* CURRENCY */}
            <div>
              <label className="mb-2 block text-[12px] font-medium">
                Currency
              </label>

              <div className="relative">
                <CreditCard
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <select
                  name="currency"
                  value={settings.currency}
                  onChange={handleChange}
                  className="h-11 w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-[12px] outline-none focus:border-orange-500 dark:border-white/10 dark:bg-white/[0.03]"
                >
                  <option value="INR">INR - Indian Rupee</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                </select>
              </div>
            </div>

            {/* TIMEZONE */}
            <div>
              <label className="mb-2 block text-[12px] font-medium">
                Timezone
              </label>

              <div className="relative">
                <Globe
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <select
                  name="timezone"
                  value={settings.timezone}
                  onChange={handleChange}
                  className="h-11 w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-[12px] outline-none focus:border-orange-500 dark:border-white/10 dark:bg-white/[0.03]"
                >
                  <option value="Asia/Kolkata">
                    India - Kolkata
                  </option>

                  <option value="UTC">
                    UTC
                  </option>

                  <option value="America/New_York">
                    America - New York
                  </option>

                  <option value="Europe/London">
                    Europe - London
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            ORDER SETTINGS
        ================================================= */}

        <div className="mb-5 rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0d1017]">

          <div className="flex items-center gap-3 border-b border-gray-200 px-5 py-5 dark:border-white/10">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500">
              <ShoppingBag size={18} />
            </div>

            <div>
              <h2 className="text-[16px] font-bold">
                Order Settings
              </h2>

              <p className="mt-1 text-[10px] text-gray-500 dark:text-gray-400">
                Configure your order preferences.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">

            {/* ORDER PREFIX */}
            <div>
              <label className="mb-2 block text-[12px] font-medium">
                Order Number Prefix
              </label>

              <input
                type="text"
                name="orderPrefix"
                value={settings.orderPrefix}
                onChange={handleChange}
                className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-[12px] outline-none focus:border-orange-500 dark:border-white/10 dark:bg-white/[0.03]"
                placeholder="ORD"
              />

              <p className="mt-2 text-[10px] text-gray-500">
                Example: ORD-10001
              </p>
            </div>

            {/* LOW STOCK */}
            <div>
              <label className="mb-2 block text-[12px] font-medium">
                Low Stock Alert Limit
              </label>

              <input
                type="number"
                name="lowStockLimit"
                value={settings.lowStockLimit}
                onChange={handleChange}
                className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-[12px] outline-none focus:border-orange-500 dark:border-white/10 dark:bg-white/[0.03]"
              />

              <p className="mt-2 text-[10px] text-gray-500">
                Alert when product stock reaches this limit.
              </p>
            </div>
          </div>
        </div>

     {/* =================================================
    NOTIFICATIONS
================================================= */}

<div className="mb-5 rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0d1017]">

  <div className="flex items-center gap-3 border-b border-gray-200 px-5 py-5 dark:border-white/10">
    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
      <Bell size={18} />
    </div>

    <div>
      <h2 className="text-[16px] font-bold">
        Notifications
      </h2>

      <p className="mt-1 text-[10px] text-gray-500 dark:text-gray-400">
        Choose which notifications you want to receive.
      </p>
    </div>
  </div>

  <div className="divide-y divide-gray-100 dark:divide-white/5">

    {/* EMAIL NOTIFICATIONS */}
    <div className="flex items-center justify-between gap-5 px-5 py-5">
      <div>
        <h3 className="text-[12px] font-semibold">
          Email Notifications
        </h3>

        <p className="mt-1 text-[10px] text-gray-500 dark:text-gray-400">
          Receive important store notifications by email.
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={emailNotifications}
        onClick={() =>
          setEmailNotifications((prev) => !prev)
        }
        className={`relative flex h-7 w-12 shrink-0 items-center rounded-full border transition-all duration-200 ${
          emailNotifications
            ? "border-orange-500 bg-orange-500"
            : "border-gray-300 bg-gray-200 dark:border-gray-600 dark:bg-gray-700"
        }`}
      >
        <span
          className={`absolute h-5 w-5 rounded-full bg-white shadow-md transition-all duration-200 ${
            emailNotifications
              ? "left-[23px]"
              : "left-[3px]"
          }`}
        />
      </button>
    </div>

    {/* NEW ORDER NOTIFICATIONS */}
    <div className="flex items-center justify-between gap-5 px-5 py-5">
      <div>
        <h3 className="text-[12px] font-semibold">
          New Order Notifications
        </h3>

        <p className="mt-1 text-[10px] text-gray-500 dark:text-gray-400">
          Get notified whenever a new order is placed.
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={orderNotifications}
        onClick={() =>
          setOrderNotifications((prev) => !prev)
        }
        className={`relative flex h-7 w-12 shrink-0 items-center rounded-full border transition-all duration-200 ${
          orderNotifications
            ? "border-orange-500 bg-orange-500"
            : "border-gray-300 bg-gray-200 dark:border-gray-600 dark:bg-gray-700"
        }`}
      >
        <span
          className={`absolute h-5 w-5 rounded-full bg-white shadow-md transition-all duration-200 ${
            orderNotifications
              ? "left-[23px]"
              : "left-[3px]"
          }`}
        />
      </button>
    </div>

    {/* LOW STOCK NOTIFICATIONS */}
    <div className="flex items-center justify-between gap-5 px-5 py-5">
      <div>
        <h3 className="text-[12px] font-semibold">
          Low Stock Notifications
        </h3>

        <p className="mt-1 text-[10px] text-gray-500 dark:text-gray-400">
          Receive alerts when products are running low.
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={lowStockNotifications}
        onClick={() =>
          setLowStockNotifications((prev) => !prev)
        }
        className={`relative flex h-7 w-12 shrink-0 items-center rounded-full border transition-all duration-200 ${
          lowStockNotifications
            ? "border-orange-500 bg-orange-500"
            : "border-gray-300 bg-gray-200 dark:border-gray-600 dark:bg-gray-700"
        }`}
      >
        <span
          className={`absolute h-5 w-5 rounded-full bg-white shadow-md transition-all duration-200 ${
            lowStockNotifications
              ? "left-[23px]"
              : "left-[3px]"
          }`}
        />
      </button>
    </div>

  </div>
</div>
        {/* =================================================
            SECURITY
        ================================================= */}

        <div className="mb-5 rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0d1017]">

          <div className="flex items-center gap-3 border-b border-gray-200 px-5 py-5 dark:border-white/10">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
              <ShieldCheck size={18} />
            </div>

            <div>
              <h2 className="text-[16px] font-bold">
                Security
              </h2>

              <p className="mt-1 text-[10px] text-gray-500 dark:text-gray-400">
                Manage your admin account security.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-[12px] font-semibold">
                Admin Account
              </h3>

              <p className="mt-1 text-[10px] text-gray-500">
                Keep your admin account secure with a strong password.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 text-[11px] font-semibold text-gray-700 transition-colors hover:border-orange-300 hover:text-orange-500 dark:border-white/10 dark:text-gray-300"
            >
              <ShieldCheck size={15} />
              Change Password
            </button>
          </div>
        </div>

        {/* =================================================
            SAVE
        ================================================= */}

        <div className="flex justify-end pb-7">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-6 text-[12px] font-semibold text-white shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5"
          >
            <Save size={17} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}