import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { formManager } from "../../../model/multi-form-manager";

export const useCareerFormActions = () => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const switchToForm = async (id: string) => {
    setIsLoading(true);
    try {
      await formManager.switchForm(id);
      navigate(`/careers/form/${id}`);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteForm = (id: string) => {
    formManager.deleteForm(id);

    if (id === formId) {
      const nextForm = formManager.formList.find((f) => f.id !== id);
      if (nextForm) {
        navigate(`/careers/form/${nextForm.id}`);
      } else {
        navigate("/careers");
      }
    }
  };

  const editForm = (id: string, newName: string) => {
    formManager.editForm(id, newName);
  };

  const createNewForm = (formName: string) => {
    const newForm = formManager.createForm({}, formName);
    navigate(`/careers/form/${newForm.id}`);
  };

  useEffect(() => {
    if (formId) {
      switchToForm(formId);
    }
  }, [formId]);

  return {
    formId,
    isLoading,
    switchToForm,
    deleteForm,
    editForm,
    createNewForm,
  };
};
