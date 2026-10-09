import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Eye,
  Users,
  UserCheck,
  UserX,
  ShoppingBag,
  IndianRupee,
  Mail,
  Phone,
  CalendarDays,
  ChevronDown,
  UserPlus,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type CustomerStatus = "Active" | "Inactive";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  lastOrder: string;
  joinedDate: string;
  status: CustomerStatus;
}

/* =========================================================
   CUSTOMER DATA
========================================================= */

const customers: Customer[] = [
  {
    id: "CUS-1001",
    name: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "+91 98765 43210",
    orders: 8,
    totalSpent: 12499,
    lastOrder: "07 Oct 2026",
    joinedDate: "12 Sep 2026",
    status: "Active",
  },
  {
    id: "CUS-1002",
    name: "Amit Kumar",
    email: "amit@example.com",
    phone: "+91 98765 12345",
    orders: 5,
    totalSpent: 8799,
    lastOrder: "07 Oct 2026",
    joinedDate: "18 Sep 2026",
    status: "Active",
  },
  {
    id: "CUS-1003",
    name: "Priya Singh",
    email: "priya@example.com",
    phone: "+91 99887 66554",
    orders: 3,
    totalSpent: 4599,
    lastOrder: "06 Oct 2026",
    joinedDate: "21 Sep 2026",
    status: "Active",
  },
  {
    id: "CUS-1004",
    name: "Neha Verma",
    email: "neha@example.com",
    phone: "+91 98765 88776",
    orders: 11,
    totalSpent: 18999,
    lastOrder: "06 Oct 2026",
    joinedDate: "25 Aug 2026",
    status: "Active",
  },
  {
    id: "CUS-1005",
    name: "Vikas Gupta",
    email: "vikas@example.com",
    phone: "+91 98111 22334",
    orders: 2,
    totalSpent: 2499,
    lastOrder: "02 Sep 2026",
    joinedDate: "05 Aug 2026",
    status: "Inactive",
  },
  {
    id: "CUS-1006",
    name: "Anjali Mehta",
    email: "anjali@example.com",
    phone: "+91 99999 11122",
    orders: 7,
    totalSpent: 11299,
    lastOrder: "05 Oct 2026",
    joinedDate: "29 Aug 2026",
    status: "Active",
  },
  {
    id: "CUS-1007",
    name: "Rohit Singh",
    email: "rohit@example.com",
    phone: "+91 98712 34567",
    orders: 4,
    totalSpent: 6399,
    lastOrder: "04 Oct 2026",
    joinedDate: "01 Sep 2026",
    status: "Active",
  },
  {
    id: "CUS-1008",
    name: "Pooja Sharma",
    email: "pooja@example.com",
    phone: "+91 98222 33445",
    orders: 1,
    totalSpent: 1299,
    lastOrder: "28 Aug 2026",
    joinedDate: "28 Jul 2026",
    status: "Inactive",
  },
];

/* =========================================================
   FILTER OPTIONS
========================================================= */

const statusOptions: (CustomerStatus | "All")[] = [
  "All",
  "Active",
  "Inactive",
];

/* =========================================================
   CUSTOMERS
========================================================= */

export default function Customers() {
  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState<
    CustomerStatus | "All"
  >("All");

  const [showFilter, setShowFilter] = useState(false);

  /* =========================================================
     FILTER CUSTOMERS
  ========================================================= */

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        customer.id.toLowerCase().includes(searchValue) ||
        customer.name.toLowerCase().includes(searchValue) ||
        customer.email.toLowerCase().includes(searchValue) ||
        customer.phone.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        customer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  /* =========================================================
     STATS
  ========================================================= */

  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active"
  ).length;

  const inactiveCustomers = customers.filter(
    (customer) => customer.status === "Inactive"
  ).length;

  const newCustomers = customers.filter((customer) => {
    const joined = new Date(customer.joinedDate);
    const today = new Date("07 Oct 2026");
    const difference =
      today.getTime() - joined.getTime();

    return (
      difference <= 30 * 24 * 60 * 60 * 1000
    );
  }).length;

  const totalOrders = customers.reduce(
    (total, customer) => total + customer.orders,
    0
  );

  const totalRevenue = customers.reduce(
    (total, customer) => total + customer.totalSpent,
    0
  );

  const stats = [
    {
      title: "Total Customers",
      value: customers.length,
      subtitle: "Registered customers",
      icon: Users,
      color: "text-orange-500 bg-orange-500/10",
    },
    {
      title: "Active Customers",
      value: activeCustomers,
      subtitle: "Currently active",
      icon: UserCheck,
      color: "text-emerald-500 bg-emerald-500/10",
    },
    {
      title: "New Customers",
      value: newCustomers,
      subtitle: "Joined recently",
      icon: UserPlus,
      color: "text-blue-500 bg-blue-500/10",
    },
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      subtitle: `${totalOrders} total orders`,
      icon: IndianRupee,
      color: "text-purple-500 bg-purple-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#08090b] dark:text-white">
      <div className="mx-auto max-w-[1600px]">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-7">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
              <Users size={19} />
            </div>

            <span className="text-[12px] font-semibold text-orange-500">
              Store Management
            </span>
          </div>

          <h1 className="text-[28px] font-bold tracking-tight sm:text-[34px]">
            Customers
          </h1>

          <p className="mt-2 text-[12px] text-gray-500 dark:text-gray-400">
            Manage and monitor your store customers.
          </p>
        </div>

        {/* =================================================
            STATS
        ================================================= */}

        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search by customer, email, phone or ID..."
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
                <div className="absolute right-0 top-14 z-50 w-56 rounded-xl border border-gray-200 bg-white p-3 shadow-xl dark:border-white/10 dark:bg-[#11151d]">
                  <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                    Customer Status
                  </p>

                  <div className="space-y-1">
                    {statusOptions.map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => {
                          setStatusFilter(status);
                          setShowFilter(false);
                        }}
                        className={`w-full rounded-lg px-3 py-2.5 text-left text-[12px] transition-colors ${
                          statusFilter === status
                            ? "bg-orange-500/10 text-orange-500"
                            : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setStatusFilter("All");
                      setSearch("");
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

            <span>
              • {filteredCustomers.length} customers
            </span>
          </div>
        </div>

        {/* =================================================
            CUSTOMER TABLE
        ================================================= */}

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0d1017]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1250px] border-collapse">

              {/* TABLE HEADER */}
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/[0.025]">
                  {[
                    "Customer",
                    "Contact",
                    "Orders",
                    "Total Spent",
                    "Last Order",
                    "Status",
                    "Joined",
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

              {/* TABLE BODY */}
              <tbody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <tr
                      key={customer.id}
                      className="border-b border-gray-100 transition-colors last:border-b-0 hover:bg-orange-50/50 dark:border-white/5 dark:hover:bg-orange-500/[0.03]"
                    >

                      {/* CUSTOMER */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-[12px] font-bold text-orange-500">
                            {customer.name
                              .split(" ")
                              .map((name) => name[0])
                              .join("")
                              .slice(0, 2)}
                          </div>

                          <div>
                            <h3 className="text-[12px] font-semibold">
                              {customer.name}
                            </h3>

                            <span className="text-[10px] text-gray-500">
                              {customer.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* CONTACT */}
                      <td className="px-5 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <Mail
                              size={12}
                              className="text-gray-400"
                            />

                            <span className="text-[11px] text-gray-600 dark:text-gray-300">
                              {customer.email}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <Phone
                              size={12}
                              className="text-gray-400"
                            />

                            <span className="text-[10px] text-gray-500">
                              {customer.phone}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* ORDERS */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500">
                            <ShoppingBag size={15} />
                          </div>

                          <div>
                            <p className="text-[12px] font-semibold">
                              {customer.orders}
                            </p>

                            <p className="text-[10px] text-gray-500">
                              orders
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* TOTAL SPENT */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1">
                          <IndianRupee
                            size={13}
                            className="text-emerald-500"
                          />

                          <p className="text-[12px] font-semibold">
                            {customer.totalSpent.toLocaleString(
                              "en-IN"
                            )}
                          </p>
                        </div>

                        <p className="mt-1 text-[10px] text-gray-500">
                          total spent
                        </p>
                      </td>

                      {/* LAST ORDER */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          <CalendarDays
                            size={13}
                            className="text-gray-400"
                          />

                          <p className="text-[12px] text-gray-500 dark:text-gray-400">
                            {customer.lastOrder}
                          </p>
                        </div>
                      </td>

                      {/* STATUS */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[9px] font-semibold ${
                            customer.status === "Active"
                              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                              : "border-gray-300 bg-gray-100 text-gray-500 dark:border-white/10 dark:bg-white/5 dark:text-gray-400"
                          }`}
                        >
                          {customer.status === "Active" ? (
                            <UserCheck size={12} />
                          ) : (
                            <UserX size={12} />
                          )}

                          {customer.status}
                        </span>
                      </td>

                      {/* JOINED */}
                      <td className="px-5 py-4">
                        <p className="text-[12px] text-gray-500 dark:text-gray-400">
                          {customer.joinedDate}
                        </p>
                      </td>

                      {/* ACTION */}
                      <td className="px-5 py-4">
                        <div className="flex justify-end">
                          <Link
                            to="/admin/customer-details"
                            title="View Customer"
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
                      <Users
                        size={30}
                        className="mx-auto text-orange-500"
                      />

                      <h3 className="mt-5 text-[16px] font-bold">
                        No customers found
                      </h3>

                      <p className="mt-2 text-[12px] text-gray-500">
                        Try changing your search or filter.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* FOOTER */}
          <div className="border-t border-gray-200 px-5 py-4 text-[12px] text-gray-500 dark:border-white/10">
            Showing {filteredCustomers.length} of{" "}
            {customers.length} customers
          </div>
        </div>
      </div>
    </div>
  );
}