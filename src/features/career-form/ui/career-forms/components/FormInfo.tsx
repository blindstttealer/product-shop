import { observer } from "mobx-react-lite";
import { formManager } from "../../../model/multi-form-manager";
import { FormInfoProps } from "../types";

export const FormInfo = observer(({ formId }: FormInfoProps) => {
  const currentForm = formManager.currentForm;

  if (!currentForm) return null;

  return (
    <div
      style={{
        padding: "16px",
        background: "#f8f9fa",
        borderRadius: "8px",
        marginTop: "24px",
      }}
    >
      <h4 style={{ marginBottom: "12px", color: "#343a40" }}>
        Информация о текущей форме:
      </h4>
      <p style={{ margin: "6px 0", color: "#495057" }}>ID: {formId}</p>
      <p style={{ margin: "6px 0", color: "#495057" }}>
        Шаг: {currentForm.step}
      </p>
    </div>
  );
});
