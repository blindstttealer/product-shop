import { careerFormStore } from "../model/career-form-store";
import { observer } from "mobx-react-lite";
import { ProgressSteps } from "../../../components/ui/progress-bar/ProgressBar";
import { getCurrentStepComponent } from "../lib/utils/getCurrentStepComponents";
import { steps } from "./const";
import { useMemo } from "react";
import { ApplicationFormData } from "../model/types";
import { AntdTableComponent } from "../../../components/ui/table/MyTable";

interface UnifiedData {
  key: string;
  field: string;
  value: string;
}
export const CareerForm = observer(() => {
  const { data, step } = careerFormStore;

  const { personalInfo, addressInfo } = data as ApplicationFormData;

  const unifiedData: UnifiedData[] = [
    {
      key: "firstName",
      field: "First Name",
      value: personalInfo.firstName || "",
    },
    { key: "lastName", field: "Last Name", value: personalInfo.lastName || "" },
    {
      key: "middleName",
      field: "Middle Name",
      value: personalInfo.middleName || "",
    },
    {
      key: "dob",
      field: "Date of Birth",
      value: personalInfo.dateOfBirth || "",
    },
    { key: "gender", field: "Gender", value: personalInfo.gender || "" },
    { key: "phone", field: "Phone", value: personalInfo.phone || "" },
    { key: "email", field: "Email", value: personalInfo.email || "" },

    { key: "country", field: "Country", value: addressInfo.country || "" },
    { key: "city", field: "City", value: addressInfo.city || "" },
    { key: "address", field: "Address", value: addressInfo.address || "" },
    {
      key: "citizenship",
      field: "Citizenship",
      value: addressInfo.citizenship || "",
    },
    {
      key: "workPermit",
      field: "Work Permit",
      value: addressInfo.workPermit ? "Yes" : "No",
    },
  ];

  // const columns: ColumnsType<UnifiedData> = [
  //   {
  //     title: "Field",
  //     dataIndex: "field",
  //     key: "field",
  //   },
  //   {
  //     title: "Value",
  //     dataIndex: "value",
  //     key: "value",
  //   },
  // ];

  const tableData = [
    unifiedData.reduce(
      (acc, item) => {
        acc[item.key] = item.value;
        return acc;
      },
      {} as Record<string, any>,
    ),
  ];

  // Создаем колонки на основе unifiedData
  const columns = unifiedData.map((item) => ({
    title: item.field,
    dataIndex: item.key,
    key: item.key,
  }));

  const StepComponent = useMemo(() => {
    return getCurrentStepComponent(step);
  }, [step]);

  return (
    <>
      <ProgressSteps steps={steps} current={step} />
      {StepComponent}
      <AntdTableComponent
        title="Application Summary"
        columns={columns}
        data={tableData}
        pagination={false}
        emptyDescription="No application data provided"
      />
    </>
  );
});
