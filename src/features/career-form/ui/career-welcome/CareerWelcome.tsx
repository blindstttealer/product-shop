import React from "react";
import { careerFormStore } from "../../model/career-form-store";
import { CompanyInfo, StepInfo, Title, Wrapper } from "./styles";

export const CareerWelcome = () => {
  return (
    <Wrapper>
      <Title>Добро пожаловать в нашу компанию!</Title>

      <StepInfo onClick={() => careerFormStore.setStep(1)}>
        Приступить к заполнению карточки
      </StepInfo>

      <CompanyInfo>
        Мы рады приветствовать новых сотрудников в нашей компании! Здесь вы
        найдете дружелюбную команду, возможности для роста и поддержку на каждом
        этапе вашего карьерного пути. Добро пожаловать в команду!
      </CompanyInfo>
    </Wrapper>
  );
};
