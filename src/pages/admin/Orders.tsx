import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Eye,
  ShoppingBag,
  CheckCircle2,
  Clock3,
  Truck,
  XCircle,
  RotateCcw,
  CreditCard,
  IndianRupee,
  ChevronDown,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Processing"
  | "Shipped"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled"
  | "Returned";

type PaymentStatus =
  | "Paid"
  | "Pending"
  | "Refunded";

interface Order {
  id: string;
  customer: string;
  email: string;
  phone: string;
  items: number;
  amount: number;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  date: string;
}

/* =========================================================
   ORDERS DATA
========================================================= */

const orders: Order[] = [
  {
    id: "ORD-1001",
    customer: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "+91 98765 43210",
    items: 3,
    amount: 2499,
    paymentMethod: "UPI",
    paymentStatus: "Paid",
    status: "Delivered",
    date: "07 Oct 2026",
  },
  {
    id: "ORD-1002",
    customer: "Amit Kumar",
    email: "amit@example.com",
    phone: "+91 98765 12345",
    items: 2,
    amount: 1599,
    paymentMethod: "Card",
    paymentStatus: "Paid",
    status: "Processing",
    date: "07 Oct 2026",
  },
  {
    id: "ORD-1003",
    customer: "Priya Singh",
    email: "priya@example.com",
    phone: "+91 99887 66554",
    items: 1,
    amount: 899,
    paymentMethod: "COD",
    paymentStatus: "Pending",
    status: "Pending",
    date: "06 Oct 2026",
  },
  {
    id: "ORD-1004",
    customer: "Neha Verma",
    email: "neha@example.com",
    phone: "+91 98765 88776",
    items: 4,
    amount: 3299,
    paymentMethod: "UPI",
    paymentStatus: "Paid",
    status: "Shipped",
    date: "06 Oct 2026",
  },
  {
    id: "ORD-1005",
    customer: "Vikas Gupta",
    email: "vikas@example.com",
    phone: "+91 98111 22334",
    items: 2,
    amount: 1299,
    paymentMethod: "Card",
    paymentStatus: "Refunded",
    status: "Cancelled",
    date: "05 Oct 2026",
  },
  {
    id: "ORD-1006",
    customer: "Anjali Mehta",
    email: "anjali@example.com",
    phone: "+91 99999 11122",
    items: 5,
    amount: 4299,
    paymentMethod: "UPI",
    paymentStatus: "Paid",
    status: "Out for Delivery",
    date: "05 Oct 2026",
  },
  {
    id: "ORD-1007",
    customer: "Rohit Singh",
    email: "rohit@example.com",
    phone: "+91 98712 34567",
    items: 2,
    amount: 1799,
    paymentMethod: "COD",
    paymentStatus: "Pending",
    status: "Confirmed",
    date: "04 Oct 2026",
  },
  {
    id: "ORD-1008",
    customer: "Pooja Sharma",
    email: "pooja@example.com",
    phone: "+91 98222 33445",
    items: 3,
    amount: 2899,
    paymentMethod: "Card",
    paymentStatus: "Paid",
    status: "Returned",
    date: "03 Oct 2026",
  },
];

/* =========================================================
   FILTER OPTIONS
========================================================= */

const statusOptions: (OrderStatus | "All")[] = [
  "All",
  "Pending",
  "Confirmed",
  "Processing",
  "Shipped",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
  "Returned",
];

const paymentOptions: (PaymentStatus | "All")[] = [
  "All",
  "Paid",
  "Pending",
  "Refunded",
];

/* =========================================================
   STATUS STYLE
========================================================= */

function getStatusStyle(status: OrderStatus): string {
  switch (status) {
    case "Delivered":
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";

    case "Processing":
    case "Confirmed":
      return "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400";

    case "Shipped":
    case "Out for Delivery":
      return "border-purple-500/20 bg-purple-500/10 text-purple-600 dark:text-purple-400";

    case "Pending":
      return "border-yellow-500/20 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400";

    case "Cancelled":
    case "Returned":
      return "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400";

    default:
      return "border-gray-200 bg-gray-100 text-gray-500";
  }
}

/* =========================================================
   STATUS ICON
========================================================= */

function getStatusIcon(status: OrderStatus) {
  switch (status) {
    case "Delivered":
      return <CheckCircle2 size={12} />;

    case "Processing":
    case "Confirmed":
    case "Pending":
      return <Clock3 size={12} />;

    case "Shipped":
    case "Out for Delivery":
      return <Truck size={12} />;

    case "Cancelled":
      return <XCircle size={12} />;

    case "Returned":
      return <RotateCcw size={12} />;

    default:
      return null;
  }
}

/* =========================================================
   ORDERS
========================================================= */

export default function Orders() {
  const [search, setSearch] = useState<string>("");

  const [statusFilter, setStatusFilter] = useState<
    OrderStatus | "All"
  >("All");

  const [paymentFilter, setPaymentFilter] = useState<
    PaymentStatus | "All"
  >("All");

  const [showFilter, setShowFilter] = useState<boolean>(false);

  /* =========================================================
     FILTERED ORDERS
  ========================================================= */

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        order.id.toLowerCase().includes(searchValue) ||
        order.customer.toLowerCase().includes(searchValue) ||
        order.email.toLowerCase().includes(searchValue) ||
        order.phone.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        order.status === statusFilter;

      const matchesPayment =
        paymentFilter === "All" ||
        order.paymentStatus === paymentFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPayment
      );
    });
  }, [search, statusFilter, paymentFilter]);

  /* =========================================================
     STATS
  ========================================================= */

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const processingOrders = orders.filter(
    (order) =>
      order.status === "Processing" ||
      order.status === "Confirmed"
  ).length;

  const shippedOrders = orders.filter(
    (order) =>
      order.status === "Shipped" ||
      order.status === "Out for Delivery"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const totalRevenue = orders
    .filter(
      (order) =>
        order.paymentStatus === "Paid" &&
        order.status !== "Cancelled"
    )
    .reduce(
      (total, order) => total + order.amount,
      0
    );

  const stats = [
    {
      title: "Total Orders",
      value: orders.length,
      subtitle: "All customer orders",
      icon: ShoppingBag,
      color: "text-orange-500 bg-orange-500/10",
    },
    {
      title: "Pending",
      value: pendingOrders,
      subtitle: "Waiting for action",
      icon: Clock3,
      color: "text-yellow-500 bg-yellow-500/10",
    },
    {
      title: "Processing",
      value: processingOrders,
      subtitle: "Being prepared",
      icon: ShoppingBag,
      color: "text-blue-500 bg-blue-500/10",
    },
    {
      title: "Shipped",
      value: shippedOrders,
      subtitle: "On the way",
      icon: Truck,
      color: "text-purple-500 bg-purple-500/10",
    },
    {
      title: "Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      subtitle: `${deliveredOrders} delivered`,
      icon: IndianRupee,
      color: "text-emerald-500 bg-emerald-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#08090b] dark:text-white">
      <div className="mx-auto max-w-[1600px]">

        {/* HEADER */}
        <div className="mb-7">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
              <ShoppingBag size={19} />
            </div>

            <span className="text-[12px] font-semibold text-orange-500">
              Store Management
            </span>
          </div>

          <h1 className="text-[28px] font-bold tracking-tight sm:text-[34px]">
            Orders
          </h1>

          <p className="mt-2 text-[12px] text-gray-500 dark:text-gray-400">
            Manage, track and monitor all customer orders.
          </p>
        </div>

        {/* STATS */}
        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-[#0d1017]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[12px] text-gray-500 dark:text-gray-400">
                      {item.title}
                    </p>

                    <h2 className="mt-2 text-[22px] font-bold">
                      {item.value}
                    </h2>

                    <p className="mt-1 text-[10px] text-gray-500">
                      {item.subtitle}
                    </p>
                  </div>

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}
                  >
                    <Icon size={22} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* SEARCH / FILTER */}
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
                placeholder="Search by order ID, customer, email or phone..."
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
                <div className="absolute right-0 top-14 z-50 w-64 rounded-xl border border-gray-200 bg-white p-3 shadow-xl dark:border-white/10 dark:bg-[#11151d]">

                  <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                    Order Status
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

                  <div className="mt-3 border-t border-gray-200 pt-3 dark:border-white/10">
                    <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                      Payment Status
                    </p>

                    <div className="space-y-1">
                      {paymentOptions.map((payment) => (
                        <button
                          key={payment}
                          type="button"
                          onClick={() =>
                            setPaymentFilter(payment)
                          }
                          className={`w-full rounded-lg px-3 py-2 text-left text-[12px] transition-colors ${
                            paymentFilter === payment
                              ? "bg-orange-500/10 text-orange-500"
                              : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
                          }`}
                        >
                          {payment}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setStatusFilter("All");
                      setPaymentFilter("All");
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
            <span>Filters:</span>

            <span className="rounded-full bg-orange-500/10 px-3 py-1 font-medium text-orange-500">
              {statusFilter}
            </span>

            <span className="rounded-full bg-purple-500/10 px-3 py-1 font-medium text-purple-500">
              Payment: {paymentFilter}
            </span>

            <span>
              • {filteredOrders.length} orders
            </span>
          </div>
        </div>

        {/* TABLE */}
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0d1017]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px] border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/[0.025]">
                  {[
                    "Order",
                    "Customer",
                    "Items",
                    "Amount",
                    "Payment",
                    "Status",
                    "Date",
                    "Action",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className={`px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 ${
                        heading === "Action"
                          ? "text-right"
                          : "text-left"
                      }`}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-100 transition-colors last:border-b-0 hover:bg-orange-50/50 dark:border-white/5 dark:hover:bg-orange-500/[0.03]"
                    >
                      {/* ORDER */}
                      <td className="px-5 py-4">
                        <h3 className="text-[12px] font-semibold">
                          {order.id}
                        </h3>

                        <span className="text-[10px] text-gray-500">
                          Order ID
                        </span>
                      </td>

                      {/* CUSTOMER */}
                      <td className="px-5 py-4">
                        <h3 className="text-[12px] font-semibold">
                          {order.customer}
                        </h3>

                        <p className="text-[10px] text-gray-500">
                          {order.email}
                        </p>
                      </td>

                      {/* ITEMS */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
                            <ShoppingBag size={15} />
                          </div>

                          <div>
                            <p className="text-[12px] font-semibold">
                              {order.items}
                            </p>

                            <p className="text-[10px] text-gray-500">
                              items
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* AMOUNT */}
                      <td className="px-5 py-4">
                        <p className="text-[12px] font-semibold">
                          ₹
                          {order.amount.toLocaleString("en-IN")}
                        </p>
                      </td>

                      {/* PAYMENT */}
                      <td className="px-5 py-4">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <CreditCard
                              size={13}
                              className="text-gray-400"
                            />

                            <span className="text-[12px] font-medium">
                              {order.paymentMethod}
                            </span>
                          </div>

                          <span
                            className={`mt-1 inline-block rounded-full px-2.5 py-1 text-[9px] font-semibold ${
                              order.paymentStatus === "Paid"
                                ? "bg-emerald-500/10 text-emerald-500"
                                : order.paymentStatus === "Refunded"
                                ? "bg-red-500/10 text-red-500"
                                : "bg-yellow-500/10 text-yellow-500"
                            }`}
                          >
                            {order.paymentStatus}
                          </span>
                        </div>
                      </td>

                      {/* STATUS */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[9px] font-semibold ${getStatusStyle(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(order.status)}
                          {order.status}
                        </span>
                      </td>

                      {/* DATE */}
                      <td className="px-5 py-4">
                        <p className="text-[12px] text-gray-500 dark:text-gray-400">
                          {order.date}
                        </p>
                      </td>

                      {/* VIEW */}
                      <td className="px-5 py-4">
                        <div className="flex justify-end">
                          <Link
                            to="/admin/order-details"
                            title="View Order"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:border-orange-300 hover:text-orange-500 dark:border-white/10 dark:text-gray-400"
                          >
                            <Eye size={16} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-5 py-16 text-center"
                    >
                      <ShoppingBag
                        size={30}
                        className="mx-auto text-orange-500"
                      />

                      <h3 className="mt-5 text-[16px] font-bold">
                        No orders found
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
            Showing {filteredOrders.length} of{" "}
            {orders.length} orders
          </div>
        </div>
      </div>
    </div>
  );
}