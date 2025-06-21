import { makeAutoObservable, runInAction } from "mobx";
import {
  CategoryList,
  Product,
  ProductCategories,
} from "../api/productsApi.types";
import { productAPI } from "../api/productsApi";

// Перечисление с типами ошибок
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

// Интерфейс для состояния продуктов и категорий
interface ProductsState {
  products: Product[];
  productDetails: Product | null;
  categories: ProductCategories[];
  categoryList: CategoryList;
  total: number;
  loading: boolean;
  error: { message: ErrorMessages; details?: string } | null;
}

class ProductsStore {
  // Состояние магазина
  state: ProductsState = {
    products: [],
    productDetails: null,
    categories: [],
    categoryList: [],
    total: 0,
    loading: false,
    error: null,
  };

  constructor() {
    makeAutoObservable(this);
  }

  // Установить ошибку
  setError(error: { message: ErrorMessages; details?: string }) {
    this.state.error = error;
  }

  // Установить статус загрузки
  setLoading(loading: boolean) {
    this.state.loading = loading;
  }

  // Обработчик асинхронных данных с централизованной логикой
  private async fetchData<T>(
    apiCall: () => Promise<T>,
    errorMessage: ErrorMessages,
  ): Promise<T | null> {
    this.setLoading(true);
    this.setError({ message: errorMessage });

    try {
      const data = await apiCall();
      return data;
    } catch (error: any) {
      this.setError({ message: errorMessage, details: error.message });
      console.error(error);
      return null;
    } finally {
      this.setLoading(false);
    }
  }

  // Загрузить все продукты с пагинацией
  async fetchProducts(limit: number = 100, skip: number = 0) {
    const response = await this.fetchData(
      () => productAPI.fetchProducts(limit, skip),
      ErrorMessages.FETCH_PRODUCTS,
    );
    console.log("response", response);

    if (response) {
      runInAction(() => {
        this.state.products = response.products;
        this.state.total = response.total;
      });
    }
  }

  // Загрузить подробности продукта
  async fetchProductById(id: number) {
    const product = await this.fetchData(
      () => productAPI.fetchProductById(id),
      ErrorMessages.FETCH_PRODUCT_DETAILS,
    );

    if (product) {
      runInAction(() => {
        this.state.productDetails = product;
      });
    }
  }

  // Загрузить категории продуктов
  async fetchCategories() {
    const categories = await this.fetchData(
      () => productAPI.fetchCategories(),
      ErrorMessages.FETCH_CATEGORIES,
    );

    if (categories) {
      runInAction(() => {
        this.state.categories = categories;
      });
    }
  }

  // Загрузить список категорий
  async fetchCategoryList() {
    const categoryList = await this.fetchData(
      () => productAPI.fetchCategoryList(),
      ErrorMessages.FETCH_CATEGORY_LIST,
    );

    if (categoryList) {
      runInAction(() => {
        this.state.categoryList = categoryList;
      });
    }
  }

  // Поиск продуктов по запросу
  async searchProducts(query: string) {
    const response = await this.fetchData(
      () => productAPI.searchProducts(query),
      ErrorMessages.SEARCH_PRODUCTS,
    );

    if (response) {
      runInAction(() => {
        this.state.products = response.products;
        this.state.total = response.total;
      });
    }
  }

  // Фильтрация продуктов по категории
  async fetchProductsByCategory(category: string) {
    const response = await this.fetchData(
      () => productAPI.fetchProductsByCategory(category),
      ErrorMessages.FETCH_PRODUCTS_BY_CATEGORY,
    );

    if (response) {
      runInAction(() => {
        this.state.products = response.products;
        this.state.total = response.total;
      });
    }
  }

  // Добавить новый продукт
  async addProduct(newProduct: Product) {
    const addedProduct = await this.fetchData(
      () => productAPI.addProduct(newProduct),
      ErrorMessages.ADD_PRODUCT,
    );

    if (addedProduct) {
      runInAction(() => {
        this.state.products.push(addedProduct);
      });
    }
  }

  // Обновить продукт
  async updateProduct(id: number, updatedProduct: Product) {
    const updated = await this.fetchData(
      () => productAPI.updateProduct(id, updatedProduct),
      ErrorMessages.UPDATE_PRODUCT,
    );

    if (updated) {
      runInAction(() => {
        const index = this.state.products.findIndex(
          (product) => product.id === id,
        );
        if (index !== -1) {
          this.state.products[index] = updated;
        }
      });
    }
  }

  // Удалить продукт
  async deleteProduct(id: number) {
    const success = await this.fetchData(
      () => productAPI.deleteProduct(id),
      ErrorMessages.DELETE_PRODUCT,
    );

    if (success) {
      runInAction(() => {
        this.state.products = this.state.products.filter(
          (product) => product.id !== id,
        );
      });
    }
  }
}

export const productsStore = new ProductsStore();
