import { useNavigate, useLocation } from 'react-router';
import { useCart } from '../../features/cart/lib/useCart';
import { CartIcon } from '../ui/cart';
import { HorizontalTabs, TabItem } from '../ui/tab-menu/TabMenu';

export const NavigationPanel = () => {
  const cart = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const tabs: TabItem[] = [
    { text: 'Акции', tabId: '/promotion' },
    { text: 'Карьера', tabId: '/careers' },
    { text: 'Доставка', tabId: '/delivery' },
    { text: 'О нас', tabId: '/about' },
    { text: 'Конструктор форм', tabId: '/form-constructor' },
  ];

  const currentTabId = tabs.find((tab) => tab.tabId === location.pathname)?.tabId;

  return (
    <HorizontalTabs
      tabs={tabs}
      selectedTabId={currentTabId}
      onTabChange={(tabId) => navigate(tabId)}
    />
  );
};
