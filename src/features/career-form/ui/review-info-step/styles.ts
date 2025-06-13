import styled, { keyframes } from "styled-components";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  max-width: 720px;
  margin: 40px auto;
  padding: 30px 35px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow:
    0 4px 10px rgba(0, 0, 0, 0.05),
    0 8px 30px rgba(0, 0, 0, 0.1);
  font-family: "Poppins", sans-serif;
  color: #222;
  animation: ${fadeIn} 0.4s ease forwards;
`;

export const Section = styled.section`
  margin-bottom: 32px;
`;

export const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #3b3b3b;
  margin-bottom: 20px;
  border-left: 5px solid #4a90e2;
  padding-left: 12px;
  text-transform: uppercase;
  letter-spacing: 1.2px;
`;

export const Item = styled.div`
  display: flex;
  justify-content: space-between;
  background: #f5f8ff;
  border-radius: 12px;
  padding: 12px 20px;
  margin-bottom: 12px;
  box-shadow: 0 1px 4px rgba(74, 144, 226, 0.15);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 14px rgba(74, 144, 226, 0.35);
  }
`;

export const Label = styled.span`
  font-weight: 600;
  color: #4a4a4a;
  text-transform: capitalize;
  letter-spacing: 0.04em;
`;

export const Value = styled.span`
  color: #1a1a1a;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 1rem;
`;

export const BooleanIconTrue = styled(
  FaCheckCircle as React.ComponentType<React.SVGProps<SVGSVGElement>>,
)`
  color: #3bc14a;
  font-size: 1.2rem;
`;

export const BooleanIconFalse = styled(
  FaTimesCircle as React.ComponentType<React.SVGProps<SVGSVGElement>>,
)`
  color: #e03c3c;
  font-size: 1.2rem;
`;

export const NoData = styled.div`
  color: #2b2929;
  font-style: italic;
  padding: 16px 0;
  text-align: center;
`;

export const EditButton = styled.button`
  margin-top: 24px;
  padding: 8px 16px;
  background-color: #4a90e2;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.25s;

  &:hover {
    background-color: #4b504c;
  }
`;
