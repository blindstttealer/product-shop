import { DefaultTheme } from "styled-components";

// Цветовая палитра, соответствующая Ant Design и современным стандартам
const colorPalette = {
  blue: {
    50: "#e6f7ff",
    100: "#bae7ff",
    200: "#91d5ff",
    300: "#69c0ff", // Уже присутствует
    400: "#40a9ff",
    500: "#1890ff",
    600: "#096dd9",
    700: "#0050b3",
    800: "#003a8c",
    900: "#002766",
  },
  red: {
    300: "#ffa39e", // Новый оттенок
    400: "#ff7875",
    500: "#ff4d4f",
    600: "#f5222d",
    700: "#cf1322",
    800: "#a61d24",
    900: "#820014",
  },
  green: {
    300: "#95de64", // Новый оттенок
    400: "#73d13d",
    500: "#52c41a",
    600: "#389e0d",
    700: "#237804",
    800: "#135200",
    900: "#092b00",
  },
  gold: {
    300: "#ffd666", // Новый оттенок
    400: "#ffc53d",
    500: "#faad14",
    600: "#d48806",
    700: "#ad6800",
    800: "#874d00",
    900: "#613400",
  },
  gray: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#eeeeee",
    300: "#e0e0e0", // Уже присутствует
    400: "#bdbdbd",
    500: "#9e9e9e",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    900: "#212121",
  },
  purple: {
    300: "#b37feb", // Новый оттенок
    400: "#9254de",
    500: "#722ed1",
    600: "#531dab",
    700: "#391085",
  },
  cyan: {
    300: "#36cfc9", // Новый оттенок
    400: "#13c2c2",
    500: "#08979c",
    600: "#006d75",
    700: "#00474f",
  },
  magenta: {
    300: "#ff85c0", // Новый оттенок
    400: "#f759ab",
    500: "#eb2f96",
    600: "#c41d7f",
    700: "#9e1068",
  },
  volcano: {
    300: "#ff9c6e", // Новый оттенок
    400: "#ff7a45",
    500: "#fa541c",
    600: "#d4380d",
    700: "#ad2102",
  },
  lime: {
    300: "#d3f261", // Новый оттенок
    400: "#bae637",
    500: "#a0d911",
    600: "#7cb305",
    700: "#5b8c00",
  },
};

// Базовая светлая тема (Ant Design Light)
export const lightTheme: DefaultTheme = {
  colors: {
    // Основные цвета
    primary: colorPalette.blue[500],
    primaryHover: colorPalette.blue[400],
    primaryActive: colorPalette.blue[600],
    primaryDisabled: colorPalette.blue[200],

    error: colorPalette.red[500],
    errorHover: colorPalette.red[400],
    errorActive: colorPalette.red[600],

    success: colorPalette.green[500],
    successHover: colorPalette.green[400],
    successActive: colorPalette.green[600],

    warning: colorPalette.gold[500],
    warningHover: colorPalette.gold[400],
    warningActive: colorPalette.gold[600],

    // Текст
    text: {
      primary: "rgba(0, 0, 0, 0.88)",
      secondary: "rgba(0, 0, 0, 0.65)",
      tertiary: "rgba(0, 0, 0, 0.45)",
      disabled: "rgba(0, 0, 0, 0.25)",
    },

    // Фоны
    background: {
      primary: "#ffffff",
      secondary: "#fafafa",
      tertiary: "#f5f5f5",
    },

    // Границы
    border: {
      light: "#f0f0f0",
      normal: "#d9d9d9",
      bold: "#8c8c8c",
    },

    // Состояния
    states: {
      hover: "rgba(0, 0, 0, 0.02)",
      selected: "rgba(0, 0, 0, 0.04)",
      disabled: "rgba(0, 0, 0, 0.04)",
    },

    // Дополнительные
    link: colorPalette.blue[500],
    linkHover: colorPalette.blue[400],
    linkActive: colorPalette.blue[600],
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
  },
  borderRadius: {
    sm: "2px",
    md: "6px",
    lg: "8px",
    xl: "12px",
    circle: "50%",
  },
  boxShadow: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
    md: "0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
    lg: "0 6px 16px -8px rgba(0, 0, 0, 0.08), 0 9px 28px 0 rgba(0, 0, 0, 0.05), 0 12px 48px 16px rgba(0, 0, 0, 0.03)",
  },
  zIndex: {
    base: 1,
    dropdown: 1000,
    modal: 2000,
    notification: 3000,
    tooltip: 4000,
  },
};

// Темная тема (Ant Design Dark)
export const darkTheme: DefaultTheme = {
  colors: {
    // Основные цвета
    primary: colorPalette.blue[400],
    primaryHover: colorPalette.blue[300],
    primaryActive: colorPalette.blue[500],
    primaryDisabled: colorPalette.blue[700],

    error: colorPalette.red[400],
    errorHover: colorPalette.red[300],
    errorActive: colorPalette.red[500],

    success: colorPalette.green[400],
    successHover: colorPalette.green[300],
    successActive: colorPalette.green[500],

    warning: colorPalette.gold[400],
    warningHover: colorPalette.gold[300],
    warningActive: colorPalette.gold[500],

    // Текст
    text: {
      primary: "rgba(255, 255, 255, 0.85)",
      secondary: "rgba(255, 255, 255, 0.65)",
      tertiary: "rgba(255, 255, 255, 0.45)",
      disabled: "rgba(255, 255, 255, 0.25)",
    },

    // Фоны
    background: {
      primary: "#141414",
      secondary: "#1f1f1f",
      tertiary: "#262626",
    },

    // Границы
    border: {
      light: "#424242",
      normal: "#434343",
      bold: "#8c8c8c",
    },

    // Состояния
    states: {
      hover: "rgba(255, 255, 255, 0.08)",
      selected: "rgba(255, 255, 255, 0.12)",
      disabled: "rgba(255, 255, 255, 0.08)",
    },

    // Дополнительные
    link: colorPalette.blue[400],
    linkHover: colorPalette.blue[300],
    linkActive: colorPalette.blue[500],
  },
  spacing: { ...lightTheme.spacing },
  borderRadius: { ...lightTheme.borderRadius },
  boxShadow: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.3)",
    md: "0 3px 6px -4px rgba(0, 0, 0, 0.48), 0 6px 16px 0 rgba(0, 0, 0, 0.32), 0 9px 28px 8px rgba(0, 0, 0, 0.2)",
    lg: "0 6px 16px -8px rgba(0, 0, 0, 0.32), 0 9px 28px 0 rgba(0, 0, 0, 0.2), 0 12px 48px 16px rgba(0, 0, 0, 0.12)",
  },
  zIndex: { ...lightTheme.zIndex },
};

// Типизация для TypeScript
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryHover: string;
      primaryActive: string;
      primaryDisabled: string;

      error: string;
      errorHover: string;
      errorActive: string;

      success: string;
      successHover: string;
      successActive: string;

      warning: string;
      warningHover: string;
      warningActive: string;

      text: {
        primary: string;
        secondary: string;
        tertiary: string;
        disabled: string;
      };

      background: {
        primary: string;
        secondary: string;
        tertiary: string;
      };

      border: {
        light: string;
        normal: string;
        bold: string;
      };

      states: {
        hover: string;
        selected: string;
        disabled: string;
      };

      link: string;
      linkHover: string;
      linkActive: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      circle: string;
    };
    boxShadow: {
      sm: string;
      md: string;
      lg: string;
    };
    zIndex: {
      base: number;
      dropdown: number;
      modal: number;
      notification: number;
      tooltip: number;
    };
  }
}

// Тип для темы (можно использовать в компонентах)
export type AppTheme = typeof lightTheme;
