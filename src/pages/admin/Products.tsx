// import { useMemo, useState } from "react";
// import { Link } from "react-router-dom";

// import {
//     Search,
//     Plus,
//     Filter,
//     Edit,
//     Trash2,
//     Eye,
//     Star,
//     Package,
//     ShoppingCart,
//     AlertTriangle,
//     CheckCircle2,
//     X,
//     Grid3X3,
//     List,
// } from "lucide-react";

// interface Product {
//     id: number;
//     name: string;
//     category: string;
//     price: number;
//     oldPrice: number;
//     stock: number;
//     rating: number;
//     reviews: number;
//     image: string;
// }

// type ViewMode = "card" | "table";

// const initialProducts: Product[] = [
//     {
//         id: 1,
//         name: "Premium Almonds",
//         category: "Dry Fruits",
//         price: 699,
//         oldPrice: 799,
//         stock: 42,
//         rating: 4.8,
//         reviews: 124,
//         image:
//             "https://images.unsplash.com/photo-1508061253366-f7da1c4d5e3f?auto=format&fit=crop&w=700&q=80",
//     },
//     {
//         id: 2,
//         name: "Premium Cashews",
//         category: "Dry Fruits",
//         price: 749,
//         oldPrice: 849,
//         stock: 28,
//         rating: 4.9,
//         reviews: 98,
//         image:
//             "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?auto=format&fit=crop&w=700&q=80",
//     },
//     {
//         id: 3,
//         name: "Kashmiri Walnuts",
//         category: "Dry Fruits",
//         price: 899,
//         oldPrice: 999,
//         stock: 8,
//         rating: 4.7,
//         reviews: 76,
//         image:
//             "https://images.unsplash.com/photo-1608797178974-15b35a64ede9?auto=format&fit=crop&w=700&q=80",
//     },
//     {
//         id: 4,
//         name: "Premium Pistachios",
//         category: "Dry Fruits",
//         price: 799,
//         oldPrice: 899,
//         stock: 35,
//         rating: 4.8,
//         reviews: 87,
//         image:
//             "https://images.unsplash.com/photo-1536591375667-8d8c5d1e3e6e?auto=format&fit=crop&w=700&q=80",
//     },
//     {
//         id: 5,
//         name: "Cold Pressed Almond Oil",
//         category: "Oils",
//         price: 549,
//         oldPrice: 649,
//         stock: 19,
//         rating: 4.6,
//         reviews: 54,
//         image:
//             "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=80",
//     },
//     {
//         id: 6,
//         name: "Cold Pressed Mustard Oil",
//         category: "Oils",
//         price: 399,
//         oldPrice: 499,
//         stock: 6,
//         rating: 4.7,
//         reviews: 43,
//         image:
//             "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=80",
//     },
//     {
//         id: 7,
//         name: "Pure Desi Ghee",
//         category: "Ghee",
//         price: 899,
//         oldPrice: 999,
//         stock: 24,
//         rating: 4.9,
//         reviews: 145,
//         image:
//             "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=700&q=80",
//     },
//     {
//         id: 8,
//         name: "Premium Raisins",
//         category: "Dry Fruits",
//         price: 449,
//         oldPrice: 549,
//         stock: 0,
//         rating: 4.5,
//         reviews: 32,
//         image:
//             "https://images.unsplash.com/photo-1596591868231-05e0f7c5f5b7?auto=format&fit=crop&w=700&q=80",
//     },
// ];

// const currency = (value: number) =>
//     `₹${value.toLocaleString("en-IN")}`;

// const getStatus = (stock: number) => {
//     if (stock === 0) return "Out of Stock";
//     if (stock <= 10) return "Low Stock";
//     return "In Stock";
// };

// const statusStyles = {
//     "In Stock":
//         "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
//     "Low Stock":
//         "border-yellow-500/20 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
//     "Out of Stock":
//         "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400",
// };

// export default function Products() {
//     const products = initialProducts;

//     const [search, setSearch] = useState("");
//     const [category, setCategory] = useState("All");
//     const [showFilter, setShowFilter] = useState(false);
//     const [viewMode, setViewMode] = useState<ViewMode>("table");

//     const categories = [
//         "All",
//         "Dry Fruits",
//         "Oils",
//         "Ghee",
//     ];

//     const filteredProducts = useMemo(() => {
//         return products.filter((product) => {
//             const matchesSearch = product.name
//                 .toLowerCase()
//                 .includes(search.toLowerCase());

//             const matchesCategory =
//                 category === "All" ||
//                 product.category === category;

//             return matchesSearch && matchesCategory;
//         });
//     }, [search, category]);

//     const stats = useMemo(() => {
//         return {
//             total: products.length,
//             inStock: products.filter(
//                 (p) => getStatus(p.stock) === "In Stock"
//             ).length,
//             lowStock: products.filter(
//                 (p) => getStatus(p.stock) === "Low Stock"
//             ).length,
//             outOfStock: products.filter(
//                 (p) => getStatus(p.stock) === "Out of Stock"
//             ).length,
//         };
//     }, []);

//     const getDiscount = (product: Product) =>
//         product.oldPrice > 0
//             ? Math.round(
//                   ((product.oldPrice - product.price) /
//                       product.oldPrice) *
//                       100
//               )
//             : 0;

//     const renderStatus = (stock: number) => {
//         const status = getStatus(stock);

//         return (
//             <span
//                 className={
//                     "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[9px] font-semibold " +
//                     statusStyles[status]
//                 }
//             >
//                 {status === "In Stock" ? (
//                     <CheckCircle2 size={12} />
//                 ) : status === "Low Stock" ? (
//                     <AlertTriangle size={12} />
//                 ) : (
//                     <X size={12} />
//                 )}
//                 {status}
//             </span>
//         );
//     };

//     // Buttons are kept for UI only. Functionality is removed.
//     const renderActions = () => (
//         <div className="flex items-center gap-2">
//             <button
//                 type="button"
//                 title="View"
//                 className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:border-orange-300 hover:text-orange-500 dark:border-white/10 dark:text-gray-400"
//             >
//                 <Eye size={16} />
//             </button>

//             <button
//                 type="button"
//                 title="Edit"
//                 className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500 transition-colors hover:bg-orange-500 hover:text-white"
//             >
//                 <Edit size={16} />
//             </button>

//             <button
//                 type="button"
//                 title="Delete"
//                 className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 text-red-500 transition-colors hover:bg-red-500 hover:text-white"
//             >
//                 <Trash2 size={16} />
//             </button>
//         </div>
//     );

//     return (
//         <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#08090b] dark:text-white">
//             <div className="mx-auto max-w-[1600px]">

//                 {/* HEADER */}
//                 <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
//                     <div>
//                         <div className="mb-2 flex items-center gap-2">
//                             <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
//                                 <Package size={19} />
//                             </div>

//                             <span className="text-[12px] font-semibold text-orange-500">
//                                 Store Management
//                             </span>
//                         </div>

//                         <h1 className="text-[28px] font-bold tracking-tight sm:text-[34px]">
//                             Products
//                         </h1>

//                         <p className="mt-2 text-[12px] text-gray-500 dark:text-gray-400">
//                             Manage your dry fruits, oils, ghee and other products.
//                         </p>
//                     </div>

//                     <Link
//                         to="/admin/add-products"
//                         className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-5 py-3 text-[12px] font-semibold text-white shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5"
//                     >
//                         <Plus size={19} />
//                         Add Product
//                     </Link>
//                 </div>

//                 {/* STATS */}
//                 <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//                     {[
//                         {
//                             title: "Total Products",
//                             value: stats.total,
//                             subtitle: "All products",
//                             icon: Package,
//                             color: "text-orange-500 bg-orange-500/10",
//                         },
//                         {
//                             title: "In Stock",
//                             value: stats.inStock,
//                             subtitle: "Good inventory",
//                             icon: CheckCircle2,
//                             color: "text-emerald-500 bg-emerald-500/10",
//                         },
//                         {
//                             title: "Low Stock",
//                             value: stats.lowStock,
//                             subtitle: "Needs attention",
//                             icon: AlertTriangle,
//                             color: "text-yellow-500 bg-yellow-500/10",
//                         },
//                         {
//                             title: "Out of Stock",
//                             value: stats.outOfStock,
//                             subtitle: "Restock required",
//                             icon: ShoppingCart,
//                             color: "text-red-500 bg-red-500/10",
//                         },
//                     ].map((item) => {
//                         const Icon = item.icon;

//                         return (
//                             <div
//                                 key={item.title}
//                                 className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-[#0d1017]"
//                             >
//                                 <div className="flex items-center justify-between">
//                                     <div>
//                                         <p className="text-[12px] text-gray-500 dark:text-gray-400">
//                                             {item.title}
//                                         </p>

//                                         <h2 className="mt-2 text-[22px] font-bold">
//                                             {item.value}
//                                         </h2>

//                                         <p className="mt-1 text-[10px] text-gray-500">
//                                             {item.subtitle}
//                                         </p>
//                                     </div>

//                                     <div
//                                         className={
//                                             "flex h-12 w-12 items-center justify-center rounded-xl " +
//                                             item.color
//                                         }
//                                     >
//                                         <Icon size={22} />
//                                     </div>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>

//                 {/* SEARCH / FILTER / VIEW */}
//                 <div className="mb-7 rounded-2xl border border-gray-200 bg-white p-4 dark:border-white/10 dark:bg-[#0d1017]">
//                     <div className="flex flex-col gap-3 xl:flex-row">
//                         <div className="relative flex-1">
//                             <Search
//                                 size={19}
//                                 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//                             />

//                             <input
//                                 type="text"
//                                 value={search}
//                                 onChange={(e) => setSearch(e.target.value)}
//                                 placeholder="Search products..."
//                                 className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-[12px] text-gray-900 outline-none placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
//                             />
//                         </div>

//                         <div className="flex gap-3">
//                             <div className="relative flex-1 sm:flex-none">
//                                 <button
//                                     type="button"
//                                     onClick={() => setShowFilter(!showFilter)}
//                                     className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-5 text-[12px] font-medium text-gray-700 hover:border-orange-300 hover:text-orange-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-300"
//                                 >
//                                     <Filter size={17} />
//                                     Filter
//                                 </button>

//                                 {showFilter && (
//                                     <div className="absolute right-0 top-14 z-50 w-48 rounded-xl border border-gray-200 bg-white p-2 shadow-xl dark:border-white/10 dark:bg-[#11151d]">
//                                         {categories.map((item) => (
//                                             <button
//                                                 key={item}
//                                                 type="button"
//                                                 onClick={() => {
//                                                     setCategory(item);
//                                                     setShowFilter(false);
//                                                 }}
//                                                 className={
//                                                     "w-full rounded-lg px-3 py-2.5 text-left text-[12px] " +
//                                                     (
//                                                         category === item
//                                                             ? "bg-orange-500/10 text-orange-500"
//                                                             : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
//                                                     )
//                                                 }
//                                             >
//                                                 {item}
//                                             </button>
//                                         ))}
//                                     </div>
//                                 )}
//                             </div>

//                             {/* VIEW TOGGLE */}
//                             <div className="flex h-12 rounded-xl border border-gray-200 bg-gray-50 p-1 dark:border-white/10 dark:bg-white/[0.03]">
//                                 <button
//                                     type="button"
//                                     onClick={() => setViewMode("card")}
//                                     title="Card View"
//                                     aria-label="Card View"
//                                     aria-pressed={viewMode === "card"}
//                                     className={
//                                         "flex w-11 items-center justify-center rounded-lg transition-all " +
//                                         (
//                                             viewMode === "card"
//                                                 ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
//                                                 : "text-gray-500 hover:text-orange-500 dark:text-gray-400"
//                                         )
//                                     }
//                                 >
//                                     <Grid3X3 size={18} />
//                                 </button>

//                                 <button
//                                     type="button"
//                                     onClick={() => setViewMode("table")}
//                                     title="Table View"
//                                     aria-label="Table View"
//                                     aria-pressed={viewMode === "table"}
//                                     className={
//                                         "flex w-11 items-center justify-center rounded-lg transition-all " +
//                                         (
//                                             viewMode === "table"
//                                                 ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
//                                                 : "text-gray-500 hover:text-orange-500 dark:text-gray-400"
//                                         )
//                                     }
//                                 >
//                                     <List size={18} />
//                                 </button>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] text-gray-500 dark:text-gray-400">
//                         <span>Category:</span>

//                         <span className="rounded-full bg-orange-500/10 px-3 py-1 font-medium text-orange-500">
//                             {category}
//                         </span>

//                         <span>• {filteredProducts.length} products</span>
//                     </div>
//                 </div>

//                 {/* EMPTY STATE */}
//                 {filteredProducts.length === 0 ? (
//                     <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-5 text-center dark:border-white/10 dark:bg-[#0d1017]">
//                         <Package size={30} className="text-orange-500" />

//                         <h3 className="mt-5 text-[16px] font-bold">
//                             No products found
//                         </h3>

//                         <p className="mt-2 text-[12px] text-gray-500">
//                             Try changing your search or category filter.
//                         </p>

//                         <button
//                             type="button"
//                             onClick={() => {
//                                 setSearch("");
//                                 setCategory("All");
//                             }}
//                             className="mt-5 rounded-xl bg-orange-500 px-5 py-2.5 text-[12px] font-semibold text-white hover:bg-orange-600"
//                         >
//                             Clear Filters
//                         </button>
//                     </div>
//                 ) : viewMode === "card" ? (

//                     /* CARD VIEW */
//                     <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
//                         {filteredProducts.map((product) => (
//                             <div
//                                 key={product.id}
//                                 className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-xl dark:border-white/10 dark:bg-[#0d1017] dark:hover:border-orange-500/30"
//                             >
//                                 <div className="relative h-56 bg-gray-100 dark:bg-[#11151d]">
//                                     <img
//                                         src={product.image}
//                                         alt={product.name}
//                                         className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//                                         onError={(e) => {
//                                             e.currentTarget.style.opacity = "0";
//                                         }}
//                                     />

//                                     <span className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-[10px] font-semibold text-white backdrop-blur-md">
//                                         {product.category}
//                                     </span>
//                                 </div>

//                                 <div className="p-5">
//                                     <div className="flex items-start justify-between gap-2">
//                                         <div>
//                                             <h3 className="text-[16px] font-bold">
//                                                 {product.name}
//                                             </h3>

//                                             <div className="mt-2 flex items-center gap-1">
//                                                 <Star
//                                                     size={14}
//                                                     fill="currentColor"
//                                                     className="text-yellow-500"
//                                                 />

//                                                 <span className="text-[12px]">
//                                                     {product.rating}
//                                                 </span>

//                                                 <span className="text-[10px] text-gray-400">
//                                                     ({product.reviews})
//                                                 </span>
//                                             </div>
//                                         </div>

//                                         {renderStatus(product.stock)}
//                                     </div>

//                                     <div className="mt-5 flex items-end justify-between">
//                                         <div>
//                                             <div className="flex items-center gap-2">
//                                                 <span className="text-[18px] font-bold">
//                                                     {currency(product.price)}
//                                                 </span>

//                                                 <span className="text-[12px] text-gray-400 line-through">
//                                                     {currency(product.oldPrice)}
//                                                 </span>
//                                             </div>

//                                             <p className="mt-1 text-[10px] text-gray-500">
//                                                 {product.stock} units available
//                                             </p>
//                                         </div>

//                                         <span className="rounded-lg bg-orange-500/10 px-2 py-1 text-[10px] font-semibold text-orange-500">
//                                             {getDiscount(product)}% OFF
//                                         </span>
//                                     </div>

//                                     <div className="mt-5 flex justify-end border-t border-gray-100 pt-4 dark:border-white/10">
//                                         {renderActions()}
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 ) : (

//                     /* TABLE VIEW */
//                     <div className="rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0d1017]">
//                         <div className="overflow-x-auto">
//                             <table className="w-full min-w-[900px] border-collapse">
//                                 <thead>
//                                     <tr className="border-b border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/[0.025]">
//                                         {[
//                                             "Product",
//                                             "Category",
//                                             "Price",
//                                             "Stock",
//                                             "Rating",
//                                             "Status",
//                                             "Actions",
//                                         ].map((heading) => (
//                                             <th
//                                                 key={heading}
//                                                 className={
//                                                     "px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 " +
//                                                     (
//                                                         heading === "Actions"
//                                                             ? "text-right"
//                                                             : "text-left"
//                                                     )
//                                                 }
//                                             >
//                                                 {heading}
//                                             </th>
//                                         ))}
//                                     </tr>
//                                 </thead>

//                                 <tbody>
//                                     {filteredProducts.map((product) => (
//                                         <tr
//                                             key={product.id}
//                                             className="border-b border-gray-100 transition-colors last:border-b-0 hover:bg-orange-50/50 dark:border-white/5 dark:hover:bg-orange-500/[0.03]"
//                                         >
//                                             <td className="px-5 py-4">
//                                                 <div className="flex items-center gap-4">
//                                                     <div className="h-14 w-14 shrink-0 rounded-xl bg-gray-100 dark:bg-white/5">
//                                                         <img
//                                                             src={product.image}
//                                                             alt={product.name}
//                                                             className="h-full w-full rounded-xl object-cover"
//                                                             onError={(e) => {
//                                                                 e.currentTarget.style.opacity =
//                                                                     "0";
//                                                             }}
//                                                         />
//                                                     </div>

//                                                     <div>
//                                                         <h3 className="text-[12px] font-semibold">
//                                                             {product.name}
//                                                         </h3>

//                                                         <span className="text-[10px] text-gray-500">
//                                                             ID: {product.id}
//                                                         </span>
//                                                     </div>
//                                                 </div>
//                                             </td>

//                                             <td className="px-5 py-4">
//                                                 <span className="rounded-lg bg-orange-500/10 px-3 py-1.5 text-[10px] font-medium text-orange-500">
//                                                     {product.category}
//                                                 </span>
//                                             </td>

//                                             <td className="px-5 py-4">
//                                                 <p className="text-[12px] font-semibold">
//                                                     {currency(product.price)}
//                                                 </p>

//                                                 <p className="text-[10px] text-gray-400 line-through">
//                                                     {currency(product.oldPrice)}
//                                                 </p>
//                                             </td>

//                                             <td className="px-5 py-4">
//                                                 <p className="text-[12px] font-medium">
//                                                     {product.stock}
//                                                 </p>

//                                                 <p className="text-[10px] text-gray-500">
//                                                     units
//                                                 </p>
//                                             </td>

//                                             <td className="px-5 py-4">
//                                                 <div className="flex items-center gap-1">
//                                                     <Star
//                                                         size={15}
//                                                         fill="currentColor"
//                                                         className="text-yellow-500"
//                                                     />

//                                                     <span className="text-[12px]">
//                                                         {product.rating}
//                                                     </span>
//                                                 </div>
//                                             </td>

//                                             <td className="px-5 py-4">
//                                                 {renderStatus(product.stock)}
//                                             </td>

//                                             <td className="px-5 py-4">
//                                                 <div className="flex justify-end">
//                                                     {renderActions()}
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>

//                         <div className="border-t border-gray-200 px-5 py-4 text-[12px] text-gray-500 dark:border-white/10">
//                             Showing {filteredProducts.length} of{" "}
//                             {products.length} products
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }



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
  ShoppingCart,
  AlertTriangle,
  CheckCircle2,
  X,
  Grid3X3,
  List,
  Star,
  ImageOff,
  RefreshCw,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  getAllProducts,
  getProductById,
  deleteProduct,
} from "@/services/ProductsService";

interface Product {
  id: string | number;
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  stock: number;
  lowStockAlert: number;
  rating?: number | null;
  reviews?: number | null;
  image: string;
  description: string;
  brand: string;
  sku: string;
  status: string;
  netWeight?: number | string;
  unit?: string;
  countryOfOrigin?: string;
  packagingType?: string;
  ingredients?: string;
  featured?: boolean;
  images: string[];
}

type ViewMode = "card" | "table";
type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";

const currency = (value: number) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

const getStatus = (stock: number): StockStatus => {
  if (stock <= 0) return "Out of Stock";
  if (stock <= 10) return "Low Stock";
  return "In Stock";
};

const statusStyles: Record<StockStatus, string> = {
  "In Stock":
    "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "Low Stock":
    "border-yellow-500/20 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  "Out of Stock":
    "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400",
};

const unwrapResponse = (response: any): any => {
  let result = response?.data ?? response;

  if (result?.data !== undefined) result = result.data;

  return result;
};

const unwrapProducts = (response: any): any[] => {
  const result = unwrapResponse(response);

  if (Array.isArray(result)) return result;
  if (Array.isArray(result?.content)) return result.content;
  if (Array.isArray(result?.products)) return result.products;
  if (Array.isArray(result?.items)) return result.items;

  return [];
};

const getImageUrl = (image?: string) => {
  if (!image) return "";

  if (/^(https?:\/\/|data:|blob:)/i.test(image)) {
    return image;
  }

  const baseUrl =
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:8083/api/v1";

  const origin = baseUrl
    .replace(/\/api\/v1\/?$/, "")
    .replace(/\/$/, "");

  return `${origin}${image.startsWith("/") ? "" : "/"}${image}`;
};

const mapProduct = (item: any): Product => {
  const images: string[] = Array.isArray(item.images)
    ? item.images
        .map((image: any) =>
          typeof image === "string"
            ? image
            : image?.imageUrl ?? image?.url ?? ""
        )
        .filter(Boolean)
    : [];

  const ratingValue = item.rating ?? item.averageRating ?? null;
  const reviewsValue = item.reviews ?? item.reviewCount ?? null;

  return {
    id: item.id,
    name: item.productName ?? item.name ?? "Unnamed Product",
    category:
      item.category?.name ??
      item.category?.categoryName ??
      item.categoryName ??
      item.subCategory?.name ??
      "Uncategorized",
    price: Number(item.sellingPrice ?? item.price ?? 0),
    oldPrice: Number(item.mrp ?? item.oldPrice ?? 0),
    stock: Number(item.stockQuantity ?? item.stock ?? 0),
    lowStockAlert: Number(item.lowStockAlert ?? 10),
    rating:
      ratingValue !== null && ratingValue !== undefined &&
      ratingValue !== ""
        ? Number(ratingValue)
        : null,
    reviews:
      reviewsValue !== null && reviewsValue !== undefined &&
      reviewsValue !== ""
        ? Number(reviewsValue)
        : null,
    image: getImageUrl(images[0] ?? item.image ?? ""),
    images,
    description:
      item.fullDescription ?? item.shortDescription ?? item.description ?? "",
    brand: item.brand ?? "",
    sku: item.sku ?? "",
    status: item.status ?? "ACTIVE",
    netWeight: item.netWeight,
    unit: item.unit,
    countryOfOrigin: item.countryOfOrigin,
    packagingType: item.packagingType,
    ingredients: item.ingredients,
    featured: item.featured,
  };
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showFilter, setShowFilter] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("table");

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);
  const [viewLoading, setViewLoading] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] =
    useState<Product | null>(null);
  const [deletingId, setDeletingId] =
    useState<string | number | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllProducts();
      const data = unwrapProducts(response);

      setProducts(data.map(mapProduct));
    } catch (err: any) {
      console.error("Failed to fetch products:", err);
      setError(
        err?.response?.data?.message ||
          "Failed to load products. Please try again."
      );
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(products.map((product) => product.category))
      ).sort(),
    ],
    [products]
  );

  const filteredProducts = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchValue) ||
        product.category.toLowerCase().includes(searchValue) ||
        String(product.id).toLowerCase().includes(searchValue) ||
        product.brand.toLowerCase().includes(searchValue) ||
        product.sku.toLowerCase().includes(searchValue);

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  const stats = useMemo(
    () => ({
      total: products.length,
      inStock: products.filter(
        (product) => getStatus(product.stock) === "In Stock"
      ).length,
      lowStock: products.filter(
        (product) => getStatus(product.stock) === "Low Stock"
      ).length,
      outOfStock: products.filter(
        (product) => getStatus(product.stock) === "Out of Stock"
      ).length,
    }),
    [products]
  );

  const getDiscount = (product: Product) =>
    product.oldPrice > product.price && product.oldPrice > 0
      ? Math.round(
          ((product.oldPrice - product.price) / product.oldPrice) * 100
        )
      : 0;

  const renderStatus = (stock: number) => {
    const status = getStatus(stock);

    return (
      <span
        className={
          "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[12px] font-semibold " +
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

  const renderRating = (product: Product) => (
    <div className="flex min-h-5 items-center gap-1">
      {product.rating !== null &&
      product.rating !== undefined &&
      Number.isFinite(product.rating) ? (
        <>
          <Star
            size={14}
            fill="currentColor"
            className="text-yellow-500"
          />
          <span className="text-[12px]">{product.rating}</span>
          {product.reviews !== null &&
            product.reviews !== undefined && (
              <span className="text-[12px] text-gray-400">
                ({product.reviews})
              </span>
            )}
        </>
      ) : null}
    </div>
  );

  const renderImage = (
    product: Product,
    className: string
  ) => (
    <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-[#11151d]">
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          className={className}
          onError={(event) => {
            event.currentTarget.style.display = "none";
            const placeholder =
              event.currentTarget.nextElementSibling as HTMLElement | null;
            if (placeholder) placeholder.style.display = "flex";
          }}
        />
      ) : null}

      <div
        className="h-full w-full items-center justify-center text-gray-400"
        style={{ display: product.image ? "none" : "flex" }}
      >
        <ImageOff size={24} />
      </div>
    </div>
  );

  const handleView = async (product: Product) => {
    setViewLoading(true);
    setSelectedProduct(product);

    try {
      const response = await getProductById(String(product.id));
      const item = unwrapResponse(response);

      if (item && typeof item === "object" && item.id !== undefined) {
        setSelectedProduct(mapProduct(item));
      }
    } catch (err) {
      console.error("Failed to load product details:", err);
      toast.error("Could not load the latest product details");
    } finally {
      setViewLoading(false);
    }
  };

  const handleDelete = (product: Product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    const id = productToDelete.id;

    try {
      setDeletingId(id);

      await deleteProduct(String(id));

      setProducts((previous) =>
        previous.filter((product) => String(product.id) !== String(id))
      );

      setShowDeleteModal(false);
      setProductToDelete(null);

      if (
        selectedProduct &&
        String(selectedProduct.id) === String(id)
      ) {
        setSelectedProduct(null);
      }

      toast.success("Product deleted successfully");
    } catch (err: any) {
      console.error("Failed to delete product:", err);
      toast.error(
        err?.response?.data?.message || "Failed to delete product"
      );
    } finally {
      setDeletingId(null);
    }
  };

  const renderActions = (product: Product) => (
    <div className="flex items-center gap-2">
      <button
        type="button"
        title="View"
        onClick={() => handleView(product)}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:border-orange-300 hover:text-orange-500 dark:border-white/10 dark:text-gray-400"
      >
        <Eye size={16} />
      </button>

      <Link
        to={`/admin/add-products/${product.id}`}
        title="Edit"
        className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500 transition-colors hover:bg-orange-500 hover:text-white"
      >
        <Edit size={16} />
      </Link>

      <button
        type="button"
        title="Delete"
        disabled={deletingId === product.id}
        onClick={() => handleDelete(product)}
        className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 text-red-500 transition-colors hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {deletingId === product.id ? (
          <RefreshCw size={16} className="animate-spin" />
        ) : (
          <Trash2 size={16} />
        )}
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

          <div className="flex gap-3">
            <button
              type="button"
              onClick={fetchProducts}
              disabled={loading}
              title="Refresh products"
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 hover:text-orange-500 disabled:opacity-50 dark:border-white/10 dark:bg-[#0d1017]"
            >
              <RefreshCw
                size={18}
                className={loading ? "animate-spin" : ""}
              />
            </button>

            <Link
              to="/admin/add-products"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-5 py-3 text-[12px] font-semibold text-white shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5"
            >
              <Plus size={19} />
              Add Product
            </Link>
          </div>
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
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}
                  >
                    <Icon size={22} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {error && (
          <div className="mb-5 flex items-center justify-between rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-[12px] text-red-500">
            {error}
            <button type="button" onClick={() => setError("")}>
              <X size={18} />
            </button>
          </div>
        )}

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
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products..."
                className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-[12px] text-gray-900 outline-none placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
              />
            </div>

            <div className="flex gap-3">
              <div className="relative flex-1 sm:flex-none">
                <button
                  type="button"
                  onClick={() => setShowFilter((previous) => !previous)}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-5 text-[12px] font-medium text-gray-700 hover:border-orange-300 hover:text-orange-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-300"
                >
                  <Filter size={17} />
                  Filter
                </button>

                {showFilter && (
                  <div className="absolute right-0 top-14 z-50 max-h-64 w-48 overflow-y-auto rounded-xl border border-gray-200 bg-white p-2 shadow-xl dark:border-white/10 dark:bg-[#11151d]">
                    {categories.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          setCategory(item);
                          setShowFilter(false);
                        }}
                        className={`w-full rounded-lg px-3 py-2.5 text-left text-[12px] ${
                          category === item
                            ? "bg-orange-500/10 text-orange-500"
                            : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex h-12 rounded-xl border border-gray-200 bg-gray-50 p-1 dark:border-white/10 dark:bg-white/[0.03]">
                <button
                  type="button"
                  onClick={() => setViewMode("card")}
                  title="Card View"
                  aria-label="Card View"
                  aria-pressed={viewMode === "card"}
                  className={`flex w-11 items-center justify-center rounded-lg transition-all ${
                    viewMode === "card"
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
                      : "text-gray-500 hover:text-orange-500 dark:text-gray-400"
                  }`}
                >
                  <Grid3X3 size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode("table")}
                  title="Table View"
                  aria-label="Table View"
                  aria-pressed={viewMode === "table"}
                  className={`flex w-11 items-center justify-center rounded-lg transition-all ${
                    viewMode === "table"
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
                      : "text-gray-500 hover:text-orange-500 dark:text-gray-400"
                  }`}
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

        {/* PRODUCT LIST */}
        {loading ? (
          <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0d1017]">
            <RefreshCw size={30} className="animate-spin text-orange-500" />
            <p className="mt-4 text-[12px] text-gray-500">
              Loading products...
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-5 text-center dark:border-white/10 dark:bg-[#0d1017]">
            <Package size={30} className="text-orange-500" />
            <h3 className="mt-5 text-[16px] font-bold">
              No products found
            </h3>
            <p className="mt-2 text-[12px] text-gray-500">
              {products.length === 0
                ? "No products available. Add your first product."
                : "Try changing your search or category filter."}
            </p>

            {products.length === 0 ? (
              <Link
                to="/admin/add-products"
                className="mt-5 rounded-xl bg-orange-500 px-5 py-2.5 text-[12px] font-semibold text-white hover:bg-orange-600"
              >
                Add Product
              </Link>
            ) : (
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
            )}
          </div>
        ) : viewMode === "card" ? (
          /* CARD VIEW */
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-xl dark:border-white/10 dark:bg-[#0d1017] dark:hover:border-orange-500/30"
              >
                <div className="relative h-56 rounded-t-2xl bg-gray-100 dark:bg-[#11151d]">
                  {renderImage(
                    product,
                    "h-full w-full rounded-t-2xl object-cover transition-transform duration-500 group-hover:scale-105"
                  )}
                  <span className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-[10px] font-semibold text-white backdrop-blur-md">
                    {product.category}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-[14px] font-bold">
                        {product.name}
                      </h3>
                      <div className="mt-2">
                        {renderRating(product)}
                      </div>
                    </div>
                    {renderStatus(product.stock)}
                  </div>

                  <div className="mt-5 flex items-end justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[16px] font-bold">
                          {currency(product.price)}
                        </span>
                        {product.oldPrice > product.price && (
                          <span className="text-[12px] text-gray-400 line-through">
                            {currency(product.oldPrice)}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-[12px] text-gray-500">
                        {product.stock} units available
                      </p>
                    </div>

                    {getDiscount(product) > 0 && (
                      <span className="rounded-lg bg-orange-500/10 px-2 py-1 text-[10px] font-semibold text-orange-500">
                        {getDiscount(product)}% OFF
                      </span>
                    )}
                  </div>

                  <div className="mt-5 flex justify-end border-t border-gray-100 pt-4 dark:border-white/10">
                    {renderActions(product)}
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
                        className={`px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 ${
                          heading === "Actions" ? "text-right" : "text-left"
                        }`}
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
                          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-white/5">
                            {renderImage(
                              product,
                              "h-full w-full rounded-xl object-cover"
                            )}
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
                        {product.oldPrice > product.price && (
                          <p className="text-[10px] text-gray-400 line-through">
                            {currency(product.oldPrice)}
                          </p>
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-[12px] font-medium">
                          {product.stock}
                        </p>
                        <p className="text-[10px] text-gray-500">units</p>
                      </td>

                      <td className="px-5 py-4">
                        {renderRating(product)}
                      </td>

                      <td className="px-5 py-4">
                        {renderStatus(product.stock)}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end">
                          {renderActions(product)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t border-gray-200 px-5 py-4 text-[12px] text-gray-500 dark:border-white/10">
              Showing {filteredProducts.length} of {products.length} products
            </div>
          </div>
        )}
      </div>

      {/* VIEW PRODUCT MODAL */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="view-product-title"
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl dark:border-white/10 dark:bg-[#0d1017]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                  <Package size={20} />
                </div>
                <div>
                  <h2 id="view-product-title" className="text-[16px] font-bold">
                    Product Details
                  </h2>
                  <p className="text-[11px] text-gray-500">
                    ID: {selectedProduct.id}
                  </p>
                </div>
              </div>

              <button
                type="button"
                aria-label="Close product details"
                onClick={() => setSelectedProduct(null)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10"
              >
                <X size={18} />
              </button>
            </div>

            {viewLoading ? (
              <div className="flex min-h-40 items-center justify-center">
                <RefreshCw size={28} className="animate-spin text-orange-500" />
              </div>
            ) : (
              <>
                <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-[160px_1fr]">
                  <div className="h-40 overflow-hidden rounded-xl bg-gray-100 dark:bg-white/5">
                    {renderImage(
                      selectedProduct,
                      "h-full w-full rounded-xl object-cover"
                    )}
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-[18px] font-bold">
                      {selectedProduct.name}
                    </h3>
                    <p className="text-[12px] text-gray-500">
                      {selectedProduct.category}
                    </p>
                    {renderRating(selectedProduct)}
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-[18px] font-bold">
                        {currency(selectedProduct.price)}
                      </span>
                      {selectedProduct.oldPrice > selectedProduct.price && (
                        <span className="text-[12px] text-gray-400 line-through">
                          {currency(selectedProduct.oldPrice)}
                        </span>
                      )}
                    </div>
                    {renderStatus(selectedProduct.stock)}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 rounded-xl border border-gray-200 p-4 text-[12px] dark:border-white/10 sm:grid-cols-2">
                  {[
                    ["Brand", selectedProduct.brand],
                    ["SKU", selectedProduct.sku],
                    ["Stock Quantity", selectedProduct.stock],
                    ["Low Stock Alert", selectedProduct.lowStockAlert],
                    ["Net Weight", selectedProduct.netWeight],
                    ["Unit", selectedProduct.unit],
                    ["Packaging Type", selectedProduct.packagingType],
                    ["Country of Origin", selectedProduct.countryOfOrigin],
                    [
                      "Featured",
                      selectedProduct.featured === undefined
                        ? undefined
                        : selectedProduct.featured
                          ? "Yes"
                          : "No",
                    ],
                  ].map(([label, value]) => (
                    <div key={String(label)}>
                      <p className="text-gray-500">{label}</p>
                      <p className="mt-1 font-semibold">
                        {value === undefined || value === null || value === ""
                          ? "—"
                          : String(value)}
                      </p>
                    </div>
                  ))}

                  <div>
                    <p className="text-gray-500">Status</p>
                    <p className="mt-1 font-semibold">
                      {selectedProduct.status || "—"}
                    </p>
                  </div>

                  <div className="sm:col-span-2">
                    <p className="text-gray-500">Description</p>
                    <p className="mt-1 whitespace-pre-wrap">
                      {selectedProduct.description || "—"}
                    </p>
                  </div>

                  <div className="sm:col-span-2">
                    <p className="text-gray-500">Ingredients</p>
                    <p className="mt-1 whitespace-pre-wrap">
                      {selectedProduct.ingredients || "—"}
                    </p>
                  </div>
                </div>

                {selectedProduct.images.length > 0 && (
                  <div className="mt-5">
                    <p className="mb-3 text-[12px] font-semibold">
                      Product Images
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {selectedProduct.images.map((image, index) => (
                        <img
                          key={`${image}-${index}`}
                          src={getImageUrl(image)}
                          alt={`${selectedProduct.name} ${index + 1}`}
                          className="h-20 w-20 rounded-xl border border-gray-200 object-cover dark:border-white/10"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="rounded-xl border border-gray-200 px-4 py-2.5 text-[12px] font-medium dark:border-white/10"
              >
                Close
              </button>

              <Link
                to={`/admin/add-products/${selectedProduct.id}`}
                className="rounded-xl bg-orange-500 px-4 py-2.5 text-[12px] font-semibold text-white"
              >
                Edit Product
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteModal && productToDelete && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4"
          onClick={() => {
            if (deletingId === null) {
              setShowDeleteModal(false);
              setProductToDelete(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-product-title"
            className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#0d1017]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
                <Trash2 size={24} />
              </div>

              <div>
                <h2 id="delete-product-title" className="text-[16px] font-bold">
                  Delete Product?
                </h2>
                <p className="mt-2 text-[12px] leading-5 text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {productToDelete.name}
                  </span>
                  ? This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                disabled={deletingId !== null}
                onClick={() => {
                  setShowDeleteModal(false);
                  setProductToDelete(null);
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
