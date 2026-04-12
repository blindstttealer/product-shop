import { observer } from 'mobx-react-lite';
import { formManager } from '../../model/multi-form-manager';
import { UniversalForm } from '../../../../components/ui/universal-step-form/UniversalStepForm';
import { mapServerFieldToUniversal } from './helper';
import { T } from '@admiral-ds/react-ui';

type Props = {
  stepIndex: number;
};

export const DynamicStep = observer(({ stepIndex }: Props) => {
  const form = formManager.currentForm;
  if (!form)
    return (
      <T
        font="Body/Body 1 Long"
        color="Neutral/Neutral 50"
        as="p"
        style={{ padding: 24, textAlign: 'center' }}
      >
        Форма не найдена
      </T>
    );

  const templateId = form.templateId;
  if (!templateId)
    return (
      <T
        font="Body/Body 1 Long"
        color="Neutral/Neutral 50"
        as="p"
        style={{ padding: 24, textAlign: 'center' }}
      >
        Шаблон у формы не задан
      </T>
    );

  const template = formManager.templates[templateId];
  if (!template)
    return (
      <T
        font="Body/Body 1 Long"
        color="Neutral/Neutral 50"
        as="p"
        style={{ padding: 24, textAlign: 'center' }}
      >
        Шаблон не загружен
      </T>
    );

  const steps = template.steps || [];

  if (stepIndex < 0 || stepIndex >= steps.length) {
    return (
      <T
        font="Body/Body 1 Long"
        color="Neutral/Neutral 50"
        as="p"
        style={{ padding: 24, textAlign: 'center' }}
      >
        Шаг {stepIndex} не найден в шаблоне
      </T>
    );
  }

  const stepDef = steps[stepIndex];
  const namespace = stepDef.id;

  console.log('steps', JSON.parse(JSON.stringify(steps)));
  console.log('stepDef', JSON.parse(JSON.stringify(stepDef)));

  const fields = (stepDef.fields || []).map(mapServerFieldToUniversal);

  const savedData = (form.data as any)[namespace] ?? {};
  const defaultValues = stepDef.fields.reduce((acc: Record<string, any>, f) => {
    if (f.defaultValue != null) acc[f.id] = f.defaultValue;
    return acc;
  }, {});
  const initialState = { ...defaultValues, ...savedData };

  const onValuesChangeHandler = (value: any) => {
    form.setValue(namespace, { ...(form.data as any)[namespace], ...value });
  };

  const onFinish = (values: any) => {
    const nextFormStep = form.step + 1;
    form.updateData({ [namespace]: values }, nextFormStep);
  };

  const onSkip = () => {
    const nextFormStep = form.step + 1;
    form.setStep(nextFormStep);
  };

  const showBack = stepDef.allowBack !== false && stepIndex > 0;

  return (
    <UniversalForm
      initialState={initialState}
      onValuesChangeHandler={onValuesChangeHandler}
      title={stepDef.title ?? `Шаг ${stepIndex + 1}`}
      description={stepDef.description}
      fields={fields}
      buttonNextText={stepIndex === steps.length - 1 ? 'Завершить' : 'Далее'}
      buttonBackText="Назад"
      showBackButton={showBack}
      onClickBackButton={() => form.setStep(Math.max(1, form.step - 1))}
      onClickSkipButton={stepDef.isSkippable ? onSkip : undefined}
      onFinish={onFinish}
    />
  );
});

export default DynamicStep;
