import { FormListItem } from "../../model/multi-form-manager";

export interface FormsPopoverProps {
  currentFormId: string | undefined;
  onSwitchForm: (id: string) => void;
  onDeleteForm: (id: string) => void;
  onEditForm: (id: string, text: string) => void;
  onCreateNewForm: () => void;
  formList: FormListItem[];
}

export interface FormHeaderProps {
  currentStep: number;
}

export interface FormInfoProps {
  formId: string | undefined;
}


