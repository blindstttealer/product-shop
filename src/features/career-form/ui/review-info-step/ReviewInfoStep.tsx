import { observer } from 'mobx-react-lite';
import {
  Container,
  Item,
  Label,
  SectionTitle,
  NoData,
  StyledCard,
  ButtonContainer,
} from './styles';
import { EditField } from '../../../../components/ui/edit-field/EditField';
import { useEmailSender } from '../../../../shared/api/useEmailSender';
import { formManager } from '../../model/multi-form-manager';
import { useParams } from 'react-router';
import { formatLabel, formatValue } from './utils';
import { Button } from '@admiral-ds/react-ui';

export const ReviewInfoStep = observer(() => {
  const { formId } = useParams<{ formId: string }>();
  const currentForm = formManager.getForm(formId || '');

  if (!currentForm) {
    return (
      <Container>
        <NoData>Форма не выбрана</NoData>
      </Container>
    );
  }

  const template = formManager.templates[currentForm.templateId];
  const emailSender = useEmailSender();

  const collectAllDataFlat = () => {
    const out: Record<string, any> = {};
    if (template && Array.isArray(template.steps)) {
      template.steps.forEach((stepDef) => {
        const stepData = currentForm.data[stepDef.id];
        if (typeof stepData === 'object' && stepData !== null) Object.assign(out, stepData);
      });
    }
    return out;
  };

  const sendEmail = async () => {
    const payload = collectAllDataFlat();
    try {
      await emailSender.sendEmail(
        { data: payload },
        {
          onSuccess: () => console.log('Email sent successfully'),
          onError: (err) => console.error('Email sending failed:', err),
        },
      );
    } catch (e) {
      console.error('sendEmail error', e);
    }
  };

  const goToStep = (idx: number) => {
    currentForm.setStep(idx + 1);
  };

  if (!template || !Array.isArray(template.steps)) {
    return (
      <Container>
        <StyledCard>
          <SectionTitle>Данные формы</SectionTitle>
          <NoData>Нет шаблона для формы</NoData>
        </StyledCard>
      </Container>
    );
  }

  return (
    <Container>
      {template.steps.map((stepDef, idx) => {
        const fullData = currentForm.data[stepDef.id] as Record<string, any>;

        return (
          <StyledCard key={stepDef.id}>
            <SectionTitle>
              {stepDef.title ?? `Шаг ${idx + 1}`}
              <Button
                appearance="ghost"
                dimension="s"
                style={{ marginLeft: 12 }}
                onClick={() => goToStep(idx)}
              >
                Редактировать
              </Button>
            </SectionTitle>

            {Array.isArray(stepDef.fields) && stepDef.fields.length > 0 ? (
              stepDef.fields.map((field) => (
                <Item key={field.id}>
                  <Label>{field.label ?? formatLabel(field.id)}</Label>
                  <EditField text={formatValue(field, fullData?.[field.id])} />
                </Item>
              ))
            ) : (
              <NoData>Нет данных</NoData>
            )}
          </StyledCard>
        );
      })}

      <ButtonContainer>
        <Button
          appearance="secondary"
          dimension="m"
          onClick={() => {
            const lastIndex = template.steps.length - 1;
            currentForm.setStep(lastIndex + 1);
          }}
        >
          Вернуться к редактированию
        </Button>

        <Button appearance="primary" dimension="m" onClick={sendEmail}>
          Отправить форму
        </Button>
      </ButtonContainer>
    </Container>
  );
});

export default ReviewInfoStep;
