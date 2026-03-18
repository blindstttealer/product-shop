import { FileInput } from '@admiral-ds/react-ui';
import styled from 'styled-components';

export const AvatarBlock = () => {
  return (
    <AvatarWrapper>
      <AvatarImage
        src="https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?semt=ais_hybrid&w=740&q=80"
        alt="Фото пользователя"
      />
      <FileInput title={`Загрузить фото`} dimension={'m'} name={'avatar'} />
    </AvatarWrapper>
  );
};

const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  gap: 50px;
  padding: 24px 32px;
  background: ${({ theme }) => theme.color['Neutral/Neutral 05']};
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 20']};
`;

const AvatarImage = styled.img`
  border-radius: 50%;
  width: 80px;
  height: 80px;
`;
