import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
    Search,
    Plus,
    Filter,
    Edit,
    Trash2,
    Eye,
    Star,
    Package,
    ShoppingCart,
    AlertTriangle,
    CheckCircle2,
    X,
    Grid3X3,
    List,
} from "lucide-react";

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    oldPrice: number;
    stock: number;
    rating: number;
    reviews: number;
    image: string;
}

type ViewMode = "card" | "table";

const initialProducts: Product[] = [
    {
        id: 1,
        name: "Premium Almonds",
        category: "Dry Fruits",
        price: 699,
        oldPrice: 799,
        stock: 42,
        rating: 4.8,
        reviews: 124,
        image:
            "https://images.unsplash.com/photo-1508061253366-f7da1c4d5e3f?auto=format&fit=crop&w=700&q=80",
    },
    {
        id: 2,
        name: "Premium Cashews",
        category: "Dry Fruits",
        price: 749,
        oldPrice: 849,
        stock: 28,
        rating: 4.9,
        reviews: 98,
        image:
            "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?auto=format&fit=crop&w=700&q=80",
    },
    {
        id: 3,
        name: "Kashmiri Walnuts",
        category: "Dry Fruits",
        price: 899,
        oldPrice: 999,
        stock: 8,
        rating: 4.7,
        reviews: 76,
        image:
            "https://images.unsplash.com/photo-1608797178974-15b35a64ede9?auto=format&fit=crop&w=700&q=80",
    },
    {
        id: 4,
        name: "Premium Pistachios",
        category: "Dry Fruits",
        price: 799,
        oldPrice: 899,
        stock: 35,
        rating: 4.8,
        reviews: 87,
        image:
            "https://images.unsplash.com/photo-1536591375667-8d8c5d1e3e6e?auto=format&fit=crop&w=700&q=80",
    },
    {
        id: 5,
        name: "Cold Pressed Almond Oil",
        category: "Oils",
        price: 549,
        oldPrice: 649,
        stock: 19,
        rating: 4.6,
        reviews: 54,
        image:
            "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=80",
    },
    {
        id: 6,
        name: "Cold Pressed Mustard Oil",
        category: "Oils",
        price: 399,
        oldPrice: 499,
        stock: 6,
        rating: 4.7,
        reviews: 43,
        image:
            "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=80",
    },
    {
        id: 7,
        name: "Pure Desi Ghee",
        category: "Ghee",
        price: 899,
        oldPrice: 999,
        stock: 24,
        rating: 4.9,
        reviews: 145,
        image:
            "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=700&q=80",
    },
    {
        id: 8,
        name: "Premium Raisins",
        category: "Dry Fruits",
        price: 449,
        oldPrice: 549,
        stock: 0,
        rating: 4.5,
        reviews: 32,
        image:
            "https://images.unsplash.com/photo-1596591868231-05e0f7c5f5b7?auto=format&fit=crop&w=700&q=80",
    },
];

const currency = (value: number) =>
    `₹${value.toLocaleString("en-IN")}`;

const getStatus = (stock: number) => {
    if (stock === 0) return "Out of Stock";
    if (stock <= 10) return "Low Stock";
    return "In Stock";
};

const statusStyles = {
    "In Stock":
        "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    "Low Stock":
        "border-yellow-500/20 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
    "Out of Stock":
        "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400",
};

export default function Products() {
    const products = initialProducts;

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [showFilter, setShowFilter] = useState(false);
    const [viewMode, setViewMode] = useState<ViewMode>("table");

    const categories = [
        "All",
        "Dry Fruits",
        "Oils",
        "Ghee",
    ];

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch = product.name
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchesCategory =
                category === "All" ||
                product.category === category;

            return matchesSearch && matchesCategory;
        });
    }, [search, category]);

    const stats = useMemo(() => {
        return {
            total: products.length,
            inStock: products.filter(
                (p) => getStatus(p.stock) === "In Stock"
            ).length,
            lowStock: products.filter(
                (p) => getStatus(p.stock) === "Low Stock"
            ).length,
            outOfStock: products.filter(
                (p) => getStatus(p.stock) === "Out of Stock"
            ).length,
        };
    }, []);

    const getDiscount = (product: Product) =>
        product.oldPrice > 0
            ? Math.round(
                  ((product.oldPrice - product.price) /
                      product.oldPrice) *
                      100
              )
            : 0;

    const renderStatus = (stock: number) => {
        const status = getStatus(stock);

        return (
            <span
                className={
                    "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[9px] font-semibold " +
                    statusStyles[status]
                }
            >
                {status === "In Stock" ? (
                    <CheckCircle2 size={12} />
                ) : status === "Low Stock" ? (
                    <AlertTriangle size={12} />
                ) : (
                    <X size={12} />
                )}
                {status}
            </span>
        );
    };

    // Buttons are kept for UI only. Functionality is removed.
    const renderActions = () => (
        <div className="flex items-center gap-2">
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
    );

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#08090b] dark:text-white">
            <div className="mx-auto max-w-[1600px]">

                {/* HEADER */}
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
                            Products
                        </h1>

                        <p className="mt-2 text-[12px] text-gray-500 dark:text-gray-400">
                            Manage your dry fruits, oils, ghee and other products.
                        </p>
                    </div>

                    <Link
                        to="/admin/add-products"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-5 py-3 text-[12px] font-semibold text-white shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5"
                    >
                        <Plus size={19} />
                        Add Product
                    </Link>
                </div>

                {/* STATS */}
                <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {[
                        {
                            title: "Total Products",
                            value: stats.total,
                            subtitle: "All products",
                            icon: Package,
                            color: "text-orange-500 bg-orange-500/10",
                        },
                        {
                            title: "In Stock",
                            value: stats.inStock,
                            subtitle: "Good inventory",
                            icon: CheckCircle2,
                            color: "text-emerald-500 bg-emerald-500/10",
                        },
                        {
                            title: "Low Stock",
                            value: stats.lowStock,
                            subtitle: "Needs attention",
                            icon: AlertTriangle,
                            color: "text-yellow-500 bg-yellow-500/10",
                        },
                        {
                            title: "Out of Stock",
                            value: stats.outOfStock,
                            subtitle: "Restock required",
                            icon: ShoppingCart,
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

                {/* SEARCH / FILTER / VIEW */}
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
                                placeholder="Search products..."
                                className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-[12px] text-gray-900 outline-none placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                            />
                        </div>

                        <div className="flex gap-3">
                            <div className="relative flex-1 sm:flex-none">
                                <button
                                    type="button"
                                    onClick={() => setShowFilter(!showFilter)}
                                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-5 text-[12px] font-medium text-gray-700 hover:border-orange-300 hover:text-orange-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-300"
                                >
                                    <Filter size={17} />
                                    Filter
                                </button>

                                {showFilter && (
                                    <div className="absolute right-0 top-14 z-50 w-48 rounded-xl border border-gray-200 bg-white p-2 shadow-xl dark:border-white/10 dark:bg-[#11151d]">
                                        {categories.map((item) => (
                                            <button
                                                key={item}
                                                type="button"
                                                onClick={() => {
                                                    setCategory(item);
                                                    setShowFilter(false);
                                                }}
                                                className={
                                                    "w-full rounded-lg px-3 py-2.5 text-left text-[12px] " +
                                                    (
                                                        category === item
                                                            ? "bg-orange-500/10 text-orange-500"
                                                            : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
                                                    )
                                                }
                                            >
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* VIEW TOGGLE */}
                            <div className="flex h-12 rounded-xl border border-gray-200 bg-gray-50 p-1 dark:border-white/10 dark:bg-white/[0.03]">
                                <button
                                    type="button"
                                    onClick={() => setViewMode("card")}
                                    title="Card View"
                                    aria-label="Card View"
                                    aria-pressed={viewMode === "card"}
                                    className={
                                        "flex w-11 items-center justify-center rounded-lg transition-all " +
                                        (
                                            viewMode === "card"
                                                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
                                                : "text-gray-500 hover:text-orange-500 dark:text-gray-400"
                                        )
                                    }
                                >
                                    <Grid3X3 size={18} />
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setViewMode("table")}
                                    title="Table View"
                                    aria-label="Table View"
                                    aria-pressed={viewMode === "table"}
                                    className={
                                        "flex w-11 items-center justify-center rounded-lg transition-all " +
                                        (
                                            viewMode === "table"
                                                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
                                                : "text-gray-500 hover:text-orange-500 dark:text-gray-400"
                                        )
                                    }
                                >
                                    <List size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] text-gray-500 dark:text-gray-400">
                        <span>Category:</span>

                        <span className="rounded-full bg-orange-500/10 px-3 py-1 font-medium text-orange-500">
                            {category}
                        </span>

                        <span>• {filteredProducts.length} products</span>
                    </div>
                </div>

                {/* EMPTY STATE */}
                {filteredProducts.length === 0 ? (
                    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-5 text-center dark:border-white/10 dark:bg-[#0d1017]">
                        <Package size={30} className="text-orange-500" />

                        <h3 className="mt-5 text-[16px] font-bold">
                            No products found
                        </h3>

                        <p className="mt-2 text-[12px] text-gray-500">
                            Try changing your search or category filter.
                        </p>

                        <button
                            type="button"
                            onClick={() => {
                                setSearch("");
                                setCategory("All");
                            }}
                            className="mt-5 rounded-xl bg-orange-500 px-5 py-2.5 text-[12px] font-semibold text-white hover:bg-orange-600"
                        >
                            Clear Filters
                        </button>
                    </div>
                ) : viewMode === "card" ? (

                    /* CARD VIEW */
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-xl dark:border-white/10 dark:bg-[#0d1017] dark:hover:border-orange-500/30"
                            >
                                <div className="relative h-56 bg-gray-100 dark:bg-[#11151d]">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        onError={(e) => {
                                            e.currentTarget.style.opacity = "0";
                                        }}
                                    />

                                    <span className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-[10px] font-semibold text-white backdrop-blur-md">
                                        {product.category}
                                    </span>
                                </div>

                                <div className="p-5">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <h3 className="text-[16px] font-bold">
                                                {product.name}
                                            </h3>

                                            <div className="mt-2 flex items-center gap-1">
                                                <Star
                                                    size={14}
                                                    fill="currentColor"
                                                    className="text-yellow-500"
                                                />

                                                <span className="text-[12px]">
                                                    {product.rating}
                                                </span>

                                                <span className="text-[10px] text-gray-400">
                                                    ({product.reviews})
                                                </span>
                                            </div>
                                        </div>

                                        {renderStatus(product.stock)}
                                    </div>

                                    <div className="mt-5 flex items-end justify-between">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[18px] font-bold">
                                                    {currency(product.price)}
                                                </span>

                                                <span className="text-[12px] text-gray-400 line-through">
                                                    {currency(product.oldPrice)}
                                                </span>
                                            </div>

                                            <p className="mt-1 text-[10px] text-gray-500">
                                                {product.stock} units available
                                            </p>
                                        </div>

                                        <span className="rounded-lg bg-orange-500/10 px-2 py-1 text-[10px] font-semibold text-orange-500">
                                            {getDiscount(product)}% OFF
                                        </span>
                                    </div>

                                    <div className="mt-5 flex justify-end border-t border-gray-100 pt-4 dark:border-white/10">
                                        {renderActions()}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (

                    /* TABLE VIEW */
                    <div className="rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0d1017]">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[900px] border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/[0.025]">
                                        {[
                                            "Product",
                                            "Category",
                                            "Price",
                                            "Stock",
                                            "Rating",
                                            "Status",
                                            "Actions",
                                        ].map((heading) => (
                                            <th
                                                key={heading}
                                                className={
                                                    "px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 " +
                                                    (
                                                        heading === "Actions"
                                                            ? "text-right"
                                                            : "text-left"
                                                    )
                                                }
                                            >
                                                {heading}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredProducts.map((product) => (
                                        <tr
                                            key={product.id}
                                            className="border-b border-gray-100 transition-colors last:border-b-0 hover:bg-orange-50/50 dark:border-white/5 dark:hover:bg-orange-500/[0.03]"
                                        >
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-14 w-14 shrink-0 rounded-xl bg-gray-100 dark:bg-white/5">
                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                            className="h-full w-full rounded-xl object-cover"
                                                            onError={(e) => {
                                                                e.currentTarget.style.opacity =
                                                                    "0";
                                                            }}
                                                        />
                                                    </div>

                                                    <div>
                                                        <h3 className="text-[12px] font-semibold">
                                                            {product.name}
                                                        </h3>

                                                        <span className="text-[10px] text-gray-500">
                                                            ID: {product.id}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-5 py-4">
                                                <span className="rounded-lg bg-orange-500/10 px-3 py-1.5 text-[10px] font-medium text-orange-500">
                                                    {product.category}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                <p className="text-[12px] font-semibold">
                                                    {currency(product.price)}
                                                </p>

                                                <p className="text-[10px] text-gray-400 line-through">
                                                    {currency(product.oldPrice)}
                                                </p>
                                            </td>

                                            <td className="px-5 py-4">
                                                <p className="text-[12px] font-medium">
                                                    {product.stock}
                                                </p>

                                                <p className="text-[10px] text-gray-500">
                                                    units
                                                </p>
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-1">
                                                    <Star
                                                        size={15}
                                                        fill="currentColor"
                                                        className="text-yellow-500"
                                                    />

                                                    <span className="text-[12px]">
                                                        {product.rating}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="px-5 py-4">
                                                {renderStatus(product.stock)}
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="flex justify-end">
                                                    {renderActions()}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="border-t border-gray-200 px-5 py-4 text-[12px] text-gray-500 dark:border-white/10">
                            Showing {filteredProducts.length} of{" "}
                            {products.length} products
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}