import axios from "axios";
import {
  CategoryList,
  DeletedProduct,
  Product,
  ProductCategories,
  ProductResponse,
} from "./productsApi.types";

class ProductAPI {
  private baseURL: string;

  constructor(baseURL: string = "https://dummyjson.com/products") {
    this.baseURL = baseURL;
  }

  async fetchProducts(
    limit: number = 10,
    skip: number = 0,
  ): Promise<ProductResponse> {
    try {
      const response = await axios.get(
        `${this.baseURL}?limit=${limit}&skip=${skip}`,
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
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

export const productAPI = new ProductAPI();
