import { makeAutoObservable, runInAction } from 'mobx';
import { nanoid } from 'nanoid';
import { FormDefinition } from './types';
import { CareerFormStore } from './career-form-store';

import { getFromLocalStorage, saveToLocalStorage } from '@/shared/utils/localStorage';

export interface SerializedForm {
  data: Record<string, any>;
  step: number;
  name: string;
  templateId?: string;
}

export type FormListItem = {
  id: string;
  step: number;
  data: Record<string, any>;
  name: string;
  templateId?: string;
};

const LS_KEY_FORMS = 'careerForms';
const LS_KEY_LAST_ACTIVE = 'careerForms:lastActive';

export class MultiFormManager {
  private forms: Record<string, CareerFormStore> = {};
  private currentFormId: string | null = null;

  templates: Record<string, FormDefinition> = {};

  isTemplatesLoading: boolean;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.loadForms();
  }
  // Когда сделаю бэк, нужно будет подменить запрос на бэк
  async loadTemplates(url = '/fields.json'): Promise<FormDefinition[]> {
    try {
      this.isTemplatesLoading = true;
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) return [];
      const json = await res.json();
      const list: FormDefinition[] = Array.isArray(json) ? json : json.forms || [];
      runInAction(() => {
        this.templates = Object.fromEntries(list.map((t) => [t.id, t]));
        this.isTemplatesLoading = false;
      });
      return list;
    } catch (e) {
      this.isTemplatesLoading = false;
      return [];
    }
  }

  createFromTemplate(templateId: string, name?: string) {
    console.log('templateId', templateId, name);
    const template = this.templates[templateId];
    console.log('template', template);
    if (!template) throw new Error('Template not found: ' + templateId);
    const id = `form_${nanoid()}`;
    const form = new CareerFormStore(id, {}, 1, name ?? template.title, templateId);
    runInAction(() => {
      this.forms[id] = form;
      this.currentFormId = id;
      this.saveForms();
    });
    return form;
  }

  // createForm(initialData?: Partial<ApplicationFormData>, formName?: string) {
  //   const id = `form_${nanoid()}`;
  //   const form = new CareerFormStore(id, initialData ?? {}, 1, formName ?? "Untitled");
  //   runInAction(() => {
  //     this.forms[id] = form;
  //     this.currentFormId = id;
  //     this.saveForms();
  //   });
  //   return form;
  // }

  getForm(formId: string) {
    return this.forms[formId];
  }

  get currentForm() {
    return this.currentFormId ? this.forms[this.currentFormId] : undefined;
  }

  switchForm(formId: string) {
    if (!this.forms[formId]) return;
    runInAction(() => {
      this.currentFormId = formId;
      this.saveForms();
    });
  }

  deleteForm(formId: string) {
    if (!this.forms[formId]) return;
    runInAction(() => {
      delete this.forms[formId];
      if (this.currentFormId === formId) {
        this.currentFormId = Object.keys(this.forms)[0] || null;
      }
      this.saveForms();
    });
  }

  editForm(formId: string, newName: string) {
    const f = this.forms[formId];
    if (!f) return;
    f.setName(newName);
    this.saveForms();
  }

  saveForms() {
    console.log('this.forms', JSON.parse(JSON.stringify(this.forms)));
    const payload = Object.entries(this.forms).reduce<Record<string, SerializedForm>>(
      (acc, [id, form]) => {
        acc[id] = form.serialize();
        return acc;
      },
      {},
    );
    console.log('payload', payload);
    saveToLocalStorage(LS_KEY_FORMS, payload);
    saveToLocalStorage(LS_KEY_LAST_ACTIVE, this.currentFormId);
  }

  private loadForms() {
    const saved = getFromLocalStorage<Record<string, SerializedForm>>(LS_KEY_FORMS);
    const last = getFromLocalStorage<string>(LS_KEY_LAST_ACTIVE);
    if (!saved) return;
    runInAction(() => {
      Object.entries(saved).forEach(([id, s]) => {
        this.forms[id] = new CareerFormStore(id, s.data, s.step, s.name, s.templateId);
      });
      if (last && this.forms[last]) this.currentFormId = last;
      else this.currentFormId = Object.keys(this.forms)[0] || null;
    });
  }

  get formList() {
    return Object.values(this.forms).map((f) => ({
      id: f.id,
      step: f.step,
      data: { ...f.data },
      name: f.name,
      templateId: f.templateId,
    }));
  }

  get templatesLoading() {
    return this.isTemplatesLoading;
  }
}

export const formManager = new MultiFormManager();
