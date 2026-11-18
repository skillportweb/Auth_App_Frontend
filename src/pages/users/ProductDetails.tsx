
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

// PRODUCT IMAGES
import img1 from "@/assets/product1/img1.jpg";
import img2 from "@/assets/product1/img2.jpg";
import img3 from "@/assets/product1/img3.jpg";
import img4 from "@/assets/product1/img4.jpg";
import img5 from "@/assets/product1/img5.jpg";

// PRICE FORMAT
const inr = (n: number) =>
  `₹${n.toLocaleString("en-IN")}`;

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(img1);

  // FIND PRODUCT
  const product = products.find(
    (p) => p.id === Number(id)
  );

  // PRODUCT NOT FOUND
  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
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

  // PRODUCT IMAGES
  const productImages = [
    img1,
    img2,
    img3,
    img4,
    img5,
  ];

  // DISCOUNT
  const discount =
    product.oldPrice > 0
      ? Math.round(
          ((product.oldPrice - product.price) /
            product.oldPrice) *
            100
        )
      : 0;

  // RELATED PRODUCTS
  const related = products
    .filter(
      (p) =>
        p.category === product.category &&
        p.id !== product.id
    )
    .slice(0, 4);

  // ADD TO CART
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
      toast.error("Cart me add nahi ho paya");
    }
  };

  // NEXT IMAGE
  const nextImage = () => {
    const currentIndex =
      productImages.indexOf(selectedImage);

    const nextIndex =
      (currentIndex + 1) % productImages.length;

    setSelectedImage(productImages[nextIndex]);
  };

  // PREVIOUS IMAGE
  const previousImage = () => {
    const currentIndex =
      productImages.indexOf(selectedImage);

    const previousIndex =
      (currentIndex - 1 + productImages.length) %
      productImages.length;

    setSelectedImage(productImages[previousIndex]);
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-white">

      {/* MAIN CONTAINER */}
      <main className="mx-auto w-full max-w-7xl min-w-0 px-3 py-4 sm:px-5 sm:py-6 lg:px-8">

        {/* BACK BUTTON */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-2 text-xs font-medium text-gray-600 transition hover:text-orange-500 sm:mb-5 sm:text-sm dark:text-gray-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to shop
        </button>

        {/* PRODUCT CONTAINER */}
        <div className="grid w-full min-w-0 grid-cols-1 items-start gap-5 rounded-2xl border border-gray-200 bg-white p-3 sm:gap-6 sm:p-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-6 lg:gap-8 lg:p-6 dark:border-gray-800 dark:bg-gray-900">

          {/* LEFT SIDE - PRODUCT IMAGES */}
          <div className="w-full min-w-0">

            {/* MAIN IMAGE */}
            <div className="relative mx-auto flex aspect-square w-full max-h-[520px] items-center justify-center rounded-xl bg-gray-100 sm:rounded-2xl dark:bg-gray-800">

              <img
                src={selectedImage}
                alt={product.name}
                className="h-full w-full rounded-xl object-contain sm:rounded-2xl"
              />

              {/* DISCOUNT */}
              {discount > 0 && (
                <span className="absolute left-3 top-3 rounded-full bg-rose-500 px-3 py-1 text-[10px] font-bold text-white shadow sm:left-4 sm:top-4 sm:text-xs">
                  {discount}% OFF
                </span>
              )}

              {/* PREVIOUS IMAGE */}
              {productImages.length > 1 && (
                <button
                  type="button"
                  onClick={previousImage}
                  aria-label="Previous image"
                  className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-800 shadow-lg transition hover:scale-105 sm:left-3 sm:h-10 sm:w-10"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              )}

              {/* NEXT IMAGE */}
              {productImages.length > 1 && (
                <button
                  type="button"
                  onClick={nextImage}
                  aria-label="Next image"
                  className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-800 shadow-lg transition hover:scale-105 sm:right-3 sm:h-10 sm:w-10"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}

            </div>

            {/* IMAGE THUMBNAILS */}
            <div className="mt-3 flex w-full min-w-0 gap-2 overflow-x-auto pb-2 sm:mt-4 sm:gap-3">

              {productImages.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  aria-label={`View product image ${index + 1}`}
                  className={`h-14 w-14 flex-shrink-0 rounded-lg border-2 bg-white transition sm:h-20 sm:w-20 sm:rounded-xl ${
                    selectedImage === image
                      ? "border-green-600"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="h-full w-full rounded-md object-contain"
                  />
                </button>
              ))}

            </div>
          </div>

          {/* RIGHT SIDE - PRODUCT INFORMATION */}
          <div className="flex w-full min-w-0 flex-col">

            {/* CATEGORY */}
            <p className="text-[10px] font-semibold uppercase tracking-wider text-orange-500 sm:text-xs">
              {product.category}
            </p>

            {/* PRODUCT NAME */}
            <h1 className="mt-1 break-words text-xl font-extrabold leading-tight sm:text-2xl lg:text-3xl">
              {product.name}
            </h1>

            {/* RATING */}
            <div className="mt-3 flex flex-wrap items-center gap-2 sm:gap-3">

              <div className="flex items-center gap-1 rounded-md bg-green-600 px-2 py-0.5 text-white">
                <span className="text-xs font-semibold">
                  {product.rating}
                </span>

                <Star className="h-3.5 w-3.5 fill-white" />
              </div>

              <span className="text-xs text-gray-500 sm:text-sm">
                Customer rating
              </span>

            </div>

            {/* PRICE */}
            <div className="mt-4 flex flex-wrap items-center gap-2 sm:mt-5 sm:gap-3">

              <span className="text-2xl font-bold sm:text-3xl">
                {inr(product.price)}
              </span>

              <span className="text-sm text-gray-400 line-through sm:text-lg">
                {inr(product.oldPrice)}
              </span>

              {discount > 0 && (
                <span className="rounded-md bg-green-50 px-2 py-1 text-xs font-semibold text-green-600 dark:bg-green-500/10">
                  {discount}% OFF
                </span>
              )}

            </div>

            {/* SAVINGS */}
            <p className="mt-1 text-xs font-medium text-green-600 sm:text-sm">
              Aap bachaoge{" "}
              {inr(product.oldPrice - product.price)}
            </p>

            {/* WEIGHT */}
            <p className="mt-2 text-xs text-gray-500 sm:text-sm">
              Pack size:{" "}
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {product.weight}
              </span>
            </p>

            {/* DESCRIPTION */}
            <p className="mt-4 break-words text-xs leading-relaxed text-gray-600 sm:text-sm dark:text-gray-300">
              {product.name} — 100% natural,
              fresh aur hygienically packed.
              Seedha source se aapke ghar tak,
              bina kisi milawat ke.
            </p>

            {/* QUANTITY */}
            <div className="mt-5 flex flex-wrap items-center gap-4 sm:mt-6">

              <span className="text-sm font-semibold">
                Quantity
              </span>

              <div className="flex items-center gap-2 rounded-xl bg-orange-50 p-1 dark:bg-orange-500/10">

                <button
                  type="button"
                  onClick={() =>
                    setQty((q) => Math.max(1, q - 1))
                  }
                  aria-label="Decrease quantity"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm hover:bg-gray-100 dark:bg-gray-900"
                >
                  <Minus className="h-4 w-4" />
                </button>

                <span className="w-8 text-center text-sm font-bold">
                  {qty}
                </span>

                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500 text-white shadow-sm hover:bg-orange-600"
                >
                  <Plus className="h-4 w-4" />
                </button>

              </div>
            </div>

            {/* ADD TO CART */}
            <div className="mt-5 flex w-full min-w-0 flex-col gap-3 sm:mt-6">

              <Button
                onClick={addToCart}
                className="h-12 w-full min-w-0 cursor-pointer whitespace-normal rounded-xl bg-gray-900 px-3 text-sm font-semibold text-white hover:bg-orange-500 dark:bg-white dark:text-gray-900 dark:hover:bg-orange-400"
              >
                <ShoppingCart className="mr-2 h-4 w-4 shrink-0" />

                Add to Cart — {inr(product.price * qty)}
              </Button>

            </div>

            {/* TRUST SECTION */}
            <div className="mt-5 grid w-full min-w-0 grid-cols-3 gap-2 text-center text-[10px] text-gray-600 sm:mt-6 sm:gap-3 sm:text-xs dark:text-gray-300">

              <div className="flex min-w-0 flex-col items-center justify-center rounded-xl bg-gray-50 p-2 sm:p-3 dark:bg-gray-800">
                <Leaf className="mb-1 h-5 w-5 shrink-0 text-orange-500" />
                <span className="break-words">Farm Fresh</span>
              </div>

              <div className="flex min-w-0 flex-col items-center justify-center rounded-xl bg-gray-50 p-2 sm:p-3 dark:bg-gray-800">
                <ShieldCheck className="mb-1 h-5 w-5 shrink-0 text-orange-500" />
                <span className="break-words">Quality Assured</span>
              </div>

              <div className="flex min-w-0 flex-col items-center justify-center rounded-xl bg-gray-50 p-2 sm:p-3 dark:bg-gray-800">
                <Truck className="mb-1 h-5 w-5 shrink-0 text-orange-500" />
                <span className="break-words">2-4 Days Delivery</span>
              </div>

            </div>

          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {related.length > 0 && (
          <section className="mt-6 w-full min-w-0 sm:mt-10">

            <h2 className="mb-3 text-lg font-bold sm:mb-4 sm:text-xl">
              Similar Products
            </h2>

            <div className="grid w-full min-w-0 grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">

              {related.map((p) => (

                <div
                  key={p.id}
                  onClick={() => {
                    setQty(1);
                    navigate(`/user/product/${p.id}`);

                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  className="w-full min-w-0 cursor-pointer rounded-xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-xl sm:rounded-2xl dark:border-gray-800 dark:bg-gray-900"
                >

                  <div className="flex h-32 w-full items-center justify-center rounded-t-xl bg-gray-100 sm:h-36 dark:bg-gray-800">
                    <ProductImage product={p} />
                  </div>

                  <div className="min-w-0 p-2 sm:p-3">

                    <p className="break-words text-xs font-semibold sm:text-sm">
                      {p.name}
                    </p>

                    <p className="mt-1 text-xs font-bold sm:text-sm">
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
