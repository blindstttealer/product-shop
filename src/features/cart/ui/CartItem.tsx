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
  background: ${({ theme }) => theme.colors.background.secondary};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.boxShadow.sm};
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};

  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow.md};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  background-color: ${({ theme }) => theme.colors.background.tertiary};
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.md};
    width: 100%;
  }
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  width: 200px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
  }
`;

const Price = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin: 0;
  min-width: 80px;
  text-align: center;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  height: 36px;
  background: ${({ theme }) => theme.colors.background.primary};
`;

const QuantityBtn = styled.button`
  background: ${({ theme }) => theme.colors.background.primary};
  border: none;
  padding: 0 ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.secondary};

  &:hover {
    background: ${({ theme }) => theme.colors.states.hover};
    border-radius: ${({ theme }) => theme.borderRadius.md};
  }

  &:active {
    background: ${({ theme }) => theme.colors.states.active};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.text.disabled};
    cursor: not-allowed;
  }
`;

const QuantityValue = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const RemoveButton = styled.button`
  background: none;
  color: ${({ theme }) => theme.colors.error};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  transition: color 0.2s ease;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};

  &:hover {
    color: ${({ theme }) => theme.colors.errorHover};
    background: ${({ theme }) => theme.colors.errorLight};
  }

  &:active {
    color: ${({ theme }) => theme.colors.errorActive};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    align-self: flex-end;
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
          <QuantityBtn
            onClick={() => cart.decrementQuantity(product.id)}
            disabled={item.quantity <= 1}
          >
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
