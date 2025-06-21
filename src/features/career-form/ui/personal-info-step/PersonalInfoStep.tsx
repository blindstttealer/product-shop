import { FormProps } from "antd";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { formManager } from "../../model/multi-form-manager";
import { UniversalForm } from "../../../../components/ui/universal-step-form/UniversalStepForm";
import { PersonalInfo } from "../../model/types";
import { useEffect } from "react";

export const PersonalInfoStep = observer(() => {
  const { formId } = useParams<{ formId: string }>();

  useEffect(() => {
    if (formId) {
      formManager.switchForm(formId);
    }
  }, [formId]);

  const form = formManager.currentForm;

  if (!form) return <div>Форма не найдена</div>;

  const onFinish: FormProps<PersonalInfo>["onFinish"] = (values) => {
    form.updateData({ personalInfo: values }, 2);
  };

  const onValuesChangeHandler = <T extends Partial<PersonalInfo>>(value: T) => {
    form.setValue("personalInfo", value);
  };

  console.log("form.data.personalInfo || {}", form.data.personalInfo || {});

  return (
    <>
      <UniversalForm<PersonalInfo>
        onValuesChangeHandler={onValuesChangeHandler}
        initialState={form.data.personalInfo || {}}
        title="Заполните персональные данные будущего сотрудника"
        fields={[
          { name: "email", label: "Email", required: true },
          { name: "firstName", label: "First Name", required: true },
          { name: "lastName", label: "Last Name", required: true },
          { name: "middleName", label: "Middle Name", required: true },
          { name: "phone", label: "Phone", required: true, type: "phone" },
          {
            name: "dateOfBirth",
            label: "Date of Birth",
            required: true,
            type: "date",
          },
          {
            name: "gender",
            label: "Gender",
            required: true,
            type: "select",
            options: [
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
            ],
          },
        ]}
        buttonNextText="Дальше"
        buttonBackText="Назад"
        onClickBackButton={() => form.setStep(0)}
        onFinish={onFinish}
      />
    </>
  );
});
