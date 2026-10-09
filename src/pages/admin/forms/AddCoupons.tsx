import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  TicketPercent,
  Save,
  Percent,
  IndianRupee,
  CalendarDays,
  Users,
  ShoppingCart,
  CircleDollarSign,
  RotateCcw,
} from "lucide-react";

export default function AddCoupons() {
  const [discountType, setDiscountType] = useState<
    "Percentage" | "Fixed Amount"
  >("Percentage");

  const [status, setStatus] = useState("Active");

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    description: "",
    discountValue: "",
    minOrder: "",
    maxDiscount: "",
    usageLimit: "",
    perCustomerLimit: "1",
    startDate: "",
    endDate: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      ...formData,
      discountType,
      status,
    });
  };

  const handleReset = () => {
    setFormData({
      code: "",
      name: "",
      description: "",
      discountValue: "",
      minOrder: "",
      maxDiscount: "",
      usageLimit: "",
      perCustomerLimit: "1",
      startDate: "",
      endDate: "",
    });

    setDiscountType("Percentage");
    setStatus("Active");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#08090b] dark:text-white">
      <div className="mx-auto max-w-[1200px]">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                <TicketPercent size={19} />
              </div>

              <span className="text-[12px] font-semibold text-orange-500">
                Store Management
              </span>
            </div>

            <h1 className="text-[28px] font-bold tracking-tight sm:text-[34px]">
              Add Coupon
            </h1>

            <p className="mt-2 text-[12px] text-gray-500 dark:text-gray-400">
              Create a new discount coupon for your store.
            </p>
          </div>

          {/* BACK */}
          <Link
            to="/admin/coupons"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-[12px] font-semibold text-gray-700 transition-all hover:border-orange-300 hover:text-orange-500 dark:border-white/10 dark:bg-[#0d1017] dark:text-gray-300"
          >
            <ArrowLeft size={17} />
            Back to Coupons
          </Link>
        </div>

        {/* =================================================
            FORM
        ================================================= */}

        <form onSubmit={handleSubmit}>

          {/* =================================================
              BASIC INFORMATION
          ================================================= */}

          <div className="mb-5 rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0d1017]">

            <div className="border-b border-gray-200 px-5 py-4 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                  <TicketPercent size={18} />
                </div>

                <div>
                  <h2 className="text-[14px] font-bold">
                    Basic Information
                  </h2>

                  <p className="mt-0.5 text-[10px] text-gray-500">
                    Enter the basic details of your coupon.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">

              {/* COUPON CODE */}
              <div>
                <label className="mb-2 block text-[12px] font-semibold">
                  Coupon Code
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="e.g. SAVE20"
                  required
                  className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-[12px] uppercase text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                />

                <p className="mt-1.5 text-[10px] text-gray-500">
                  Use a unique code customers can enter at checkout.
                </p>
              </div>

              {/* COUPON NAME */}
              <div>
                <label className="mb-2 block text-[12px] font-semibold">
                  Coupon Name
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Summer Sale"
                  required
                  className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-[12px] text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                />
              </div>

              {/* DESCRIPTION */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-[12px] font-semibold">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Describe this coupon..."
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-[12px] text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* =================================================
              DISCOUNT
          ================================================= */}

          <div className="mb-5 rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0d1017]">

            <div className="border-b border-gray-200 px-5 py-4 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500">
                  {discountType === "Percentage" ? (
                    <Percent size={18} />
                  ) : (
                    <IndianRupee size={18} />
                  )}
                </div>

                <div>
                  <h2 className="text-[14px] font-bold">
                    Discount Settings
                  </h2>

                  <p className="mt-0.5 text-[10px] text-gray-500">
                    Configure the discount amount and order requirements.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">

              {/* DISCOUNT TYPE */}
              <div>
                <label className="mb-2 block text-[12px] font-semibold">
                  Discount Type
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <div className="grid grid-cols-2 gap-3">

                  <button
                    type="button"
                    onClick={() =>
                      setDiscountType("Percentage")
                    }
                    className={`flex h-11 items-center justify-center gap-2 rounded-xl border text-[12px] font-semibold transition ${
                      discountType === "Percentage"
                        ? "border-orange-500 bg-orange-500/10 text-orange-500"
                        : "border-gray-200 bg-gray-50 text-gray-600 hover:border-orange-300 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-300"
                    }`}
                  >
                    <Percent size={15} />
                    Percentage
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setDiscountType("Fixed Amount")
                    }
                    className={`flex h-11 items-center justify-center gap-2 rounded-xl border text-[12px] font-semibold transition ${
                      discountType === "Fixed Amount"
                        ? "border-orange-500 bg-orange-500/10 text-orange-500"
                        : "border-gray-200 bg-gray-50 text-gray-600 hover:border-orange-300 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-300"
                    }`}
                  >
                    <IndianRupee size={15} />
                    Fixed Amount
                  </button>

                </div>
              </div>

              {/* DISCOUNT VALUE */}
              <div>
                <label className="mb-2 block text-[12px] font-semibold">
                  Discount Value
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <div className="relative">
                  <input
                    type="number"
                    name="discountValue"
                    value={formData.discountValue}
                    onChange={handleChange}
                    min="0"
                    required
                    placeholder={
                      discountType === "Percentage"
                        ? "20"
                        : "200"
                    }
                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 pr-12 text-[12px] text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] font-semibold text-gray-400">
                    {discountType === "Percentage" ? "%" : "₹"}
                  </span>
                </div>
              </div>

              {/* MIN ORDER */}
              <div>
                <label className="mb-2 block text-[12px] font-semibold">
                  Minimum Order Amount
                </label>

                <div className="relative">
                  <IndianRupee
                    size={15}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="number"
                    name="minOrder"
                    value={formData.minOrder}
                    onChange={handleChange}
                    min="0"
                    placeholder="999"
                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-[12px] text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                  />
                </div>
              </div>

              {/* MAX DISCOUNT */}
              <div>
                <label className="mb-2 block text-[12px] font-semibold">
                  Maximum Discount
                </label>

                <div className="relative">
                  <IndianRupee
                    size={15}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="number"
                    name="maxDiscount"
                    value={formData.maxDiscount}
                    onChange={handleChange}
                    min="0"
                    placeholder="500"
                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-[12px] text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                  />
                </div>

                <p className="mt-1.5 text-[10px] text-gray-500">
                  Mainly useful for percentage discounts.
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              USAGE LIMITS
          ================================================= */}

          <div className="mb-5 rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0d1017]">

            <div className="border-b border-gray-200 px-5 py-4 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                  <Users size={18} />
                </div>

                <div>
                  <h2 className="text-[14px] font-bold">
                    Usage Limits
                  </h2>

                  <p className="mt-0.5 text-[10px] text-gray-500">
                    Control how many times the coupon can be used.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">

              {/* USAGE LIMIT */}
              <div>
                <label className="mb-2 block text-[12px] font-semibold">
                  Total Usage Limit
                </label>

                <div className="relative">
                  <Users
                    size={15}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="number"
                    name="usageLimit"
                    value={formData.usageLimit}
                    onChange={handleChange}
                    min="1"
                    placeholder="500"
                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-[12px] text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                  />
                </div>

                <p className="mt-1.5 text-[10px] text-gray-500">
                  Leave empty if there is no total usage limit.
                </p>
              </div>

              {/* PER CUSTOMER */}
              <div>
                <label className="mb-2 block text-[12px] font-semibold">
                  Usage Per Customer
                </label>

                <div className="relative">
                  <Users
                    size={15}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="number"
                    name="perCustomerLimit"
                    value={formData.perCustomerLimit}
                    onChange={handleChange}
                    min="1"
                    placeholder="1"
                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-[12px] text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              VALIDITY
          ================================================= */}

          <div className="mb-5 rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0d1017]">

            <div className="border-b border-gray-200 px-5 py-4 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                  <CalendarDays size={18} />
                </div>

                <div>
                  <h2 className="text-[14px] font-bold">
                    Coupon Validity
                  </h2>

                  <p className="mt-0.5 text-[10px] text-gray-500">
                    Set when this coupon becomes valid and expires.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">

              {/* START DATE */}
              <div>
                <label className="mb-2 block text-[12px] font-semibold">
                  Start Date
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <div className="relative">
                  <CalendarDays
                    size={15}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-[12px] text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                  />
                </div>
              </div>

              {/* END DATE */}
              <div>
                <label className="mb-2 block text-[12px] font-semibold">
                  End Date
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <div className="relative">
                  <CalendarDays
                    size={15}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-[12px] text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              STATUS
          ================================================= */}

          <div className="mb-5 rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0d1017]">

            <div className="border-b border-gray-200 px-5 py-4 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                  <CircleDollarSign size={18} />
                </div>

                <div>
                  <h2 className="text-[14px] font-bold">
                    Status
                  </h2>

                  <p className="mt-0.5 text-[10px] text-gray-500">
                    Choose whether the coupon should be active.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                <button
                  type="button"
                  onClick={() => setStatus("Active")}
                  className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                    status === "Active"
                      ? "border-emerald-500 bg-emerald-500/10"
                      : "border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </div>

                  <div>
                    <p className="text-[12px] font-semibold">
                      Active
                    </p>

                    <p className="mt-0.5 text-[10px] text-gray-500">
                      Coupon can be used by customers.
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setStatus("Inactive")}
                  className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                    status === "Inactive"
                      ? "border-gray-400 bg-gray-100 dark:border-white/20 dark:bg-white/5"
                      : "border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-500/10 text-gray-500">
                    <span className="h-2.5 w-2.5 rounded-full bg-gray-400" />
                  </div>

                  <div>
                    <p className="text-[12px] font-semibold">
                      Inactive
                    </p>

                    <p className="mt-0.5 text-[10px] text-gray-500">
                      Coupon will remain disabled.
                    </p>
                  </div>
                </button>

              </div>
            </div>
          </div>

          {/* =================================================
              ACTIONS
          ================================================= */}

          <div className="mb-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-[12px] font-semibold text-gray-600 transition hover:border-orange-300 hover:text-orange-500 dark:border-white/10 dark:bg-[#0d1017] dark:text-gray-300"
            >
              <RotateCcw size={16} />
              Reset
            </button>

            <Link
              to="/admin/coupons"
              className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-3 text-[12px] font-semibold text-gray-600 transition hover:border-orange-300 hover:text-orange-500 dark:border-white/10 dark:bg-[#0d1017] dark:text-gray-300"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 text-[12px] font-semibold text-white shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5"
            >
              <Save size={17} />
              Save Coupon
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}