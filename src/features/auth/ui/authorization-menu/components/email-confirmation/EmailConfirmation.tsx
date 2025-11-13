import { Button, Modal, T } from '@admiral-ds/react-ui';
import { Column, StyledWrapper } from '../../styles';
import { useState } from 'react';

export const EmailConfirmation = ({ emailToConfirm }: { emailToConfirm: string }) => {
  const [confirmVisible, setConfirmVisible] = useState(true);

  const resendConfirmation = async () => {
    console.log('resendConfirmation');
  };
  return confirmVisible ? (
    <Modal closeOnOutsideClick title="Подтвердите почту">
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
  ) : null;
};
