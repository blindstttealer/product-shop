import { observer } from 'mobx-react-lite';
import { Container, Item, Label, SectionTitle, NoData, EditButton, StyledCard } from './styles';
import { EditField } from '../../../../components/ui/edit-field/EditField';
import { useEmailSender } from '../../../../shared/api/useEmailSender';
import { formManager } from '../../model/multi-form-manager';
import { useParams } from 'react-router';
import { formatLabel, formatValue } from './utils';

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

  // Сбор всех данных для отправки (теперь из steps)
  const collectAllDataFlat = () => {
    const out: Record<string, any> = {};
    Object.entries(template.steps).forEach(([ns, stepData]) => {
      if (typeof stepData === 'object' && stepData !== null) Object.assign(out, stepData);
    });
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
      {template.steps.map((stepDef: any, idx: number) => {
        const fullData = currentForm.data[idx] as Record<string, any>;

        return (
          <StyledCard key={idx}>
            <SectionTitle>
              {stepDef.title ?? `Шаг ${idx + 1}`}
              <EditButton
                style={{
                  marginLeft: 12,
                  padding: '4px 8px',
                  fontSize: 12,
                }}
                onClick={() => goToStep(idx)}
              >
                Редактировать
              </EditButton>
            </SectionTitle>

            {Array.isArray(stepDef.fields) && stepDef.fields.length > 0 ? (
              stepDef.fields.map((field: any) => {
                // группа полей
                if (field.type === 'group' && Array.isArray(field.fields)) {
                  return (
                    <div key={field.key} style={{ marginTop: 8 }}>
                      <SectionTitle style={{ fontSize: 14 }}>
                        {field.label ?? formatLabel(field.key)}
                      </SectionTitle>
                      {field.fields.map((sf: any) => (
                        <Item key={sf.key}>
                          <Label>{sf.label ?? formatLabel(sf.key)}</Label>
                          <EditField text={formatValue(sf, fullData?.[sf?.key])} />
                        </Item>
                      ))}
                    </div>
                  );
                }

                // обычное поле
                return (
                  <Item key={field.key}>
                    <Label>{field.label ?? formatLabel(field.key)}</Label>
                    <EditField text={formatValue(field, fullData?.[field?.key])} />
                  </Item>
                );
              })
            ) : (
              <NoData>Нет данных</NoData>
            )}
          </StyledCard>
        );
      })}

      <div
        style={{
          display: 'flex',
          gap: 20,
          justifyContent: 'space-between',
          marginTop: 20,
        }}
      >
        <EditButton
          onClick={() => {
            const lastIndex = template.steps.length - 1;
            currentForm.setStep(lastIndex + 1);
          }}
        >
          Вернуться к редактированию
        </EditButton>

        <EditButton onClick={sendEmail}>Отправить форму</EditButton>
      </div>
    </Container>
  );
});

export default ReviewInfoStep;
