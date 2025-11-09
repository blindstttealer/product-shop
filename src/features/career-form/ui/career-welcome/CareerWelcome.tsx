import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { formManager } from '../../model/multi-form-manager';
import { CompanyInfo, StepInfo, Title, Wrapper } from './styles';
import { observer } from 'mobx-react-lite';
import { Option, SelectField } from '@admiral-ds/react-ui';
import { FormDefinition } from '../../model/types';
import { CreateFormModal } from '@/features/career-form/ui/create-form-modal/CreateFormModal';
import { useCreateFormModal } from '@/features/career-form/ui/create-form-modal/hooks';

export const CareerWelcome = observer(() => {
  const navigate = useNavigate();
  const { formId } = useParams<{ formId: string }>();
  const [templates, setTemplates] = useState<FormDefinition[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const {
    isModalVisible,
    formName,
    formNameError,
    openModal,
    closeModal,
    updateFormName,
    validateFormName,
  } = useCreateFormModal();

  useEffect(() => {
    formManager.loadTemplates().then((fields) => {
      setTemplates(fields);
    });
  }, []);

  const handleStartClick = () => {
    if (formId) {
      const currentForm = formManager.getForm(formId);
      currentForm?.setStep(1);
      return;
    }
    openModal();
  };

  const handleCreateForm = () => {
    if (validateFormName()) {
      const form = formManager.createFromTemplate(selectedTemplate, formName);
      navigate(`/careers/form/${form.id}`);
      updateFormName('');
      closeModal();
    }
  };

  const StepInfoTitle = useMemo(() => {
    return formId ? 'Продолжить заполнение карточки' : 'Приступить к заполнению карточки';
  }, [formId]);

  const renderOptions = () => {
    return templates.map((option) => {
      return (
        <Option key={option.id} value={option.id}>
          {option.name}
        </Option>
      );
    });
  };

  return (
    <Wrapper>
      <Title>Добро пожаловать в нашу компанию!</Title>

      <SelectField
        mode="searchSelect"
        label="Выберите форму"
        value={selectedTemplate}
        onChange={(e) => setSelectedTemplate(e.target.value)}
        placeholder={'выбрать форму из списка'}
      >
        {renderOptions()}
      </SelectField>

      <StepInfo hasFormId={!!formId} onClick={handleStartClick} disabled={!selectedTemplate}>
        {StepInfoTitle}
      </StepInfo>

      <CompanyInfo>
        Мы рады приветствовать новых сотрудников в нашей компании! Здесь вы найдете дружелюбную
        команду, возможности для роста и поддержку на каждом этапе вашего карьерного пути. Добро
        пожаловать в команду!
      </CompanyInfo>

      <CreateFormModal
        isModalOpen={isModalVisible}
        formName={formName}
        error={formNameError}
        onChangeFormName={updateFormName}
        onCancelHandler={closeModal}
        onOkHandler={handleCreateForm}
      />
    </Wrapper>
  );
});
