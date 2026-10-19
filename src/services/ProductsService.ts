import apiClient from "@/config/ApiClient";
import type ProductsData from "@/model/ProductsData";

// Upload product image
export const uploadProductImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post("/products/images", formData);

  return response.data.imageUrl;
};

// Create product
export const createProduct = async (productData: ProductsData) => {
  const response = await apiClient.post("/products", productData);
  return response.data;
};

// Get all products
export const getAllProducts = async () => {
  const response = await apiClient.get("/products");
  return response.data;
};

// Get product by ID
export const getProductById = async (id: string) => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};

// Update product
export const updateProduct = async (
  id: string,
  productData: ProductsData
) => {
  const response = await apiClient.put(`/products/${id}`, productData);
  return response.data;
};

// Delete product
export const deleteProduct = async (id: string) => {
  const response = await apiClient.delete(`/products/${id}`);
  return response.data;
};