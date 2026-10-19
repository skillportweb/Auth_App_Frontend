
import apiClient from "@/config/ApiClient";
import type CategoriesData from "@/model/CategoriesData";

export const createCategory = async (
  categoryData: CategoriesData
) => {
  const response = await apiClient.post("/categories", categoryData);
  return response.data;
};

export const getAllCategories = async () => {
  const response = await apiClient.get("/categories");
  return response.data;
};

export const getCategoryById = async (id: string) => {
  const response = await apiClient.get(`/categories/${id}`);
  return response.data;
};

export const updateCategory = async (
  id: string,
  categoryData: CategoriesData
) => {
  const response = await apiClient.put(
    `/categories/${id}`,
    categoryData
  );
  return response.data;
};

export const deleteCategory = async (id: string) => {
  const response = await apiClient.delete(`/categories/${id}`);
  return response.data;
};
