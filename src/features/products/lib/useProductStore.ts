import { createContext, useContext } from "react";
import { productsStore } from "../model/products-store";

const store = createContext(productsStore);

export const useProductStore = () => useContext(store);
