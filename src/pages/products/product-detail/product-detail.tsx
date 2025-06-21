import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { useCart } from "../../../features/cart/lib/useCart";
import { Product } from "../../../features/products/api/productsApi.types";

const Container = styled.div`
  margin: ${({ theme }) => theme.spacing.xxl} auto;
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.boxShadow.md};
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 1000px;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.border.normal};

  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow.lg};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Image = styled.img`
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  object-fit: cover;
  box-shadow: ${({ theme }) => theme.boxShadow.sm};
`;

const Details = styled.div`
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  margin: 0;
`;

const Price = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

const AddToCartButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
  cursor: pointer;
  transition: all 0.3s ease;
  width: fit-content;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-2px);
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.primaryActive};
    transform: translateY(0);
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const cart = useCart();

  useEffect(() => {
    if (id) {
      fetch(`https://dummyjson.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
        });
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      cart.addToCart(product);
    } else {
      throw new Error("Product not found");
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <Container>
      <ProductWrapper>
        <Image src={product.images[0]} alt={product.title} />
        <Details>
          <Title>{product.title}</Title>
          <Description>{product.description}</Description>
          <Price>${product.price}</Price>
          <div>Category: {product.category}</div>
          <div>In stock: {product.stock} items</div>
          <AddToCartButton onClick={handleAddToCart}>
            Add to Cart
          </AddToCartButton>
        </Details>
      </ProductWrapper>
    </Container>
  );
}
