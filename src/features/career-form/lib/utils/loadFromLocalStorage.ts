type UniversalFormLocalStorageKeys =
  | "applicationForm"
  | "step"
  | "careerForms"
  | "careerFormsData"
  | "lastActiveForm";

export const loadFromLocalStorage = (keys: UniversalFormLocalStorageKeys[]) => {
  const data = {} as Record<UniversalFormLocalStorageKeys, any>;
  for (const key of keys) {
    const item = localStorage.getItem(key);
    if (item) {
      data[key] = JSON.parse(item);
    }
  }

  return data;
};
