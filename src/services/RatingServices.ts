
import apiClient from "@/config/ApiClient";
import type RatingData from "@/model/RatingData";
import type { RatingRequest, RatingStatus } from "@/model/RatingData";

// Customer: Create Rating
export const createRating = async (
  productId: string,
  ratingData: RatingRequest
) => {
  const response = await apiClient.post(
    `/products/${productId}/ratings`,
    ratingData
  );

  return response.data;
};

// Customer: Get Published Product Ratings
// export const getProductRatings = async (productId: string) => {
//   const response = await apiClient.get<RatingData[]>(
//     `/products/${productId}/ratings`
//   );

//   return response.data;
// };

// Admin: Get All Ratings
export const getAllRatings = async () => {
  const response = await apiClient.get<RatingData[]>(
    "/admin/ratings"
  );

  return response.data;
};

// Admin: Get Rating By ID
export const getRatingById = async (id: string) => {
  const response = await apiClient.get<RatingData>(
    `/admin/ratings/${id}`
  );

  return response.data;
};

// Admin: Update Rating Status
export const updateRatingStatus = async (
  id: string,
  status: RatingStatus
) => {
  const response = await apiClient.patch(
    `/admin/ratings/${id}/status`,
    { status }
  );

  return response.data;
};

// Admin: Delete Rating
export const deleteRating = async (id: string) => {
  const response = await apiClient.delete(
    `/admin/ratings/${id}`
  );

  return response.data;
};
