import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  Filter,
  Edit,
  Trash2,
  Eye,
  Package,
  ListTree,
  CheckCircle2,
} from "lucide-react";

export default function SubCategories() {
  const subCategories = [
    {
      id: 1,
      name: "Almonds",
      category: "Dry Fruits",
      description: "Premium quality almonds",
      products: 2,
      status: "Active",
    },
    {
      id: 2,
      name: "Cashews",
      category: "Dry Fruits",
      description: "Fresh and premium cashews",
      products: 1,
      status: "Active",
    },
    {
      id: 3,
      name: "Mustard Oil",
      category: "Oils",
      description: "Pure cold pressed mustard oil",
      products: 1,
      status: "Active",
    },
    {
      id: 4,
      name: "Groundnut Oil",
      category: "Oils",
      description: "Healthy and pure groundnut oil",
      products: 1,
      status: "Active",
    },
    {
      id: 5,
      name: "Cow Ghee",
      category: "Ghee",
      description: "Pure and premium cow ghee",
      products: 1,
      status: "Active",
    },
  ];

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showFilter, setShowFilter] = useState(false);

  const filteredSubCategories = useMemo(() => {
    return subCategories.filter((subCategory) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        subCategory.name.toLowerCase().includes(searchValue) ||
        subCategory.category.toLowerCase().includes(searchValue) ||
        subCategory.description.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        subCategory.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const totalProducts = subCategories.reduce(
    (total, subCategory) => total + subCategory.products,
    0
  );

  const activeSubCategories = subCategories.filter(
    (subCategory) => subCategory.status === "Active"
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#08090b] dark:text-white">
      <div className="mx-auto max-w-[1600px]">

        {/* HEADER */}
        <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                <ListTree size={19} />
              </div>

              <span className="text-[12px] font-semibold text-orange-500">
                Store Management
              </span>
            </div>

            <h1 className="text-[28px] font-bold tracking-tight sm:text-[34px]">
              Sub Categories
            </h1>

            <p className="mt-2 text-[12px] text-gray-500 dark:text-gray-400">
              Manage your product sub categories.
            </p>
          </div>

          {/* ADD SUB CATEGORY */}
          <Link
            to="/admin/add-sub-categories"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-5 py-3 text-[12px] font-semibold text-white shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5"
          >
            <Plus size={19} />
            Add Sub Category
          </Link>
        </div>

        {/* STATS */}
        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "Total Sub Categories",
              value: subCategories.length,
              subtitle: "All sub categories",
              icon: ListTree,
              color: "text-orange-500 bg-orange-500/10",
            },
            {
              title: "Active Sub Categories",
              value: activeSubCategories,
              subtitle: "Currently active",
              icon: CheckCircle2,
              color: "text-emerald-500 bg-emerald-500/10",
            },
            {
              title: "Total Products",
              value: totalProducts,
              subtitle: "Across all sub categories",
              icon: Package,
              color: "text-purple-500 bg-purple-500/10",
            },
            {
              title: "Inactive Sub Categories",
              value: subCategories.length - activeSubCategories,
              subtitle: "Currently inactive",
              icon: ListTree,
              color: "text-red-500 bg-red-500/10",
            },
          ].map((item) => {
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
                    className={
                      "flex h-12 w-12 items-center justify-center rounded-xl " +
                      item.color
                    }
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
                placeholder="Search sub categories..."
                className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-[12px] text-gray-900 outline-none placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
              />
            </div>

            {/* FILTER */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowFilter((prev) => !prev)}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-5 text-[12px] font-medium text-gray-700 hover:border-orange-300 hover:text-orange-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-300 xl:w-auto"
              >
                <Filter size={17} />
                Filter
              </button>

              {showFilter && (
                <div className="absolute right-0 top-14 z-50 w-48 rounded-xl border border-gray-200 bg-white p-2 shadow-xl dark:border-white/10 dark:bg-[#11151d]">
                  {["All", "Active", "Inactive"].map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => {
                        setStatusFilter(status);
                        setShowFilter(false);
                      }}
                      className={
                        "w-full rounded-lg px-3 py-2.5 text-left text-[12px] transition-colors " +
                        (statusFilter === status
                          ? "bg-orange-500/10 text-orange-500"
                          : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5")
                      }
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* FILTER INFO */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] text-gray-500 dark:text-gray-400">
            <span>Sub Category:</span>

            <span className="rounded-full bg-orange-500/10 px-3 py-1 font-medium text-orange-500">
              {statusFilter}
            </span>

            <span>
              • {filteredSubCategories.length} sub categories
            </span>
          </div>
        </div>

        {/* TABLE */}
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0d1017]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/[0.025]">
                  {[
                    "Sub Category",
                    "Category",
                    "Description",
                    "Products",
                    "Status",
                    "Actions",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className={
                        "px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 " +
                        (heading === "Actions"
                          ? "text-right"
                          : "text-left")
                      }
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredSubCategories.length > 0 ? (
                  filteredSubCategories.map((subCategory) => (
                    <tr
                      key={subCategory.id}
                      className="border-b border-gray-100 transition-colors last:border-b-0 hover:bg-orange-50/50 dark:border-white/5 dark:hover:bg-orange-500/[0.03]"
                    >
                      {/* SUB CATEGORY */}
                      <td className="px-5 py-4">
                        <div>
                          <h3 className="text-[12px] font-semibold">
                            {subCategory.name}
                          </h3>

                          <span className="text-[10px] text-gray-500">
                            ID: {subCategory.id}
                          </span>
                        </div>
                      </td>

                      {/* CATEGORY */}
                      <td className="px-5 py-4">
                        <span className="rounded-full bg-orange-500/10 px-3 py-1 text-[10px] font-medium text-orange-500">
                          {subCategory.category}
                        </span>
                      </td>

                      {/* DESCRIPTION */}
                      <td className="px-5 py-4">
                        <p className="max-w-[300px] text-[12px] text-gray-500 dark:text-gray-400">
                          {subCategory.description}
                        </p>
                      </td>

                      {/* PRODUCTS */}
                      <td className="px-5 py-4">
                        <p className="text-[12px] font-semibold">
                          {subCategory.products}
                        </p>

                        <p className="text-[10px] text-gray-500">
                          products
                        </p>
                      </td>

                      {/* STATUS */}
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[9px] font-semibold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 size={12} />
                          {subCategory.status}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            title="View"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:border-orange-300 hover:text-orange-500 dark:border-white/10 dark:text-gray-400"
                          >
                            <Eye size={16} />
                          </button>

                          <button
                            type="button"
                            title="Edit"
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500 transition-colors hover:bg-orange-500 hover:text-white"
                          >
                            <Edit size={16} />
                          </button>

                          <button
                            type="button"
                            title="Delete"
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 text-red-500 transition-colors hover:bg-red-500 hover:text-white"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-5 py-16 text-center">
                      <ListTree
                        size={30}
                        className="mx-auto text-orange-500"
                      />

                      <h3 className="mt-5 text-[16px] font-bold">
                        No sub categories found
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
            Showing {filteredSubCategories.length} of{" "}
            {subCategories.length} sub categories
          </div>
        </div>
      </div>
    </div>
  );
}