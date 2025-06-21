import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { observer } from "mobx-react-lite";
import { productsStore } from "../model/products-store";
import { useProductStore } from "../lib/useProductStore";
import {
  makeAutoObservable,
  makeObservable,
  observable,
  computed,
  action,
} from "mobx";

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: {
    rating: number;
    comment: string;
    date: string; // ISO string
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string; // ISO string
    updatedAt: string; // ISO string
    barcode: string;
    qrCode: string;
  };
  thumbnail: string;
  images: string[];
};

type ProductResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 0.5rem;
  padding: 2rem;
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.background.primary};
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  transition: 0.2s ease;
  color: ${({ theme }) => theme.colors.text.primary};

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

const Image = styled.img`
  width: 100%;
  object-fit: contain;
  height: 200px;
  border-radius: 12px;
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  margin: 0 0 0.5rem;
`;

const Price = styled.span`
  font-weight: bold;
  color: #2a9d8f;
  font-size: 1rem;
`;

const Category = styled.span`
  font-size: 0.9rem;
  color: #666;
`;

export const Products = observer(() => {
  const productStore = useProductStore();
  const navigate = useNavigate();

  useEffect(() => {
    productStore.fetchProducts();
  }, []);

  const onClickNavigateProductDetails = (id: number) => {
    navigate(`/products/${id}`);
  };
  return (
    <Grid>
      {productStore.state.products?.map((product) => (
        <Card
          onClick={() => onClickNavigateProductDetails(product.id)}
          key={product.id}
        >
          <Image src={product.images[0]} alt={product.title} />
          <Title>{product.title}</Title>
          <Price>${product.price}</Price>
          <Category>{product.category}</Category>
        </Card>
      ))}
    </Grid>
  );
});
