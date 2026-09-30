import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Minus,
  Plus,
  Truck,
  ShieldCheck,
  Leaf,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { products, ProductImage } from "./UserHome";

// ================= PRODUCT 1 IMAGES =================

import img1 from "@/assets/product1/img1.jpg";
import img2 from "@/assets/product1/img2.jpg";
import img3 from "@/assets/product1/img3.jpg";
import img4 from "@/assets/product1/img4.jpg";
import img5 from "@/assets/product1/img5.jpg";

// ================= PRICE FORMAT =================

const inr = (n: number) =>
  `₹${n.toLocaleString("en-IN")}`;

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(img1);

  // ================= FIND PRODUCT =================

  const product = products.find(
    (p) => p.id === Number(id)
  );

  // ================= PRODUCT NOT FOUND =================

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <div className="text-5xl">😕</div>

        <p className="font-semibold">
          Product nahi mila
        </p>

        <Button onClick={() => navigate(-1)}>
          Wapas jao
        </Button>
      </div>
    );
  }

  // ================= PRODUCT IMAGES =================

  /*
    Abhi Product 1 ke images use kar rahe hain.

    Baad mein product ID ke according
    different images yahan add kar sakte ho.
  */

  const productImages = [
    img1,
    img2,
    img3,
    img4,
    img5,
  ];

  // ================= DISCOUNT =================

  const discount = Math.round(
    ((product.oldPrice - product.price) /
      product.oldPrice) *
      100
  );

  // ================= RELATED PRODUCTS =================

  const related = products
    .filter(
      (p) =>
        p.category === product.category &&
        p.id !== product.id
    )
    .slice(0, 4);

  // ================= ADD TO CART =================

  const addToCart = () => {
    try {
      const cart = JSON.parse(
        localStorage.getItem("cart") || "{}"
      );

      cart[product.id] =
        (cart[product.id] ?? 0) + qty;

      localStorage.setItem(
        "cart",
        JSON.stringify(cart)
      );

      toast.success(
        `${qty} x ${product.name} added to cart`
      );
    } catch {
      toast.error(
        "Cart me add nahi ho paya"
      );
    }
  };

  // ================= NEXT IMAGE =================

  const nextImage = () => {
    const currentIndex =
      productImages.indexOf(selectedImage);

    const nextIndex =
      (currentIndex + 1) %
      productImages.length;

    setSelectedImage(
      productImages[nextIndex]
    );
  };

  // ================= PREVIOUS IMAGE =================

  const previousImage = () => {
    const currentIndex =
      productImages.indexOf(selectedImage);

    const previousIndex =
      (currentIndex -
        1 +
        productImages.length) %
      productImages.length;

    setSelectedImage(
      productImages[previousIndex]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-white">

      <main className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">

        {/* ================= BACK ================= */}

        <button
          onClick={() => navigate(-1)}
          className="mb-5 flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-600 hover:text-orange-500 dark:text-gray-300"
        >
          <ArrowLeft className="h-4 w-4" />

          Back to shop
        </button>

        {/* ================= PRODUCT ================= */}

        <div className="grid gap-8 rounded-3xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900 sm:p-8 md:grid-cols-2">

          {/* ================================================= */}
          {/* LEFT SIDE - PRODUCT IMAGES */}
          {/* ================================================= */}

          <div>

            {/* ================= MAIN IMAGE ================= */}

            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">

              <img
                src={selectedImage}
                alt={product.name}
                className="h-full w-full object-contain"
              />

              {/* DISCOUNT */}

              <span className="absolute left-4 top-4 rounded-full bg-rose-500 px-3 py-1 text-xs font-bold text-white shadow">
                {discount}% OFF
              </span>

              {/* ================= LEFT ARROW ================= */}

              {productImages.length > 1 && (
                <button
                  onClick={previousImage}
                  className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-800 shadow-lg transition hover:scale-105"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              )}

              {/* ================= RIGHT ARROW ================= */}

              {productImages.length > 1 && (
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-800 shadow-lg transition hover:scale-105"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}

            </div>

            {/* ================================================= */}
            {/* IMAGE THUMBNAILS */}
            {/* ================================================= */}

            <div className="mt-4 flex gap-3 overflow-x-auto pb-2">

              {productImages.map(
                (image, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setSelectedImage(image)
                    }
                    className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 bg-white transition ${
                      selectedImage === image
                        ? "border-green-600"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="h-full w-full object-contain"
                    />
                  </button>
                )
              )}

            </div>

          </div>

          {/* ================================================= */}
          {/* RIGHT SIDE - PRODUCT INFORMATION */}
          {/* ================================================= */}

          <div className="flex flex-col">

            {/* CATEGORY */}

            <p className="text-xs font-semibold uppercase tracking-wider text-orange-500">
              {product.category}
            </p>

            {/* PRODUCT NAME */}

            <h1 className="mt-1 text-2xl font-extrabold sm:text-3xl">
              {product.name}
            </h1>

            {/* RATING */}

            <div className="mt-3 flex items-center gap-3">

              <div className="flex items-center gap-1 rounded-md bg-green-600 px-2 py-0.5 text-white">

                <span className="text-sm font-semibold">
                  {product.rating}
                </span>

                <Star className="h-3.5 w-3.5 fill-white" />

              </div>

              <span className="text-sm text-gray-500">
                Customer rating
              </span>

            </div>

            {/* PRICE */}

            <div className="mt-5 flex flex-wrap items-end gap-3">

              <span className="text-3xl font-bold">
                {inr(product.price)}
              </span>

              <span className="text-lg text-gray-400 line-through">
                {inr(product.oldPrice)}
              </span>

              <span className="text-sm font-semibold text-green-600">
                Aap bachaoge{" "}
                {inr(
                  product.oldPrice -
                    product.price
                )}
              </span>

            </div>

            {/* WEIGHT */}

            <p className="mt-1 text-sm text-gray-500">
              Pack size:{" "}
              <span className="font-medium">
                {product.weight}
              </span>
            </p>

            {/* DESCRIPTION */}

            <p className="mt-5 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {product.name} — 100% natural,
              fresh aur hygienically packed.
              Seedha source se aapke ghar tak,
              bina kisi milawat ke.
            </p>

            {/* ================= QUANTITY ================= */}

            <div className="mt-6 flex items-center gap-4">

              <span className="text-sm font-medium">
                Quantity
              </span>

              <div className="flex items-center gap-2 rounded-xl bg-orange-50 p-1 dark:bg-orange-500/10">

                <button
                  onClick={() =>
                    setQty((q) =>
                      Math.max(1, q - 1)
                    )
                  }
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-white shadow-sm hover:bg-gray-100 dark:bg-gray-900"
                >
                  <Minus className="h-4 w-4" />
                </button>

                <span className="w-8 text-center text-sm font-bold">
                  {qty}
                </span>

                <button
                  onClick={() =>
                    setQty((q) => q + 1)
                  }
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-orange-500 text-white shadow-sm hover:bg-orange-600"
                >
                  <Plus className="h-4 w-4" />
                </button>

              </div>

            </div>

            {/* ================= ADD TO CART ================= */}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">

              <Button
                onClick={addToCart}
                className="flex-1 cursor-pointer rounded-xl bg-gray-900 py-6 text-white hover:bg-orange-500 dark:bg-white dark:text-gray-900 dark:hover:bg-orange-400"
              >

                <ShoppingCart className="mr-2 h-4 w-4" />

                Add to Cart —{" "}
                {inr(product.price * qty)}

              </Button>

            </div>

            {/* ================= TRUST ================= */}

            <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs text-gray-600 dark:text-gray-300">

              <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800">

                <Leaf className="mx-auto mb-1 h-5 w-5 text-orange-500" />

                Farm Fresh

              </div>

              <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800">

                <ShieldCheck className="mx-auto mb-1 h-5 w-5 text-orange-500" />

                Quality Assured

              </div>

              <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800">

                <Truck className="mx-auto mb-1 h-5 w-5 text-orange-500" />

                2-4 Days Delivery

              </div>

            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* RELATED PRODUCTS */}
        {/* ================================================= */}

        {related.length > 0 && (
          <section className="mt-10">

            <h2 className="mb-4 text-xl font-bold">
              Similar Products
            </h2>

            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">

              {related.map((p) => (

                <div
                  key={p.id}
                  onClick={() => {
                    navigate(
                      `/user/product/${p.id}`
                    );

                    setQty(1);

                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  className="cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
                >

                  <div className="h-36 overflow-hidden bg-gray-100 dark:bg-gray-800">

                    <ProductImage product={p} />

                  </div>

                  <div className="p-3">

                    <p className="line-clamp-1 text-sm font-semibold">
                      {p.name}
                    </p>

                    <p className="mt-1 text-sm font-bold">
                      {inr(p.price)}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </section>
        )}

      </main>

    </div>
  );
};

export default ProductDetails;