import { FormProps } from "antd";
import { AddressInfo } from "../../model/types";
import { UniversalForm } from "../../../../components/ui/universal-step-form/UniversalStepForm";
import { observer } from "mobx-react-lite";
import { careerFormStore } from "../../model/career-form-store";

export const AdressInfoStep = observer(() => {
  const initialState = careerFormStore.data.addressInfo;
  const onFinish: FormProps<AddressInfo>["onFinish"] = (values) => {
    console.log("Success:", values);
    careerFormStore.updateData({ addressInfo: values }, 3);
    careerFormStore.setStep(3);
  };

  const onFinishFailed: FormProps<AddressInfo>["onFinishFailed"] = (
    errorInfo: any,
  ) => {
    console.log("Failed:", errorInfo);
  };

  const onValuesChangeHandler = <T extends Partial<AddressInfo>>(value: T) => {
    careerFormStore.setValue("addressInfo", value);
  };

  return (
    <>
      <button onClick={() => careerFormStore.setStep(1)}>назад</button>
      <UniversalForm<AddressInfo>
        initialState={initialState}
        onValuesChangeHandler={onValuesChangeHandler}
        title="Также заполните свои данные о проживании и разрешении на работу"
        fields={[
          { name: "city", label: "City", required: true },
          { name: "address", label: "Address" },
          { name: "citizenship", label: "Citizenship", required: true },
          { name: "country", label: "Country", required: true },
          {
            name: "workPermit",
            label: "Work Permit",
            required: true,
            type: "select",
            options: [
              {
                label: "work permit to 2027.05.12",
                value: "Разрешение на работу действует до 2027 года",
              },
              {
                label: "have not work permit",
                value: "Нет разрешения на работу",
              },
            ],
          },
        ]}
        buttonText="Закончить"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      />
    </>
  );
});
