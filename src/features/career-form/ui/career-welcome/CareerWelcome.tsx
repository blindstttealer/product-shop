import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { formManager } from "../../model/multi-form-manager";
import { Form, Input } from "antd";
import { CompanyInfo, StepInfo, StyledModal, Title, Wrapper } from "./styles";

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

  const StepInfoTitle = useMemo(() => {
    return formId
      ? "Продолжить заполнение карточки"
      : "Приступить к заполнению карточки";
  }, [formId]);

  return (
    <Wrapper>
      <Title>Добро пожаловать в нашу компанию!</Title>

      <StepInfo hasFormId={!!formId} onClick={handleStartClick}>
        {StepInfoTitle}
      </StepInfo>

      <CompanyInfo>
        Мы рады приветствовать новых сотрудников в нашей компании! Здесь вы
        найдете дружелюбную команду, возможности для роста и поддержку на каждом
        этапе вашего карьерного пути. Добро пожаловать в команду!
      </CompanyInfo>

      <StyledModal
        title="Новая карточка"
        open={isModalVisible}
        onOk={handleCreateForm}
        onCancel={() => {
          setIsModalVisible(false);
          setFormName("");
          setFormNameError("");
        }}
        okText="Создать"
        cancelText="Отмена"
        okButtonProps={{
          style: {
            backgroundColor: "#3bc14a",
            borderColor: "#3bc14a",
          },
        }}
      >
        <Form layout="vertical">
          <Form.Item
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
      </StyledModal>
    </Wrapper>
  );
};
