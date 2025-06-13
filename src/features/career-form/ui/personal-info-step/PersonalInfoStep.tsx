import { FormProps } from "antd";
import { ApplicationFormData, PersonalInfo } from "../../model/types";
import { UniversalForm } from "../../../../components/ui/universal-step-form/UniversalStepForm";
import { observer } from "mobx-react-lite";
import { careerFormStore } from "../../model/career-form-store";

export const PersonalInfoStep = observer(() => {
  const initialState = careerFormStore.data.personalInfo;
  const onFinish: FormProps<PersonalInfo>["onFinish"] = (values) => {
    console.log("Success:", values);
    careerFormStore.updateData({ personalInfo: values }, 2);
    careerFormStore.setStep(2);
  };

  const onFinishFailed: FormProps<PersonalInfo>["onFinishFailed"] = (
    errorInfo: any,
  ) => {
    console.log("Failed:", errorInfo);
  };

  const onValuesChangeHandler = <T extends Partial<PersonalInfo>>(value: T) => {
    careerFormStore.setValue("personalInfo", value);
  };

  return (
    <>
      <button
        onClick={() => {
          careerFormStore.setStep(0);
        }}
      >
        Назад
      </button>
      <UniversalForm<PersonalInfo>
        onValuesChangeHandler={onValuesChangeHandler}
        initialState={initialState}
        title="Заполните персональные данные будушего сотрудника"
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
        buttonText="Дальше"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      />
    </>
  );
});
