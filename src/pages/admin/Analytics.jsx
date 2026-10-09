import { useMemo, useState } from "react";
import {
  TrendingUp,
  IndianRupee,
  ShoppingBag,
  Users,
  Package,
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  CheckCircle2,
  Clock3,
  Truck,
  XCircle,
} from "lucide-react";

/* =========================================================
   ANALYTICS DATA
========================================================= */

const analyticsData = {
  "7 Days": {
    revenue: 184500,
    orders: 186,
    customers: 74,
    averageOrder: 992,
    revenueGrowth: 12.8,
    orderGrowth: 8.4,
    customerGrowth: 14.2,
    averageGrowth: 4.6,
    chart: [
      { day: "Mon", value: 18000 },
      { day: "Tue", value: 24500 },
      { day: "Wed", value: 21000 },
      { day: "Thu", value: 29500 },
      { day: "Fri", value: 26000 },
      { day: "Sat", value: 35000 },
      { day: "Sun", value: 30500 },
    ],
  },

  "30 Days": {
    revenue: 782500,
    orders: 846,
    customers: 328,
    averageOrder: 925,
    revenueGrowth: 18.6,
    orderGrowth: 12.4,
    customerGrowth: 16.8,
    averageGrowth: 5.7,
    chart: [
      { day: "Week 1", value: 145000 },
      { day: "Week 2", value: 178000 },
      { day: "Week 3", value: 205000 },
      { day: "Week 4", value: 254500 },
    ],
  },

  "90 Days": {
    revenue: 2185000,
    orders: 2348,
    customers: 924,
    averageOrder: 931,
    revenueGrowth: 24.2,
    orderGrowth: 19.5,
    customerGrowth: 21.3,
    averageGrowth: 6.9,
    chart: [
      { day: "Month 1", value: 610000 },
      { day: "Month 2", value: 735000 },
      { day: "Month 3", value: 840000 },
    ],
  },

  "1 Year": {
    revenue: 8645000,
    orders: 9426,
    customers: 3648,
    averageOrder: 917,
    revenueGrowth: 31.5,
    orderGrowth: 27.8,
    customerGrowth: 29.4,
    averageGrowth: 8.2,
    chart: [
      { day: "Jan", value: 520000 },
      { day: "Feb", value: 580000 },
      { day: "Mar", value: 610000 },
      { day: "Apr", value: 645000 },
      { day: "May", value: 690000 },
      { day: "Jun", value: 720000 },
      { day: "Jul", value: 755000 },
      { day: "Aug", value: 790000 },
      { day: "Sep", value: 825000 },
      { day: "Oct", value: 910000 },
      { day: "Nov", value: 950000 },
      { day: "Dec", value: 860000 },
    ],
  },
};

/* =========================================================
   TOP PRODUCTS
========================================================= */

const topProducts = [
  {
    name: "Premium Almonds",
    category: "Dry Fruits",
    sales: 248,
    revenue: 210800,
  },
  {
    name: "Pure Mustard Oil",
    category: "Oils",
    sales: 216,
    revenue: 112320,
  },
  {
    name: "Premium Cashews",
    category: "Dry Fruits",
    sales: 184,
    revenue: 174800,
  },
  {
    name: "Pure Cow Ghee",
    category: "Ghee",
    sales: 142,
    revenue: 110760,
  },
  {
    name: "Groundnut Oil",
    category: "Oils",
    sales: 126,
    revenue: 60480,
  },
];

/* =========================================================
   CATEGORY DATA
========================================================= */

const categoryData = [
  {
    name: "Dry Fruits",
    sales: 48,
    revenue: 385000,
  },
  {
    name: "Oils",
    sales: 27,
    revenue: 218000,
  },
  {
    name: "Ghee",
    sales: 18,
    revenue: 146000,
  },
  {
    name: "Other",
    sales: 7,
    revenue: 33500,
  },
];

/* =========================================================
   ORDER STATUS
========================================================= */

const orderStatus = [
  {
    name: "Delivered",
    value: 486,
    icon: CheckCircle2,
    style: "bg-emerald-500/10 text-emerald-500",
  },
  {
    name: "Processing",
    value: 128,
    icon: Clock3,
    style: "bg-blue-500/10 text-blue-500",
  },
  {
    name: "Shipped",
    value: 94,
    icon: Truck,
    style: "bg-purple-500/10 text-purple-500",
  },
  {
    name: "Cancelled",
    value: 38,
    icon: XCircle,
    style: "bg-red-500/10 text-red-500",
  },
];

/* =========================================================
   HELPERS
========================================================= */

function formatCurrency(value) {
  return `₹${value.toLocaleString("en-IN")}`;
}

/* =========================================================
   ANALYTICS
========================================================= */

export default function Analytics() {
  const [period, setPeriod] = useState("30 Days");
  const [showPeriod, setShowPeriod] = useState(false);

  const periods = [
    "7 Days",
    "30 Days",
    "90 Days",
    "1 Year",
  ];

  const data = analyticsData[period];

  const maxChartValue = useMemo(() => {
    return Math.max(
      ...data.chart.map((item) => item.value)
    );
  }, [data.chart]);

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
                <TrendingUp size={19} />
              </div>

              <span className="text-[12px] font-semibold text-orange-500">
                Store Insights
              </span>
            </div>

            <h1 className="text-[28px] font-bold tracking-tight sm:text-[34px]">
              Analytics
            </h1>

            <p className="mt-2 text-[12px] text-gray-500 dark:text-gray-400">
              Track your store performance and business growth.
            </p>
          </div>

          {/* PERIOD FILTER */}
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setShowPeriod((prev) => !prev)
              }
              className="flex h-11 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-[12px] font-medium text-gray-700 shadow-sm transition-colors hover:border-orange-300 hover:text-orange-500 dark:border-white/10 dark:bg-[#0d1017] dark:text-gray-300"
            >
              <CalendarDays size={16} />
              {period}
              <ChevronDown size={15} />
            </button>

            {showPeriod && (
              <div className="absolute right-0 top-14 z-50 w-40 rounded-xl border border-gray-200 bg-white p-2 shadow-xl dark:border-white/10 dark:bg-[#11151d]">
                {periods.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setPeriod(item);
                      setShowPeriod(false);
                    }}
                    className={`w-full rounded-lg px-3 py-2.5 text-left text-[12px] transition-colors ${
                      period === item
                        ? "bg-orange-500/10 text-orange-500"
                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* =================================================
            STATS
        ================================================= */}

        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {/* REVENUE */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-[#0d1017]">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[12px] text-gray-500 dark:text-gray-400">
                  Total Revenue
                </p>

                <h2 className="mt-2 whitespace-nowrap text-[24px] font-bold">
                  {formatCurrency(data.revenue)}
                </h2>

                <div className="mt-2 flex items-center gap-1 whitespace-nowrap text-[10px] font-medium text-emerald-500">
                  <ArrowUpRight size={13} />
                  {data.revenueGrowth}% from previous period
                </div>
              </div>

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                <IndianRupee size={22} />
              </div>
            </div>
          </div>

          {/* ORDERS */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-[#0d1017]">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[12px] text-gray-500 dark:text-gray-400">
                  Total Orders
                </p>

                <h2 className="mt-2 whitespace-nowrap text-[24px] font-bold">
                  {data.orders.toLocaleString("en-IN")}
                </h2>

                <div className="mt-2 flex items-center gap-1 whitespace-nowrap text-[10px] font-medium text-emerald-500">
                  <ArrowUpRight size={13} />
                  {data.orderGrowth}% from previous period
                </div>
              </div>

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500">
                <ShoppingBag size={22} />
              </div>
            </div>
          </div>

          {/* CUSTOMERS */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-[#0d1017]">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[12px] text-gray-500 dark:text-gray-400">
                  New Customers
                </p>

                <h2 className="mt-2 whitespace-nowrap text-[24px] font-bold">
                  {data.customers.toLocaleString("en-IN")}
                </h2>

                <div className="mt-2 flex items-center gap-1 whitespace-nowrap text-[10px] font-medium text-emerald-500">
                  <ArrowUpRight size={13} />
                  {data.customerGrowth}% from previous period
                </div>
              </div>

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                <Users size={22} />
              </div>
            </div>
          </div>

          {/* AVERAGE ORDER */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-[#0d1017]">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[12px] text-gray-500 dark:text-gray-400">
                  Average Order Value
                </p>

                <h2 className="mt-2 whitespace-nowrap text-[24px] font-bold">
                  {formatCurrency(data.averageOrder)}
                </h2>

                <div className="mt-2 flex items-center gap-1 whitespace-nowrap text-[10px] font-medium text-emerald-500">
                  <ArrowUpRight size={13} />
                  {data.averageGrowth}% from previous period
                </div>
              </div>

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                <TrendingUp size={22} />
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            REVENUE + ORDER STATUS
        ================================================= */}

        <div className="mb-7 grid grid-cols-1 gap-5 xl:grid-cols-[2fr_1fr]">

          {/* REVENUE CHART */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-[#0d1017]">

            <div className="mb-7 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-[16px] font-bold">
                  Revenue Overview
                </h2>

                <p className="mt-1 text-[10px] text-gray-500 dark:text-gray-400">
                  Revenue performance for{" "}
                  {period.toLowerCase()}.
                </p>
              </div>

              <div className="shrink-0 rounded-lg bg-orange-500/10 px-3 py-1.5 text-[10px] font-semibold text-orange-500">
                {period}
              </div>
            </div>

            {/* CHART */}
            <div className="flex h-[280px] items-end gap-3 sm:gap-5">
              {data.chart.map((item) => {
                const height =
                  (item.value / maxChartValue) * 100;

                return (
                  <div
                    key={item.day}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                  >
                    <div className="group relative flex h-full w-full items-end justify-center">

                      {/* VALUE */}
                      <div className="absolute -top-1 z-10 rounded-md bg-[#11151d] px-2 py-1 text-[9px] font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                        {formatCurrency(item.value)}
                      </div>

                      {/* BAR */}
                      <div
                        className="w-full max-w-[55px] rounded-t-xl bg-gradient-to-t from-orange-500 to-orange-400 transition-all duration-500 hover:from-orange-600 hover:to-orange-500"
                        style={{
                          height: `${Math.max(
                            height,
                            8
                          )}%`,
                        }}
                      />
                    </div>

                    <span className="whitespace-nowrap text-[9px] text-gray-500">
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ORDER STATUS */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-[#0d1017]">

            <div className="mb-6">
              <h2 className="text-[16px] font-bold">
                Order Status
              </h2>

              <p className="mt-1 text-[10px] text-gray-500 dark:text-gray-400">
                Current order distribution.
              </p>
            </div>

            <div className="space-y-4">
              {orderStatus.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-lg ${item.style}`}
                      >
                        <Icon size={17} />
                      </div>

                      <span className="text-[12px] font-medium">
                        {item.name}
                      </span>
                    </div>

                    <span className="text-[13px] font-bold">
                      {item.value}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-7 border-t border-gray-200 pt-5 dark:border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-gray-500">
                  Total Orders
                </span>

                <span className="text-[13px] font-bold">
                  {orderStatus
                    .reduce(
                      (total, item) =>
                        total + item.value,
                      0
                    )
                    .toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            TOP PRODUCTS + CATEGORY
        ================================================= */}

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.5fr_1fr]">

          {/* TOP PRODUCTS */}
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0d1017]">

            <div className="border-b border-gray-200 px-5 py-5 dark:border-white/10">
              <h2 className="text-[16px] font-bold">
                Top Products
              </h2>

              <p className="mt-1 text-[10px] text-gray-500 dark:text-gray-400">
                Best performing products by sales.
              </p>
            </div>

            <div className="divide-y divide-gray-100 dark:divide-white/5">
              {topProducts.map((product, index) => (
                <div
                  key={product.name}
                  className="flex items-center gap-4 px-5 py-4"
                >
                  {/* RANK */}
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-[11px] font-bold text-orange-500">
                    #{index + 1}
                  </div>

                  {/* PRODUCT ICON */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-500 dark:bg-white/5 dark:text-gray-400">
                    <Package size={18} />
                  </div>

                  {/* INFO */}
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-[12px] font-semibold">
                      {product.name}
                    </h3>

                    <p className="mt-1 text-[10px] text-gray-500">
                      {product.category} •{" "}
                      {product.sales} units sold
                    </p>
                  </div>

                  {/* REVENUE */}
                  <div className="text-right">
                    <p className="whitespace-nowrap text-[12px] font-bold">
                      {formatCurrency(product.revenue)}
                    </p>

                    <p className="mt-1 text-[10px] text-gray-500">
                      Revenue
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CATEGORY PERFORMANCE */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-[#0d1017]">

            <div className="mb-6">
              <h2 className="text-[16px] font-bold">
                Category Performance
              </h2>

              <p className="mt-1 text-[10px] text-gray-500 dark:text-gray-400">
                Revenue contribution by category.
              </p>
            </div>

            <div className="space-y-6">
              {categoryData.map((category) => (
                <div key={category.name}>

                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[12px] font-medium">
                      {category.name}
                    </span>

                    <span className="text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                      {formatCurrency(category.revenue)}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-white/5">
                    <div
                      className="h-full rounded-full bg-orange-500"
                      style={{
                        width: `${category.sales}%`,
                      }}
                    />
                  </div>

                  <div className="mt-1 flex justify-between">
                    <span className="text-[9px] text-gray-500">
                      {category.sales}% sales
                    </span>

                    <span className="text-[9px] text-gray-500">
                      Revenue
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* INSIGHT */}
            <div className="mt-7 rounded-xl border border-orange-500/10 bg-orange-500/5 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
                  <TrendingUp size={16} />
                </div>

                <div>
                  <p className="text-[11px] font-semibold">
                    Best Performing Category
                  </p>

                  <p className="mt-1 text-[10px] leading-5 text-gray-500 dark:text-gray-400">
                    Dry Fruits is currently your strongest
                    category with the highest sales contribution.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-7" />
      </div>
    </div>
  );
}