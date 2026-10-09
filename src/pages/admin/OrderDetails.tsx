import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Truck,
  Package,
  MapPin,
  User,
  Phone,
  Mail,
  CreditCard,
  IndianRupee,
  ShoppingBag,
  RotateCcw,
  XCircle,
  Save,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Processing"
  | "Shipped"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled"
  | "Returned"
  | "Refunded";

interface Product {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  image: string;
}

interface Address {
  house: string;
  city: string;
  state: string;
  pincode: string;
}

interface Order {
  id: string;
  date: string;
  customer: string;
  email: string;
  phone: string;
  status: OrderStatus;
  paymentStatus: string;
  paymentMethod: string;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  address: Address;
  products: Product[];
}

/* =========================================================
   STATUS OPTIONS
========================================================= */

const statusOptions: OrderStatus[] = [
  "Pending",
  "Confirmed",
  "Processing",
  "Shipped",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
  "Returned",
  "Refunded",
];

const timeline: OrderStatus[] = [
  "Pending",
  "Confirmed",
  "Processing",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

/* =========================================================
   DUMMY ORDER
========================================================= */

const order: Order = {
  id: "ORD-1001",
  date: "07 Oct 2026",
  customer: "Rahul Sharma",
  email: "rahul@example.com",
  phone: "+91 98765 43210",

  status: "Delivered",

  paymentStatus: "Paid",
  paymentMethod: "UPI",

  subtotal: 2499,
  discount: 100,
  shipping: 50,
  tax: 250,
  total: 2699,

  address: {
    house: "House No. 24, Sector 15",
    city: "Noida",
    state: "Uttar Pradesh",
    pincode: "201301",
  },

  products: [
    {
      id: 1,
      name: "Premium Almonds",
      sku: "ALMOND-001",
      quantity: 2,
      price: 800,
      image:
        "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 2,
      name: "Pure Mustard Oil",
      sku: "MUSTARD-001",
      quantity: 1,
      price: 699,
      image:
        "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 3,
      name: "Pure Cow Ghee",
      sku: "GHEE-001",
      quantity: 1,
      price: 1000,
      image:
        "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=200&q=80",
    },
  ],
};

/* =========================================================
   STATUS ICON
========================================================= */

function getStatusIcon(status: OrderStatus) {
  switch (status) {
    case "Delivered":
      return <CheckCircle2 size={15} />;

    case "Shipped":
    case "Out for Delivery":
      return <Truck size={15} />;

    case "Processing":
    case "Confirmed":
      return <Package size={15} />;

    case "Cancelled":
      return <XCircle size={15} />;

    case "Returned":
    case "Refunded":
      return <RotateCcw size={15} />;

    case "Pending":
    default:
      return <Clock3 size={15} />;
  }
}

/* =========================================================
   STATUS STYLE
========================================================= */

function getStatusStyle(status: OrderStatus): string {
  switch (status) {
    case "Delivered":
      return "bg-emerald-500/10 text-emerald-500";

    case "Shipped":
    case "Out for Delivery":
      return "bg-purple-500/10 text-purple-500";

    case "Processing":
    case "Confirmed":
      return "bg-blue-500/10 text-blue-500";

    case "Cancelled":
    case "Returned":
    case "Refunded":
      return "bg-red-500/10 text-red-500";

    case "Pending":
    default:
      return "bg-yellow-500/10 text-yellow-500";
  }
}

/* =========================================================
   ORDER DETAILS
========================================================= */

export default function OrderDetails() {
  const [status, setStatus] = useState<OrderStatus>(
    order.status
  );

  const [savedStatus, setSavedStatus] =
    useState<OrderStatus>(order.status);

  const handleUpdateStatus = () => {
    setSavedStatus(status);
  };

  const currentTimelineIndex =
    timeline.indexOf(savedStatus);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#08090b] dark:text-white">
      <div className="mx-auto max-w-[1600px]">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link
              to="/admin/orders"
              className="mb-4 inline-flex items-center gap-2 text-[12px] font-medium text-gray-500 transition-colors hover:text-orange-500"
            >
              <ArrowLeft size={16} />
              Back to Orders
            </Link>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                <ShoppingBag size={20} />
              </div>

              <div>
                <h1 className="text-[28px] font-bold tracking-tight sm:text-[34px]">
                  Order Details
                </h1>

                <p className="mt-1 text-[12px] text-gray-500 dark:text-gray-400">
                  {order.id} • {order.date}
                </p>
              </div>
            </div>
          </div>

          <span
            className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-[12px] font-semibold ${getStatusStyle(
              savedStatus
            )}`}
          >
            {getStatusIcon(savedStatus)}
            {savedStatus}
          </span>
        </div>

        {/* =================================================
            UPDATE STATUS
        ================================================= */}

        <div className="mb-7 rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-[#0d1017]">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="text-[12px] font-semibold text-gray-500 dark:text-gray-400">
                Update Order Status
              </p>

              <h2 className="mt-1 text-[16px] font-bold">
                Manage order progress
              </h2>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row xl:w-auto">
              <select
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value as OrderStatus
                  )
                }
                className="h-11 rounded-xl border border-gray-200 bg-gray-50 px-4 text-[12px] text-gray-900 outline-none focus:border-orange-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
              >
                {statusOptions.map((item) => (
                  <option
                    key={item}
                    value={item}
                    className="text-gray-900"
                  >
                    {item}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={handleUpdateStatus}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-5 text-[12px] font-semibold text-white shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5"
              >
                <Save size={16} />
                Update Status
              </button>
            </div>
          </div>

          {/* STATUS TIMELINE */}
          <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {timeline.map((item, index) => {
              const completed =
                currentTimelineIndex >= 0 &&
                index <= currentTimelineIndex;

              const active = savedStatus === item;

              return (
                <div key={item}>
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      completed
                        ? "bg-orange-500 text-white"
                        : "bg-gray-100 text-gray-400 dark:bg-white/5"
                    }`}
                  >
                    {getStatusIcon(item)}
                  </div>

                  <p
                    className={`mt-2 text-[10px] font-semibold ${
                      active
                        ? "text-orange-500"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {item}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <div className="grid grid-cols-1 gap-7 xl:grid-cols-[1fr_380px]">

          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <div className="space-y-7">

            {/* ORDER ITEMS */}
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0d1017]">
              <div className="border-b border-gray-200 px-5 py-4 dark:border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-[16px] font-bold">
                      Order Items
                    </h2>

                    <p className="mt-1 text-[10px] text-gray-500">
                      {order.products.length} products
                    </p>
                  </div>

                  <ShoppingBag
                    size={20}
                    className="text-orange-500"
                  />
                </div>
              </div>

              {order.products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 border-b border-gray-100 px-5 py-4 last:border-b-0 dark:border-white/5"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-16 w-16 rounded-xl object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <h3 className="text-[12px] font-semibold">
                      {product.name}
                    </h3>

                    <p className="mt-1 text-[10px] text-gray-500">
                      SKU: {product.sku}
                    </p>

                    <p className="mt-1 text-[10px] text-gray-500">
                      Qty: {product.quantity}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[12px] font-semibold">
                      ₹
                      {(
                        product.price *
                        product.quantity
                      ).toLocaleString("en-IN")}
                    </p>

                    <p className="mt-1 text-[10px] text-gray-500">
                      ₹
                      {product.price.toLocaleString(
                        "en-IN"
                      )}{" "}
                      each
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CUSTOMER INFORMATION */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-[#0d1017]">
              <div className="mb-5 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                  <User size={18} />
                </div>

                <div>
                  <h2 className="text-[16px] font-bold">
                    Customer Information
                  </h2>

                  <p className="text-[10px] text-gray-500">
                    Customer details
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-[10px] text-gray-500">
                    Name
                  </p>

                  <p className="mt-1 text-[12px] font-semibold">
                    {order.customer}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] text-gray-500">
                    Email
                  </p>

                  <div className="mt-1 flex items-center gap-1.5">
                    <Mail
                      size={13}
                      className="text-gray-400"
                    />

                    <p className="text-[12px]">
                      {order.email}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] text-gray-500">
                    Phone
                  </p>

                  <div className="mt-1 flex items-center gap-1.5">
                    <Phone
                      size={13}
                      className="text-gray-400"
                    />

                    <p className="text-[12px]">
                      {order.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* SHIPPING ADDRESS */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-[#0d1017]">
              <div className="mb-5 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500">
                  <MapPin size={18} />
                </div>

                <div>
                  <h2 className="text-[16px] font-bold">
                    Shipping Address
                  </h2>

                  <p className="text-[10px] text-gray-500">
                    Delivery address
                  </p>
                </div>
              </div>

              <p className="text-[12px] leading-6 text-gray-600 dark:text-gray-300">
                {order.address.house}
                <br />
                {order.address.city},{" "}
                {order.address.state}
                <br />
                India - {order.address.pincode}
              </p>
            </div>
          </div>

          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <div className="space-y-7">

            {/* PAYMENT */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-[#0d1017]">
              <div className="mb-5 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                  <CreditCard size={18} />
                </div>

                <div>
                  <h2 className="text-[16px] font-bold">
                    Payment
                  </h2>

                  <p className="text-[10px] text-gray-500">
                    Payment information
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[12px] text-gray-500">
                    Method
                  </span>

                  <span className="text-[12px] font-semibold">
                    {order.paymentMethod}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[12px] text-gray-500">
                    Status
                  </span>

                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-500">
                    {order.paymentStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* PRICE SUMMARY */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-[#0d1017]">
              <div className="mb-5 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                  <IndianRupee size={18} />
                </div>

                <div>
                  <h2 className="text-[16px] font-bold">
                    Price Summary
                  </h2>

                  <p className="text-[10px] text-gray-500">
                    Order amount details
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[12px] text-gray-500">
                    Subtotal
                  </span>

                  <span className="text-[12px]">
                    ₹
                    {order.subtotal.toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[12px] text-gray-500">
                    Discount
                  </span>

                  <span className="text-[12px] text-emerald-500">
                    -₹
                    {order.discount.toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[12px] text-gray-500">
                    Shipping
                  </span>

                  <span className="text-[12px]">
                    ₹
                    {order.shipping.toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[12px] text-gray-500">
                    Tax / GST
                  </span>

                  <span className="text-[12px]">
                    ₹
                    {order.tax.toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-3 dark:border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-semibold">
                      Total
                    </span>

                    <span className="text-[18px] font-bold text-orange-500">
                      ₹
                      {order.total.toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ORDER INFORMATION */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-[#0d1017]">
              <h2 className="mb-5 text-[16px] font-bold">
                Order Information
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-[12px] text-gray-500">
                    Order ID
                  </span>

                  <span className="text-[12px] font-semibold">
                    {order.id}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[12px] text-gray-500">
                    Order Date
                  </span>

                  <span className="text-[12px]">
                    {order.date}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[12px] text-gray-500">
                    Current Status
                  </span>

                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusStyle(
                      savedStatus
                    )}`}
                  >
                    {savedStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}