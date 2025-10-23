import axios, { AxiosRequestConfig } from "axios";
import {
  CategoryList,
  DeletedProduct,
  Product,
  ProductCategories,
  ProductResponse,
} from "./productsApi.types";
import { apiService } from "../../../api/services";

export class ProductAPI {
  private baseURL: string;

  constructor(baseURL: string = "https://dummyjson.com/products") {
    this.baseURL = baseURL;
  }

  static async fetchProducts(
    params?: {
      limit?: number;
      skip?: number;
    },
    config: AxiosRequestConfig = {},
  ): Promise<ProductResponse> {
    return apiService
      .get<ProductResponse>("https://dummyjson.com/products", {
        params: params,
        ...config,
      })
      .then((response) => response.data);
  }

  async fetchProductById(id: number): Promise<Product> {
    try {
      const response = await axios.get(`${this.baseURL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async searchProducts(query: string): Promise<ProductResponse> {
    try {
      const response = await axios.get(`${this.baseURL}/search?q=${query}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async fetchProductsByParams(params: {
    limit?: number;
    skip?: number;
    select?: string;
  }): Promise<ProductResponse> {
    try {
      const urlParams = new URLSearchParams();

      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          urlParams.append(key, value.toString());
        }
      });

      const response = await axios.get(
        `${this.baseURL}?${urlParams.toString()}`,
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async fetchProductsBySort(params: {
    sortBy: string;
    order: "asc" | "desc";
  }): Promise<ProductResponse> {
    try {
      const urlParams = new URLSearchParams();

      urlParams.append("sortBy", params.sortBy);
      urlParams.append("order", params.order);

      const response = await axios.get(
        `${this.baseURL}?${urlParams.toString()}`,
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async fetchCategories(): Promise<ProductCategories[]> {
    try {
      const response = await axios.get(
        "https://dummyjson.com/products/categories",
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async fetchCategoryList(): Promise<CategoryList> {
    try {
      const response = await axios.get(
        "https://dummyjson.com/products/category-list",
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async fetchProductsByCategory(category: string): Promise<ProductResponse> {
    try {
      const response = await axios.get(
        `https://dummyjson.com/products/category/${category}`,
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addProduct(newProduct: Product): Promise<Product> {
    try {
      const response = await axios.post(`${this.baseURL}/add`, newProduct, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateProduct(id: number, updatedProduct: Product): Promise<Product> {
    try {
      const response = await axios.put(
        `${this.baseURL}/${id}`,
        updatedProduct,
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Удалить продукт
  async deleteProduct(id: number): Promise<DeletedProduct> {
    try {
      const response = await axios.delete(`${this.baseURL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
