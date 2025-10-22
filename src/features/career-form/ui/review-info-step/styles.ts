import styled from "styled-components";
import { Card } from "antd";

export const Container = styled.div`
  max-width: 720px;
  margin: 40px auto;
  padding: 30px 35px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color["Background/Background 1"]};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const StyledCard = styled(Card)`
  width: 100%;
  margin-bottom: 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color["Background/Background 2"]};
  border: 1px solid ${({ theme }) => theme.color["Neutral/Neutral 20"]};

  .ant-card-head {
    border-bottom: 1px solid ${({ theme }) => theme.color["Neutral/Neutral 20"]};
    background-color: ${({ theme }) => theme.color["Background/Background 2"]};

    .ant-card-head-title {
      color: ${({ theme }) => theme.color["Neutral/Neutral 90"]};
      font-weight: 500;
    }
  }

  .ant-card-body {
    padding: 16px;
    color: ${({ theme }) => theme.color["Neutral/Neutral 70"]};
  }
`;

export const Section = styled.section`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.color["Neutral/Neutral 90"]};
  margin-bottom: 16px;
  border-left: 5px solid ${({ theme }) => theme.color["Primary/Primary 60"]};
  padding-left: 12px;
  text-transform: uppercase;
`;

export const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  padding: 8px 12px;
  margin-bottom: 8px;
  background-color: ${({ theme }) => theme.color["Background/Background 1"]};
`;

export const Label = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.color["Neutral/Neutral 90"]};
  text-transform: capitalize;
  letter-spacing: 0.04em;
`;

export const Value = styled.span`
  color: ${({ theme }) => theme.color["Neutral/Neutral 70"]};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 1rem;
`;

export const NoData = styled.div`
  color: ${({ theme }) => theme.color["Neutral/Neutral 40"]};
  font-style: italic;
  padding: 16px 0;
  text-align: center;
`;

export const EditButton = styled.button`
  margin-top: 16px;
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.color["Primary/Primary 60"]};
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background-color: ${({ theme }) => theme.color["Primary/Primary 70"]};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: space-between;
  margin-top: 16px;
`;
