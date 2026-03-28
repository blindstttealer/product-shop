import { FileInputField } from '@admiral-ds/react-ui';
import styled from 'styled-components';
import { ChangeEvent, useEffect, useState } from 'react';

type Props = {
  value: File | null;
  onChange: (value: File | null) => void;
};

export const AvatarBlock = ({ onChange, value }: Props) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!value) return;
    const url = URL.createObjectURL(value);
    setPreview(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [value]);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (!file) return;
    onChange(file);
  };

  return (
    <AvatarWrapper>
      <AvatarImage
        src={
          preview
            ? preview
            : 'https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?semt=ais_hybrid&w=740&q=80'
        }
        alt="Фото пользователя"
      />
      <FileInputField
        title={preview ? 'Изменить фото' : 'Загрузить фото'}
        dimension={'m'}
        name={'avatar'}
        onChange={(e) => onFileChange(e)}
      />
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
