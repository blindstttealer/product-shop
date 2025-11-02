import { observer } from 'mobx-react-lite';
import { formManager } from '../../model/multi-form-manager';
import { UniversalForm } from '../../../../components/ui/universal-step-form/UniversalStepForm';
import { mapServerFieldToUniversal } from './helper';

type Props = {
  stepIndex: number;
};

export const DynamicStep = observer(({ stepIndex }: Props) => {
  const form = formManager.currentForm;
  if (!form) return <div>Форма не найдена</div>;

  const templateId = form.templateId;
  if (!templateId) return <div>Шаблон у формы не задан</div>;

  const template = formManager.templates[templateId];
  if (!template) return <div>Шаблон не загружен</div>;

  const steps = template.steps || [];

  if (stepIndex < 0 || stepIndex >= steps.length) {
    return <div>Шаг {stepIndex} не найден в шаблоне</div>;
  }

  const stepDef = steps[stepIndex];

  const namespace = (stepDef as any).key ?? stepIndex;

  const fields = (stepDef.fields || []).flatMap((f: any) => {
    if (f.type === 'group' && Array.isArray(f.fields)) {
      return [mapServerFieldToUniversal(f)];
    }
    return [mapServerFieldToUniversal(f)];
  });

  const initialState = (form.data as any)[namespace] ?? {};

  const onValuesChangeHandler = (value: any) => {
    form.setValue(namespace, { ...(form.data as any)[namespace], ...value });
  };

  const onFinish = (values: any) => {
    const nextFormStep = form.step + 1;

    form.updateData({ [namespace]: values }, nextFormStep);
  };

  return (
    <UniversalForm
      initialState={initialState}
      onValuesChangeHandler={onValuesChangeHandler}
      title={stepDef.title ?? `Шаг ${stepIndex + 1}`}
      fields={fields}
      buttonNextText={stepIndex === steps.length - 1 ? 'Завершить' : 'Дальше'}
      buttonBackText="Назад"
      onClickBackButton={() => form.setStep(Math.max(0, form.step - 1))}
      onFinish={onFinish}
    />
  );
});

export default DynamicStep;
