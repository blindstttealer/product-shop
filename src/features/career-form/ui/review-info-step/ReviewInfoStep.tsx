import { observer } from "mobx-react-lite";
import {
  Container,
  Item,
  Label,
  Section,
  Value,
  SectionTitle,
  NoData,
  EditButton,
} from "./styles";
import { EditField } from "../../../../components/ui/edit-field/EditField";
import { useEmailSender } from "../../../../shared/api/useEmailSender";
import { formManager } from "../../model/multi-form-manager";
import { useParams } from "react-router";
import { Card } from "antd";

export const ReviewInfoStep = observer(() => {
  const { formId } = useParams<{ formId: string }>();

  const currentForm = formManager.getForm(formId || "");

  if (!currentForm) {
    return (
      <Container>
        <NoData>Форма не выбрана</NoData>
      </Container>
    );
  }

  const { data } = currentForm;

  console.log("data", data);
  const personalInfo = data.personalInfo || {};
  const addressInfo = data.addressInfo || {};
  console.log("currentForm", currentForm);

  console.log("personalInfo addressInfo", personalInfo, addressInfo);

  const emailSender = useEmailSender();

  const onEditClick = () => {
    currentForm.setStep(2);
  };

  const handleStartEditMode = () => {};

  const handleFinishEditMode = () => {};

  const sendEmail = async () => {
    const sendData = {
      ...personalInfo,
      ...addressInfo,
    };

    await emailSender.sendEmail(
      { data: sendData },
      {
        onSuccess: () => console.log("Email sent successfully"),
        onError: (error) => console.error("Email sending failed:", error),
        onFinally: () => {},
      },
    );
  };

  // Функция для форматирования ключей в читаемый вид
  const formatLabel = (key: string) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .replace(/Dob/, "Date of Birth")
      .replace(/WorkPermit/, "Work Permit");
  };

  return (
    <Container>
      <Card>
        <SectionTitle>Персональная информация</SectionTitle>

        {Object.keys(personalInfo).length > 0 ? (
          Object.entries(personalInfo).map(([key, val]) => (
            <Item key={key}>
              <Label>{formatLabel(key)}</Label>
              <EditField
                text={String(val)}
                onFinishEditMode={handleFinishEditMode}
                onStartEditMode={handleStartEditMode}
              />
            </Item>
          ))
        ) : (
          <NoData>Нет данных</NoData>
        )}
      </Card>

      <Card>
        <SectionTitle>Адресная информация</SectionTitle>
        {Object.keys(addressInfo).length > 0 ? (
          Object.entries(addressInfo).map(([key, val]) => (
            <Item key={key}>
              <Label>{formatLabel(key)}</Label>
              <Value>{String(val)}</Value>
            </Item>
          ))
        ) : (
          <NoData>Нет данных</NoData>
        )}
      </Card>

      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <EditButton onClick={onEditClick}>
          Вернуться к редактированию
        </EditButton>
        <EditButton onClick={sendEmail}>Отправить форму</EditButton>
      </div>
    </Container>
  );
});
