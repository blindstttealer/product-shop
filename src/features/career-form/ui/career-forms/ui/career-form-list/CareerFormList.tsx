import { formManager } from "../../../../model/multi-form-manager";
import { FC, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Spin } from "antd";
import { CareerFormItem } from "../career-form-item/CareerFormItem";
import { FormListContainer, FormListGrid } from "./styles";
import { observer } from "mobx-react-lite";

type CareerFormListProps = {};

export const CareerFormList: FC<CareerFormListProps> = observer(({}) => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const formList = formManager.formList;

  if (isLoading) return <Spin spinning={isLoading} />;

  const handleFormSwitch = async (id: string) => {
    setIsLoading(true);
    try {
      navigate(`/careers/form/${id}`);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("formList", formList);

  const handleDeleteForm = (id: string) => {
    console.log("id to delete", id);
    formManager.deleteForm(id);

    if (id === formId) {
      console.log("в условии");

      const nextForm = formList.find((f) => f.id !== id);
      console.log("nextform", nextForm);
      navigate(`/careers/form/${nextForm?.id}`);
    }
  };

  const handleEditForm = (id: string, text: string) => {
    console.log("id edit", id);

    formManager.editForm(id, text);
    console.log("edit");
  };

  const onStartEditHandler = () => {};

  const onFinishEditHandler = () => {};

  return (
    <FormListContainer>
      <FormListGrid>
        {formList.map((form) => (
          <CareerFormItem
            key={form.id}
            id={form.id}
            title={form.name}
            currentFormId={formId}
            onDeleteForm={handleDeleteForm}
            onSwitchForm={handleFormSwitch}
            onEditForm={handleEditForm}
          />
        ))}
      </FormListGrid>
    </FormListContainer>
  );
});
