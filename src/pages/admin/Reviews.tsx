import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  Eye,
  CheckCircle2,
  XCircle,
  Trash2,
  Star,
  MessageSquare,
  Clock3,
  Flag,
  User,
  Package,
  ChevronDown,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type ReviewStatus = "Published" | "Pending" | "Hidden";

interface Review {
  id: string;
  customer: string;
  email: string;
  product: string;
  rating: number;
  review: string;
  date: string;
  status: ReviewStatus;
  reported: boolean;
}

/* =========================================================
   REVIEW DATA
========================================================= */

const reviews: Review[] = [
  {
    id: "REV-1001",
    customer: "Rahul Sharma",
    email: "rahul@example.com",
    product: "Premium Almonds",
    rating: 5,
    review:
      "Very good quality almonds. Fresh and nicely packed. Highly recommended.",
    date: "07 Oct 2026",
    status: "Published",
    reported: false,
  },
  {
    id: "REV-1002",
    customer: "Amit Kumar",
    email: "amit@example.com",
    product: "Pure Mustard Oil",
    rating: 4,
    review:
      "Good quality oil and the packaging was also very good.",
    date: "07 Oct 2026",
    status: "Published",
    reported: false,
  },
  {
    id: "REV-1003",
    customer: "Priya Singh",
    email: "priya@example.com",
    product: "Pure Cow Ghee",
    rating: 5,
    review:
      "Excellent taste and quality. Will definitely order again.",
    date: "06 Oct 2026",
    status: "Pending",
    reported: false,
  },
  {
    id: "REV-1004",
    customer: "Neha Verma",
    email: "neha@example.com",
    product: "Premium Cashews",
    rating: 3,
    review:
      "Product quality is okay but delivery took longer than expected.",
    date: "06 Oct 2026",
    status: "Pending",
    reported: true,
  },
  {
    id: "REV-1005",
    customer: "Vikas Gupta",
    email: "vikas@example.com",
    product: "Groundnut Oil",
    rating: 2,
    review:
      "The product was not as expected. Packaging could be improved.",
    date: "05 Oct 2026",
    status: "Hidden",
    reported: true,
  },
  {
    id: "REV-1006",
    customer: "Anjali Mehta",
    email: "anjali@example.com",
    product: "Organic Almonds",
    rating: 5,
    review:
      "Amazing product. Fresh, tasty and delivered on time.",
    date: "05 Oct 2026",
    status: "Published",
    reported: false,
  },
  {
    id: "REV-1007",
    customer: "Rohit Singh",
    email: "rohit@example.com",
    product: "Cow Ghee",
    rating: 4,
    review:
      "Good ghee with nice aroma and taste.",
    date: "04 Oct 2026",
    status: "Published",
    reported: false,
  },
  {
    id: "REV-1008",
    customer: "Pooja Sharma",
    email: "pooja@example.com",
    product: "Mustard Oil",
    rating: 1,
    review:
      "Not satisfied with the product.",
    date: "03 Oct 2026",
    status: "Hidden",
    reported: true,
  },
];

/* =========================================================
   FILTER OPTIONS
========================================================= */

const statusOptions: (ReviewStatus | "All")[] = [
  "All",
  "Published",
  "Pending",
  "Hidden",
];

const ratingOptions = [
  "All",
  "5 Stars",
  "4 Stars",
  "3 Stars",
  "2 Stars",
  "1 Star",
];

/* =========================================================
   STAR COMPONENT
========================================================= */

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300 dark:text-gray-600"
          }
        />
      ))}
    </div>
  );
}

/* =========================================================
   STATUS STYLE
========================================================= */

function getStatusStyle(status: ReviewStatus) {
  switch (status) {
    case "Published":
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";

    case "Pending":
      return "border-yellow-500/20 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400";

    case "Hidden":
      return "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400";

    default:
      return "border-gray-200 bg-gray-100 text-gray-500";
  }
}

/* =========================================================
   REVIEWS
========================================================= */

export default function Reviews() {
  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState<
    ReviewStatus | "All"
  >("All");

  const [ratingFilter, setRatingFilter] =
    useState("All");

  const [showFilter, setShowFilter] = useState(false);

  /* =========================================================
     FILTER REVIEWS
  ========================================================= */

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        review.id.toLowerCase().includes(searchValue) ||
        review.customer.toLowerCase().includes(searchValue) ||
        review.email.toLowerCase().includes(searchValue) ||
        review.product.toLowerCase().includes(searchValue) ||
        review.review.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        review.status === statusFilter;

      const selectedRating =
        ratingFilter === "All"
          ? null
          : Number(ratingFilter.charAt(0));

      const matchesRating =
        selectedRating === null ||
        review.rating === selectedRating;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesRating
      );
    });
  }, [search, statusFilter, ratingFilter]);

  /* =========================================================
     STATS
  ========================================================= */

  const publishedReviews = reviews.filter(
    (review) => review.status === "Published"
  ).length;

  const pendingReviews = reviews.filter(
    (review) => review.status === "Pending"
  ).length;

  const reportedReviews = reviews.filter(
    (review) => review.reported
  ).length;

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (total, review) => total + review.rating,
            0
          ) / reviews.length
        ).toFixed(1)
      : "0.0";

  const stats = [
    {
      title: "Total Reviews",
      value: reviews.length,
      subtitle: "All customer reviews",
      icon: MessageSquare,
      color: "text-orange-500 bg-orange-500/10",
    },
    {
      title: "Published",
      value: publishedReviews,
      subtitle: "Visible to customers",
      icon: CheckCircle2,
      color: "text-emerald-500 bg-emerald-500/10",
    },
    {
      title: "Pending",
      value: pendingReviews,
      subtitle: "Waiting for approval",
      icon: Clock3,
      color: "text-yellow-500 bg-yellow-500/10",
    },
    {
      title: "Average Rating",
      value: `${averageRating} ⭐`,
      subtitle: "Customer satisfaction",
      icon: Star,
      color: "text-yellow-500 bg-yellow-500/10",
    },
    {
      title: "Reported",
      value: reportedReviews,
      subtitle: "Needs attention",
      icon: Flag,
      color: "text-red-500 bg-red-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#08090b] dark:text-white">
      <div className="mx-auto max-w-[1600px]">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-7">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
              <MessageSquare size={19} />
            </div>

            <span className="text-[12px] font-semibold text-orange-500">
              Store Management
            </span>
          </div>

          <h1 className="text-[28px] font-bold tracking-tight sm:text-[34px]">
            Reviews
          </h1>

          <p className="mt-2 text-[12px] text-gray-500 dark:text-gray-400">
            Manage customer reviews and product feedback.
          </p>
        </div>

        {/* =================================================
            STATS
        ================================================= */}

        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {stats.map((item) => {
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

        {/* =================================================
            SEARCH / FILTER
        ================================================= */}

        <div className="mb-7 rounded-2xl border border-gray-200 bg-white p-4 dark:border-white/10 dark:bg-[#0d1017]">
          <div className="flex flex-col gap-3 xl:flex-row">

            {/* SEARCH */}
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search by customer, product or review..."
                className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-[12px] text-gray-900 outline-none placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
              />
            </div>

            {/* FILTER */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setShowFilter((prev) => !prev)
                }
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-5 text-[12px] font-medium text-gray-700 hover:border-orange-300 hover:text-orange-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-300 xl:w-auto"
              >
                <Filter size={17} />
                Filter
                <ChevronDown size={15} />
              </button>

              {showFilter && (
                <div className="absolute right-0 top-14 z-50 w-60 rounded-xl border border-gray-200 bg-white p-3 shadow-xl dark:border-white/10 dark:bg-[#11151d]">

                  {/* STATUS */}
                  <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                    Review Status
                  </p>

                  <div className="space-y-1">
                    {statusOptions.map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() =>
                          setStatusFilter(status)
                        }
                        className={`w-full rounded-lg px-3 py-2 text-left text-[12px] transition-colors ${
                          statusFilter === status
                            ? "bg-orange-500/10 text-orange-500"
                            : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>

                  {/* RATING */}
                  <div className="mt-3 border-t border-gray-200 pt-3 dark:border-white/10">
                    <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                      Rating
                    </p>

                    <div className="space-y-1">
                      {ratingOptions.map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() =>
                            setRatingFilter(rating)
                          }
                          className={`w-full rounded-lg px-3 py-2 text-left text-[12px] transition-colors ${
                            ratingFilter === rating
                              ? "bg-orange-500/10 text-orange-500"
                              : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
                          }`}
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* CLEAR */}
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setStatusFilter("All");
                      setRatingFilter("All");
                      setShowFilter(false);
                    }}
                    className="mt-3 w-full rounded-lg border border-gray-200 px-3 py-2 text-[12px] font-medium text-gray-600 hover:border-orange-300 hover:text-orange-500 dark:border-white/10 dark:text-gray-300"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* FILTER INFO */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] text-gray-500 dark:text-gray-400">
            <span>Status:</span>

            <span className="rounded-full bg-orange-500/10 px-3 py-1 font-medium text-orange-500">
              {statusFilter}
            </span>

            <span className="rounded-full bg-yellow-500/10 px-3 py-1 font-medium text-yellow-600 dark:text-yellow-400">
              Rating: {ratingFilter}
            </span>

            <span>
              • {filteredReviews.length} reviews
            </span>
          </div>
        </div>

        {/* =================================================
            REVIEWS TABLE
        ================================================= */}

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0d1017]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1250px] border-collapse">

              {/* TABLE HEADER */}
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/[0.025]">
                  {[
                    "Customer",
                    "Product",
                    "Rating",
                    "Review",
                    "Date",
                    "Status",
                    "Action",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className={`px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 ${
                        heading === "Action"
                          ? "text-right"
                          : "text-left"
                      }`}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* TABLE BODY */}
              <tbody>
                {filteredReviews.length > 0 ? (
                  filteredReviews.map((review) => (
                    <tr
                      key={review.id}
                      className="border-b border-gray-100 transition-colors last:border-b-0 hover:bg-orange-50/50 dark:border-white/5 dark:hover:bg-orange-500/[0.03]"
                    >

                      {/* CUSTOMER */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
                            <User size={17} />
                          </div>

                          <div>
                            <h3 className="text-[12px] font-semibold">
                              {review.customer}
                            </h3>

                            <p className="text-[10px] text-gray-500">
                              {review.email}
                            </p>

                            <span className="text-[9px] text-gray-400">
                              {review.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* PRODUCT */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500">
                            <Package size={15} />
                          </div>

                          <div>
                            <p className="text-[12px] font-semibold">
                              {review.product}
                            </p>

                            <p className="text-[10px] text-gray-500">
                              Product review
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* RATING */}
                      <td className="px-5 py-4">
                        <RatingStars
                          rating={review.rating}
                        />

                        <p className="mt-1 text-[10px] font-medium text-gray-500">
                          {review.rating}/5
                        </p>
                      </td>

                      {/* REVIEW */}
                      <td className="px-5 py-4">
                        <p className="max-w-[350px] text-[12px] leading-5 text-gray-500 dark:text-gray-400">
                          {review.review}
                        </p>

                        {review.reported && (
                          <span className="mt-1 inline-flex items-center gap-1 text-[9px] font-semibold text-red-500">
                            <Flag size={10} />
                            Reported
                          </span>
                        )}
                      </td>

                      {/* DATE */}
                      <td className="px-5 py-4">
                        <p className="text-[12px] text-gray-500 dark:text-gray-400">
                          {review.date}
                        </p>
                      </td>

                      {/* STATUS */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[9px] font-semibold ${getStatusStyle(
                            review.status
                          )}`}
                        >
                          {review.status === "Published" && (
                            <CheckCircle2 size={12} />
                          )}

                          {review.status === "Pending" && (
                            <Clock3 size={12} />
                          )}

                          {review.status === "Hidden" && (
                            <XCircle size={12} />
                          )}

                          {review.status}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">

                          {/* VIEW */}
                          <button
                            type="button"
                            title="View Review"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:border-orange-300 hover:text-orange-500 dark:border-white/10 dark:text-gray-400"
                          >
                            <Eye size={16} />
                          </button>

                          {/* APPROVE */}
                          {review.status === "Pending" && (
                            <button
                              type="button"
                              title="Approve Review"
                              className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 transition-colors hover:bg-emerald-500 hover:text-white"
                            >
                              <CheckCircle2 size={16} />
                            </button>
                          )}

                          {/* HIDE */}
                          {review.status === "Published" && (
                            <button
                              type="button"
                              title="Hide Review"
                              className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-500/10 text-yellow-500 transition-colors hover:bg-yellow-500 hover:text-white"
                            >
                              <XCircle size={16} />
                            </button>
                          )}

                          {/* DELETE */}
                          <button
                            type="button"
                            title="Delete Review"
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 text-red-500 transition-colors hover:bg-red-500 hover:text-white"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-16 text-center"
                    >
                      <MessageSquare
                        size={30}
                        className="mx-auto text-orange-500"
                      />

                      <h3 className="mt-5 text-[16px] font-bold">
                        No reviews found
                      </h3>

                      <p className="mt-2 text-[12px] text-gray-500">
                        Try changing your search or filters.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* FOOTER */}
          <div className="border-t border-gray-200 px-5 py-4 text-[12px] text-gray-500 dark:border-white/10">
            Showing {filteredReviews.length} of{" "}
            {reviews.length} reviews
          </div>
        </div>
      </div>
    </div>
  );
}