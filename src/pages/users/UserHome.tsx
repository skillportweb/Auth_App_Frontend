import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Star,
  ChevronRight,
  X,
  Heart,
  Minus,
  Plus,
  Check,
  Trash2,
  Truck,
  ShieldCheck,
  Leaf,
} from "lucide-react";

import img1 from "@/assets/img/img1.jpg";
import img2 from "@/assets/img/img2.jpg";
import img3 from "@/assets/img/img3.jpg";
import img4 from "@/assets/img/img4.jpg";
import img5 from "@/assets/img/img5.jpg";
import img6 from "@/assets/img/img6.jpg";
import img7 from "@/assets/img/img7.jpg";
import img8 from "@/assets/img/img8.jpg";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { getCurrentUser } from "@/services/AuthServices";
import useAuth from "@/auth/store";
import type User from "@/model/User";
import toast from "react-hot-toast";

/* =====================================================
   TYPES
====================================================== */

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  rating: number;
  weight: string;
  image: string;
  emoji: string;
}

/* =====================================================
   IMAGES
   Google se image URL copy karke yahan paste karo:
   Google Images -> image open -> right click -> "Copy image address"
   Har category ke array me jitne chaho URLs daal sakte ho,
   products unme rotate honge.
====================================================== */

const PRODUCT_IMAGES: Record<number, string> = {
  1: img1,
  2: img2,
  3: img3,
  4: img4,
  5: img5,
  6: img6,
  7: img7,
  8: img8,
};

const CATEGORY_IMAGES: Record<string, string[]> = {
  Badam: [
    // "https://your-google-image-url-1.jpg",
  ],
  Kaju: [],
  Mungfali: [],
  Pista: [],
  Kishmish: [],
  Akhrot: [],
  Anjeer: [],
  Oil: [],
  Ghee: [],
};

const fallbackImage = (keyword: string, id: number) =>
  `https://loremflickr.com/600/600/${encodeURIComponent(keyword)}?lock=${id}`;

const categories = [
  { name: "All", emoji: "🛍️" },
  { name: "Badam", emoji: "🌰" },
  { name: "Kaju", emoji: "🥜" },
  { name: "Mungfali", emoji: "🥜" },
  { name: "Pista", emoji: "🌿" },
  { name: "Kishmish", emoji: "🍇" },
  { name: "Akhrot", emoji: "🌰" },
  { name: "Anjeer", emoji: "🫘" },
  { name: "Oil", emoji: "🫙" },
  { name: "Ghee", emoji: "🧈" },
];

const emojiOf = (cat: string) =>
  categories.find((c) => c.name === cat)?.emoji ?? "🛍️";

/* =====================================================
   PRODUCT DATA
   [name, category, price, oldPrice, rating, weight, image keyword]
====================================================== */

type Row = [string, string, number, number, number, string, string];

const rows: Row[] = [
  // BADAM
  ["Premium California Almonds", "Badam", 399, 499, 4.7, "250g", "almonds"],
  ["California Almonds Premium", "Badam", 699, 799, 4.8, "500g", "almonds"],
  ["Premium Almonds", "Badam", 1299, 1499, 4.6, "1kg", "almonds"],
  ["Mamra Almonds", "Badam", 799, 899, 4.9, "250g", "almonds"],
  ["Gurbandi Almonds", "Badam", 749, 849, 4.7, "250g", "almonds"],
  ["Almond Giri Premium", "Badam", 649, 749, 4.6, "500g", "almonds"],
  ["Roasted Almonds", "Badam", 449, 549, 4.5, "250g", "roasted almonds"],
  ["Salted Almonds", "Badam", 469, 569, 4.5, "250g", "salted almonds"],
  ["Almonds Value Pack", "Badam", 1099, 1299, 4.7, "1kg", "almonds nuts"],
  ["Premium Almond Gift Pack", "Badam", 899, 999, 4.8, "500g", "almond gift box"],

  // KAJU
  ["Premium Whole Cashews", "Kaju", 449, 549, 4.8, "250g", "cashew"],
  ["Jumbo Cashew W180", "Kaju", 649, 749, 4.9, "250g", "cashew nuts"],
  ["Premium Cashew W240", "Kaju", 599, 699, 4.8, "250g", "cashews"],
  ["Cashew W320", "Kaju", 549, 649, 4.7, "250g", "cashew nuts"],
  ["Cashew Broken", "Kaju", 399, 499, 4.5, "500g", "broken cashew"],
  ["Roasted Cashews", "Kaju", 499, 599, 4.6, "250g", "roasted cashews"],
  ["Salted Cashews", "Kaju", 499, 599, 4.6, "250g", "salted cashews"],
  ["Cashew Value Pack", "Kaju", 1499, 1699, 4.8, "1kg", "cashew nuts"],
  ["Premium Kaju Gota", "Kaju", 799, 899, 4.8, "500g", "cashew nuts"],
  ["Kaju Gift Box", "Kaju", 899, 999, 4.9, "500g", "cashew gift box"],

  // MUNGFALI
  ["Premium Raw Peanuts", "Mungfali", 99, 129, 4.4, "500g", "peanuts"],
  ["Premium Raw Peanuts", "Mungfali", 179, 219, 4.5, "1kg", "raw peanuts"],
  ["Roasted Peanuts", "Mungfali", 149, 179, 4.6, "500g", "roasted peanuts"],
  ["Salted Peanuts", "Mungfali", 159, 199, 4.5, "500g", "salted peanuts"],
  ["Red Skin Peanuts", "Mungfali", 129, 159, 4.4, "500g", "red peanuts"],
  ["White Peanuts", "Mungfali", 139, 169, 4.4, "500g", "white peanuts"],
  ["Peanut Giri", "Mungfali", 189, 229, 4.5, "500g", "peanut kernels"],
  ["Crunchy Roasted Mungfali", "Mungfali", 169, 199, 4.7, "500g", "roasted peanuts snack"],
  ["Premium Peanut Pack", "Mungfali", 299, 349, 4.5, "1kg", "peanut bag"],
  ["Healthy Peanuts", "Mungfali", 89, 109, 4.3, "250g", "peanuts snack"],

  // PISTA
  ["Premium Green Pistachio", "Pista", 499, 599, 4.7, "250g", "pistachio"],
  ["Roasted Salted Pista", "Pista", 549, 649, 4.8, "250g", "roasted pistachio"],
  ["Jumbo Pistachio", "Pista", 699, 799, 4.8, "250g", "jumbo pistachio"],
  ["Iranian Pistachio", "Pista", 749, 849, 4.9, "250g", "iranian pistachio"],
  ["Pista Without Shell", "Pista", 799, 899, 4.8, "250g", "pistachio kernels"],
  ["Salted Pista Premium", "Pista", 599, 699, 4.6, "250g", "salted pistachio"],
  ["Pista Kernels", "Pista", 899, 999, 4.8, "250g", "pistachio kernels"],
  ["Pista Value Pack", "Pista", 1599, 1799, 4.7, "1kg", "pistachio nuts"],
  ["Premium Pista 500g", "Pista", 1099, 1199, 4.8, "500g", "pistachio"],
  ["Pista Gift Pack", "Pista", 999, 1099, 4.9, "500g", "pistachio gift"],

  // KISHMISH
  ["Premium Green Kishmish", "Kishmish", 199, 249, 4.6, "250g", "green raisins"],
  ["Golden Raisins", "Kishmish", 229, 279, 4.7, "250g", "golden raisins"],
  ["Black Raisins", "Kishmish", 189, 229, 4.6, "250g", "black raisins"],
  ["Seedless Kishmish", "Kishmish", 249, 299, 4.7, "250g", "seedless raisins"],
  ["Premium Raisins", "Kishmish", 349, 399, 4.6, "500g", "raisins"],
  ["Indian Green Raisins", "Kishmish", 299, 349, 4.5, "500g", "green raisins"],
  ["Long Raisins", "Kishmish", 279, 329, 4.6, "250g", "long raisins"],
  ["Munakka Raisins", "Kishmish", 299, 349, 4.7, "250g", "munakka raisins"],
  ["Kishmish Value Pack", "Kishmish", 599, 699, 4.7, "1kg", "raisins bag"],
  ["Premium Kishmish Gift Pack", "Kishmish", 499, 599, 4.8, "500g", "raisins gift"],

  // AKHROT
  ["Premium Walnut Kernels", "Akhrot", 449, 549, 4.7, "250g", "walnut kernels"],
  ["Kashmiri Walnut", "Akhrot", 599, 699, 4.8, "250g", "kashmiri walnuts"],
  ["Walnut Halves", "Akhrot", 499, 599, 4.7, "250g", "walnut halves"],
  ["Walnut Inshell", "Akhrot", 549, 649, 4.6, "500g", "walnut shell"],
  ["Premium Akhrot Giri", "Akhrot", 799, 899, 4.8, "500g", "walnut kernels"],
  ["Walnut Kernels Premium", "Akhrot", 899, 999, 4.9, "500g", "walnut kernels"],
  ["Walnut Value Pack", "Akhrot", 1499, 1699, 4.8, "1kg", "walnuts"],
  ["Roasted Walnut", "Akhrot", 549, 649, 4.5, "250g", "roasted walnuts"],
  ["Premium Walnut Pieces", "Akhrot", 399, 499, 4.5, "250g", "walnut pieces"],
  ["Akhrot Gift Pack", "Akhrot", 999, 1099, 4.8, "500g", "walnut gift box"],

  // ANJEER
  ["Premium Dried Anjeer", "Anjeer", 599, 699, 4.7, "250g", "dried figs"],
  ["Afghan Anjeer", "Anjeer", 699, 799, 4.8, "250g", "afghan figs"],
  ["Premium Fig Anjeer", "Anjeer", 1099, 1299, 4.8, "500g", "figs anjeer"],
  ["Soft Dried Figs", "Anjeer", 649, 749, 4.6, "250g", "dried figs"],
  ["Natural Anjeer", "Anjeer", 749, 849, 4.7, "250g", "natural figs"],
  ["Premium Anjeer 500g", "Anjeer", 1199, 1399, 4.8, "500g", "anjeer figs"],
  ["Anjeer Value Pack", "Anjeer", 2199, 2499, 4.8, "1kg", "dried fig bag"],
  ["Royal Anjeer", "Anjeer", 799, 899, 4.7, "250g", "royal dried figs"],
  ["Anjeer Premium Select", "Anjeer", 899, 999, 4.8, "250g", "premium dried figs"],
  ["Anjeer Gift Pack", "Anjeer", 1299, 1499, 4.9, "500g", "fig gift box"],

  // OILS
  ["Cold Pressed Mustard Oil", "Oil", 249, 299, 4.7, "1L", "mustard oil bottle"],
  ["Pure Mustard Oil", "Oil", 219, 269, 4.6, "1L", "mustard oil"],
  ["Cold Pressed Groundnut Oil", "Oil", 349, 399, 4.8, "1L", "groundnut oil"],
  ["Wood Pressed Groundnut Oil", "Oil", 399, 449, 4.8, "1L", "peanut oil bottle"],
  ["Cold Pressed Coconut Oil", "Oil", 299, 349, 4.7, "500ml", "coconut oil bottle"],
  ["Virgin Coconut Oil", "Oil", 399, 449, 4.8, "500ml", "virgin coconut oil"],
  ["Cold Pressed Sesame Oil", "Oil", 449, 499, 4.7, "1L", "sesame oil bottle"],
  ["Pure Sunflower Oil", "Oil", 199, 239, 4.5, "1L", "sunflower oil bottle"],
  ["Cold Pressed Mustard Oil", "Oil", 449, 499, 4.8, "2L", "mustard oil bottle"],
  ["Premium Multi Seed Oil", "Oil", 499, 599, 4.7, "1L", "cooking oil bottle"],

  // GHEE
  ["Pure Cow Ghee", "Ghee", 699, 799, 4.8, "500ml", "cow ghee jar"],
  ["Desi Cow Ghee", "Ghee", 799, 899, 4.9, "500ml", "desi cow ghee"],
  ["A2 Cow Ghee", "Ghee", 999, 1199, 4.9, "500ml", "A2 cow ghee"],
  ["Organic Cow Ghee", "Ghee", 899, 999, 4.8, "500ml", "organic cow ghee"],
  ["Premium Desi Ghee", "Ghee", 699, 799, 4.7, "1L", "desi ghee jar"],
  ["Bilona Cow Ghee", "Ghee", 1199, 1399, 4.9, "500ml", "bilona ghee"],
  ["Traditional Bilona Ghee", "Ghee", 1399, 1599, 4.9, "1L", "bilona cow ghee"],
  ["Pure Buffalo Ghee", "Ghee", 749, 849, 4.6, "1L", "buffalo ghee"],
  ["Premium Ghee Jar", "Ghee", 499, 599, 4.7, "500ml", "ghee jar"],
  ["Royal Desi Ghee", "Ghee", 1499, 1699, 4.9, "1L", "premium ghee"],
];

export const products: Product[] = rows.map(
  ([name, category, price, oldPrice, rating, weight, keyword], i) => {
    const id = i + 1;
    const custom = CATEGORY_IMAGES[category] ?? [];

    const image =
      PRODUCT_IMAGES[id] ??
      (custom.length > 0
        ? custom[i % custom.length]
        : fallbackImage(keyword, id));

    return {
      id,
      name,
      category,
      price,
      oldPrice,
      rating,
      weight,
      image,
      emoji: emojiOf(category),
    };
  }
);

const sortOptions = [
  { value: "popular", label: "Popular" },
  { value: "low", label: "Price: Low to High" },
  { value: "high", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/* =====================================================
   PRODUCT IMAGE (with emoji fallback)
====================================================== */

export const ProductImage = ({ product }: { product: Product }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-100 to-orange-200 text-6xl dark:from-gray-800 dark:to-gray-700">
        {product.emoji}
      </div>
    );
  }

  return (
    <img
      src={product.image}
      alt={product.name}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
  );
};

/* =====================================================
   MAIN COMPONENT
====================================================== */

const UserHome = () => {
  const user = useAuth((state) => state.user);
  const navigate = useNavigate();

  const [user1, setUser1] = useState<User | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("popular");

  // Cart localStorage se load hota hai, taaki product details page ka cart bhi sync rahe
  const [cart, setCart] = useState<Record<number, number>>(() => {
    try {
      return JSON.parse(localStorage.getItem("cart") || "{}");
    } catch {
      return {};
    }
  });

  const [favorites, setFavorites] = useState<number[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Cart change hote hi localStorage me save karo
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch {
      /* ignore */
    }
  }, [cart]);

  /* ---------- API ---------- */

  const getUserData = async () => {
    try {
      const response = await getCurrentUser(user?.email);
      setUser1(response);
      toast.success("You are able to access secured APIs");
    } catch (error) {
      console.log(error);
      toast.error("Error in getting data");
    }
  };

  /* ---------- Derived data ---------- */

  const filteredProducts = useMemo(() => {
    const q = search.toLowerCase();

    const list = products.filter((p) => {
      const categoryMatch =
        selectedCategory === "All" || p.category === selectedCategory;
      const searchMatch =
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return categoryMatch && searchMatch;
    });

    if (sortBy === "low") list.sort((a, b) => a.price - b.price);
    if (sortBy === "high") list.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [selectedCategory, search, sortBy]);

  const cartItems = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => ({
          product: products.find((p) => p.id === Number(id))!,
          qty,
        }))
        .filter((i) => i.product),
    [cart]
  );

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cartItems.reduce(
    (sum, i) => sum + i.product.price * i.qty,
    0
  );
  const cartSavings = cartItems.reduce(
    (sum, i) => sum + (i.product.oldPrice - i.product.price) * i.qty,
    0
  );

  /* ---------- Actions ---------- */

  const addToCart = (product: Product) => {
    setCart((prev) => ({ ...prev, [product.id]: (prev[product.id] ?? 0) + 1 }));
    toast.success(`${product.name} added to cart`);
  };

  const changeQty = (id: number, delta: number) => {
    setCart((prev) => {
      const next = (prev[id] ?? 0) + delta;
      const copy = { ...prev };
      if (next <= 0) delete copy[id];
      else copy[id] = next;
      return copy;
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => {
      if (prev.includes(productId)) {
        toast.success("Removed from wishlist");
        return prev.filter((id) => id !== productId);
      }
      toast.success("Added to wishlist");
      return [...prev, productId];
    });
  };

  const openProduct = (id: number) => {
    navigate(`/user/product/${id}`);
  };

  /* ---------- UI ---------- */

  return (
    <div className="min-h-[calc(100vh-56px)] bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-white">
      <main className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* ================= HERO ================= */}
        <section className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 p-6 text-white shadow-xl sm:p-10">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-black/10 blur-2xl" />

          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur">
                <Leaf className="h-3.5 w-3.5" />
                100% Natural & Fresh
              </span>

              <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-5xl">
                Namaste, {user?.name || "Customer"} 👋
              </h1>

              <p className="mt-3 text-sm text-white/90 sm:text-base">
                Premium dry fruits, cold pressed oils aur pure desi ghee —
                seedha aapke ghar tak.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Button
                  className="cursor-pointer rounded-xl bg-white px-6 text-orange-600 shadow-lg hover:bg-orange-50"
                  onClick={() => {
                    setSelectedCategory("All");
                    document
                      .getElementById("products")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Shop Now
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>

                <div className="flex items-center gap-2 text-sm text-white/90">
                  <Truck className="h-4 w-4" />
                  Free delivery above ₹999
                </div>
              </div>
            </div>

            <div className="hidden h-44 w-44 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/15 shadow-2xl backdrop-blur md:flex">
              <span className="text-8xl drop-shadow-lg">🥜</span>
            </div>
          </div>
        </section>

        {/* ================= TRUST STRIP ================= */}
        <section className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { icon: Leaf, title: "Farm Fresh", text: "Directly sourced products" },
            { icon: ShieldCheck, title: "Quality Assured", text: "Lab tested & sealed" },
            { icon: Truck, title: "Fast Delivery", text: "Delivered in 2-4 days" },
          ].map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-500/10">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{text}</p>
              </div>
            </div>
          ))}
        </section>

        {/* ================= SEARCH + CART BAR (sticky) ================= */}
        <section className="sticky top-14 z-30 -mx-4 mb-6 bg-gray-50/80 px-4 py-3 backdrop-blur-md dark:bg-gray-950/80 sm:mx-0 sm:rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search badam, kaju, ghee, mustard oil..."
                className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-12 pr-12 text-sm shadow-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:focus:ring-orange-500/20"
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-700 dark:hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            <button
              onClick={() => setCartOpen(true)}
              className="relative flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-2xl border border-gray-200 bg-white text-orange-600 shadow-sm transition hover:scale-105 hover:border-orange-300 hover:bg-orange-50 dark:border-gray-800 dark:bg-gray-900 dark:text-orange-400 dark:hover:border-orange-500/40 dark:hover:bg-gray-800"
              aria-label="Open cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[11px] font-bold text-white shadow">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </section>

        {/* ================= CATEGORIES ================= */}
        <section className="mb-8">
          <div className="mb-4">
            <h2 className="text-2xl font-bold">Shop by Category</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Apni pasandida category chuno
            </p>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((category) => {
              const active = selectedCategory === category.name;

              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex min-w-fit cursor-pointer items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                    active
                      ? "border-orange-500 bg-orange-500 text-white shadow-md shadow-orange-500/30"
                      : "border-gray-200 bg-white text-gray-700 hover:border-orange-300 hover:bg-orange-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
                  }`}
                >
                  <span className="text-lg">{category.emoji}</span>
                  {category.name}
                </button>
              );
            })}
          </div>
        </section>

        {/* ================= PRODUCT HEADER ================= */}
        <section
          id="products"
          className="mb-5 flex scroll-mt-32 flex-wrap items-end justify-between gap-3"
        >
          <div>
            <h2 className="text-2xl font-bold">
              {selectedCategory === "All"
                ? "All Products"
                : `${selectedCategory} Products`}
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {filteredProducts.length} products available
            </p>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm outline-none focus:border-orange-400 dark:border-gray-800 dark:bg-gray-900"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </section>

        {/* ================= PRODUCTS ================= */}
        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-3 text-5xl">🔍</div>
            <h3 className="text-lg font-semibold">No products found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Kuch aur search karke dekho.
            </p>
          </div>
        ) : (
          <section className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => {
              const isFavorite = favorites.includes(product.id);
              const qty = cart[product.id] ?? 0;
              const discount = Math.round(
                ((product.oldPrice - product.price) / product.oldPrice) * 100
              );

              return (
                <Card
                  key={product.id}
                  onClick={() => openProduct(product.id)}
                  className="group cursor-pointer overflow-hidden rounded-2xl border-gray-200 bg-white p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900"
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden bg-gray-100 sm:h-56 dark:bg-gray-800">
                    <ProductImage product={product} />

                    <span className="absolute left-3 top-3 rounded-full bg-rose-500 px-2.5 py-1 text-[11px] font-bold text-white shadow">
                      {discount}% OFF
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(product.id);
                      }}
                      className="absolute right-3 top-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur transition hover:scale-110 dark:bg-gray-900/90"
                      aria-label="Toggle wishlist"
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          isFavorite
                            ? "fill-red-500 text-red-500"
                            : "text-gray-600 dark:text-gray-300"
                        }`}
                      />
                    </button>

                    <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
                      {product.weight}
                    </span>
                  </div>

                  <CardContent className="p-3 sm:p-4">
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-orange-500">
                      {product.category}
                    </p>

                    <h3 className="line-clamp-2 min-h-[40px] text-sm font-semibold sm:min-h-[48px] sm:text-base">
                      {product.name}
                    </h3>

                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex items-center gap-1 rounded-md bg-green-600 px-1.5 py-0.5 text-white">
                        <span className="text-xs font-semibold">
                          {product.rating}
                        </span>
                        <Star className="h-3 w-3 fill-white" />
                      </div>
                      <span className="text-xs text-gray-400">Customer rating</span>
                    </div>

                    <div className="mt-3 flex items-end gap-2">
                      <span className="text-lg font-bold sm:text-xl">
                        {inr(product.price)}
                      </span>
                      <span className="text-xs text-gray-400 line-through sm:text-sm">
                        {inr(product.oldPrice)}
                      </span>
                    </div>

                    {qty === 0 ? (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="mt-4 w-full cursor-pointer rounded-xl bg-gray-900 text-white transition hover:bg-orange-500 dark:bg-white dark:text-gray-900 dark:hover:bg-orange-400"
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                    ) : (
                      <div className="mt-4 flex items-center justify-between rounded-xl bg-orange-50 p-1 dark:bg-orange-500/10">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            changeQty(product.id, -1);
                          }}
                          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-white shadow-sm transition hover:bg-gray-100 dark:bg-gray-900"
                        >
                          <Minus className="h-4 w-4" />
                        </button>

                        <span className="text-sm font-bold">{qty}</span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            changeQty(product.id, 1);
                          }}
                          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-orange-500 text-white shadow-sm transition hover:bg-orange-600"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </section>
        )}

        {/* ================= ACCOUNT / API TEST ================= */}
        <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-semibold">Account Information</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Test your authenticated API connection.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Button
                onClick={getUserData}
                variant="outline"
                className="cursor-pointer rounded-xl border-gray-300 bg-white dark:border-gray-700 dark:bg-transparent dark:text-white"
              >
                Get Current User
              </Button>

              {user1 && (
                <span className="text-sm font-medium">{user1.name}</span>
              )}
            </div>
          </div>
        </section>

        {/* ================= FOOTER STATUS ================= */}
        <div className="mt-8 flex items-center justify-center gap-2 pb-5 text-xs text-gray-500">
          <Check className="h-4 w-4 text-green-500" />
          Secure & Fresh Products
        </div>
      </main>

      {/* ================= CART DRAWER ================= */}
      <div
        onClick={() => setCartOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          cartOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 dark:bg-gray-900 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-200 p-5 dark:border-gray-800">
          <div>
            <h2 className="text-lg font-bold">Your Cart</h2>
            <p className="text-xs text-gray-500">{cartCount} items</p>
          </div>

          <button
            onClick={() => setCartOpen(false)}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {cartItems.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-3 text-6xl">🛒</div>
              <p className="font-semibold">Cart khaali hai</p>
              <p className="mt-1 text-sm text-gray-500">
                Kuch tasty products add karo!
              </p>
            </div>
          ) : (
            cartItems.map(({ product, qty }) => (
              <div
                key={product.id}
                className="flex gap-3 rounded-2xl border border-gray-200 p-3 dark:border-gray-800"
              >
                <div
                  onClick={() => {
                    setCartOpen(false);
                    openProduct(product.id);
                  }}
                  className="h-20 w-20 shrink-0 cursor-pointer overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800"
                >
                  <ProductImage product={product} />
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500">{product.weight}</p>
                    </div>

                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="cursor-pointer text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-800">
                      <button
                        onClick={() => changeQty(product.id, -1)}
                        className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md hover:bg-white dark:hover:bg-gray-700"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-5 text-center text-sm font-semibold">
                        {qty}
                      </span>
                      <button
                        onClick={() => changeQty(product.id, 1)}
                        className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md hover:bg-white dark:hover:bg-gray-700"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <span className="text-sm font-bold">
                      {inr(product.price * qty)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="space-y-3 border-t border-gray-200 p-5 dark:border-gray-800">
            {cartSavings > 0 && (
              <div className="flex items-center justify-between rounded-xl bg-green-50 px-4 py-2 text-sm text-green-700 dark:bg-green-500/10 dark:text-green-400">
                <span>Aapki total bachat</span>
                <span className="font-semibold">{inr(cartSavings)}</span>
              </div>
            )}

            <div className="flex items-center justify-between text-lg font-bold">
              <span>Total</span>
              <span>{inr(cartTotal)}</span>
            </div>

            <Button
              onClick={() => toast.success("Checkout coming soon!")}
              className="w-full cursor-pointer rounded-xl bg-orange-500 py-6 text-base font-semibold text-white hover:bg-orange-600"
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </aside>
    </div>
  );
};

export default UserHome;