import { observer } from "mobx-react-lite";
import { Button, Popover } from "antd";
import {
  FormsListContainer,
  CreateButtonWrapper,
  StyledButton,
} from "../styles";
import { FormsPopoverProps } from "../types";
import { CareerFormList } from "../ui/career-form-list/CareerFormList";

export const FormsPopover = observer(
  ({
    currentFormId,
    onSwitchForm,
    onDeleteForm,
    onEditForm,
    onCreateNewForm,
    formList,
  }: FormsPopoverProps) => {
    const popoverContent = (
      <FormsListContainer>
        <CareerFormList
          currentFormId={currentFormId}
          onSwitchForm={onSwitchForm}
          onDeleteForm={onDeleteForm}
          onEditForm={onEditForm}
          formList={formList}
        />
        <CreateButtonWrapper>
          <StyledButton size="large" onClick={onCreateNewForm}>
            Создать новую форму
          </StyledButton>
        </CreateButtonWrapper>
      </FormsListContainer>
    );

    return (
      <Popover
        content={popoverContent}
        title="Мои формы"
        trigger="click"
        placement="bottomLeft"
      >
        <Button>Открыть Список форм</Button>
      </Popover>
    );
  }
);
