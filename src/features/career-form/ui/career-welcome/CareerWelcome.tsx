import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { formManager } from "../../model/multi-form-manager";
import { CompanyInfo, StepInfo, Title, Wrapper } from "./styles";
import { Form, Input, Modal } from "antd";

export const CareerWelcome = () => {
  const navigate = useNavigate();
  const { formId } = useParams<{ formId: string }>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formName, setFormName] = useState("");
  const [formNameError, setFormNameError] = useState("");

  const handleStartClick = () => {
    if (formId) {
      const currentForm = formManager.getForm(formId);
      currentForm?.setStep(1);
      return;
    }
    setIsModalVisible(true);
  };

  const handleCreateForm = () => {
    if (!formName.trim()) {
      setFormNameError("Пожалуйста, введите название формы");
      return;
    }

    const form = formManager.createForm({}, formName);
    navigate(`/careers/form/${form.id}`);
    setIsModalVisible(false);
    setFormName("");
  };

  return (
    <Wrapper>
      <Title>Добро пожаловать в нашу компанию!</Title>

      <StepInfo onClick={handleStartClick}>
        Приступить к заполнению карточки
      </StepInfo>

      <CompanyInfo>
        Мы рады приветствовать новых сотрудников в нашей компании! Здесь вы
        найдете дружелюбную команду, возможности для роста и поддержку на каждом
        этапе вашего карьерного пути. Добро пожаловать в команду!
      </CompanyInfo>

      <Modal
        title="Новая форма"
        open={isModalVisible}
        onOk={handleCreateForm}
        onCancel={() => {
          setIsModalVisible(false);
          setFormName("");
          setFormNameError("");
        }}
        okText="Создать"
        cancelText="Отмена"
      >
        <Form layout="vertical">
          <Form.Item
            label="Название формы"
            validateStatus={formNameError ? "error" : ""}
            help={formNameError}
          >
            <Input
              value={formName}
              onChange={(e) => {
                setFormName(e.target.value);
                if (formNameError) setFormNameError("");
              }}
              placeholder="Введите название формы"
            />
          </Form.Item>
        </Form>
      </Modal>
    </Wrapper>
  );
};
