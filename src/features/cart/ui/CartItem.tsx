import { observer } from "mobx-react-lite";
import { useCart } from "../lib/useCart";
import styled from "styled-components";
import { Product } from "../../products/ui/Products";

type Props = {
  product: Product;
};

const ItemCard = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  gap: 2rem;
  margin-bottom: 1.5rem;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  border-radius: 12px;
  border: 1px solid #eee;
  background-color: #f9f9f9;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  gap: 2rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const Title = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #222;
  margin: 0;
  width: 200px;
`;

const Price = styled.p`
  color: #9c27b0;
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
  min-width: 80px;
  text-align: center;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  height: 36px;
`;

const QuantityBtn = styled.button`
  background: #fff;
  border: none;
  padding: 0 0.9rem;
  font-size: 1.2rem;
  cursor: pointer;
  color: #444;
  transition: background 0.2s;

  &:hover {
    background: #f5f5f5;
  }

  &:active {
    background: #e0e0e0;
  }

  &:disabled {
    color: #aaa;
    cursor: not-allowed;
  }
`;

const QuantityValue = styled.div`
  padding: 0 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: #333;
`;

const RemoveButton = styled.button`
  background: none;
  color: #f44336;
  font-weight: 500;
  border: none;
  cursor: pointer;
  font-size: 0.95rem;
  transition: color 0.2s ease;

  &:hover {
    color: #d32f2f;
  }

  &:active {
    color: #b71c1c;
  }
`;

export const CartItem = observer(({ product }: Props) => {
  const cart = useCart();
  const item = cart.cartItems.find((p) => p.id === product.id);

  if (!item) return null;

  return (
    <ItemCard>
      <Image src={product.images[0]} alt={product.title} />
      <Content>
        <Title>{item.title}</Title>
        <Price>${item.price}</Price>
        <QuantityContainer>
          <QuantityBtn onClick={() => cart.decrementQuantity(product.id)}>
            −
          </QuantityBtn>
          <QuantityValue>{item.quantity}</QuantityValue>
          <QuantityBtn onClick={() => cart.incrementQuantity(product.id)}>
            +
          </QuantityBtn>
        </QuantityContainer>
        <RemoveButton onClick={() => cart.removeFromCart(product.id)}>
          Удалить
        </RemoveButton>
      </Content>
    </ItemCard>
  );
});
