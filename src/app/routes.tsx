import { createBrowserRouter } from "react-router";

import MainLayout from "../pages/layout/Layout";
import About from "../pages/about/about-page";
import Promotion from "../pages/promotion/promotion-page";
import Favorites from "../pages/favorites/favorites-page";
import Delivery from "../pages/delivery/delivery-page";
import Products from "../pages/products/products-page";
import ProductDetail from "../pages/products/product-detail/product-detail";
import Cart from "../pages/cart/cart-page";
import { CareerWelcome } from "../features/career-form/ui/career-welcome/CareerWelcome";
import { CareerForms } from "../features/career-form/ui/career-forms/CareerForms";

export const appRouter = createBrowserRouter(
  [
    {
      path: "/",
      Component: MainLayout,
      children: [
        { index: true, Component: About },
        { path: "promotion", Component: Promotion },
        {
          path: "careers",
          children: [
            { index: true, Component: CareerWelcome },
            { path: "form/:formId", Component: CareerForms },
          ],
        },
        { path: "delivery", Component: Delivery },
        { path: "favorites", Component: Favorites },
        { path: "about", Component: About },
        { path: "products", Component: Products },
        { path: "products/:id", Component: ProductDetail },
        { path: "cart", Component: Cart },
      ],
    },
  ],
  { basename: "/product-shop" },
);
