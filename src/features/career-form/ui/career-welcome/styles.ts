import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 32px 40px;
  background: #f0f9ff;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgb(0 123 255 / 0.25);
  max-width: 600px;
  margin: 40px auto;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #034078;
`;

export const Title = styled.h2`
  margin-bottom: 24px;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  color: #0263a0;
`;

export const StepInfo = styled.button`
  cursor: pointer;
  background-color: #3bc14a;
  color: white;
  font-weight: 700;
  padding: 16px 24px;
  border-radius: 12px;
  border: none;
  width: 100%;
  font-size: 1.1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #32a239;
  }

  &:focus {
    outline: 2px solid #268d26;
    outline-offset: 2px;
  }
`;

export const CompanyInfo = styled.p`
  margin-top: 28px;
  font-size: 1.15rem;
  line-height: 1.6;
  color: #1a1a1a;
  text-align: center;
  user-select: none;
`;
