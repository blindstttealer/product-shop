import React from "react";
import { Steps } from "antd";
import type { StepProps } from "antd/es/steps";

export type ProgressStep = {
  title: string;
  status?: "wait" | "process" | "finish" | "error";
  icon?: React.ReactNode;
};

type ProgressStepsProps = {
  steps: ProgressStep[];
  current?: number;
};

export const ProgressSteps: React.FC<ProgressStepsProps> = ({
  steps,
  current = 0,
}) => {
  const items: StepProps[] = steps.map(({ title, status, icon }) => ({
    title,
    status,
    icon,
  }));

  return <Steps current={current} items={items} />;
};
