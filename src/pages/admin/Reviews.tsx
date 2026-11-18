
import { useCallback, useEffect, useMemo, useState } from "react";
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
  X,
  RefreshCw,
  AlertTriangle,
  ShieldCheck,
  Trash,
} from "lucide-react";

import {
  getAllRatings,
  getRatingById,
  updateRatingStatus,
  deleteRating,
} from "@/services/RatingServices";

import type RatingData from "@/model/RatingData";
import type { RatingStatus } from "@/model/RatingData";

/* =========================================================
   TYPES
========================================================= */

type ReviewStatus = "All" | RatingStatus;
type Review = RatingData;

type ConfirmationAction = {
  id: string;
  type: "status" | "delete";
  status?: RatingStatus;
};

const statusOptions: ReviewStatus[] = [
  "All",
  "PUBLISHED",
  "PENDING",
  "HIDDEN",
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
   HELPERS
========================================================= */

const getErrorMessage = (error: unknown): string => {
  const err = error as {
    response?: {
      data?: {
        message?: string;
      };
    };
    message?: string;
  };

  return (
    err.response?.data?.message ||
    err.message ||
    "Something went wrong. Please try again."
  );
};

const formatDate = (date: string): string => {
  if (!date) return "-";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getStatusLabel = (status: RatingStatus): string => {
  switch (status) {
    case "PUBLISHED":
      return "Published";
    case "PENDING":
      return "Pending";
    case "HIDDEN":
      return "Hidden";
    default:
      return status;
  }
};

function getStatusStyle(status: RatingStatus): string {
  switch (status) {
    case "PUBLISHED":
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";

    case "PENDING":
      return "border-yellow-500/20 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400";

    case "HIDDEN":
      return "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400";

    default:
      return "border-gray-200 bg-gray-100 text-gray-500";
  }
}

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
   MAIN COMPONENT
========================================================= */

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState<ReviewStatus>("All");

  const [ratingFilter, setRatingFilter] = useState("All");
  const [showFilter, setShowFilter] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");

  const [actionLoading, setActionLoading] =
    useState<string | null>(null);

  const [selectedReview, setSelectedReview] =
    useState<Review | null>(null);

  const [showDetails, setShowDetails] = useState(false);

  // Custom confirmation modal state
  const [confirmation, setConfirmation] =
    useState<ConfirmationAction | null>(null);

  /* =========================================================
     GET ALL REVIEWS API
  ========================================================= */

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllRatings();

      setReviews(Array.isArray(response) ? response : []);
    } catch (err) {
      setError(getErrorMessage(err));
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  /* =========================================================
     GET REVIEW BY ID API
  ========================================================= */

  const handleViewReview = async (id: string) => {
    try {
      setActionError("");
      setActionLoading(id);

      const response = await getRatingById(id);

      setSelectedReview(response);
      setShowDetails(true);
    } catch (err) {
      setActionError(getErrorMessage(err));
    } finally {
      setActionLoading(null);
    }
  };

  /* =========================================================
     OPEN STATUS CONFIRMATION MODAL
  ========================================================= */

  const handleUpdateStatus = (
    id: string,
    status: RatingStatus
  ) => {
    setActionError("");

    setConfirmation({
      id,
      type: "status",
      status,
    });
  };

  /* =========================================================
     OPEN DELETE CONFIRMATION MODAL
  ========================================================= */

  const handleDeleteReview = (id: string) => {
    setActionError("");

    setConfirmation({
      id,
      type: "delete",
    });
  };

  /* =========================================================
     CONFIRM ACTION
  ========================================================= */

  const confirmAction = async () => {
    if (!confirmation) return;

    const { id, type, status } = confirmation;

    try {
      setActionError("");
      setActionLoading(id);

      if (type === "status" && status) {
        await updateRatingStatus(id, status);

        setReviews((prev) =>
          prev.map((review) =>
            review.id === id
              ? { ...review, status }
              : review
          )
        );

        setSelectedReview((prev) =>
          prev?.id === id
            ? { ...prev, status }
            : prev
        );
      }

      if (type === "delete") {
        await deleteRating(id);

        setReviews((prev) =>
          prev.filter((review) => review.id !== id)
        );

        if (selectedReview?.id === id) {
          setSelectedReview(null);
          setShowDetails(false);
        }
      }

      setConfirmation(null);
    } catch (err) {
      setActionError(getErrorMessage(err));
      setConfirmation(null);
    } finally {
      setActionLoading(null);
    }
  };

  /* =========================================================
     FILTER REVIEWS
  ========================================================= */

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        (review.id || "").toLowerCase().includes(searchValue) ||
        (review.customerName || "").toLowerCase().includes(searchValue) ||
        (review.customerEmail || "").toLowerCase().includes(searchValue) ||
        (review.productName || "").toLowerCase().includes(searchValue) ||
        (review.review || "").toLowerCase().includes(searchValue);

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

      return matchesSearch && matchesStatus && matchesRating;
    });
  }, [reviews, search, statusFilter, ratingFilter]);

  /* =========================================================
     STATS
  ========================================================= */

  const publishedReviews = reviews.filter(
    (review) => review.status === "PUBLISHED"
  ).length;

  const pendingReviews = reviews.filter(
    (review) => review.status === "PENDING"
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

  /* =========================================================
     CONFIRMATION MODAL CONTENT
  ========================================================= */

  const isDeleteAction = confirmation?.type === "delete";
  const isPublishAction =
    confirmation?.type === "status" &&
    confirmation.status === "PUBLISHED";

  const confirmationTitle = isDeleteAction
    ? "Delete Review?"
    : isPublishAction
      ? "Publish Review?"
      : "Hide Review?";

  const confirmationDescription = isDeleteAction
    ? "Are you sure you want to delete this review? This action cannot be undone."
    : isPublishAction
      ? "Are you sure you want to publish this review? It will become visible to customers."
      : "Are you sure you want to hide this review? Customers will no longer be able to see it.";

  const ConfirmationIcon = isDeleteAction
    ? Trash
    : isPublishAction
      ? ShieldCheck
      : AlertTriangle;

  const confirmationIconStyle = isDeleteAction
    ? "bg-red-500/10 text-red-500"
    : isPublishAction
      ? "bg-emerald-500/10 text-emerald-500"
      : "bg-yellow-500/10 text-yellow-500";

  const confirmButtonStyle = isDeleteAction
    ? "bg-red-500 hover:bg-red-600"
    : isPublishAction
      ? "bg-emerald-500 hover:bg-emerald-600"
      : "bg-yellow-500 hover:bg-yellow-600";

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center bg-gray-50 dark:bg-[#08090b]">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw
            size={30}
            className="animate-spin text-orange-500"
          />

          <p className="text-sm text-gray-500">
            Loading reviews...
          </p>
        </div>
      </div>
    );
  }

  /* =========================================================
     UI
  ========================================================= */

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#08090b] dark:text-white">
      <div className="mx-auto max-w-[1600px]">

        {/* HEADER */}

        <div className="mb-7">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
              <MessageSquare size={19} />
            </div>

            <span className="text-[12px] font-semibold text-orange-500">
              Store Management
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-[28px] font-bold tracking-tight sm:text-[34px]">
                Reviews
              </h1>

              <p className="mt-2 text-[12px] text-gray-500 dark:text-gray-400">
                Manage customer reviews and product feedback.
              </p>
            </div>

            <button
              type="button"
              onClick={fetchReviews}
              className="flex h-10 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-[12px] font-medium text-gray-600 transition hover:border-orange-300 hover:text-orange-500 dark:border-white/10 dark:bg-[#0d1017] dark:text-gray-300"
            >
              <RefreshCw size={15} />
              Refresh
            </button>
          </div>
        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
            <span>{error}</span>

            <button
              type="button"
              onClick={fetchReviews}
              className="font-semibold underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* ACTION ERROR */}

        {actionError && (
          <div className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
            <span>{actionError}</span>

            <button
              type="button"
              onClick={() => setActionError("")}
              className="rounded-lg p-1 hover:bg-red-500/10"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* STATS */}

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

        {/* SEARCH / FILTER */}

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
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by customer, product or review..."
                className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-[12px] text-gray-900 outline-none placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
              />
            </div>

            {/* FILTER */}

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowFilter((prev) => !prev)}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-5 text-[12px] font-medium text-gray-700 hover:border-orange-300 hover:text-orange-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-300 xl:w-auto"
              >
                <Filter size={17} />
                Filter
                <ChevronDown size={15} />
              </button>

              {showFilter && (
                <div className="absolute right-0 top-14 z-50 w-60 rounded-xl border border-gray-200 bg-white p-3 shadow-xl dark:border-white/10 dark:bg-[#11151d]">

                  <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                    Review Status
                  </p>

                  <div className="space-y-1">
                    {statusOptions.map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setStatusFilter(status)}
                        className={`w-full rounded-lg px-3 py-2 text-left text-[12px] transition-colors ${
                          statusFilter === status
                            ? "bg-orange-500/10 text-orange-500"
                            : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
                        }`}
                      >
                        {status === "All"
                          ? "All"
                          : getStatusLabel(status)}
                      </button>
                    ))}
                  </div>

                  <div className="mt-3 border-t border-gray-200 pt-3 dark:border-white/10">
                    <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                      Rating
                    </p>

                    <div className="space-y-1">
                      {ratingOptions.map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => setRatingFilter(rating)}
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
              {statusFilter === "All"
                ? "All"
                : getStatusLabel(statusFilter)}
            </span>

            <span className="rounded-full bg-yellow-500/10 px-3 py-1 font-medium text-yellow-600 dark:text-yellow-400">
              Rating: {ratingFilter}
            </span>

            <span>• {filteredReviews.length} reviews</span>
          </div>
        </div>

        {/* REVIEWS TABLE */}

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0d1017]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1250px] border-collapse">

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
                              {review.customerName}
                            </h3>

                            <p className="text-[10px] text-gray-500">
                              {review.customerEmail}
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
                              {review.productName}
                            </p>

                            <p className="text-[10px] text-gray-500">
                              Product review
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* RATING */}

                      <td className="px-5 py-4">
                        <RatingStars rating={review.rating} />

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
                          {formatDate(review.createdAt)}
                        </p>
                      </td>

                      {/* STATUS */}

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[9px] font-semibold ${getStatusStyle(
                            review.status
                          )}`}
                        >
                          {review.status === "PUBLISHED" && (
                            <CheckCircle2 size={12} />
                          )}

                          {review.status === "PENDING" && (
                            <Clock3 size={12} />
                          )}

                          {review.status === "HIDDEN" && (
                            <XCircle size={12} />
                          )}

                          {getStatusLabel(review.status)}
                        </span>
                      </td>

                      {/* ACTIONS */}

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">

                          {/* VIEW */}

                          <button
                            type="button"
                            title="View Review"
                            disabled={actionLoading === review.id}
                            onClick={() => handleViewReview(review.id)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:border-orange-300 hover:text-orange-500 disabled:opacity-50 dark:border-white/10 dark:text-gray-400"
                          >
                            {actionLoading === review.id ? (
                              <RefreshCw
                                size={15}
                                className="animate-spin"
                              />
                            ) : (
                              <Eye size={16} />
                            )}
                          </button>

                          {/* PENDING: PUBLISH */}

                          {review.status === "PENDING" && (
                            <button
                              type="button"
                              title="Publish Review"
                              disabled={actionLoading === review.id}
                              onClick={() =>
                                handleUpdateStatus(
                                  review.id,
                                  "PUBLISHED"
                                )
                              }
                              className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 transition-colors hover:bg-emerald-500 hover:text-white disabled:opacity-50"
                            >
                              <CheckCircle2 size={16} />
                            </button>
                          )}

                          {/* PUBLISHED: HIDE */}

                          {review.status === "PUBLISHED" && (
                            <button
                              type="button"
                              title="Hide Review"
                              disabled={actionLoading === review.id}
                              onClick={() =>
                                handleUpdateStatus(
                                  review.id,
                                  "HIDDEN"
                                )
                              }
                              className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-500/10 text-yellow-500 transition-colors hover:bg-yellow-500 hover:text-white disabled:opacity-50"
                            >
                              <XCircle size={16} />
                            </button>
                          )}

                          {/* HIDDEN: PUBLISH AGAIN */}

                          {review.status === "HIDDEN" && (
                            <button
                              type="button"
                              title="Publish Again"
                              disabled={actionLoading === review.id}
                              onClick={() =>
                                handleUpdateStatus(
                                  review.id,
                                  "PUBLISHED"
                                )
                              }
                              className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 transition-colors hover:bg-emerald-500 hover:text-white disabled:opacity-50"
                            >
                              <CheckCircle2 size={16} />
                            </button>
                          )}

                          {/* DELETE */}

                          <button
                            type="button"
                            title="Delete Review"
                            disabled={actionLoading === review.id}
                            onClick={() => handleDeleteReview(review.id)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 text-red-500 transition-colors hover:bg-red-500 hover:text-white disabled:opacity-50"
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
                        {error
                          ? "Unable to load reviews from server."
                          : "Try changing your search or filters."}
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* FOOTER */}

          <div className="border-t border-gray-200 px-5 py-4 text-[12px] text-gray-500 dark:border-white/10">
            Showing {filteredReviews.length} of {reviews.length} reviews
          </div>
        </div>

        {/* =================================================
            REVIEW DETAILS MODAL
        ================================================= */}

        {showDetails && selectedReview && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-[3px]"
            onClick={() => setShowDetails(false)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="review-details-title"
              className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl dark:border-white/10 dark:bg-[#11151d]"
              onClick={(e) => e.stopPropagation()}
            >

              {/* MODAL HEADER */}

              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2
                    id="review-details-title"
                    className="text-lg font-bold"
                  >
                    Review Details
                  </h2>

                  <p className="mt-1 text-[11px] text-gray-500">
                    Review ID: {selectedReview.id}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowDetails(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:text-red-500 dark:border-white/10"
                >
                  <X size={18} />
                </button>
              </div>

              {/* CUSTOMER */}

              <div className="mb-4 rounded-xl bg-gray-50 p-4 dark:bg-white/[0.03]">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
                    <User size={19} />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold">
                      {selectedReview.customerName}
                    </h3>

                    <p className="text-xs text-gray-500">
                      {selectedReview.customerEmail}
                    </p>
                  </div>
                </div>
              </div>

              {/* PRODUCT */}

              <div className="mb-4">
                <p className="mb-1 text-[10px] font-semibold uppercase text-gray-400">
                  Product
                </p>

                <p className="text-sm font-semibold">
                  {selectedReview.productName}
                </p>

                <p className="text-[10px] text-gray-500">
                  Product ID: {selectedReview.productId}
                </p>
              </div>

              {/* RATING */}

              <div className="mb-4">
                <p className="mb-2 text-[10px] font-semibold uppercase text-gray-400">
                  Rating
                </p>

                <div className="flex items-center gap-3">
                  <RatingStars rating={selectedReview.rating} />

                  <span className="text-xs font-semibold text-gray-500">
                    {selectedReview.rating}/5
                  </span>
                </div>
              </div>

              {/* REVIEW */}

              <div className="mb-4">
                <p className="mb-2 text-[10px] font-semibold uppercase text-gray-400">
                  Customer Review
                </p>

                <p className="rounded-xl bg-gray-50 p-4 text-sm leading-6 text-gray-600 dark:bg-white/[0.03] dark:text-gray-300">
                  {selectedReview.review}
                </p>
              </div>

              {/* STATUS / DATE */}

              <div className="mb-5 grid grid-cols-2 gap-4">
                <div>
                  <p className="mb-1 text-[10px] font-semibold uppercase text-gray-400">
                    Status
                  </p>

                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold ${getStatusStyle(
                      selectedReview.status
                    )}`}
                  >
                    {getStatusLabel(selectedReview.status)}
                  </span>
                </div>

                <div>
                  <p className="mb-1 text-[10px] font-semibold uppercase text-gray-400">
                    Date
                  </p>

                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    {formatDate(selectedReview.createdAt)}
                  </p>
                </div>
              </div>

              {selectedReview.reported && (
                <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-500/10 p-3 text-xs font-medium text-red-500">
                  <Flag size={14} />
                  This review has been reported.
                </div>
              )}

              {/* MODAL ACTIONS */}

              <div className="flex flex-wrap justify-end gap-2 border-t border-gray-200 pt-4 dark:border-white/10">
                {selectedReview.status !== "PUBLISHED" && (
                  <button
                    type="button"
                    disabled={actionLoading === selectedReview.id}
                    onClick={() =>
                      handleUpdateStatus(
                        selectedReview.id,
                        "PUBLISHED"
                      )
                    }
                    className="rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-600 disabled:opacity-50"
                  >
                    Publish
                  </button>
                )}

                {selectedReview.status === "PUBLISHED" && (
                  <button
                    type="button"
                    disabled={actionLoading === selectedReview.id}
                    onClick={() =>
                      handleUpdateStatus(
                        selectedReview.id,
                        "HIDDEN"
                      )
                    }
                    className="rounded-lg bg-yellow-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-yellow-600 disabled:opacity-50"
                  >
                    Hide Review
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setShowDetails(false)}
                  className="rounded-lg border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =================================================
            CUSTOM CONFIRMATION MODAL
        ================================================= */}

        {confirmation && (
          <div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 p-4 backdrop-blur-[3px]"
            onClick={() => {
              if (!actionLoading) {
                setConfirmation(null);
              }
            }}
          >
            <div
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="confirmation-title"
              aria-describedby="confirmation-description"
              className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#11151d]"
              onClick={(e) => e.stopPropagation()}
            >

              {/* ICON + CLOSE */}

              <div className="mb-5 flex items-start justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${confirmationIconStyle}`}
                >
                  <ConfirmationIcon size={23} />
                </div>

                <button
                  type="button"
                  disabled={!!actionLoading}
                  onClick={() => setConfirmation(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 dark:hover:bg-white/5 dark:hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              {/* CONTENT */}

              <h2
                id="confirmation-title"
                className="text-lg font-bold text-gray-900 dark:text-white"
              >
                {confirmationTitle}
              </h2>

              <p
                id="confirmation-description"
                className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400"
              >
                {confirmationDescription}
              </p>

              {/* REVIEW REFERENCE */}

              <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-white/10 dark:bg-white/[0.03]">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                  Review ID
                </p>

                <p className="mt-1 break-all text-xs font-medium text-gray-700 dark:text-gray-300">
                  {confirmation.id}
                </p>
              </div>

              {/* BUTTONS */}

              <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  disabled={!!actionLoading}
                  onClick={() => setConfirmation(null)}
                  className="rounded-xl border border-gray-200 px-5 py-2.5 text-xs font-semibold text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={!!actionLoading}
                  onClick={confirmAction}
                  className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${confirmButtonStyle}`}
                >
                  {actionLoading === confirmation.id ? (
                    <>
                      <RefreshCw
                        size={14}
                        className="animate-spin"
                      />
                      Processing...
                    </>
                  ) : (
                    <>
                      {isDeleteAction ? (
                        <Trash2 size={14} />
                      ) : isPublishAction ? (
                        <CheckCircle2 size={14} />
                      ) : (
                        <XCircle size={14} />
                      )}

                      {isDeleteAction
                        ? "Yes, Delete"
                        : isPublishAction
                          ? "Yes, Publish"
                          : "Yes, Hide"}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
