import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  ImagePlus,
  Package,
  Save,
  X,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  createProduct,
  getProductById,
  updateProduct,
  uploadProductImage,
} from "@/services/ProductsService";
import { getAllCategories } from "@/services/CategoriesService";
import { getAllSubCategories } from "@/services/SubCategoriesService";
import type ProductsData from "@/model/ProductsData";

interface CategoryOption {
  id: string;
  name: string;
}

interface SubCategoryOption {
  id: string;
  name: string;
  categoryId: string;
}

const initialFormData: ProductsData = {
  productName: "",
  categoryId: "",
  subCategoryId: "",
  brand: "",
  shortDescription: "",
  fullDescription: "",
  mrp: 0,
  sellingPrice: 0,
  stockQuantity: 0,
  lowStockAlert: 10,
  netWeight: 0,
  unit: "",
  packagingType: "",
  countryOfOrigin: "",
  ingredients: "",
  images: [],
  status: "active",
  featured: false,
};

const getResponseData = (response: any) =>
  response?.data?.data ?? response?.data ?? response;

const getImageUrl = (image: string) => {
  if (!image || image.startsWith("blob:") || /^https?:\/\//i.test(image)) {
    return image;
  }

  const baseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8083/api/v1";
  const origin = baseUrl.replace(/\/api\/v1\/?$/, "").replace(/\/$/, "");

  return `${origin}${image.startsWith("/") ? "" : "/"}${image}`;
};

export default function AddProducts() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState<ProductsData>(initialFormData);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategoryOption[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingSubCategories, setLoadingSubCategories] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);

      try {
        const response = await getAllCategories();
        const data = getResponseData(response);

        if (!Array.isArray(data)) {
          throw new Error("Invalid categories response");
        }

        setCategories(
          data.map((item: any) => ({
            id: String(item.id),
            name: item.name ?? item.categoryName ?? "Unnamed",
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
    if (!formData.categoryId) {
      setSubCategories([]);
      return;
    }

    const fetchSubCategories = async () => {
      setLoadingSubCategories(true);

      try {
        const response = await getAllSubCategories();
        const data = getResponseData(response);

        if (!Array.isArray(data)) {
          throw new Error("Invalid subcategories response");
        }

        const mapped: SubCategoryOption[] = data.map((item: any) => ({
          id: String(item.id),
          name: item.name ?? item.subCategoryName ?? "Unnamed",
          categoryId: String(
            item.categoryId ?? item.category?.id ?? ""
          ),
        }));

        setSubCategories(
          mapped.filter(
            (item) => item.categoryId === String(formData.categoryId)
          )
        );
      } catch (error) {
        console.error("Failed to load subcategories:", error);
        toast.error("Failed to load subcategories");
        setSubCategories([]);
      } finally {
        setLoadingSubCategories(false);
      }
    };

    fetchSubCategories();
  }, [formData.categoryId]);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setLoadingProduct(true);

      try {
        const response = await getProductById(id);
        const product = getResponseData(response);

        const categoryId = String(
          product.categoryId ?? product.category?.id ?? ""
        );

        setFormData({
          productName: product.productName ?? "",
          categoryId,
          subCategoryId: String(
            product.subCategoryId ?? product.subCategory?.id ?? ""
          ),
          brand: product.brand ?? "",
          shortDescription: product.shortDescription ?? "",
          fullDescription: product.fullDescription ?? "",
          mrp: Number(product.mrp ?? 0),
          sellingPrice: Number(product.sellingPrice ?? 0),
          stockQuantity: Number(product.stockQuantity ?? 0),
          lowStockAlert: Number(product.lowStockAlert ?? 10),
          netWeight: Number(product.netWeight ?? 0),
          unit: product.unit ?? "",
          packagingType: product.packagingType ?? "",
          countryOfOrigin: product.countryOfOrigin ?? "",
          ingredients: product.ingredients ?? "",
          images: Array.isArray(product.images) ? product.images : [],
          status: product.status ?? "active",
          featured: Boolean(product.featured),
        });

        setImages(
          Array.isArray(product.images)
            ? product.images.map((image: string) => getImageUrl(image))
            : []
        );
      } catch (error) {
        console.error("Failed to load product:", error);
        toast.error("Failed to load product details");
      } finally {
        setLoadingProduct(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]:
        name === "mrp" ||
        name === "sellingPrice" ||
        name === "stockQuantity" ||
        name === "lowStockAlert" ||
        name === "netWeight"
          ? value === ""
            ? 0
            : Number(value)
          : value,
    }));
  };

  const handleCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData((previous) => ({
      ...previous,
      categoryId: e.target.value,
      subCategoryId: "",
    }));
  };

  const handleFeaturedChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((previous) => ({
      ...previous,
      featured: e.target.checked,
    }));
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";

    if (!files.length) return;

    const validFiles: File[] = [];

    for (const file of files) {
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        toast.error(`${file.name}: Only JPG, PNG and WEBP are allowed`);
        continue;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name}: Image size must be under 5 MB`);
        continue;
      }

      validFiles.push(file);
    }

    if (!validFiles.length) return;

    setSelectedFiles((previous) => [...previous, ...validFiles]);
    setImages((previous) => [
      ...previous,
      ...validFiles.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const removeImage = (index: number) => {
    const imageToRemove = images[index];

    if (imageToRemove?.startsWith("blob:")) {
      URL.revokeObjectURL(imageToRemove);

      const selectedFileIndex = images
        .slice(0, index)
        .filter((image) => image.startsWith("blob:")).length;

      setSelectedFiles((previous) =>
        previous.filter((_, fileIndex) => fileIndex !== selectedFileIndex)
      );
    }

    setImages((previous) =>
      previous.filter((_, imageIndex) => imageIndex !== index)
    );
  };

  useEffect(() => {
    return () => {
      images.forEach((image) => {
        if (image.startsWith("blob:")) {
          URL.revokeObjectURL(image);
        }
      });
    };
  }, [images]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!formData.productName.trim()) {
      toast.error("Please enter product name");
      return;
    }

    if (!formData.categoryId) {
      toast.error("Please select a category");
      return;
    }

    if (!formData.subCategoryId) {
      toast.error("Please select a subcategory");
      return;
    }

    if (formData.mrp <= 0 || formData.sellingPrice <= 0) {
      toast.error("MRP and selling price must be greater than zero");
      return;
    }

    if (formData.sellingPrice > formData.mrp) {
      toast.error("Selling price cannot be greater than MRP");
      return;
    }

    if (formData.stockQuantity < 0 || formData.lowStockAlert < 0) {
      toast.error("Stock values cannot be negative");
      return;
    }

    if (formData.netWeight <= 0) {
      toast.error("Please enter a valid net weight");
      return;
    }

    if (!formData.unit) {
      toast.error("Please select a unit");
      return;
    }

    setLoading(true);

    try {
      const uploadedImages = await Promise.all(
        selectedFiles.map((file) => uploadProductImage(file))
      );

      const existingImages = images.filter(
        (image) => !image.startsWith("blob:")
      );

      const payload: ProductsData = {
        ...formData,
        productName: formData.productName.trim(),
        brand: formData.brand.trim(),
        shortDescription: formData.shortDescription.trim(),
        fullDescription: formData.fullDescription.trim(),
        countryOfOrigin: formData.countryOfOrigin.trim(),
        ingredients: formData.ingredients.trim(),
        images: [...existingImages, ...uploadedImages],
      };

      if (isEditMode && id) {
        await updateProduct(id, payload);
        toast.success("Product updated successfully");
      } else {
        await createProduct(payload);
        toast.success("Product created successfully");
      }

      navigate("/admin/products");
    } catch (error: any) {
      console.error("Failed to save product:", error);

      toast.error(
        error?.response?.data?.message ??
          error?.message ??
          "Failed to save product"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loadingProduct) {
    return (
      <div className="min-h-screen bg-gray-50 p-10 text-center text-gray-600 dark:bg-[#08090b] dark:text-gray-300">
        Loading product details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#08090b] dark:text-white">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                <Package size={19} />
              </div>
              <span className="text-[12px] font-semibold text-orange-500">
                Store Management
              </span>
            </div>

            <h1 className="text-[28px] font-bold tracking-tight">
              {isEditMode ? "Edit Product" : "Add Product"}
            </h1>

            <p className="mt-2 text-[12px] text-gray-500 dark:text-gray-400">
              {isEditMode
                ? "Update your product details."
                : "Add a new product to your store."}
            </p>
          </div>

          <Link
            to="/admin/products"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-[12px] font-semibold text-gray-700 transition-colors hover:border-orange-300 hover:text-orange-500 dark:border-white/10 dark:bg-[#0d1017] dark:text-gray-300"
          >
            <ArrowLeft size={17} />
            Back to Products
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 xl:grid-cols-3"
        >
          <div className="space-y-6 xl:col-span-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-[#0d1017]">
              <div className="mb-5">
                <h2 className="text-[16px] font-bold">Basic Information</h2>
                <p className="mt-1 text-[11px] text-gray-500">
                  Enter the basic details of your product.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    required
                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-[12px] outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                    Category *
                  </label>
                  <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleCategoryChange}
                    required
                    disabled={loadingCategories}
                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-[12px] outline-none focus:border-orange-500 dark:border-white/10 dark:bg-[#11151d] dark:text-white"
                  >
                    <option value="">
                      {loadingCategories ? "Loading categories..." : "Select category"}
                    </option>
                    {categories.map((item) => (
                      <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                    Sub Category *
                  </label>
                  <select
                    name="subCategoryId"
                    value={formData.subCategoryId}
                    onChange={handleChange}
                    required
                    disabled={!formData.categoryId || loadingSubCategories || subCategories.length === 0}
                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-[12px] outline-none focus:border-orange-500 dark:border-white/10 dark:bg-[#11151d] dark:text-white"
                  >
                    <option value="">
                      {!formData.categoryId
                        ? "Select category first"
                        : loadingSubCategories
                          ? "Loading subcategories..."
                          : "Select sub category"}
                    </option>
                    {subCategories.map((item) => (
                      <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-semibold text-gray-600 dark:text-gray-300">Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="Enter brand name"
                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-[12px] outline-none focus:border-orange-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-[11px] font-semibold text-gray-600 dark:text-gray-300">Short Description</label>
                  <textarea
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Write a short description..."
                    className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-4 text-[12px] outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-[11px] font-semibold text-gray-600 dark:text-gray-300">Full Description</label>
                  <textarea
                    name="fullDescription"
                    value={formData.fullDescription}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Write detailed product description..."
                    className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-4 text-[12px] outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-[#0d1017]">
              <div className="mb-5">
                <h2 className="text-[16px] font-bold">Pricing & Inventory</h2>
                <p className="mt-1 text-[11px] text-gray-500">Set product pricing and stock information.</p>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {[
                  { name: "mrp", label: "MRP / Original Price *", min: "0.01", step: "0.01" },
                  { name: "sellingPrice", label: "Selling Price *", min: "0.01", step: "0.01" },
                  { name: "stockQuantity", label: "Stock Quantity *", min: "0", step: "1" },
                  { name: "lowStockAlert", label: "Low Stock Alert", min: "0", step: "1" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="mb-2 block text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                      {field.label}
                    </label>
                    <input
                      type="number"
                      name={field.name}
                      min={field.min}
                      step={field.step}
                      value={formData[field.name as keyof ProductsData] as number}
                      onChange={handleChange}
                      required={field.name === "mrp" || field.name === "sellingPrice" || field.name === "stockQuantity"}
                      placeholder="Enter value"
                      className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-[12px] outline-none focus:border-orange-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-[#0d1017]">
              <div className="mb-5">
                <h2 className="text-[16px] font-bold">Product Details</h2>
                <p className="mt-1 text-[11px] text-gray-500">Add product-specific information.</p>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[11px] font-semibold text-gray-600 dark:text-gray-300">Net Weight *</label>
                  <input
                    type="number"
                    name="netWeight"
                    min="0.01"
                    step="0.01"
                    value={formData.netWeight || ""}
                    onChange={handleChange}
                    placeholder="e.g. 500"
                    required
                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-[12px] outline-none focus:border-orange-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-semibold text-gray-600 dark:text-gray-300">Unit *</label>
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    required
                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-[12px] outline-none focus:border-orange-500 dark:border-white/10 dark:bg-[#11151d] dark:text-white"
                  >
                    <option value="">Select unit</option>
                    <option value="g">Gram (g)</option>
                    <option value="kg">Kilogram (kg)</option>
                    <option value="ml">Millilitre (ml)</option>
                    <option value="L">Litre (L)</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-semibold text-gray-600 dark:text-gray-300">Packaging Type</label>
                  <select
                    name="packagingType"
                    value={formData.packagingType}
                    onChange={handleChange}
                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-[12px] outline-none focus:border-orange-500 dark:border-white/10 dark:bg-[#11151d] dark:text-white"
                  >
                    <option value="">Select packaging</option>
                    <option value="Pouch">Pouch</option>
                    <option value="Bottle">Bottle</option>
                    <option value="Jar">Jar</option>
                    <option value="Box">Box</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-semibold text-gray-600 dark:text-gray-300">Country of Origin</label>
                  <input
                    type="text"
                    name="countryOfOrigin"
                    value={formData.countryOfOrigin}
                    onChange={handleChange}
                    placeholder="e.g. India"
                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-[12px] outline-none focus:border-orange-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-[11px] font-semibold text-gray-600 dark:text-gray-300">Ingredients</label>
                  <textarea
                    name="ingredients"
                    value={formData.ingredients}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Enter ingredients..."
                    className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-4 text-[12px] outline-none focus:border-orange-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-[#0d1017]">
              <div className="mb-5">
                <h2 className="text-[16px] font-bold">Product Images</h2>
                <p className="mt-1 text-[11px] text-gray-500">Upload product images (max 5 MB each).</p>
              </div>

              <label className="flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-orange-400 hover:bg-orange-50/50 dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-orange-500">
                <ImagePlus size={32} className="text-orange-500" />
                <p className="mt-3 text-[12px] font-semibold">Upload Images</p>
                <p className="mt-1 text-[10px] text-gray-500">PNG, JPG or WEBP</p>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {images.map((image, index) => (
                    <div
                      key={`${image}-${index}`}
                      className="group relative aspect-square overflow-hidden rounded-xl border border-gray-200 dark:border-white/10"
                    >
                      <img
                        src={getImageUrl(image)}
                        alt={`Product ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-[#0d1017]">
              <h2 className="text-[16px] font-bold">Product Status</h2>

              <div className="mt-5">
                <label className="mb-2 block text-[11px] font-semibold text-gray-600 dark:text-gray-300">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-[12px] outline-none focus:border-orange-500 dark:border-white/10 dark:bg-[#11151d] dark:text-white"
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <label className="mt-5 flex cursor-pointer items-center justify-between rounded-xl border border-gray-200 p-4 dark:border-white/10">
                <div>
                  <p className="text-[12px] font-semibold">Featured Product</p>
                  <p className="mt-1 text-[10px] text-gray-500">Show this product as featured.</p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={handleFeaturedChange}
                  className="h-4 w-4 accent-orange-500"
                />
              </label>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row xl:flex-col">
              <Link
                to="/admin/products"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-gray-200 bg-white px-5 text-[12px] font-semibold text-gray-600 transition-colors hover:border-orange-300 hover:text-orange-500 dark:border-white/10 dark:bg-[#0d1017] dark:text-gray-300"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={loading || loadingCategories || loadingProduct}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-5 text-[12px] font-semibold text-white shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save size={17} />
                {loading
                  ? "Uploading & Saving..."
                  : isEditMode
                    ? "Update Product"
                    : "Save Product"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
