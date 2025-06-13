import { observer } from "mobx-react-lite";
import { careerFormStore } from "../../model/career-form-store";
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

export const ReviewInfoStep = observer(() => {
  const { data } = careerFormStore;
  const personalInfo = data.personalInfo || {};
  const addressInfo = data.addressInfo || {};
  console.log(
    "process.env.REACT_APP_EMAILJS_SERVICE_ID",
    process.env.REACT_APP_EMAILJS_SERVICE_ID,
  );

  const emailSender = useEmailSender();

  const onEditClick = () => {
    careerFormStore.setStep(1);
  };

  const handleStartEditMode = () => {};

  const handleFinishEditMode = () => {
    // careerFormStore.setValue("");
  };

  const sendEmail = async () => {
    const sendData = {
      ...personalInfo,
      ...addressInfo,
    };

    await emailSender.sendEmail(
      { data: sendData },
      { onSuccess: () => {}, onError: () => {}, onFinally: () => {} },
    );
  };

  console.log("personalInfo", JSON.parse(JSON.stringify(personalInfo)));
  console.log("addressInfo", JSON.parse(JSON.stringify(addressInfo)));
  return (
    <Container>
      <Section>
        <SectionTitle>Персональная информация</SectionTitle>

        {Object.keys(personalInfo).length > 0 ? (
          Object.entries(personalInfo).map(([key, val]) => (
            <Item key={key}>
              <Label>{key.replace(/([A-Z])/g, " $1").toLowerCase()}</Label>
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
      </Section>

      <Section>
        <SectionTitle>Адресная информация</SectionTitle>
        {Object.keys(addressInfo).length > 0 ? (
          Object.entries(addressInfo).map(([key, val]) => (
            <Item key={key}>
              <Label>{key.replace(/([A-Z])/g, " $1").toLowerCase()}</Label>
              <Value>{String(val)}</Value>
            </Item>
          ))
        ) : (
          <NoData>Нет данных</NoData>
        )}
      </Section>
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "space-between",
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
