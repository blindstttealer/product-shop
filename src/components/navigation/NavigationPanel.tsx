import styled from "styled-components";
import { Link } from "react-router";
import { CartIcon } from "../ui/cart";
import { useCart } from "../../features/cart/lib/useCart";
import { observer } from "mobx-react-lite";

const NavigationContainer = styled.nav`
  display: flex;
  gap: 24px;
  padding: 16px 24px;
  //border-bottom: 1px solid #ddd;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => {
    console.log("theme", theme);
    return theme.colors.text.primary;
  }};
  font-weight: 500;
  &:hover {
    color: #007bff;
  }

  &.active {
    color: #007bff;
    font-weight: 600;
  }
`;

export const NavigationPanel = observer(() => {
  const cart = useCart();

  return (
    <NavigationContainer>
      <StyledLink to="/promotion">Акции</StyledLink>
      <StyledLink to="/careers">Карьера</StyledLink>
      <StyledLink to="/delivery">Доставка</StyledLink>
      <StyledLink to="/about">О нас</StyledLink>
      <StyledLink to="/products">Продукты</StyledLink>
      <StyledLink to="/cart">{<CartIcon count={cart.totalItems} />}</StyledLink>
    </NavigationContainer>
  );
});
