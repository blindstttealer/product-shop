import {
  Button,
  InputField,
  ModalButtonPanel,
  ModalContent,
  ModalTitle,
} from '@admiral-ds/react-ui';
import { StyledModal } from '@/features/career-form/ui/career-forms/styles';

interface CreateFormModalProps {
  formName: string;
  error: string;
  isModalOpen: boolean;
  onOkHandler: () => void;
  onCancelHandler: () => void;
  onChangeFormName: (name: string) => void;
}

export const CreateFormModal = ({
  isModalOpen,
  onOkHandler,
  formName,
  error,
  onCancelHandler,
  onChangeFormName,
}: CreateFormModalProps) => {
  return (
    isModalOpen && (
      <StyledModal onClose={onCancelHandler} dimension={'m'}>
        <ModalTitle>Новая форма</ModalTitle>
        <ModalContent>
          <form>
            <InputField
              value={formName}
              onChange={(event) => {
                onChangeFormName(event.target.value);
              }}
              status={error ? 'error' : undefined}
              extraText={error}
              placeholder="Введите название формы"
            />
          </form>
        </ModalContent>
        <ModalButtonPanel>
          <Button appearance="primary" dimension="s" onClick={onOkHandler}>
            Создать
          </Button>
          <Button appearance="secondary" dimension="s" onClick={onCancelHandler}>
            Отмена
          </Button>
        </ModalButtonPanel>
      </StyledModal>
    )
  );
};
