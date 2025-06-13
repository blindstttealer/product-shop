import { CheckboxProps as AntCheckboxProps } from "antd";
import React from "react";

export interface CheckboxProps extends AntCheckboxProps {
  /**
   * Дополнительный текст подсказки
   */
  helperText?: string;
  /**
   * Показывать ли состояние ошибки
   */
  error?: boolean;
  /**
   * Сообщение об ошибке
   */
  errorMessage?: string;
  /**
   * Лейбл для чекбокса
   */
  label?: React.ReactNode;
  /**
   * Дополнительные стили контейнера
   */
  containerStyle?: React.CSSProperties;
}
