import {
  CategoryList,
  Product,
  ProductCategories,
} from "../api/productsApi.types";
import { makeAutoObservable } from "mobx";
enum ErrorMessages {
  FETCH_PRODUCTS = "Failed to load products",
  FETCH_PRODUCT_DETAILS = "Failed to load product details",
  FETCH_CATEGORIES = "Failed to load categories",
  FETCH_CATEGORY_LIST = "Failed to load category list",
  SEARCH_PRODUCTS = "Failed to search products",
  FETCH_PRODUCTS_BY_CATEGORY = "Failed to load products by category",
  ADD_PRODUCT = "Failed to add product",
  UPDATE_PRODUCT = "Failed to update product",
  DELETE_PRODUCT = "Failed to delete product",
}

interface ProductsState {
  products: Product[];
  filteredProducts: Product[];
  productDetails: Product | null;
  categories: ProductCategories[];
  categoryList: CategoryList;
  total: number;
  loading: boolean;
  error: { message: ErrorMessages; details?: string } | null;
}

class ProductsStore {
  allProducts: Product[] = [];
  filteredProducts: Product[] | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setAllProducts(products: Product[]) {
    this.allProducts = products;
    this.filteredProducts = null;
  }

  setFilteredProducts(products: Product[]) {
    this.filteredProducts = products;
  }

  resetFilters() {
    this.filteredProducts = null;
  }

  get productsToShow(): Product[] {
    return this.filteredProducts ?? this.allProducts;
  }
}

export const productsStore = new ProductsStore();
