import { observer } from "mobx-react-lite";
import { ProgressSteps } from "../../../../components/ui/progress-bar/ProgressBar";
import { getCurrentStepComponent } from "../../lib/utils/getCurrentStepComponents";
import { steps } from "../const";
import { useEffect, useState } from "react";
import { formManager } from "../../model/multi-form-manager";
import { useParams, useNavigate } from "react-router";
import { Button, Popover, Spin } from "antd";
import { CareerFormList } from "./ui/career-form-list/CareerFormList";
import {
  Container,
  ControlsRow,
  CreateButtonWrapper,
  FormContent,
  FormInfo,
  FormsListContainer,
  HeaderSection,
  ProgressContainer,
  StyledButton,
} from "./styles";
import { CreateFormModal } from "./ui/create-form-modal/CreateFormModal";

export const CareerForms = observer(() => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  const formList = formManager.formList;
  const currentForm = formManager.currentForm;

  const [isLoading, setIsLoading] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formName, setFormName] = useState("");
  const [formNameError, setFormNameError] = useState("");

  if (!formId) return <Spin spinning={isLoading} />;

  const onSwitchFormHandler = (id: string) => {
    setIsLoading(true);
    formManager.switchForm(formId).then(() => {
      navigate(`/careers/form/${id}`);
      setIsLoading(false);
    });
  };

  const onDeleteFormHandler = (id: string) => {
    formManager.deleteForm(id);

    if (id === formId) {
      const nextForm = formList.find((f) => f.id !== id);
      navigate(`/careers/form/${nextForm?.id}`);
    }
  };

  const onEditFormHandler = (id: string, text: string) => {
    formManager.editForm(id, text);
  };

  useEffect(() => {
    if (formId) {
      onSwitchFormHandler(formId);
    }
  }, [formId]);

  if (isLoading) return <Spin spinning={isLoading} />;

  if (!currentForm) {
    navigate("/careers");
    return null;
  }

  const createNewFormHandler = () => {
    const newForm = formManager.createForm({}, formName);
    navigate(`/careers/form/${newForm.id}`);
  };

  const cancelNewFormHandler = () => {
    setIsModalVisible(false);
    setFormName("");
    setFormNameError("");
  };

  const onChangeFormNameHandler = (name: string) => {
    setFormName(name);
    if (formNameError) setFormNameError("");
  };

  const popoverContent = (
    <FormsListContainer>
      <CareerFormList
        currentFormId={formId}
        onSwitchForm={onSwitchFormHandler}
        onDeleteForm={onDeleteFormHandler}
        onEditForm={onEditFormHandler}
        formList={formList}
      />
      <CreateButtonWrapper>
        <StyledButton size="large" onClick={() => setIsModalVisible(true)}>
          Создать новую форму
        </StyledButton>
      </CreateButtonWrapper>
    </FormsListContainer>
  );

  return (
    <Container>
      <CreateFormModal
        formName={formName}
        error={formNameError}
        isModalOpen={isModalVisible}
        onOkHandler={createNewFormHandler}
        onCancelHandler={cancelNewFormHandler}
        onChangeFormName={onChangeFormNameHandler}
      />

      <HeaderSection>
        <ProgressContainer>
          <ProgressSteps steps={steps} current={currentForm.step} />
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
        <p>Шаг: {currentForm.step}</p>
      </FormInfo>
    </Container>
  );
});
