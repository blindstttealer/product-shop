import { createBrowserRouter } from "react-router";

import MainLayout from "../pages/layout/Layout";
import About from "../pages/about/about-page";
import Promotion from "../pages/promotion/promotion-page";
import Favorites from "../pages/favorites/favorites-page";
import Careers from "../pages/careers/careers-page";
import Delivery from "../pages/delivery/delivery-page";
import Products from "../pages/products/products-page";
import ProductDetail from "../pages/product-detail/product-detail";
import Cart from "../pages/cart/cart-page";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: About },
      { path: "promotion", Component: Promotion },
      { path: "careers", Component: Careers },
      { path: "delivery", Component: Delivery },
      { path: "favorites", Component: Favorites },
      { path: "about", Component: About },
      { path: "products", Component: Products },
      { path: "products/:id", Component: ProductDetail },
      { path: "cart", Component: Cart },
    ],
  },
]);
