import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  Package,
  AlertTriangle,
  XCircle,
  IndianRupee,
  Eye,
  PackagePlus,
  Edit,
  ChevronDown,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type StockStatus =
  | "In Stock"
  | "Low Stock"
  | "Out of Stock";

interface InventoryItem {
  id: number;
  name: string;
  sku: string;
  category: string;
  subCategory: string;
  stock: number;
  lowStockAlert: number;
  price: number;
  lastUpdated: string;
}

/* =========================================================
   INVENTORY DATA
========================================================= */

const inventoryData: InventoryItem[] = [
  {
    id: 1,
    name: "Premium Almonds",
    sku: "ALM-001",
    category: "Dry Fruits",
    subCategory: "Almonds",
    stock: 45,
    lowStockAlert: 10,
    price: 850,
    lastUpdated: "08 Oct 2026",
  },
  {
    id: 2,
    name: "Premium Cashews",
    sku: "CAS-001",
    category: "Dry Fruits",
    subCategory: "Cashews",
    stock: 8,
    lowStockAlert: 10,
    price: 950,
    lastUpdated: "08 Oct 2026",
  },
  {
    id: 3,
    name: "Pure Mustard Oil",
    sku: "MUS-001",
    category: "Oils",
    subCategory: "Mustard Oil",
    stock: 24,
    lowStockAlert: 8,
    price: 520,
    lastUpdated: "07 Oct 2026",
  },
  {
    id: 4,
    name: "Cold Pressed Groundnut Oil",
    sku: "GRO-001",
    category: "Oils",
    subCategory: "Groundnut Oil",
    stock: 5,
    lowStockAlert: 10,
    price: 480,
    lastUpdated: "07 Oct 2026",
  },
  {
    id: 5,
    name: "Pure Cow Ghee",
    sku: "GHE-001",
    category: "Ghee",
    subCategory: "Cow Ghee",
    stock: 0,
    lowStockAlert: 5,
    price: 780,
    lastUpdated: "06 Oct 2026",
  },
  {
    id: 6,
    name: "Organic Walnuts",
    sku: "WAL-001",
    category: "Dry Fruits",
    subCategory: "Walnuts",
    stock: 32,
    lowStockAlert: 8,
    price: 1200,
    lastUpdated: "05 Oct 2026",
  },
  {
    id: 7,
    name: "Premium Raisins",
    sku: "RAI-001",
    category: "Dry Fruits",
    subCategory: "Raisins",
    stock: 6,
    lowStockAlert: 10,
    price: 420,
    lastUpdated: "05 Oct 2026",
  },
  {
    id: 8,
    name: "Buffalo Ghee",
    sku: "GHE-002",
    category: "Ghee",
    subCategory: "Buffalo Ghee",
    stock: 18,
    lowStockAlert: 5,
    price: 820,
    lastUpdated: "04 Oct 2026",
  },
];

/* =========================================================
   STATUS
========================================================= */

function getStockStatus(
  stock: number,
  lowStockAlert: number
): StockStatus {
  if (stock === 0) return "Out of Stock";

  if (stock <= lowStockAlert) return "Low Stock";

  return "In Stock";
}

function getStatusStyle(status: StockStatus) {
  switch (status) {
    case "In Stock":
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";

    case "Low Stock":
      return "border-yellow-500/20 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400";

    case "Out of Stock":
      return "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400";

    default:
      return "";
  }
}

/* =========================================================
   INVENTORY
========================================================= */

export default function Inventory() {
  const [search, setSearch] = useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [statusFilter, setStatusFilter] =
    useState<StockStatus | "All">("All");

  const [showFilter, setShowFilter] =
    useState(false);

  /* =========================================================
     CATEGORIES
  ========================================================= */

  const categories = [
    "All",
    ...Array.from(
      new Set(inventoryData.map((item) => item.category))
    ),
  ];

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredInventory = useMemo(() => {
    return inventoryData.filter((item) => {
      const searchValue = search.toLowerCase().trim();

      const status = getStockStatus(
        item.stock,
        item.lowStockAlert
      );

      const matchesSearch =
        item.name.toLowerCase().includes(searchValue) ||
        item.sku.toLowerCase().includes(searchValue) ||
        item.category.toLowerCase().includes(searchValue) ||
        item.subCategory.toLowerCase().includes(searchValue);

      const matchesCategory =
        categoryFilter === "All" ||
        item.category === categoryFilter;

      const matchesStatus =
        statusFilter === "All" ||
        status === statusFilter;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [search, categoryFilter, statusFilter]);

  /* =========================================================
     STATS
  ========================================================= */

  const totalProducts = inventoryData.length;

  const inStockProducts = inventoryData.filter(
    (item) =>
      getStockStatus(
        item.stock,
        item.lowStockAlert
      ) === "In Stock"
  ).length;

  const lowStockProducts = inventoryData.filter(
    (item) =>
      getStockStatus(
        item.stock,
        item.lowStockAlert
      ) === "Low Stock"
  ).length;

  const outOfStockProducts = inventoryData.filter(
    (item) =>
      getStockStatus(
        item.stock,
        item.lowStockAlert
      ) === "Out of Stock"
  ).length;

  const totalStockValue = inventoryData.reduce(
    (total, item) =>
      total + item.stock * item.price,
    0
  );

  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      subtitle: "Products in inventory",
      icon: Package,
      color: "text-orange-500 bg-orange-500/10",
    },
    {
      title: "In Stock",
      value: inStockProducts,
      subtitle: "Healthy stock levels",
      icon: Package,
      color: "text-emerald-500 bg-emerald-500/10",
    },
    {
      title: "Low Stock",
      value: lowStockProducts,
      subtitle: "Needs restocking",
      icon: AlertTriangle,
      color: "text-yellow-500 bg-yellow-500/10",
    },
    {
      title: "Out of Stock",
      value: outOfStockProducts,
      subtitle: "Currently unavailable",
      icon: XCircle,
      color: "text-red-500 bg-red-500/10",
    },
    {
      title: "Stock Value",
      value: `₹${totalStockValue.toLocaleString(
        "en-IN"
      )}`,
      subtitle: "Current inventory value",
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
                <Package size={19} />
              </div>

              <span className="text-[12px] font-semibold text-orange-500">
                Store Management
              </span>
            </div>

            <h1 className="text-[28px] font-bold tracking-tight sm:text-[34px]">
              Inventory
            </h1>

            <p className="mt-2 text-[12px] text-gray-500 dark:text-gray-400">
              Manage product stock and inventory levels.
            </p>
          </div>
        </div>

        {/* =================================================
            STATS
        ================================================= */}

        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="min-w-0 rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-[#0d1017]"
              >
                <div className="flex min-w-0 items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] text-gray-500 dark:text-gray-400">
                      {item.title}
                    </p>

                    <h2
                      className={`mt-2 whitespace-nowrap font-bold leading-tight ${
                        item.title === "Stock Value"
                          ? "text-[18px] sm:text-[20px]"
                          : "text-[22px]"
                      }`}
                    >
                      {item.value}
                    </h2>

                    <p className="mt-1 text-[10px] text-gray-500">
                      {item.subtitle}
                    </p>
                  </div>

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
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search product, SKU, category..."
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

                  {/* CATEGORY */}
                  <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                    Category
                  </p>

                  <div className="space-y-1">
                    {categories.map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() =>
                          setCategoryFilter(category)
                        }
                        className={`w-full rounded-lg px-3 py-2 text-left text-[12px] transition-colors ${
                          categoryFilter === category
                            ? "bg-orange-500/10 text-orange-500"
                            : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>

                  {/* STOCK STATUS */}
                  <div className="mt-3 border-t border-gray-200 pt-3 dark:border-white/10">
                    <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                      Stock Status
                    </p>

                    <div className="space-y-1">
                      {[
                        "All",
                        "In Stock",
                        "Low Stock",
                        "Out of Stock",
                      ].map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() =>
                            setStatusFilter(
                              status as StockStatus | "All"
                            )
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
                  </div>

                  {/* CLEAR */}
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setCategoryFilter("All");
                      setStatusFilter("All");
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
            <span>Category:</span>

            <span className="rounded-full bg-orange-500/10 px-3 py-1 font-medium text-orange-500">
              {categoryFilter}
            </span>

            <span className="rounded-full bg-purple-500/10 px-3 py-1 font-medium text-purple-500">
              Status: {statusFilter}
            </span>

            <span>
              • {filteredInventory.length} products
            </span>
          </div>
        </div>

        {/* =================================================
            INVENTORY TABLE
        ================================================= */}

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0d1017]">

          {/* IMPORTANT:
              Larger min width prevents columns from becoming
              too narrow and forces horizontal scrolling instead
              of wrapping text.
          */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1500px] border-collapse">

              {/* TABLE HEADER */}
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/[0.025]">

                  <th className="w-[280px] whitespace-nowrap px-5 py-4 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Product
                  </th>

                  <th className="w-[130px] whitespace-nowrap px-5 py-4 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    SKU
                  </th>

                  <th className="w-[150px] whitespace-nowrap px-5 py-4 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Category
                  </th>

                  <th className="w-[100px] whitespace-nowrap px-5 py-4 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Stock
                  </th>

                  <th className="w-[120px] whitespace-nowrap px-5 py-4 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Alert At
                  </th>

                  <th className="w-[170px] whitespace-nowrap px-5 py-4 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Status
                  </th>

                  <th className="w-[120px] whitespace-nowrap px-5 py-4 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Price
                  </th>

                  <th className="w-[150px] whitespace-nowrap px-5 py-4 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Stock Value
                  </th>

                  <th className="w-[150px] whitespace-nowrap px-5 py-4 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Last Updated
                  </th>

                  <th className="w-[150px] whitespace-nowrap px-5 py-4 text-right text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* TABLE BODY */}
              <tbody>
                {filteredInventory.length > 0 ? (
                  filteredInventory.map((item) => {
                    const status = getStockStatus(
                      item.stock,
                      item.lowStockAlert
                    );

                    const stockValue =
                      item.stock * item.price;

                    return (
                      <tr
                        key={item.id}
                        className="border-b border-gray-100 transition-colors last:border-b-0 hover:bg-orange-50/50 dark:border-white/5 dark:hover:bg-orange-500/[0.03]"
                      >

                        {/* PRODUCT */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3 whitespace-nowrap">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                              <Package size={18} />
                            </div>

                            <div className="min-w-0">
                              <h3 className="whitespace-nowrap text-[12px] font-semibold">
                                {item.name}
                              </h3>

                              <p className="mt-0.5 whitespace-nowrap text-[10px] text-gray-500">
                                {item.subCategory}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* SKU */}
                        <td className="px-5 py-4">
                          <span className="inline-flex whitespace-nowrap rounded-lg bg-gray-100 px-2.5 py-1 text-[10px] font-medium text-gray-600 dark:bg-white/5 dark:text-gray-300">
                            {item.sku}
                          </span>
                        </td>

                        {/* CATEGORY */}
                        <td className="px-5 py-4">
                          <span className="inline-flex whitespace-nowrap rounded-full bg-orange-500/10 px-3 py-1 text-[10px] font-medium text-orange-500">
                            {item.category}
                          </span>
                        </td>

                        {/* STOCK */}
                        <td className="px-5 py-4">
                          <p className="whitespace-nowrap text-[12px] font-bold">
                            {item.stock}
                          </p>

                          <p className="whitespace-nowrap text-[10px] text-gray-500">
                            units
                          </p>
                        </td>

                        {/* LOW STOCK ALERT */}
                        <td className="px-5 py-4">
                          <p className="whitespace-nowrap text-[12px] font-semibold">
                            {item.lowStockAlert}
                          </p>

                          <p className="whitespace-nowrap text-[10px] text-gray-500">
                            alert level
                          </p>
                        </td>

                        {/* STATUS */}
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex whitespace-nowrap items-center gap-1 rounded-full border px-2.5 py-1 text-[9px] font-semibold ${getStatusStyle(
                              status
                            )}`}
                          >
                            {status === "In Stock" && (
                              <Package size={12} />
                            )}

                            {status === "Low Stock" && (
                              <AlertTriangle size={12} />
                            )}

                            {status === "Out of Stock" && (
                              <XCircle size={12} />
                            )}

                            {status}
                          </span>
                        </td>

                        {/* PRICE */}
                        <td className="px-5 py-4">
                          <p className="whitespace-nowrap text-[12px] font-semibold">
                            ₹
                            {item.price.toLocaleString(
                              "en-IN"
                            )}
                          </p>

                          <p className="whitespace-nowrap text-[10px] text-gray-500">
                            per unit
                          </p>
                        </td>

                        {/* STOCK VALUE */}
                        <td className="px-5 py-4">
                          <p className="whitespace-nowrap text-[12px] font-semibold">
                            ₹
                            {stockValue.toLocaleString(
                              "en-IN"
                            )}
                          </p>

                          <p className="whitespace-nowrap text-[10px] text-gray-500">
                            inventory value
                          </p>
                        </td>

                        {/* LAST UPDATED */}
                        <td className="px-5 py-4">
                          <p className="whitespace-nowrap text-[11px] text-gray-600 dark:text-gray-300">
                            {item.lastUpdated}
                          </p>
                        </td>

                        {/* ACTIONS */}
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-2 whitespace-nowrap">

                            {/* VIEW */}
                            <button
                              type="button"
                              title="View Product"
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:border-orange-300 hover:text-orange-500 dark:border-white/10 dark:text-gray-400"
                            >
                              <Eye size={16} />
                            </button>

                            {/* UPDATE STOCK */}
                            <button
                              type="button"
                              title="Update Stock"
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 transition-colors hover:bg-emerald-500 hover:text-white"
                            >
                              <PackagePlus size={16} />
                            </button>

                            {/* EDIT */}
                            <button
                              type="button"
                              title="Edit Inventory"
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500 transition-colors hover:bg-orange-500 hover:text-white"
                            >
                              <Edit size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={10}
                      className="px-5 py-16 text-center"
                    >
                      <Package
                        size={30}
                        className="mx-auto text-orange-500"
                      />

                      <h3 className="mt-5 text-[16px] font-bold">
                        No inventory found
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
            Showing {filteredInventory.length} of{" "}
            {inventoryData.length} products
          </div>
        </div>
      </div>
    </div>
  );
}