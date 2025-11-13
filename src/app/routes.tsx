import { createBrowserRouter } from 'react-router';
import MainLayout from '../pages/layout/Layout';
import About from '../pages/about/about-page';
import Promotion from '../pages/promotion/promotion-page';
import Favorites from '../pages/favorites/favorites-page';
import Delivery from '../pages/delivery/delivery-page';
import Products from '../pages/products/products-page';
import ProductDetail from '../pages/products/product-detail/product-detail';
import Cart from '../pages/cart/cart-page';
import { CareerWelcome } from '../features/career-form/ui/career-welcome/CareerWelcome';
import { CareerForms } from '../features/career-form/ui/career-forms/CareerForms';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegistrationPage';
import EmailConfirmationPage from '@/pages/auth/EmailConfirmationPage';
import { EmailVerification } from '@/features/auth/ui/authorization-menu/components/email-verification';
import { AuthGuard } from '@/components/auth/AuthGuard';

export const appRouter = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: 'login',
        element: (
          <AuthGuard access="guest-only">
            <LoginPage />
          </AuthGuard>
        ),
      },
      {
        path: 'registration',
        element: (
          <AuthGuard access="guest-only">
            <RegisterPage />
          </AuthGuard>
        ),
      },
      {
        path: 'email-confirmation',
        element: (
          <AuthGuard access="guest-only">
            <EmailConfirmationPage />
          </AuthGuard>
        ),
      },
      {
        path: 'email-verification',
        element: (
          <AuthGuard access="protected">
            <EmailVerification />
          </AuthGuard>
        ),
      },
    ],
  },
  {
    path: '/',
    element: (
      <AuthGuard access="protected">
        <MainLayout />
      </AuthGuard>
    ),
    children: [
      { index: true, Component: About },
      { path: 'promotion', Component: Promotion },
      {
        path: 'careers',
        children: [
          { index: true, Component: CareerWelcome },
          { path: 'form/:formId', Component: CareerForms },
        ],
      },
      { path: 'delivery', Component: Delivery },
      { path: 'favorites', Component: Favorites },
      { path: 'about', Component: About },
      { path: 'products', Component: Products },
      { path: 'products/:id', Component: ProductDetail },
      { path: 'cart', Component: Cart },
    ],
  },
]);
