import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { useCart } from "../../features/cart/lib/useCart";
import { Product } from "../../features/products/api/productsApi.types";

const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductWrapper = styled.div`
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  display: flex;
  gap: 2rem;
  max-width: 1000px;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

const Image = styled.img`
  width: 100%;
  max-width: 200px;
  height: auto;
  border-radius: 12px;
  object-fit: cover;
`;

const Details = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #555;
  line-height: 1.5;
`;

const Price = styled.span`
  font-weight: bold;
  color: #2a9d8f;
  font-size: 1.2rem;
`;

const Category = styled.p`
  font-size: 1rem;
  color: #888;
`;

const Stock = styled.p`
  font-size: 1rem;
  color: #888;
`;

const AddToCartButton = styled.button`
  background-color: #2a9d8f;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  margin-top: 1rem;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;

  &:hover {
    background-color: #21867a;
  }

  &:active {
    background-color: #1a6a5b;
  }

  &:disabled {
    background-color: #ccc;
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
    // Логика для добавления товара в корзину
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
          <Category>Category: {product.category}</Category>
          <Stock>In stock: {product.stock}</Stock>
          <AddToCartButton onClick={handleAddToCart}>Купить</AddToCartButton>
        </Details>
      </ProductWrapper>
    </Container>
  );
}
