import {
  CloseOutlined,
  EditOutlined,
  SwapHorizOutlined,
} from "@mui/icons-material";
import { ComponentPropsWithoutRef, FC } from "react";
import {
  ActionButton,
  ActionsContainer,
  FormItemContainer,
  FormTitle,
} from "./styles";
import { EditField } from "../../../../../../components/ui/edit-field/EditField";
import { observer } from "mobx-react-lite";

type CareerFormItemProps = {
  currentFormId?: string;
  id: string;
  onSwitchForm: (id: string) => void;
  onDeleteForm: (id: string) => void;
  onEditForm: (id: string, text: string) => void;
  title: string;
};

export const CareerFormItem: FC<CareerFormItemProps> = observer(
  ({ currentFormId, onSwitchForm, onDeleteForm, id, title, onEditForm }) => {
    const onSaveHandler = (text: string) => {
      onEditForm(id, text);
    };

    const handleSwitchClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onSwitchForm(id);
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onDeleteForm(id);
    };

    return (
      <FormItemContainer $isActive={currentFormId === id}>
        <div style={{ flexGrow: 1 }}>
          <EditField
            text={title}
            onStartEditMode={() => {}}
            onFinishEditMode={() => {}}
            onSave={onSaveHandler}
            onCancel={() => {}}
          />
        </div>

        <ActionsContainer>
          <ActionButton
            onClick={handleSwitchClick}
            aria-label="Переключить форму"
            icon={<SwapHorizOutlined />}
          />

          <ActionButton
            onClick={handleDeleteClick}
            danger
            aria-label="Удалить"
            icon={<CloseOutlined />}
          />
        </ActionsContainer>
      </FormItemContainer>
    );
  },
);
