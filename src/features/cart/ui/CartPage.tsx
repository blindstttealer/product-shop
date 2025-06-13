// components/features/cart/CartPage.tsx
import { observer } from "mobx-react-lite";
import { useCart } from "../lib/useCart";
import { CartItem } from "./CartItem";
import styled from "styled-components";

const PageWrapper = styled.div`
  max-width: 1000px;
  margin: 2rem auto;
  padding: 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Summary = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #f7f7f7;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  text-align: right;
`;

const SummaryRow = styled.div`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const Empty = styled.div`
  text-align: center;
  font-size: 1.5rem;
  color: #999;
  margin-top: 5rem;
`;

export const CartPage = observer(() => {
  const cart = useCart();

  // type SuperType = {
  //   key: "value";
  // };
  //
  // type MyType = {
  //   key: "value";
  //   prop: "value";
  // };
  //
  // const myType: MyType = {
  //   key: "value",
  //   prop: "value",
  // };
  //
  // const superType: SuperType = myType;

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
          <strong>Товаров:</strong> {cart.totalItems}
        </SummaryRow>
        <SummaryRow>
          <strong>Сумма:</strong> ${cart.totalPrice.toFixed(2)}
        </SummaryRow>
      </Summary>
    </PageWrapper>
  );
});
