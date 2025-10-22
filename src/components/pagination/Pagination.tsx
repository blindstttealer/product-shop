import React, { useState } from "react";
import { Pagination as AntdPagination, PaginationProps } from "antd";

import { ReactNode } from "react";

type ItemType = "page" | "prev" | "next";

// Временно вынес сюда тип чтобы понятнее было что пропсы делают
interface PaginationProps1 {
  /**
   * Выравнивание пагинации: влево, по центру или вправо
   */
  align?: "start" | "center" | "end";

  /**
   * Текущий номер страницы (контролируемый режим)
   */
  current?: number;

  /**
   * Начальный номер страницы (неконтролируемый режим)
   * По умолчанию: 1
   */
  defaultCurrent?: number;

  /**
   * Начальное количество элементов на странице (неконтролируемый режим)
   * По умолчанию: 10
   */
  defaultPageSize?: number;

  /**
   * Отключить всю пагинацию
   */
  disabled?: boolean;

  /**
   * Скрыть пагинацию, если только одна страница
   * По умолчанию: false
   */
  hideOnSinglePage?: boolean;

  /**
   * Кастомизация отрисовки кнопок пагинации
   */
  itemRender?: (
    page: number,
    type: ItemType,
    originalElement: React.ReactNode
  ) => React.ReactNode;

  /**
   * Количество элементов на странице (контролируемый режим)
   */
  pageSize?: number;

  /**
   * Варианты выбора количества элементов на странице
   * По умолчанию: [10, 20, 50, 100]
   */
  pageSizeOptions?: number[];

  /**
   * Адаптивность в зависимости от ширины окна
   */
  responsive?: boolean;

  /**
   * Показывать меньше элементов пагинации (например, только крайние страницы и текущую)
   * По умолчанию: false
   */
  showLessItems?: boolean;

  /**
   * Показывать поле быстрого перехода к странице
   * По умолчанию: false
   * Можно передать объект с кнопкой "Перейти"
   */
  showQuickJumper?: boolean | { goButton: ReactNode };

  /**
   * Показывать селектор размера страницы
   * По умолчанию: отображается, если total > 50
   */
  showSizeChanger?:
    | boolean
    | {
        // Дополнительные свойства, как в SelectProps
        [key: string]: any;
      };

  /**
   * Показывать подсказки при наведении на элементы пагинации
   * По умолчанию: true
   */
  showTitle?: boolean;

  /**
   * Показ общего количества и текущего диапазона элементов
   * Пример: (total, [start, end]) => `Показано ${start}-${end} из ${total}`
   */
  showTotal?: (total: number, range: [number, number]) => ReactNode;

  /**
   * Использовать упрощенный режим отображения
   */
  simple?: boolean | { readOnly?: boolean };

  /**
   * Размер пагинации
   * По умолчанию: 'default'
   */
  size?: "default" | "small";

  /**
   * Общее количество элементов (обязательно для работы пагинации)
   * По умолчанию: 0
   */
  total?: number;

  /**
   * Колбэк при изменении номера страницы или размера страницы
   */
  onChange?: (page: number, pageSize: number) => void;

  /**
   * Колбэк при изменении размера страницы
   */
  onShowSizeChange?: (current: number, size: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  current,
  defaultCurrent = 1,
  pageSize,
  defaultPageSize = 10,
  total = 0,
  align = "center",
  showSizeChanger = total > 50,
  pageSizeOptions = [10, 20, 50, 100],
  showQuickJumper = true,
  showTotal,
  disabled,
  hideOnSinglePage = false,
  responsive = true,
  size = "default",
  onChange,
  ...rest
}) => {
  return (
    <AntdPagination
      current={current}
      defaultCurrent={defaultCurrent}
      pageSize={pageSize}
      defaultPageSize={defaultPageSize}
      total={total}
      showSizeChanger={showSizeChanger}
      pageSizeOptions={pageSizeOptions.map(String)}
      showQuickJumper={showQuickJumper}
      showTotal={showTotal}
      disabled={disabled}
      hideOnSinglePage={hideOnSinglePage}
      responsive={responsive}
      size={size}
      onChange={(page, size) => {
        onChange?.(page, size);
      }}
      {...rest}
    />
  );
};
