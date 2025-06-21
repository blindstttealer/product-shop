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
  private forms = new Map<string, CareerFormStore>();
  private currentFormId: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.loadForms();
  }

  createForm(
    initialData?: Partial<ApplicationFormData>,
    formName?: string,
  ): CareerFormStore {
    const formId = `form_${nanoid()}`;
    const form = new CareerFormStore(formId, initialData, 1, formName);

    console.log("form", JSON.parse(JSON.stringify(form)));

    runInAction(() => {
      this.forms.set(formId, form);
      this.currentFormId = formId;
      this.saveForms();
    });

    return form;
  }

  getForm(formId: string): CareerFormStore | undefined {
    return this.forms.get(formId);
  }

  get currentForm(): CareerFormStore | undefined {
    return this.currentFormId ? this.forms.get(this.currentFormId) : undefined;
  }

  async switchForm(formId: string): Promise<boolean> {
    if (!this.forms.has(formId)) return false;

    return new Promise((resolve) => {
      runInAction(() => {
        this.currentFormId = formId;
        this.forms = new Map(this.forms);
        resolve(true);
      });
    });
  }

  deleteForm(formId: string) {
    if (this.forms.has(formId)) {
      const newForms = new Map(this.forms);
      newForms.delete(formId);

      runInAction(() => {
        this.forms = newForms;

        if (this.currentFormId === formId) {
          this.currentFormId = this.forms.keys().next().value || null;
        }

        this.saveForms();
      });
    }
  }

  editForm(formId: string, newName: string) {
    if (this.forms.has(formId)) {
      const currentForm = this.forms.get(formId);
      if (currentForm) {
        currentForm.setName(newName);
        this.forms.set(formId, currentForm);
      }

      runInAction(() => {
        this.saveForms();
      });
    }
  }

  public saveForms() {
    const formsData = Array.from(this.forms.entries()).reduce(
      (acc, [id, form]) => ({
        ...acc,
        [id]: form.serialize(),
      }),
      {},
    );
    saveToLocalStorage("careerForms", formsData);
  }

  private loadForms() {
    const saved = loadFromLocalStorage(["careerForms", "lastActiveForm"]);

    if (saved?.careerForms) {
      runInAction(() => {
        const formsData = saved.careerForms as Record<string, SerializedForm>;

        // Загружаем все формы
        Object.entries(formsData).forEach(([id, formData]) => {
          this.forms.set(
            id,
            new CareerFormStore(
              id,
              formData.data,
              formData.step,
              formData.name,
            ),
          );
        });

        // 1. Пытаемся восстановить последнюю активную форму
        if (saved.lastActiveForm && this.forms.has(saved.lastActiveForm)) {
          this.currentFormId = saved.lastActiveForm;
        }
        // 2. Или форму из URL (если компонент уже знает formId)
        else if (this.currentFormId && this.forms.has(this.currentFormId)) {
          // Уже установлено
        }
        // 3. Иначе первую доступную (как fallback)
        else {
          this.currentFormId = this.forms.keys().next().value || null;
        }
      });
    }
  }

  get formList(): FormListItem[] {
    // Создаем новый массив каждый раз
    return Array.from(this.forms.values()).map((form) => ({
      id: form.id,
      step: form.step,
      data: { ...form.data },
      name: form.name,
    }));
  }
}

export const formManager = new MultiFormManager();
