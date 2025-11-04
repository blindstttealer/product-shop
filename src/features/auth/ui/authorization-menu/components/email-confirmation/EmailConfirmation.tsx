import { Button, Modal, T } from '@admiral-ds/react-ui';
import { Column, StyledWrapper } from '../../styles';

export const EmailConfirmation = ({
  setConfirmVisible,
  confirmVisible,
  emailToConfirm,
}: {
  setConfirmVisible: (value: boolean) => void;
  confirmVisible: boolean;
  emailToConfirm: string;
}) => {
  if (!confirmVisible) return null;
  const resendConfirmation = async () => {
    console.log('resendConfirmation');
  };
  return (
    <Modal onClose={() => setConfirmVisible(false)} title="Подтвердите почту">
      <Column>
        <T font="Body/Body 1 Short">
          Мы отправили письмо подтверждения на <strong>{emailToConfirm}</strong>. Пожалуйста,
          откройте письмо и перейдите по ссылке.
        </T>
        <StyledWrapper>
          <Button appearance="ghost" onClick={() => setConfirmVisible(false)}>
            Закрыть
          </Button>
          <Button appearance="primary" onClick={resendConfirmation}>
            Отправить снова
          </Button>
        </StyledWrapper>
      </Column>
    </Modal>
  );
};
