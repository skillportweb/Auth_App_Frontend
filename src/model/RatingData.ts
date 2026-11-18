
export type RatingStatus = "PENDING" | "PUBLISHED" | "HIDDEN";

export interface RatingRequest {
  rating: number;
  review: string;
}

export default interface RatingData {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  productId: string;
  productName: string;
  rating: number;
  review: string;
  status: RatingStatus;
  reported: boolean;
  createdAt: string;
  updatedAt: string;
}
