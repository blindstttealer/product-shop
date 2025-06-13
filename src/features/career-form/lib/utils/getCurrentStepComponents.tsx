import { CareerWelcome } from "../../ui/career-welcome/CareerWelcome";
import { PersonalInfoStep } from "../../ui/personal-info-step/PersonalInfoStep";
import { AdressInfoStep } from "../../ui/adress-info-step/AdressInfoStep";
import { ReviewInfoStep } from "../../ui/review-info-step/ReviewInfoStep";

export const getCurrentStepComponent = (step: number) => {
  switch (step) {
    case 0:
      return <CareerWelcome />;
    case 1:
      return <PersonalInfoStep />;

    case 2:
      return <AdressInfoStep />;

    case 3:
      return <ReviewInfoStep />;
  }
};
