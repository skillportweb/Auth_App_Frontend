import { useEffect, useState } from "react";
import { ArrowLeft, ListTree, Save } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import apiClient from "@/config/ApiClient";
import type SubCategoriesData from "@/model/SubCategoriesData";
import {
  createSubCategory,
  getSubCategoryById,
  updateSubCategory,
} from "@/services/SubCategoriesService";

interface CategoryOption {
  id: string;
  name: string;
}

export default function AddSubCategories() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const editId = searchParams.get("id");
  const isEditMode = Boolean(editId);

  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingSubCategory, setLoadingSubCategory] = useState(false);

  const [formData, setFormData] = useState<SubCategoriesData>({
    name: "",
    description: "",
    active: true,
    categoryId: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);

      try {
        // Fetch all categories for the category dropdown.
        const response = await apiClient.get("/categories");
        const data = Array.isArray(response.data)
          ? response.data
          : response.data?.data;

        if (!Array.isArray(data)) {
          throw new Error("Invalid categories response");
        }

        setCategories(
          data.map((category: any) => ({
            id: String(category.id),
            name:
              category.name ??
              category.categoryName ??
              "Unnamed Category",
          }))
        );
      } catch (error) {
        console.error("Failed to load categories:", error);
        toast.error("Failed to load categories");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (!editId) return;

    const fetchSubCategory = async () => {
      setLoadingSubCategory(true);

      try {
        // Fetch existing subcategory details for edit mode.
        const response = await getSubCategoryById(editId);
        const item = response?.data ?? response;

        setFormData({
          name: item.name ?? item.subCategoryName ?? "",
          description: item.description ?? "",
          active:
            item.active ??
            String(item.status ?? "Active").toLowerCase() !== "inactive",
          categoryId: String(
            item.categoryId ?? item.category?.id ?? ""
          ),
        });
      } catch (error) {
        console.error("Failed to load subcategory:", error);
        toast.error("Failed to load subcategory details");
      } finally {
        setLoadingSubCategory(false);
      }
    };

    fetchSubCategory();
  }, [editId]);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: name === "active" ? value === "true" : value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!formData.categoryId) {
      toast.error("Please select a category");
      return;
    }

    if (!formData.name.trim()) {
      toast.error("Sub category name is required");
      return;
    }

    setLoading(true);

    try {
      const payload: SubCategoriesData = {
        ...formData,
        name: formData.name.trim(),
        description: formData.description.trim(),
        categoryId: formData.categoryId,
      };

      if (isEditMode && editId) {
        // Update the existing subcategory through the backend API.
        await updateSubCategory(editId, payload);
        toast.success("Sub category updated successfully!");
      } else {
        // Create a new subcategory through the backend API.
        await createSubCategory(payload);
        toast.success("Sub category created successfully!");
      }

      navigate("/admin/sub-categories");
    } catch (error: unknown) {
      const message = (
        error as {
          response?: { data?: { message?: string } };
        }
      )?.response?.data?.message;

      toast.error(
        message ??
          (isEditMode
            ? "Failed to update sub category"
            : "Failed to create sub category")
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
                <ListTree size={19} />
              </div>

              <span className="text-[12px] font-semibold text-orange-500">
                Store Management
              </span>
            </div>

            <h1 className="text-[28px] font-bold tracking-tight sm:text-[34px]">
              {isEditMode ? "Edit Sub Category" : "Add Sub Category"}
            </h1>

            <p className="mt-2 text-[12px] text-gray-500 dark:text-gray-400">
              {isEditMode
                ? "Update your existing product sub category."
                : "Create a new product sub category."}
            </p>
          </div>

          <Link
            to="/admin/sub-categories"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-[12px] font-semibold text-gray-700 transition-all hover:-translate-y-0.5 hover:border-orange-300 hover:text-orange-500 dark:border-white/10 dark:bg-[#0d1017] dark:text-gray-300"
          >
            <ArrowLeft size={18} />
            Back to Sub Categories
          </Link>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0d1017]"
        >
          <div className="border-b border-gray-200 px-5 py-4 dark:border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                <ListTree size={20} />
              </div>

              <div>
                <h2 className="text-[16px] font-bold">
                  Sub Category Information
                </h2>

                <p className="mt-1 text-[10px] text-gray-500 dark:text-gray-400">
                  {isEditMode
                    ? "Update the selected sub category details."
                    : "Enter the details for your new sub category."}
                </p>
              </div>
            </div>
          </div>

          <div className="p-5">
            {loadingSubCategory && (
              <p className="mb-5 text-[12px] text-orange-500">
                Loading subcategory details...
              </p>
            )}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* CATEGORY */}
              <div>
                <label className="mb-2 block text-[12px] font-semibold">
                  Category <span className="ml-1 text-red-500">*</span>
                </label>

                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  required
                  disabled={loadingCategories || loadingSubCategory}
                  className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-[12px] text-gray-900 outline-none focus:border-orange-500 dark:border-white/10 dark:bg-[#11151d] dark:text-white"
                >
                  <option value="">
                    {loadingCategories
                      ? "Loading categories..."
                      : "Select category"}
                  </option>

                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* SUB CATEGORY NAME */}
              <div>
                <label className="mb-2 block text-[12px] font-semibold">
                  Sub Category Name{" "}
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter sub category name"
                  required
                  disabled={loadingSubCategory}
                  className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-[12px] text-gray-900 outline-none placeholder:text-gray-400 focus:border-orange-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                />
              </div>

              {/* DESCRIPTION */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-[12px] font-semibold">
                  Description
                </label>

                <textarea
                  name="description"
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter sub category description"
                  disabled={loadingSubCategory}
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-[12px] text-gray-900 outline-none placeholder:text-gray-400 focus:border-orange-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                />
              </div>

              {/* STATUS */}
              <div>
                <label className="mb-2 block text-[12px] font-semibold">
                  Status <span className="ml-1 text-red-500">*</span>
                </label>

                <select
                  name="active"
                  value={String(formData.active)}
                  onChange={handleChange}
                  disabled={loadingSubCategory}
                  className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-[12px] text-gray-900 outline-none focus:border-orange-500 dark:border-white/10 dark:bg-[#11151d] dark:text-white"
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
            </div>

            {/* FORM ACTIONS */}
            <div className="mt-7 flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:justify-end dark:border-white/10">
              <Link
                to="/admin/sub-categories"
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-3 text-[12px] font-semibold text-gray-700 hover:border-orange-300 hover:text-orange-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-300"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={loading || loadingCategories || loadingSubCategory}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-5 py-3 text-[12px] font-semibold text-white shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save size={18} />
                {loading
                  ? "Saving..."
                  : isEditMode
                    ? "Update Sub Category"
                    : "Save Sub Category"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
