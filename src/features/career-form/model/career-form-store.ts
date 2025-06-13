import { loadFromLocalStorage } from "../lib/utils/loadFromLocalStorage";

import { makeAutoObservable } from "mobx";
import { saveToLocalStorage } from "../lib/utils/saveToLocalStorage";
import { ApplicationFormData } from "./types";

class CareerFormStore {
  step = 1;
  data: Partial<ApplicationFormData> = {};

  constructor() {
    makeAutoObservable(this);
    const saved = loadFromLocalStorage(["applicationForm"]);
    console.log("saved", saved);
    if (saved) {
      this.data = saved?.applicationForm?.data ?? this.data;
      this.step = saved?.applicationForm?.step ?? this.step;
    }
  }

  setStep(step: number) {
    this.step = step;
  }

  updateData(part: Partial<ApplicationFormData>, step: number) {
    this.data = { ...this.data, ...part };
    this.step = step;
    saveToLocalStorage("applicationForm", {
      data: this.data,
      step,
    });
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
    console.log("setValueee", obj, section);
  }

  reset() {
    this.data = {};
    this.step = 1;
    localStorage.removeItem("applicationForm");
  }
}

export const careerFormStore = new CareerFormStore();
