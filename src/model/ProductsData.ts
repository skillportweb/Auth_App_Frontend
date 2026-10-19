export default interface ProductData {
  productName: string;
  categoryId: string;
  subCategoryId: string;
  brand: string;
  shortDescription: string;
  fullDescription: string;
  mrp: number;
  sellingPrice: number;
  stockQuantity: number;
  lowStockAlert: number;
  netWeight: number;
  unit: string;
  packagingType: string;
  countryOfOrigin: string;
  ingredients: string;
  images: string[];
  status: string;
  featured: boolean;
}