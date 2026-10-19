import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  Filter,
  Edit,
  Trash2,
  Eye,
  Package,
  FolderTree,
  CheckCircle2,
  X,
} from "lucide-react";
import {
  getAllCategories,
  getCategoryById,
  deleteCategory,
} from "@/services/CategoriesService";
import toast from "react-hot-toast";

type Category = {
  id: string | number;
  name: string;
  description: string;
  products: number;
  status: string;
};

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | number | null>(null);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);

  const fetchCategories = async () => {
    setLoading(true);

    try {
      const response = await getAllCategories();
      const data = Array.isArray(response) ? response : response?.data;

      if (!Array.isArray(data)) {
        throw new Error("Invalid categories response");
      }

      setCategories(
        data.map((item: any) => ({
          id: item.id,
          name: item.name ?? item.categoryName ?? "Unnamed",
          description: item.description ?? "",
          products:
            item.productsCount ??
            item.productCount ??
            item.products?.length ??
            0,
          status:
            item.status ??
            (item.active === false ? "Inactive" : "Active"),
        }))
      );
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        category.name.toLowerCase().includes(searchValue) ||
        category.description.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || category.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [categories, search, statusFilter]);

  const totalProducts = categories.reduce(
    (total, category) => total + category.products,
    0
  );

  const activeCategories = categories.filter(
    (category) => category.status === "Active"
  ).length;

  const handleView = async (id: string | number) => {
    try {
      const response = await getCategoryById(String(id));
      const item = response?.data ?? response;

      setSelectedCategory({
        id: item.id,
        name: item.name ?? item.categoryName ?? "Unnamed",
        description: item.description ?? "",
        products:
          item.productsCount ??
          item.productCount ??
          item.products?.length ??
          0,
        status:
          item.status ??
          (item.active === false ? "Inactive" : "Active"),
      });
    } catch (error) {
      console.error("Failed to fetch category:", error);
      toast.error("Failed to load category details");
    }
  };

  const handleDelete = (id: string | number) => {
    setCategoryToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (categoryToDelete === null) return;

    const id = categoryToDelete;
    setDeletingId(id);

    try {
      await deleteCategory(String(id));

      setCategories((previous) =>
        previous.filter((category) => String(category.id) !== String(id))
      );

      setSelectedCategory((previous) =>
        previous && String(previous.id) === String(id) ? null : previous
      );

      setShowDeleteModal(false);
      setCategoryToDelete(null);
      toast.success("Category deleted successfully");
    } catch (error) {
      console.error("Failed to delete category:", error);
      toast.error("Failed to delete category");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#08090b] dark:text-white">
      <div className="mx-auto max-w-[1600px]">
        {/* HEADER */}
        <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                <FolderTree size={19} />
              </div>
              <span className="text-[12px] font-semibold text-orange-500">
                Store Management
              </span>
            </div>

            <h1 className="text-[28px] font-bold tracking-tight sm:text-[34px]">
              Categories
            </h1>

            <p className="mt-2 text-[12px] text-gray-500 dark:text-gray-400">
              Manage your product categories.
            </p>
          </div>

          <Link
            to="/admin/add-categories"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-5 py-3 text-[12px] font-semibold text-white shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5"
          >
            <Plus size={19} />
            Add Category
          </Link>
        </div>

        {/* STATS */}
        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "Total Categories",
              value: categories.length,
              subtitle: "All categories",
              icon: FolderTree,
              color: "text-orange-500 bg-orange-500/10",
            },
            {
              title: "Active Categories",
              value: activeCategories,
              subtitle: "Currently active",
              icon: CheckCircle2,
              color: "text-emerald-500 bg-emerald-500/10",
            },
            {
              title: "Total Products",
              value: totalProducts,
              subtitle: "Across all categories",
              icon: Package,
              color: "text-purple-500 bg-purple-500/10",
            },
            {
              title: "Inactive Categories",
              value: categories.length - activeCategories,
              subtitle: "Currently inactive",
              icon: FolderTree,
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
                    <h2 className="mt-2 text-[22px] font-bold">{item.value}</h2>
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
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search categories..."
                className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-[12px] text-gray-900 outline-none placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
              />
            </div>

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

          <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] text-gray-500 dark:text-gray-400">
            <span>Category:</span>
            <span className="rounded-full bg-orange-500/10 px-3 py-1 font-medium text-orange-500">
              {statusFilter}
            </span>
            <span>• {filteredCategories.length} categories</span>
          </div>
        </div>

        {/* CATEGORY TABLE */}
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0d1017]">
          {loading && (
            <p className="px-5 py-4 text-[12px] text-gray-500">
              Loading categories...
            </p>
          )}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/[0.025]">
                  {["Category", "Description", "Products", "Status", "Actions"].map(
                    (heading) => (
                      <th
                        key={heading}
                        className={
                          "px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 " +
                          (heading === "Actions" ? "text-right" : "text-left")
                        }
                      >
                        {heading}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => (
                    <tr
                      key={category.id}
                      className="border-b border-gray-100 transition-colors last:border-b-0 hover:bg-orange-50/50 dark:border-white/5 dark:hover:bg-orange-500/[0.03]"
                    >
                      <td className="px-5 py-4">
                        <div>
                          <h3 className="text-[12px] font-semibold">
                            {category.name}
                          </h3>
                          <span className="text-[10px] text-gray-500">
                            ID: {category.id}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <p className="max-w-[350px] text-[12px] text-gray-500 dark:text-gray-400">
                          {category.description}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-[12px] font-semibold">
                          {category.products}
                        </p>
                        <p className="text-[10px] text-gray-500">products</p>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[9px] font-semibold ${
                            category.status === "Active"
                              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                              : "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400"
                          }`}
                        >
                          <CheckCircle2 size={12} />
                          {category.status}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            title="View"
                            onClick={() => handleView(category.id)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:border-orange-300 hover:text-orange-500 dark:border-white/10 dark:text-gray-400"
                          >
                            <Eye size={16} />
                          </button>

                          <Link
                            to={`/admin/add-categories?id=${encodeURIComponent(
                              String(category.id)
                            )}`}
                            title="Edit"
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500 transition-colors hover:bg-orange-500 hover:text-white"
                          >
                            <Edit size={16} />
                          </Link>

                          <button
                            type="button"
                            title="Delete"
                            disabled={deletingId === category.id}
                            onClick={() => handleDelete(category.id)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 text-red-500 transition-colors hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-5 py-16 text-center">
                      <FolderTree
                        size={30}
                        className="mx-auto text-orange-500"
                      />
                      <h3 className="mt-5 text-[16px] font-bold">
                        No categories found
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

          <div className="border-t border-gray-200 px-5 py-4 text-[12px] text-gray-500 dark:border-white/10">
            Showing {filteredCategories.length} of {categories.length} categories
          </div>
        </div>
      </div>

      {/* VIEW DETAILS MODAL */}
      {selectedCategory && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedCategory(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl dark:border-white/10 dark:bg-[#0d1017]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                  <FolderTree size={20} />
                </div>
                <div>
                  <h2 className="text-[16px] font-bold">Category Details</h2>
                  <p className="text-[11px] text-gray-500">
                    ID: {selectedCategory.id}
                  </p>
                </div>
              </div>

              <button
                type="button"
                aria-label="Close details"
                onClick={() => setSelectedCategory(null)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-[12px]">
              <div>
                <p className="text-gray-500">Category Name</p>
                <p className="mt-1 font-semibold">{selectedCategory.name}</p>
              </div>
              <div>
                <p className="text-gray-500">Description</p>
                <p className="mt-1">
                  {selectedCategory.description || "No description available"}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Products</p>
                  <p className="mt-1 font-semibold">{selectedCategory.products}</p>
                </div>
                <div>
                  <p className="text-gray-500">Status</p>
                  <p
                    className={`mt-1 font-semibold ${
                      selectedCategory.status === "Active"
                        ? "text-emerald-500"
                        : "text-red-500"
                    }`}
                  >
                    {selectedCategory.status}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedCategory(null)}
                className="rounded-xl border border-gray-200 px-4 py-2.5 text-[12px] font-medium dark:border-white/10"
              >
                Close
              </button>
              <Link
                to={`/admin/add-categories?id=${encodeURIComponent(
                  String(selectedCategory.id)
                )}`}
                className="rounded-xl bg-orange-500 px-4 py-2.5 text-[12px] font-semibold text-white"
              >
                Edit Category
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4"
          onClick={() => {
            if (deletingId === null) {
              setShowDeleteModal(false);
              setCategoryToDelete(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-category-title"
            className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#0d1017]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
                <Trash2 size={24} />
              </div>
              <div>
                <h2
                  id="delete-category-title"
                  className="text-[16px] font-bold"
                >
                  Delete Category?
                </h2>
                <p className="mt-2 text-[12px] leading-5 text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this category? This action
                  cannot be undone.
                </p>
              </div>
            </div>

            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                disabled={deletingId !== null}
                onClick={() => {
                  setShowDeleteModal(false);
                  setCategoryToDelete(null);
                }}
                className="rounded-xl border border-gray-200 px-4 py-2.5 text-[12px] font-semibold text-gray-700 transition-colors hover:bg-gray-100 disabled:opacity-50 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deletingId !== null}
                onClick={confirmDelete}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-[12px] font-semibold text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Trash2 size={15} />
                {deletingId !== null ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
