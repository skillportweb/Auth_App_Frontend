import {
  IndianRupee,
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  MoreHorizontal,
  Clock3,
  CheckCircle2,
  Truck,
  XCircle,
} from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Revenue",
      value: "₹2,84,560",
      change: "+12.5%",
      positive: true,
      icon: IndianRupee,
    },
    {
      title: "Total Orders",
      value: "1,248",
      change: "+8.2%",
      positive: true,
      icon: ShoppingCart,
    },
    {
      title: "Total Products",
      value: "186",
      change: "+4.6%",
      positive: true,
      icon: Package,
    },
    {
      title: "Total Customers",
      value: "8,549",
      change: "-2.4%",
      positive: false,
      icon: Users,
    },
  ];

  const recentOrders = [
    {
      id: "#ORD-10245",
      customer: "Rahul Sharma",
      product: "Premium Almonds",
      amount: "₹1,299",
      status: "Delivered",
    },
    {
      id: "#ORD-10244",
      customer: "Priya Singh",
      product: "Kashmiri Walnuts",
      amount: "₹899",
      status: "Processing",
    },
    {
      id: "#ORD-10243",
      customer: "Amit Kumar",
      product: "Premium Cashews",
      amount: "₹1,599",
      status: "Shipped",
    },
    {
      id: "#ORD-10242",
      customer: "Neha Gupta",
      product: "Mixed Dry Fruits",
      amount: "₹1,199",
      status: "Cancelled",
    },
    {
      id: "#ORD-10241",
      customer: "Vikas Yadav",
      product: "Desi Ghee 1L",
      amount: "₹749",
      status: "Delivered",
    },
  ];

  const topProducts = [
    {
      name: "Premium Almonds",
      category: "Dry Fruits",
      sold: 248,
      revenue: "₹1,24,000",
    },
    {
      name: "Premium Cashews",
      category: "Dry Fruits",
      sold: 198,
      revenue: "₹1,09,000",
    },
    {
      name: "Desi Cow Ghee",
      category: "Ghee",
      sold: 156,
      revenue: "₹93,600",
    },
    {
      name: "Kashmiri Walnuts",
      category: "Dry Fruits",
      sold: 124,
      revenue: "₹74,400",
    },
  ];

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          {/* Main Heading - 24px */}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>

          {/* Normal Text - 14px */}
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Welcome back! Here's what's happening with your store today.
          </p>
        </div>

        <button
          className="
            flex items-center gap-2
            rounded-xl
            bg-orange-500
            px-4 py-2.5
            text-sm font-semibold text-white
            shadow-lg shadow-orange-500/20
            transition
            hover:bg-orange-600
          "
        >
          <ArrowUpRight size={18} />
          View Reports
        </button>
      </div>

      {/* ================= STATS ================= */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-5
                shadow-sm
                transition
                hover:shadow-md
                dark:border-gray-800
                dark:bg-[#11141a]
                dark:shadow-none
              "
            >
              <div className="flex items-start justify-between">
                <div
                  className="
                    flex h-11 w-11
                    items-center justify-center
                    rounded-xl
                    bg-orange-100
                    text-orange-600
                    dark:bg-orange-500/10
                    dark:text-orange-500
                  "
                >
                  <Icon size={22} />
                </div>

                {/* Status / Change - 12px */}
                <div
                  className={`
                    flex items-center gap-1
                    rounded-lg
                    px-2 py-1
                    text-xs font-medium
                    ${
                      stat.positive
                        ? "bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400"
                        : "bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                    }
                  `}
                >
                  {stat.positive ? (
                    <TrendingUp size={13} />
                  ) : (
                    <TrendingDown size={13} />
                  )}

                  {stat.change}
                </div>
              </div>

              {/* Normal Text - 14px */}
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                {stat.title}
              </p>

              {/* Stats Value - 24px */}
              <h2 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </h2>
            </div>
          );
        })}
      </div>

      {/* ================= CHART + PRODUCTS ================= */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Sales Overview */}

        <div
          className="
            rounded-2xl
            border
            border-gray-200
            bg-white
            p-5
            shadow-sm
            dark:border-gray-800
            dark:bg-[#11141a]
            dark:shadow-none
            xl:col-span-2
          "
        >
          <div className="flex items-center justify-between">
            <div>
              {/* Section Heading - 16px */}
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                Sales Overview
              </h2>

              {/* Small Text - 12px */}
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                Revenue performance for this month
              </p>
            </div>

            <button
              className="
                rounded-lg
                border
                border-gray-200
                bg-gray-50
                px-3 py-2
                text-xs
                text-gray-600
                transition
                hover:bg-gray-100
                dark:border-gray-700
                dark:bg-[#171a21]
                dark:text-gray-300
                dark:hover:bg-[#1d2129]
              "
            >
              This Month
            </button>
          </div>

          {/* Chart */}

          <div className="mt-6">
            <div
              className="
                flex h-[250px]
                items-end gap-3
                border-b
                border-gray-200
                px-2
                dark:border-gray-800
              "
            >
              {[35, 52, 42, 68, 55, 76, 63, 82, 70, 91, 78, 96].map(
                (height, index) => (
                  <div
                    key={index}
                    className="group flex h-full flex-1 items-end"
                  >
                    <div
                      className="
                        w-full
                        rounded-t-md
                        bg-orange-400
                        transition
                        group-hover:bg-orange-500
                        dark:bg-orange-600/80
                        dark:group-hover:bg-orange-500
                      "
                      style={{
                        height: `${height}%`,
                      }}
                    />
                  </div>
                )
              )}
            </div>

            {/* Small Text - 12px */}
            <div className="mt-3 flex justify-between px-2 text-xs text-gray-400">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
            </div>
          </div>
        </div>

        {/* Top Products */}

        <div
          className="
            rounded-2xl
            border
            border-gray-200
            bg-white
            p-5
            shadow-sm
            dark:border-gray-800
            dark:bg-[#11141a]
            dark:shadow-none
          "
        >
          <div className="flex items-center justify-between">
            <div>
              {/* Section Heading - 16px */}
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                Top Products
              </h2>

              {/* Small Text - 12px */}
              <p className="mt-1 text-xs text-gray-500">
                Best selling products
              </p>
            </div>

            <button className="text-gray-400 hover:text-gray-700 dark:hover:text-white">
              <MoreHorizontal size={20} />
            </button>
          </div>

          <div className="mt-5 space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={product.name}
                className="flex items-center gap-3"
              >
                <div
                  className="
                    flex h-10 w-10 shrink-0
                    items-center justify-center
                    rounded-lg
                    bg-orange-100
                    text-sm font-bold
                    text-orange-600
                    dark:bg-orange-500/10
                    dark:text-orange-500
                  "
                >
                  #{index + 1}
                </div>

                <div className="min-w-0 flex-1">
                  {/* Product Name - 14px */}
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    {product.name}
                  </p>

                  {/* Small Text - 12px */}
                  <p className="mt-0.5 text-xs text-gray-500">
                    {product.category} • {product.sold} sold
                  </p>
                </div>

                {/* Price - 16px */}
                <p className="text-base font-semibold text-gray-800 dark:text-gray-200">
                  {product.revenue}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= RECENT ORDERS ================= */}

      <div
        className="
          rounded-2xl
          border
          border-gray-200
          bg-white
          p-5
          shadow-sm
          dark:border-gray-800
          dark:bg-[#11141a]
          dark:shadow-none
        "
      >
        <div className="flex items-center justify-between">
          <div>
            {/* Section Heading - 16px */}
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
              Recent Orders
            </h2>

            {/* Small Text - 12px */}
            <p className="mt-1 text-xs text-gray-500">
              Latest orders from your customers
            </p>
          </div>

          {/* Normal Text - 14px */}
          <button
            className="
              flex items-center gap-1
              text-sm font-medium
              text-orange-500
              hover:text-orange-600
            "
          >
            View All
            <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                {/* Small Text - 12px */}
                <th className="pb-3 text-left text-xs font-medium text-gray-500">
                  ORDER ID
                </th>

                <th className="pb-3 text-left text-xs font-medium text-gray-500">
                  CUSTOMER
                </th>

                <th className="pb-3 text-left text-xs font-medium text-gray-500">
                  PRODUCT
                </th>

                <th className="pb-3 text-left text-xs font-medium text-gray-500">
                  AMOUNT
                </th>

                <th className="pb-3 text-left text-xs font-medium text-gray-500">
                  STATUS
                </th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.map((order) => {
                const statusConfig = {
                  Delivered: {
                    icon: CheckCircle2,
                    className:
                      "bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400",
                  },

                  Processing: {
                    icon: Clock3,
                    className:
                      "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400",
                  },

                  Shipped: {
                    icon: Truck,
                    className:
                      "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
                  },

                  Cancelled: {
                    icon: XCircle,
                    className:
                      "bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400",
                  },
                };

                const config =
                  statusConfig[
                    order.status as keyof typeof statusConfig
                  ];

                const StatusIcon = config.icon;

                return (
                  <tr
                    key={order.id}
                    className="
                      border-b
                      border-gray-100
                      last:border-0
                      dark:border-gray-800/70
                    "
                  >
                    {/* Normal Text - 14px */}
                    <td className="py-4 text-sm font-medium text-orange-500">
                      {order.id}
                    </td>

                    {/* Normal Text - 14px */}
                    <td className="py-4 text-sm text-gray-700 dark:text-gray-300">
                      {order.customer}
                    </td>

                    {/* Normal Text - 14px */}
                    <td className="py-4 text-sm text-gray-500 dark:text-gray-400">
                      {order.product}
                    </td>

                    {/* Price - 16px */}
                    <td className="py-4 text-base font-semibold text-gray-900 dark:text-white">
                      {order.amount}
                    </td>

                    {/* Status - 12px */}
                    <td className="py-4">
                      <span
                        className={`
                          inline-flex
                          items-center gap-1.5
                          rounded-full
                          px-3 py-1.5
                          text-xs font-medium
                          ${config.className}
                        `}
                      >
                        <StatusIcon size={13} />
                        {order.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}