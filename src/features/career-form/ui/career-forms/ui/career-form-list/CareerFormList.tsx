import { FormListItem } from "../../../../model/multi-form-manager";
import { FC } from "react";
import { CareerFormItem } from "../career-form-item/CareerFormItem";
import { FormListContainer, FormListGrid } from "./styles";
import { observer } from "mobx-react-lite";

interface CareerFormListProps {
  currentFormId: string;
  onSwitchForm: (id: string) => void;
  onDeleteForm: (id: string) => void;
  onEditForm: (id: string, newText: string) => void;
  formList: FormListItem[];
}

export const CareerFormList: FC<CareerFormListProps> = observer(
  ({ onSwitchForm, currentFormId, onDeleteForm, onEditForm, formList }) => {
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
              currentFormId={currentFormId}
              onDeleteForm={onDeleteForm}
              onSwitchForm={onSwitchForm}
              onEditForm={onEditForm}
            />
          ))}
        </FormListGrid>
      </FormListContainer>
    );
  }
);
