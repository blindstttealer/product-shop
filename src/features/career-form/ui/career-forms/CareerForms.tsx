import { observer } from "mobx-react-lite";
import { Spin } from "antd";
import { getCurrentStepComponent } from "../../lib/utils/getCurrentStepComponents";
import { formManager } from "../../model/multi-form-manager";
import { Container, ControlsRow, FormContent, HeaderSection } from "./styles";
import { CreateFormModal } from "./ui/create-form-modal/CreateFormModal";
import { FormsPopover, FormHeader, FormInfo } from "./components";
import { useCareerFormActions, useCreateFormModal } from "./hooks";

export const CareerForms = observer(() => {
  const {
    formId,
    isLoading,
    switchToForm,
    deleteForm,
    editForm,
    createNewForm,
  } = useCareerFormActions();

  const {
    isModalVisible,
    formName,
    formNameError,
    openModal,
    closeModal,
    updateFormName,
    validateFormName,
  } = useCreateFormModal();

  const formList = formManager.formList;
  const currentForm = formManager.currentForm;

  if (!formId) return <Spin spinning={isLoading} />;

  if (isLoading) return <Spin spinning={isLoading} />;

  if (!currentForm) {
    return null;
  }

  const handleCreateNewForm = () => {
    if (validateFormName()) {
      createNewForm(formName);
      closeModal();
    }
  };

  const handleOpenModal = () => {
    openModal();
  };

  return (
    <Container>
      <CreateFormModal
        formName={formName}
        error={formNameError}
        isModalOpen={isModalVisible}
        onOkHandler={handleCreateNewForm}
        onCancelHandler={closeModal}
        onChangeFormName={updateFormName}
      />

      <HeaderSection>
        <FormHeader currentStep={currentForm.step} />

        <ControlsRow>
          <FormsPopover
            currentFormId={formId}
            onSwitchForm={switchToForm}
            onDeleteForm={deleteForm}
            onEditForm={editForm}
            onCreateNewForm={handleOpenModal}
            formList={formList}
          />
        </ControlsRow>
      </HeaderSection>

      <FormContent>{getCurrentStepComponent(currentForm.step)}</FormContent>

      <FormInfo formId={formId} />
    </Container>
  );
});
