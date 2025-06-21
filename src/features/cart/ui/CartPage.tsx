import { observer } from "mobx-react-lite";
import { useCart } from "../lib/useCart";
import { CartItem } from "./CartItem";
import styled from "styled-components";

const PageWrapper = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.xl};
  margin: ${({ theme }) => theme.spacing.xxl} auto;
  padding: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Summary = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.boxShadow.sm};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const SummaryRow = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-child {
    margin-bottom: 0;
    padding-top: ${({ theme }) => theme.spacing.sm};
    border-top: 1px solid ${({ theme }) => theme.colors.border.light};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }
`;

const SummaryLabel = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const SummaryValue = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Empty = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  color: ${({ theme }) => theme.colors.text.disabled};
  margin-top: ${({ theme }) => theme.spacing.xxl};
  padding: ${({ theme }) => theme.spacing.xl};
`;

const CheckoutButton = styled.button`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.inverse};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-1px);
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.primaryActive};
    transform: translateY(0);
  }
`;

export const CartPage = observer(() => {
  const cart = useCart();

  if (cart.cartItems.length === 0) {
    return <Empty>🛒 Ваша корзина пуста</Empty>;
  }

  return (
    <PageWrapper>
      <Title>🛒 Ваша корзина</Title>
      <ItemsList>
        {cart.cartItems.map((item) => (
          <CartItem key={item.id} product={item} />
        ))}
      </ItemsList>
      <Summary>
        <SummaryRow>
          <SummaryLabel>Товаров:</SummaryLabel>
          <SummaryValue>{cart.totalItems}</SummaryValue>
        </SummaryRow>
        <SummaryRow>
          <SummaryLabel>Сумма:</SummaryLabel>
          <SummaryValue>${cart.totalPrice.toFixed(2)}</SummaryValue>
        </SummaryRow>
        <CheckoutButton onClick={() => console.log("Proceed to checkout")}>
          Оформить заказ
        </CheckoutButton>
      </Summary>
    </PageWrapper>
  );
});
