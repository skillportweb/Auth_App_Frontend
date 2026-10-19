import { useEffect, useState } from "react";
import { ArrowLeft, FolderTree, Save } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  createCategory,
  getCategoryById,
  updateCategory,
} from "@/services/CategoriesService";
import type CategoriesData from "@/model/CategoriesData";

export default function AddCategories() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("id");
  const isEditMode = Boolean(categoryId);

  const [formData, setFormData] = useState<CategoriesData>({
    name: "",
    description: "",
    active: true,
  });
  const [loading, setLoading] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(false);

  useEffect(() => {
    if (!categoryId) return;

    const fetchCategory = async () => {
      setLoadingCategory(true);

      try {
        const response = await getCategoryById(categoryId);
        const item = response?.data ?? response;

        setFormData({
          name: item.name ?? item.categoryName ?? "",
          description: item.description ?? "",
          active:
            item.active ?? (item.status ? item.status === "Active" : true),
        });
      } catch (error: any) {
        console.error("Failed to fetch category:", error);
        toast.error(
          error?.response?.data?.message || "Failed to load category"
        );
      } finally {
        setLoadingCategory(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: name === "active" ? value === "true" : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Please enter category name");
      return;
    }

    setLoading(true);

    try {
      const payload: CategoriesData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        active: formData.active,
      };

      if (categoryId) {
        await updateCategory(categoryId, payload);
        toast.success("Category updated successfully");
      } else {
        await createCategory(payload);
        toast.success("Category created successfully");
      }

      navigate("/admin/categories");
    } catch (error: any) {
      console.error("Failed to save category:", error);
      toast.error(
        error?.response?.data?.message ||
          `Failed to ${isEditMode ? "update" : "create"} category`
      );
    } finally {
      setLoading(false);
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
              {isEditMode ? "Edit Category" : "Add Category"}
            </h1>

            <p className="mt-2 text-[12px] text-gray-500 dark:text-gray-400">
              {isEditMode
                ? "Update your product category details."
                : "Create a new product category."}
            </p>
          </div>

          <Link
            to="/admin/categories"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-[12px] font-semibold text-gray-700 transition-all hover:-translate-y-0.5 hover:border-orange-300 hover:text-orange-500 dark:border-white/10 dark:bg-[#0d1017] dark:text-gray-300"
          >
            <ArrowLeft size={18} />
            Back to Categories
          </Link>
        </div>

        {/* FORM */}
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0d1017]">
          <div className="border-b border-gray-200 px-5 py-4 dark:border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                <FolderTree size={20} />
              </div>

              <div>
                <h2 className="text-[16px] font-bold">
                  Category Information
                </h2>

                <p className="mt-1 text-[10px] text-gray-500 dark:text-gray-400">
                  {isEditMode
                    ? "Update the details for this category."
                    : "Enter the details for your new category."}
                </p>
              </div>
            </div>
          </div>

          {loadingCategory ? (
            <p className="p-5 text-[12px] text-gray-500">
              Loading category details...
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="p-5">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {/* CATEGORY NAME */}
                  <div>
                    <label className="mb-2 block text-[12px] font-semibold">
                      Category Name
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter category name"
                      required
                      className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-[12px] text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                    />
                  </div>

                  {/* STATUS */}
                  <div>
                    <label className="mb-2 block text-[12px] font-semibold">
                      Status
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <select
                      name="active"
                      value={String(formData.active)}
                      onChange={handleChange}
                      className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-[12px] text-gray-900 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 dark:border-white/10 dark:bg-[#11151d] dark:text-white"
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
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
                      rows={5}
                      placeholder="Enter category description"
                      className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-[12px] text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                    />
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="mt-7 flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:justify-end dark:border-white/10">
                  <Link
                    to="/admin/categories"
                    className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-3 text-[12px] font-semibold text-gray-700 transition-all hover:border-orange-300 hover:text-orange-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-300"
                  >
                    Cancel
                  </Link>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-5 py-3 text-[12px] font-semibold text-white shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Save size={18} />
                    {loading
                      ? "Saving..."
                      : isEditMode
                        ? "Update Category"
                        : "Save Category"}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
