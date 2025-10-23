import { makeAutoObservable, runInAction } from "mobx";
import { nanoid } from "nanoid";
import { ApplicationFormData } from "./types";
import { CareerFormStore } from "./career-form-store";
import { saveToLocalStorage } from "../lib/utils/saveToLocalStorage";
import { loadFromLocalStorage } from "../lib/utils/loadFromLocalStorage";

export interface SerializedForm {
  data: Partial<ApplicationFormData>;
  step: number;
  name: string;
}

export type FormListItem = {
  id: string;
  step: number;
  data: Partial<ApplicationFormData>;
  name: string;
};

export class MultiFormManager {
  private forms: Record<string, CareerFormStore> = {};
  private currentFormId: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.loadForms();
  }

  createForm(
    initialData?: Partial<ApplicationFormData>,
    formName?: string
  ): CareerFormStore {
    const formId = `form_${nanoid()}`;
    const form = new CareerFormStore(formId, initialData, 1, formName);

    runInAction(() => {
      this.forms[formId] = form;
      this.currentFormId = formId;
      this.saveForms();
    });

    return form;
  }

  getForm(formId: string): CareerFormStore | undefined {
    return this.forms[formId];
  }

  get currentForm(): CareerFormStore | undefined {
    return this.currentFormId ? this.forms[this.currentFormId] : undefined;
  }

  async switchForm(formId: string) {
    return new Promise((resolve) => {
      runInAction(() => {
        this.currentFormId = formId;
        resolve(true);
      });
    });
  }

  deleteForm(formId: string) {
    if (this.forms[formId]) {
      runInAction(() => {
        delete this.forms[formId];

        if (this.currentFormId === formId) {
          this.currentFormId = Object.keys(this.forms)[0] || null;
        }

        this.saveForms();
      });
    }
  }

  editForm(formId: string, newName: string) {
    if (this.forms[formId]) {
      this.forms[formId].setName(newName);

      runInAction(() => {
        this.saveForms();
      });
    }
  }

  saveForms() {
    const formsData = Object.entries(this.forms).reduce(
      (acc, [id, form]) => ({
        ...acc,
        [id]: form.serialize(),
      }),
      {}
    );
    saveToLocalStorage("careerForms", formsData);
  }

  private loadForms() {
    const saved = loadFromLocalStorage(["careerForms", "lastActiveForm"]);

    if (saved?.careerForms) {
      runInAction(() => {
        const formsData = saved.careerForms as Record<string, SerializedForm>;

        Object.entries(formsData).forEach(([id, formData]) => {
          this.forms[id] = new CareerFormStore(
            id,
            formData.data,
            formData.step,
            formData.name
          );
        });

        if (saved.lastActiveForm && this.forms[saved.lastActiveForm]) {
          this.currentFormId = saved.lastActiveForm;
        } else {
          this.currentFormId = Object.keys(this.forms)[0] || null;
        }
      });
    }
  }

  get formList(): FormListItem[] {
    return Object.values(this.forms).map((form) => ({
      id: form.id,
      step: form.step,
      data: { ...form.data },
      name: form.name,
    }));
  }
}

export const formManager = new MultiFormManager();
