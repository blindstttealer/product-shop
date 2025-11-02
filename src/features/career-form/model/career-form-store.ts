import { makeAutoObservable } from 'mobx';
import { formManager } from './multi-form-manager';

export class CareerFormStore {
  id: string;
  data: Record<string, any>;
  step: number;
  name: string;
  templateId?: string;

  constructor(id: string, data = {}, step = 1, name = 'Untitled', templateId?: string) {
    this.id = id;
    this.data = data;
    this.step = step;
    this.name = name;
    this.templateId = templateId;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  private triggerSave() {
    formManager.saveForms();
  }

  setStep(step: number) {
    this.step = step;
    this.triggerSave();
  }

  updateData(part: Record<string, any>, step?: number) {
    this.data = { ...this.data, ...part };
    if (step) this.step = step;
    this.triggerSave();
  }

  setValue(section: string, obj: Record<string, any>) {
    this.data = {
      ...this.data,
      [section]: {
        ...this.data[section],
        ...obj,
      },
    };
    this.triggerSave();
  }

  setName(newName: string) {
    this.name = newName;
    this.triggerSave();
  }

  reset() {
    this.data = {};
    this.step = 1;
    this.triggerSave();
  }

  serialize() {
    return {
      data: this.data,
      step: this.step,
      name: this.name,
      templateId: this.templateId,
    };
  }
}
