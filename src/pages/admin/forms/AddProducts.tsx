import React, { useState } from "react";
import {
    ArrowLeft,
    ImagePlus,
    Package,
    Save,
    X,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AddProducts() {
    const [images, setImages] = useState<string[]>([]);

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = e.target.files;

        if (!files) return;

        const newImages = Array.from(files).map((file) =>
            URL.createObjectURL(file)
        );

        setImages((prev) => [...prev, ...newImages]);
    };

    const removeImage = (index: number) => {
        setImages((prev) =>
            prev.filter((_, imageIndex) => imageIndex !== index)
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#08090b] dark:text-white">
            <div className="mx-auto max-w-[1400px]">

                {/* HEADER */}
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
                            Add Product
                        </h1>

                        <p className="mt-2 text-[12px] text-gray-500 dark:text-gray-400">
                            Add a new product to your store.
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

                <form className="grid grid-cols-1 gap-6 xl:grid-cols-3">

                    {/* LEFT SIDE */}
                    <div className="space-y-6 xl:col-span-2">

                        {/* BASIC INFORMATION */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-[#0d1017]">
                            <div className="mb-5">
                                <h2 className="text-[16px] font-bold">
                                    Basic Information
                                </h2>

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
                                        placeholder="Enter product name"
                                        className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-[12px] outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                                        Category *
                                    </label>

                                    <select
                                        className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-[12px] outline-none focus:border-orange-500 dark:border-white/10 dark:bg-[#11151d] dark:text-white"
                                    >
                                        <option value="">
                                            Select category
                                        </option>
                                        <option value="Dry Fruits">
                                            Dry Fruits
                                        </option>
                                        <option value="Oils">
                                            Oils
                                        </option>
                                        <option value="Ghee">
                                            Ghee
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-2 block text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                                        Sub Category
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Enter sub category"
                                        className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-[12px] outline-none focus:border-orange-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                                        Brand
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Enter brand name"
                                        className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-[12px] outline-none focus:border-orange-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                                        SKU / Product Code *
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="e.g. ALM-001"
                                        className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-[12px] outline-none focus:border-orange-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                                        Short Description
                                    </label>

                                    <textarea
                                        rows={3}
                                        placeholder="Write a short description..."
                                        className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-4 text-[12px] outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                                        Full Description
                                    </label>

                                    <textarea
                                        rows={6}
                                        placeholder="Write detailed product description..."
                                        className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-4 text-[12px] outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* PRICING & INVENTORY */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-[#0d1017]">
                            <div className="mb-5">
                                <h2 className="text-[16px] font-bold">
                                    Pricing & Inventory
                                </h2>

                                <p className="mt-1 text-[11px] text-gray-500">
                                    Set product pricing and stock information.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                <div>
                                    <label className="mb-2 block text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                                        MRP / Original Price *
                                    </label>

                                    <input
                                        type="number"
                                        placeholder="₹ 0"
                                        className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-[12px] outline-none focus:border-orange-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                                        Selling Price *
                                    </label>

                                    <input
                                        type="number"
                                        placeholder="₹ 0"
                                        className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-[12px] outline-none focus:border-orange-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                                        Stock Quantity *
                                    </label>

                                    <input
                                        type="number"
                                        placeholder="Enter quantity"
                                        className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-[12px] outline-none focus:border-orange-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                                        Low Stock Alert
                                    </label>

                                    <input
                                        type="number"
                                        placeholder="e.g. 10"
                                        className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-[12px] outline-none focus:border-orange-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* PRODUCT DETAILS */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-[#0d1017]">
                            <div className="mb-5">
                                <h2 className="text-[16px] font-bold">
                                    Product Details
                                </h2>

                                <p className="mt-1 text-[11px] text-gray-500">
                                    Add product-specific information.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                <div>
                                    <label className="mb-2 block text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                                        Net Weight *
                                    </label>

                                    <input
                                        type="number"
                                        placeholder="e.g. 500"
                                        className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-[12px] outline-none focus:border-orange-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                                        Unit *
                                    </label>

                                    <select
                                        className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-[12px] outline-none focus:border-orange-500 dark:border-white/10 dark:bg-[#11151d] dark:text-white"
                                    >
                                        <option value="">
                                            Select unit
                                        </option>
                                        <option value="g">Gram (g)</option>
                                        <option value="kg">Kilogram (kg)</option>
                                        <option value="ml">Millilitre (ml)</option>
                                        <option value="l">Litre (L)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-2 block text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                                        Packaging Type
                                    </label>

                                    <select
                                        className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-[12px] outline-none focus:border-orange-500 dark:border-white/10 dark:bg-[#11151d] dark:text-white"
                                    >
                                        <option value="">
                                            Select packaging
                                        </option>
                                        <option value="Pouch">Pouch</option>
                                        <option value="Bottle">Bottle</option>
                                        <option value="Jar">Jar</option>
                                        <option value="Box">Box</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-2 block text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                                        Country of Origin
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="e.g. India"
                                        className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-[12px] outline-none focus:border-orange-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                                        Ingredients
                                    </label>

                                    <textarea
                                        rows={3}
                                        placeholder="Enter ingredients..."
                                        className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-4 text-[12px] outline-none focus:border-orange-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="space-y-6">

                        {/* IMAGES */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-[#0d1017]">
                            <div className="mb-5">
                                <h2 className="text-[16px] font-bold">
                                    Product Images
                                </h2>

                                <p className="mt-1 text-[11px] text-gray-500">
                                    Upload product images.
                                </p>
                            </div>

                            <label className="flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-orange-400 hover:bg-orange-50/50 dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-orange-500">
                                <ImagePlus
                                    size={32}
                                    className="text-orange-500"
                                />

                                <p className="mt-3 text-[12px] font-semibold">
                                    Upload Images
                                </p>

                                <p className="mt-1 text-[10px] text-gray-500">
                                    PNG, JPG or WEBP
                                </p>

                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>

                            {images.length > 0 && (
                                <div className="mt-4 grid grid-cols-2 gap-3">
                                    {images.map((image, index) => (
                                        <div
                                            key={image}
                                            className="group relative aspect-square overflow-hidden rounded-xl border border-gray-200 dark:border-white/10"
                                        >
                                            <img
                                                src={image}
                                                alt={`Product ${index + 1}`}
                                                className="h-full w-full object-cover"
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeImage(index)
                                                }
                                                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* STATUS */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-[#0d1017]">
                            <h2 className="text-[16px] font-bold">
                                Product Status
                            </h2>

                            <div className="mt-5">
                                <label className="mb-2 block text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                                    Status
                                </label>

                                <select
                                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-[12px] outline-none focus:border-orange-500 dark:border-white/10 dark:bg-[#11151d] dark:text-white"
                                >
                                    <option value="active">
                                        Active
                                    </option>
                                    <option value="draft">
                                        Draft
                                    </option>
                                    <option value="inactive">
                                        Inactive
                                    </option>
                                </select>
                            </div>

                            <label className="mt-5 flex cursor-pointer items-center justify-between rounded-xl border border-gray-200 p-4 dark:border-white/10">
                                <div>
                                    <p className="text-[12px] font-semibold">
                                        Featured Product
                                    </p>

                                    <p className="mt-1 text-[10px] text-gray-500">
                                        Show this product as featured.
                                    </p>
                                </div>

                                <input
                                    type="checkbox"
                                    className="h-4 w-4 accent-orange-500"
                                />
                            </label>
                        </div>

                        {/* ACTIONS */}
                        <div className="flex flex-col gap-3 sm:flex-row xl:flex-col">
                            <Link
                                to="/admin/products"
                                className="inline-flex h-11 items-center justify-center rounded-xl border border-gray-200 bg-white px-5 text-[12px] font-semibold text-gray-600 transition-colors hover:border-orange-300 hover:text-orange-500 dark:border-white/10 dark:bg-[#0d1017] dark:text-gray-300"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-5 text-[12px] font-semibold text-white shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5"
                            >
                                <Save size={17} />
                                Save Product
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}