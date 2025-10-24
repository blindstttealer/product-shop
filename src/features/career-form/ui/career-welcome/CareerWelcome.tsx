import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { formManager } from "../../model/multi-form-manager";
import { Form, Input } from "antd";
import { CompanyInfo, StepInfo, StyledModal, Title, Wrapper, modalOkButtonClass } from "./styles";
import {
  STEP_INFO_TITLE_CONTINUE,
  STEP_INFO_TITLE_START,
  MODAL_TITLE,
  OK_TEXT,
  CANCEL_TEXT,
  FORM_NAME_PLACEHOLDER,
  FORM_NAME_ERROR_MESSAGE,
  WELCOME_TITLE,
  COMPANY_INFO_TEXT,
} from "./consts";

export const CareerWelcome = () => {
  const navigate = useNavigate();
  const { formId } = useParams<{ formId: string | undefined }>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formName, setFormName] = useState("");
  const [formNameError, setFormNameError] = useState("");

  const validateFormName = (name: string): string => {
    return name.trim() ? "" : FORM_NAME_ERROR_MESSAGE;
  };

  const handleStartClick = () => {
    if (formId) {
      const currentForm = formManager.getForm(formId);
      currentForm?.setStep(1);
      return;
    }
    setIsModalVisible(true);
  };

  const handleCreateForm = () => {
    const error = validateFormName(formName);
    if (error) {
      setFormNameError(error);
      return;
    }

    const form = formManager.createForm({}, formName);
    navigate(`/careers/form/${form.id}`);
    setIsModalVisible(false);
    setFormName("");
    setFormNameError("");
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
    setFormName("");
    setFormNameError("");
  };

  const handleFormNameChange = (value: string) => {
    setFormName(value);
    if (formNameError) setFormNameError("");
  };

  const stepInfoTitle = formId ? STEP_INFO_TITLE_CONTINUE : STEP_INFO_TITLE_START;

  return (
    <Wrapper>
      <Title>{WELCOME_TITLE}</Title>

      <StepInfo hasFormId={!!formId} onClick={handleStartClick}>
        {stepInfoTitle}
      </StepInfo>

      <CompanyInfo>{COMPANY_INFO_TEXT}</CompanyInfo>

      <StyledModal
        title={MODAL_TITLE}
        open={isModalVisible}
        onOk={handleCreateForm}
        onCancel={handleCancelModal}
        okText={OK_TEXT}
        cancelText={CANCEL_TEXT}
        okButtonProps={{
          className: modalOkButtonClass,
        }}
      >
        <Form layout="vertical">
          <Form.Item
            validateStatus={formNameError ? "error" : ""}
            help={formNameError}
          >
            <Input
              value={formName}
              onChange={(e) => handleFormNameChange(e.target.value)}
              placeholder={FORM_NAME_PLACEHOLDER}
            />
          </Form.Item>
        </Form>
      </StyledModal>
    </Wrapper>
  );
};
