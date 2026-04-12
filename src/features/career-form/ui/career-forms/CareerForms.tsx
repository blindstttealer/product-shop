import { observer } from 'mobx-react-lite';
import { getCurrentStepComponent } from '../../lib/utils/getCurrentStepComponents';
import { formManager } from '../../model/multi-form-manager';
import { Container, ControlsRow, FormContent, HeaderSection } from './styles';
import { CreateFormModal } from '../create-form-modal/CreateFormModal';
import { FormsPopover, FormHeader, FormInfo } from './components';
import { useCareerFormActions } from './hooks';
import { Spinner } from '@admiral-ds/react-ui';
import { useCallback, useMemo } from 'react';
import { useCreateFormModal } from '@/features/career-form/ui/create-form-modal/hooks';

export const CareerForms = observer(() => {
  const {
    formId,
    switchToForm,
    deleteForm,
    editForm,
    // createNewForm,
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

  if (!currentForm || formManager.templatesLoading) {
    return <Spinner />;
  }

  const handleCreateNewForm = () => {
    if (validateFormName()) {
      /* Дать возможность создавать форму. Подумать, создавать новую
      форму по существующему или давать возможность выбора template еще раз
      Раньше был только метод createNewForm. Сейчас еще появился byTemplate
      */

      // createNewForm(formName);
      closeModal();
    }
  };

  const handleOpenModal = () => {
    openModal();
  };

  const buildHeaderSteps = useCallback(() => {
    const template = currentForm.templateId ? formManager.templates[currentForm.templateId] : null;
    const header: { title: string }[] = [];

    header.push({ title: 'Welcome' });

    if (template && Array.isArray(template.steps)) {
      template.steps.forEach((s, idx) => {
        const title = s.title ?? `Step ${idx + 1}`;
        header.push({ title });
      });
    } else {
      header.push({ title: 'Step 1' });
    }

    header.push({ title: 'Review' });

    return header;
  }, [currentForm.templateId]);

  const headerSteps = useMemo(() => buildHeaderSteps(), [buildHeaderSteps]);

  return (
    <Container>
      {isModalVisible && (
        <CreateFormModal
          formName={formName}
          error={formNameError}
          onOkHandler={handleCreateNewForm}
          onCancelHandler={closeModal}
          onChangeFormName={updateFormName}
        />
      )}
      <HeaderSection>
        <FormHeader currentStep={currentForm.step} steps={headerSteps} />

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
