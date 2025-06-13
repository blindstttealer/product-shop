import { ReactNode, useState } from "react";
import { Value } from "../../../features/career-form/ui/review-info-step/styles";

type EditFieldProps = {
  text: string;
  onStartEditMode: () => void;
  onFinishEditMode: () => void;
};

export const EditField = ({ text }: EditFieldProps) => {
  const [tempFieldText, setTempFieldText] = useState(text);
  const [editMode, setEditMode] = useState(false);

  const handleUseEditMode = (mode: boolean) => {
    setEditMode(mode);
  };

  return editMode ? (
    <input
      onChange={(e) => setTempFieldText(e.target.value)}
      value={tempFieldText}
      autoFocus
      onBlur={() => handleUseEditMode(false)}
    />
  ) : (
    <Value onDoubleClick={() => handleUseEditMode(true)}>{text}</Value>
  );
};
