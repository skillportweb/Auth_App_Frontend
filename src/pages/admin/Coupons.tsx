import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  Filter,
  Eye,
  Edit,
  Trash2,
  TicketPercent,
  CheckCircle2,
  XCircle,
  Clock3,
  IndianRupee,
  Percent,
  ChevronDown,
  Ban,
  Play,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type CouponStatus = "Active" | "Inactive" | "Expired";

type DiscountType = "Percentage" | "Fixed Amount";

interface Coupon {
  id: number;
  code: string;
  name: string;
  description: string;
  discountType: DiscountType;
  discountValue: number;
  minOrder: number;
  maxDiscount: number;
  usageLimit: number;
  used: number;
  startDate: string;
  endDate: string;
  status: CouponStatus;
}

/* =========================================================
   COUPON DATA
========================================================= */

const coupons: Coupon[] = [
  {
    id: 1,
    code: "SAVE20",
    name: "Summer Sale",
    description: "Get 20% off on your order.",
    discountType: "Percentage",
    discountValue: 20,
    minOrder: 999,
    maxDiscount: 500,
    usageLimit: 500,
    used: 124,
    startDate: "01 Oct 2026",
    endDate: "31 Oct 2026",
    status: "Active",
  },
  {
    id: 2,
    code: "WELCOME100",
    name: "Welcome Offer",
    description: "Flat ₹100 off for new customers.",
    discountType: "Fixed Amount",
    discountValue: 100,
    minOrder: 599,
    maxDiscount: 100,
    usageLimit: 1000,
    used: 346,
    startDate: "01 Sep 2026",
    endDate: "31 Dec 2026",
    status: "Active",
  },
  {
    id: 3,
    code: "FIRST50",
    name: "First Order",
    description: "Special discount for first order.",
    discountType: "Percentage",
    discountValue: 10,
    minOrder: 499,
    maxDiscount: 250,
    usageLimit: 300,
    used: 187,
    startDate: "01 Oct 2026",
    endDate: "15 Oct 2026",
    status: "Active",
  },
  {
    id: 4,
    code: "DIWALI50",
    name: "Diwali Offer",
    description: "Flat ₹500 discount on selected orders.",
    discountType: "Fixed Amount",
    discountValue: 500,
    minOrder: 2499,
    maxDiscount: 500,
    usageLimit: 200,
    used: 200,
    startDate: "01 Sep 2026",
    endDate: "30 Sep 2026",
    status: "Expired",
  },
  {
    id: 5,
    code: "FLAT200",
    name: "Flat Discount",
    description: "Flat ₹200 off on orders above ₹1499.",
    discountType: "Fixed Amount",
    discountValue: 200,
    minOrder: 1499,
    maxDiscount: 200,
    usageLimit: 400,
    used: 96,
    startDate: "05 Oct 2026",
    endDate: "25 Oct 2026",
    status: "Active",
  },
  {
    id: 6,
    code: "OFFER10",
    name: "Special Offer",
    description: "10% discount for selected customers.",
    discountType: "Percentage",
    discountValue: 10,
    minOrder: 799,
    maxDiscount: 300,
    usageLimit: 500,
    used: 0,
    startDate: "10 Oct 2026",
    endDate: "20 Oct 2026",
    status: "Inactive",
  },
  {
    id: 7,
    code: "FESTIVE25",
    name: "Festive Offer",
    description: "Get 25% off on your festive shopping.",
    discountType: "Percentage",
    discountValue: 25,
    minOrder: 1999,
    maxDiscount: 750,
    usageLimit: 600,
    used: 284,
    startDate: "01 Oct 2026",
    endDate: "31 Oct 2026",
    status: "Active",
  },
  {
    id: 8,
    code: "NEWYEAR300",
    name: "New Year Offer",
    description: "Flat ₹300 off on premium orders.",
    discountType: "Fixed Amount",
    discountValue: 300,
    minOrder: 1999,
    maxDiscount: 300,
    usageLimit: 300,
    used: 300,
    startDate: "01 Jan 2026",
    endDate: "31 Jan 2026",
    status: "Expired",
  },
];

/* =========================================================
   FILTER OPTIONS
========================================================= */

const statusOptions: (CouponStatus | "All")[] = [
  "All",
  "Active",
  "Inactive",
  "Expired",
];

const discountOptions: (DiscountType | "All")[] = [
  "All",
  "Percentage",
  "Fixed Amount",
];

/* =========================================================
   STATUS STYLE
========================================================= */

function getStatusStyle(status: CouponStatus) {
  switch (status) {
    case "Active":
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";

    case "Inactive":
      return "border-gray-300 bg-gray-100 text-gray-500 dark:border-white/10 dark:bg-white/5 dark:text-gray-400";

    case "Expired":
      return "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400";

    default:
      return "";
  }
}

/* =========================================================
   COUPONS
========================================================= */

export default function Coupons() {
  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState<
    CouponStatus | "All"
  >("All");

  const [discountFilter, setDiscountFilter] = useState<
    DiscountType | "All"
  >("All");

  const [showFilter, setShowFilter] = useState(false);

  /* =========================================================
     FILTER COUPONS
  ========================================================= */

  const filteredCoupons = useMemo(() => {
    return coupons.filter((coupon) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        coupon.code.toLowerCase().includes(searchValue) ||
        coupon.name.toLowerCase().includes(searchValue) ||
        coupon.description.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        coupon.status === statusFilter;

      const matchesDiscount =
        discountFilter === "All" ||
        coupon.discountType === discountFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesDiscount
      );
    });
  }, [search, statusFilter, discountFilter]);

  /* =========================================================
     STATS
  ========================================================= */

  const activeCoupons = coupons.filter(
    (coupon) => coupon.status === "Active"
  ).length;

  const expiredCoupons = coupons.filter(
    (coupon) => coupon.status === "Expired"
  ).length;

  const totalUsage = coupons.reduce(
    (total, coupon) => total + coupon.used,
    0
  );

  const totalDiscount = coupons.reduce(
    (total, coupon) => {
      if (coupon.discountType === "Fixed Amount") {
        return total + coupon.discountValue * coupon.used;
      }

      return total;
    },
    0
  );

  const stats = [
    {
      title: "Total Coupons",
      value: coupons.length,
      subtitle: "All created coupons",
      icon: TicketPercent,
      color: "text-orange-500 bg-orange-500/10",
    },
    {
      title: "Active Coupons",
      value: activeCoupons,
      subtitle: "Currently active",
      icon: CheckCircle2,
      color: "text-emerald-500 bg-emerald-500/10",
    },
    {
      title: "Expired Coupons",
      value: expiredCoupons,
      subtitle: "No longer valid",
      icon: Clock3,
      color: "text-red-500 bg-red-500/10",
    },
    {
      title: "Total Usage",
      value: totalUsage,
      subtitle: "Coupons redeemed",
      icon: Percent,
      color: "text-purple-500 bg-purple-500/10",
    },
    {
      title: "Total Discount",
      value: `₹${totalDiscount.toLocaleString("en-IN")}`,
      subtitle: "Fixed discount value",
      icon: IndianRupee,
      color: "text-blue-500 bg-blue-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#08090b] dark:text-white">
      <div className="mx-auto max-w-[1600px]">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
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
              Coupons
            </h1>

            <p className="mt-2 text-[12px] text-gray-500 dark:text-gray-400">
              Create and manage discount coupons for your store.
            </p>
          </div>

          {/* ADD COUPON */}
          <Link
            to="/admin/add-coupons"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-5 py-3 text-[12px] font-semibold text-white shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5"
          >
            <Plus size={19} />
            Add Coupon
          </Link>
        </div>

        {/* =================================================
            STATS
        ================================================= */}

        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {stats.map((item) => {
            const Icon = item.icon;
            const isTotalDiscount =
              item.title === "Total Discount";

            return (
              <div
                key={item.title}
                className="min-w-0 rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-[#0d1017]"
              >
                <div className="flex min-w-0 items-center justify-between gap-3">

                  {/* CONTENT */}
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] text-gray-500 dark:text-gray-400">
                      {item.title}
                    </p>

                    <h2
                      className={
                        isTotalDiscount
                          ? "mt-2 whitespace-nowrap text-[18px] font-bold leading-tight tracking-tight"
                          : "mt-2 text-[22px] font-bold leading-tight"
                      }
                    >
                      {item.value}
                    </h2>

                    <p className="mt-1 text-[10px] text-gray-500 dark:text-gray-500">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* ICON */}
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.color}`}
                  >
                    <Icon size={22} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* =================================================
            SEARCH / FILTER
        ================================================= */}

        <div className="mb-7 rounded-2xl border border-gray-200 bg-white p-4 dark:border-white/10 dark:bg-[#0d1017]">
          <div className="flex flex-col gap-3 xl:flex-row">

            {/* SEARCH */}
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search coupon code, name or description..."
                className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-[12px] text-gray-900 outline-none placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
              />
            </div>

            {/* FILTER */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setShowFilter((prev) => !prev)
                }
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-5 text-[12px] font-medium text-gray-700 hover:border-orange-300 hover:text-orange-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-300 xl:w-auto"
              >
                <Filter size={17} />
                Filter
                <ChevronDown size={15} />
              </button>

              {showFilter && (
                <div className="absolute right-0 top-14 z-50 w-60 rounded-xl border border-gray-200 bg-white p-3 shadow-xl dark:border-white/10 dark:bg-[#11151d]">

                  {/* STATUS */}
                  <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                    Coupon Status
                  </p>

                  <div className="space-y-1">
                    {statusOptions.map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() =>
                          setStatusFilter(status)
                        }
                        className={`w-full rounded-lg px-3 py-2 text-left text-[12px] transition-colors ${
                          statusFilter === status
                            ? "bg-orange-500/10 text-orange-500"
                            : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>

                  {/* DISCOUNT TYPE */}
                  <div className="mt-3 border-t border-gray-200 pt-3 dark:border-white/10">
                    <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                      Discount Type
                    </p>

                    <div className="space-y-1">
                      {discountOptions.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() =>
                            setDiscountFilter(type)
                          }
                          className={`w-full rounded-lg px-3 py-2 text-left text-[12px] transition-colors ${
                            discountFilter === type
                              ? "bg-orange-500/10 text-orange-500"
                              : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* CLEAR */}
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setStatusFilter("All");
                      setDiscountFilter("All");
                      setShowFilter(false);
                    }}
                    className="mt-3 w-full rounded-lg border border-gray-200 px-3 py-2 text-[12px] font-medium text-gray-600 hover:border-orange-300 hover:text-orange-500 dark:border-white/10 dark:text-gray-300"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* FILTER INFO */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] text-gray-500 dark:text-gray-400">
            <span>Status:</span>

            <span className="rounded-full bg-orange-500/10 px-3 py-1 font-medium text-orange-500">
              {statusFilter}
            </span>

            <span className="rounded-full bg-purple-500/10 px-3 py-1 font-medium text-purple-500">
              Type: {discountFilter}
            </span>

            <span>
              • {filteredCoupons.length} coupons
            </span>
          </div>
        </div>

        {/* =================================================
            COUPONS TABLE
        ================================================= */}

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0d1017]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1250px] border-collapse">

              {/* HEADER */}
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/[0.025]">
                  {[
                    "Coupon",
                    "Discount",
                    "Min Order",
                    "Max Discount",
                    "Validity",
                    "Usage",
                    "Status",
                    "Actions",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className={`px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 ${
                        heading === "Actions"
                          ? "text-right"
                          : "text-left"
                      }`}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {filteredCoupons.length > 0 ? (
                  filteredCoupons.map((coupon) => {
                    const usagePercentage =
                      coupon.usageLimit > 0
                        ? Math.min(
                            (coupon.used /
                              coupon.usageLimit) *
                              100,
                            100
                          )
                        : 0;

                    return (
                      <tr
                        key={coupon.id}
                        className="border-b border-gray-100 transition-colors last:border-b-0 hover:bg-orange-50/50 dark:border-white/5 dark:hover:bg-orange-500/[0.03]"
                      >

                        {/* COUPON */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                              <TicketPercent size={18} />
                            </div>

                            <div>
                              <h3 className="text-[12px] font-bold">
                                {coupon.code}
                              </h3>

                              <p className="mt-0.5 text-[11px] font-medium text-gray-600 dark:text-gray-300">
                                {coupon.name}
                              </p>

                              <p className="mt-0.5 max-w-[220px] truncate text-[10px] text-gray-500">
                                {coupon.description}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* DISCOUNT */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500">
                              {coupon.discountType ===
                              "Percentage" ? (
                                <Percent size={15} />
                              ) : (
                                <IndianRupee size={15} />
                              )}
                            </div>

                            <div>
                              <p className="text-[12px] font-semibold">
                                {coupon.discountType ===
                                "Percentage"
                                  ? `${coupon.discountValue}%`
                                  : `₹${coupon.discountValue}`}
                              </p>

                              <p className="text-[10px] text-gray-500">
                                {coupon.discountType ===
                                "Percentage"
                                  ? "Percentage"
                                  : "Fixed amount"}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* MIN ORDER */}
                        <td className="px-5 py-4">
                          <p className="text-[12px] font-semibold">
                            ₹
                            {coupon.minOrder.toLocaleString(
                              "en-IN"
                            )}
                          </p>

                          <p className="text-[10px] text-gray-500">
                            minimum order
                          </p>
                        </td>

                        {/* MAX DISCOUNT */}
                        <td className="px-5 py-4">
                          <p className="text-[12px] font-semibold">
                            ₹
                            {coupon.maxDiscount.toLocaleString(
                              "en-IN"
                            )}
                          </p>

                          <p className="text-[10px] text-gray-500">
                            maximum discount
                          </p>
                        </td>

                        {/* VALIDITY */}
                        <td className="px-5 py-4">
                          <p className="text-[11px] text-gray-600 dark:text-gray-300">
                            {coupon.startDate}
                          </p>

                          <p className="mt-1 text-[10px] text-gray-500">
                            to {coupon.endDate}
                          </p>
                        </td>

                        {/* USAGE */}
                        <td className="px-5 py-4">
                          <div className="min-w-[120px]">
                            <div className="mb-1 flex items-center justify-between">
                              <span className="text-[11px] font-semibold">
                                {coupon.used}
                              </span>

                              <span className="text-[10px] text-gray-500">
                                / {coupon.usageLimit}
                              </span>
                            </div>

                            <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-white/10">
                              <div
                                className="h-1.5 rounded-full bg-orange-500"
                                style={{
                                  width: `${usagePercentage}%`,
                                }}
                              />
                            </div>
                          </div>
                        </td>

                        {/* STATUS */}
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[9px] font-semibold ${getStatusStyle(
                              coupon.status
                            )}`}
                          >
                            {coupon.status === "Active" && (
                              <CheckCircle2 size={12} />
                            )}

                            {coupon.status === "Inactive" && (
                              <XCircle size={12} />
                            )}

                            {coupon.status === "Expired" && (
                              <Clock3 size={12} />
                            )}

                            {coupon.status}
                          </span>
                        </td>

                        {/* ACTIONS */}
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-2">

                            {/* VIEW */}
                            <button
                              type="button"
                              title="View Coupon"
                              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:border-orange-300 hover:text-orange-500 dark:border-white/10 dark:text-gray-400"
                            >
                              <Eye size={16} />
                            </button>

                            {/* EDIT */}
                            {coupon.status !== "Expired" && (
                              <button
                                type="button"
                                title="Edit Coupon"
                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500 transition-colors hover:bg-orange-500 hover:text-white"
                              >
                                <Edit size={16} />
                              </button>
                            )}

                            {/* ACTIVE / INACTIVE */}
                            {coupon.status === "Active" && (
                              <button
                                type="button"
                                title="Deactivate Coupon"
                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-500/10 text-yellow-500 transition-colors hover:bg-yellow-500 hover:text-white"
                              >
                                <Ban size={16} />
                              </button>
                            )}

                            {coupon.status === "Inactive" && (
                              <button
                                type="button"
                                title="Activate Coupon"
                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 transition-colors hover:bg-emerald-500 hover:text-white"
                              >
                                <Play size={16} />
                              </button>
                            )}

                            {/* DELETE */}
                            <button
                              type="button"
                              title="Delete Coupon"
                              className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 text-red-500 transition-colors hover:bg-red-500 hover:text-white"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-5 py-16 text-center"
                    >
                      <TicketPercent
                        size={30}
                        className="mx-auto text-orange-500"
                      />

                      <h3 className="mt-5 text-[16px] font-bold">
                        No coupons found
                      </h3>

                      <p className="mt-2 text-[12px] text-gray-500">
                        Try changing your search or filters.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* FOOTER */}
          <div className="border-t border-gray-200 px-5 py-4 text-[12px] text-gray-500 dark:border-white/10">
            Showing {filteredCoupons.length} of{" "}
            {coupons.length} coupons
          </div>
        </div>
      </div>
    </div>
  );
}