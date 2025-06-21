import { makeAutoObservable } from "mobx";
import { ApplicationFormData } from "./types";
import { formManager } from "./multi-form-manager";

//TODO При создании формы некорретно отображаются начальные данные, подумать как исправить

export class CareerFormStore {
  constructor(
    public id: string,
    public data: Partial<ApplicationFormData> = {},
    public step: number = 1,
    public name: string = "defaultFormName",
  ) {
    makeAutoObservable(this);
  }

  private triggerSave() {
    formManager.saveForms();
  }

  setStep(step: number) {
    this.step = step;
    this.triggerSave();
  }

  updateData(part: Partial<ApplicationFormData>, step: number) {
    this.data = { ...this.data, ...part };
    this.step = step;
    this.triggerSave();
  }

  setValue<S extends keyof ApplicationFormData>(
    section: S,
    obj: Partial<ApplicationFormData[S]>,
  ) {
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
    };
  }
}
