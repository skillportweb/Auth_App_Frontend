import apiClient from "@/config/ApiClient";
import type SubCategoriesData from "@/model/SubCategoriesData";

export const createSubCategory = async (
  subCategoryData: SubCategoriesData
) => {
  const response = await apiClient.post(
    "/sub-categories",
    subCategoryData
  );
  return response.data;
};

export const getAllSubCategories = async () => {
  const response = await apiClient.get("/sub-categories");
  return response.data;
};

export const getSubCategoryById = async (id: string) => {
  const response = await apiClient.get(`/sub-categories/${id}`);
  return response.data;
};

export const updateSubCategory = async (
  id: string,
  subCategoryData: SubCategoriesData
) => {
  const response = await apiClient.put(
    `/sub-categories/${id}`,
    subCategoryData
  );
  return response.data;
};

export const deleteSubCategory = async (id: string) => {
  const response = await apiClient.delete(`/sub-categories/${id}`);
  return response.data;
};