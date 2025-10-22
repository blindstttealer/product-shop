import { FormProps } from "antd";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { formManager } from "../../model/multi-form-manager";
import { UniversalForm } from "../../../../components/ui/universal-step-form/UniversalStepForm";
import { AddressInfo } from "../../model/types";

export const AdressInfoStep = observer(() => {
  const form = formManager.currentForm;

  console.log("current form", formManager.currentForm);

  if (!form) return <div>Форма не найдена</div>;

  const onFinish: FormProps<AddressInfo>["onFinish"] = (values) => {
    form.updateData({ addressInfo: values }, 3);
  };

  const onValuesChangeHandler = <T extends Partial<AddressInfo>>(value: T) => {
    form.setValue("addressInfo", value);
  };
  return (
    <>
      <UniversalForm<AddressInfo>
        initialState={form.data.addressInfo || {}}
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
        buttonNextText="Закончить"
        buttonBackText="Назад"
        onClickBackButton={() => form.setStep(1)}
        onFinish={onFinish}
      />
    </>
  );
});
