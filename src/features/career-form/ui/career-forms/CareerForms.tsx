import { observer } from "mobx-react-lite";
import { ProgressSteps } from "../../../../components/ui/progress-bar/ProgressBar";
import { getCurrentStepComponent } from "../../lib/utils/getCurrentStepComponents";
import { steps } from "../const";
import { useEffect, useState } from "react";
import { formManager } from "../../model/multi-form-manager";
import { useParams, useNavigate } from "react-router";
import { Button, Form, Input, Modal, Popover, Space, Spin } from "antd";
import { CareerFormList } from "./ui/career-form-list/CareerFormList";
import {
  Container,
  ControlsRow,
  FormContent,
  FormInfo,
  HeaderSection,
  ProgressContainer,
} from "./styles";
import styled from "styled-components";

const FormsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  min-width: 300px;
  max-width: 400px;
  max-height: 70vh;
  overflow-y: auto;
  border-radius: 8px;
`;

const CreateButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 8px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: 12px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  max-width: 240px;
`;

export const CareerForms = observer(() => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formName, setFormName] = useState("");
  const [formNameError, setFormNameError] = useState("");

  useEffect(() => {
    if (formId) {
      setIsLoading(true);
      formManager.switchForm(formId).finally(() => setIsLoading(false));
    }
  }, [formId]);

  const currentForm = formManager.getForm(formId || "");

  if (isLoading) return <Spin spinning={isLoading} />;
  if (!currentForm) {
    navigate("/careers");
    return null;
  }

  const { step, data } = currentForm;

  const handleCreateNewForm = () => {
    const newForm = formManager.createForm({}, formName);
    navigate(`/careers/form/${newForm.id}`);
  };

  const popoverContent = (
    <FormsListContainer>
      <CareerFormList />
      <CreateButtonWrapper>
        <StyledButton size="large" onClick={() => setIsModalVisible(true)}>
          Создать новую форму
        </StyledButton>
      </CreateButtonWrapper>
    </FormsListContainer>
  );

  return (
    <Container>
      <Modal
        title="Новая форма"
        open={isModalVisible}
        onOk={handleCreateNewForm}
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
      <HeaderSection>
        <ProgressContainer>
          <ProgressSteps steps={steps} current={step} />
        </ProgressContainer>

        <ControlsRow>
          <Popover
            content={popoverContent}
            title="Мои формы"
            trigger="click"
            placement="bottomLeft"
          >
            <Button>Открыть Список форм</Button>
          </Popover>
        </ControlsRow>
      </HeaderSection>

      <FormContent>{getCurrentStepComponent(currentForm.step)}</FormContent>

      <FormInfo>
        <h4>Информация о текущей форме:</h4>
        <p>ID: {formId}</p>
        <p>Шаг: {step}</p>
      </FormInfo>
    </Container>
  );
});
