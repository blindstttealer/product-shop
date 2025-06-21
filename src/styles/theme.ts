import { DefaultTheme } from "styled-components";

const colorPalette = {
  blue: {
    50: "#e6f7ff",
    100: "#bae7ff",
    200: "#91d5ff",
    300: "#69c0ff",
    400: "#40a9ff",
    500: "#1890ff",
    600: "#096dd9",
    700: "#0050b3",
    800: "#003a8c",
    900: "#002766",
  },
  red: {
    50: "#fff1f0",
    100: "#ffccc7",
    200: "#ffa39e",
    300: "#ff7875",
    400: "#ff4d4f",
    500: "#f5222d",
    600: "#cf1322",
    700: "#a61d24",
    800: "#820014",
    900: "#5c0011",
  },
  green: {
    50: "#f6ffed",
    100: "#d9f7be",
    200: "#b7eb8f",
    300: "#95de64",
    400: "#73d13d",
    500: "#52c41a",
    600: "#389e0d",
    700: "#237804",
    800: "#135200",
    900: "#092b00",
  },
  gold: {
    50: "#fffbe6",
    100: "#fff1b8",
    200: "#ffe58f",
    300: "#ffd666",
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
    300: "#e0e0e0",
    400: "#bdbdbd",
    500: "#9e9e9e",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    900: "#212121",
  },
  cyan: {
    50: "#e6fffb",
    100: "#b5f5ec",
    200: "#87e8de",
    300: "#36cfc9",
    400: "#13c2c2",
    500: "#08979c",
    600: "#006d75",
    700: "#00474f",
    800: "#002329",
    900: "#001314",
  },
  purple: {
    50: "#f9f0ff",
    100: "#efdbff",
    200: "#d3adf7",
    300: "#b37feb",
    400: "#9254de",
    500: "#722ed1",
    600: "#531dab",
    700: "#391085",
    800: "#22075e",
    900: "#120338",
  },
  magenta: {
    50: "#fff0f6",
    100: "#ffd6e7",
    200: "#ffadd2",
    300: "#ff85c0",
    400: "#f759ab",
    500: "#eb2f96",
    600: "#c41d7f",
    700: "#9e1068",
    800: "#780650",
    900: "#520339",
  },
  volcano: {
    50: "#fff2e8",
    100: "#ffd8bf",
    200: "#ffbb96",
    300: "#ff9c6e",
    400: "#ff7a45",
    500: "#fa541c",
    600: "#d4380d",
    700: "#ad2102",
    800: "#871400",
    900: "#610b00",
  },
  lime: {
    50: "#fcffe6",
    100: "#f4ffb8",
    200: "#eaff8f",
    300: "#d3f261",
    400: "#bae637",
    500: "#a0d911",
    600: "#7cb305",
    700: "#5b8c00",
    800: "#3f6600",
    900: "#254000",
  },
  yellow: {
    50: "#feffe6",
    100: "#ffffb8",
    200: "#fffb8f",
    300: "#fff566",
    400: "#ffec3d",
    500: "#fadb14",
    600: "#d4b106",
    700: "#ad8b00",
    800: "#876800",
    900: "#614700",
  },
  orange: {
    50: "#fff7e6",
    100: "#ffe7ba",
    200: "#ffd591",
    300: "#ffc069",
    400: "#ffa940",
    500: "#fa8c16",
    600: "#d46b08",
    700: "#ad4e00",
    800: "#873800",
    900: "#612500",
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
    primaryLight: colorPalette.blue[100],

    secondary: colorPalette.gray[500],
    secondaryHover: colorPalette.gray[400],
    secondaryActive: colorPalette.gray[600],

    error: colorPalette.red[500],
    errorHover: colorPalette.red[400],
    errorActive: colorPalette.red[600],
    errorLight: colorPalette.red[100],

    success: colorPalette.green[500],
    successHover: colorPalette.green[400],
    successActive: colorPalette.green[600],
    successLight: colorPalette.green[100],

    warning: colorPalette.gold[500],
    warningHover: colorPalette.gold[400],
    warningActive: colorPalette.gold[600],
    warningLight: colorPalette.gold[100],

    info: colorPalette.cyan[500],
    infoHover: colorPalette.cyan[400],
    infoActive: colorPalette.cyan[600],

    // Текст
    text: {
      primary: "rgba(0, 0, 0, 0.88)",
      secondary: "rgba(0, 0, 0, 0.65)",
      tertiary: "rgba(0, 0, 0, 0.45)",
      disabled: "rgba(0, 0, 0, 0.25)",
      inverse: "#ffffff",
      link: colorPalette.blue[500],
      linkHover: colorPalette.blue[400],
      linkActive: colorPalette.blue[600],
    },

    // Фоны
    background: {
      primary: "#ffffff",
      secondary: "#fafafa",
      tertiary: "#f5f5f5",
      overlay: "rgba(0, 0, 0, 0.45)",
    },

    // Границы
    border: {
      light: "#f0f0f0",
      normal: "#d9d9d9",
      bold: "#8c8c8c",
      divider: "rgba(0, 0, 0, 0.06)",
    },

    // Состояния
    states: {
      hover: "rgba(0, 0, 0, 0.02)",
      selected: "rgba(0, 0, 0, 0.04)",
      disabled: "rgba(0, 0, 0, 0.04)",
      active: "rgba(0, 0, 0, 0.06)",
    },

    // Дополнительные
    mask: "rgba(0, 0, 0, 0.45)",
    highlight: colorPalette.yellow[100],
  },

  // Типография
  fontFamily: {
    primary:
      "'-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
    code: "'SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo', monospace",
    heading:
      "'-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
  },

  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    xxl: "24px",
    h3: "28px",
    h2: "32px",
    h1: "38px",
    display: "48px",
  },

  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  lineHeights: {
    xs: 1.2,
    sm: 1.4,
    md: 1.5,
    lg: 1.6,
    xl: 1.8,
  },

  letterSpacings: {
    normal: "0",
    wide: "0.5px",
    wider: "1px",
  },

  // Пространство
  spacing: {
    none: "0",
    xxs: "4px",
    xs: "8px",
    sm: "12px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
    xxxl: "64px",
  },

  // Границы
  borderRadius: {
    none: "0",
    xs: "2px",
    sm: "4px",
    md: "6px",
    lg: "8px",
    xl: "12px",
    xxl: "16px",
    circle: "50%",
    pill: "9999px",
  },

  // Тени
  boxShadow: {
    xs: "0 1px 1px rgba(0, 0, 0, 0.05)",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
    md: "0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
    lg: "0 6px 16px -8px rgba(0, 0, 0, 0.08), 0 9px 28px 0 rgba(0, 0, 0, 0.05), 0 12px 48px 16px rgba(0, 0, 0, 0.03)",
    xl: "0 8px 24px rgba(0, 0, 0, 0.1), 0 16px 48px rgba(0, 0, 0, 0.08)",
    inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
  },

  // Z-индексы
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
    notification: 1080,
    toast: 1090,
  },

  // Адаптивные брейкпоинты
  breakpoints: {
    xs: "480px",
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
    xxl: "1600px",
  },

  // Анимации
  transitions: {
    duration: {
      fast: "0.15s",
      normal: "0.3s",
      slow: "0.4s",
    },
    easing: {
      easeInOut: "cubic-bezier(0.645, 0.045, 0.355, 1)",
      easeOut: "cubic-bezier(0.215, 0.61, 0.355, 1)",
      easeIn: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
    },
  },
};

// Темная тема
export const darkTheme: DefaultTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    // Основные цвета
    primary: colorPalette.blue[400],
    primaryHover: colorPalette.blue[300],
    primaryActive: colorPalette.blue[500],
    primaryDisabled: colorPalette.blue[700],
    primaryLight: colorPalette.blue[900],

    secondary: colorPalette.gray[400],
    secondaryHover: colorPalette.gray[300],
    secondaryActive: colorPalette.gray[500],

    error: colorPalette.red[400],
    errorHover: colorPalette.red[300],
    errorActive: colorPalette.red[500],
    errorLight: colorPalette.red[900],

    success: colorPalette.green[400],
    successHover: colorPalette.green[300],
    successActive: colorPalette.green[500],
    successLight: colorPalette.green[900],

    warning: colorPalette.gold[400],
    warningHover: colorPalette.gold[300],
    warningActive: colorPalette.gold[500],
    warningLight: colorPalette.gold[900],

    info: colorPalette.cyan[400],
    infoHover: colorPalette.cyan[300],
    infoActive: colorPalette.cyan[500],

    // Текст
    text: {
      primary: "rgba(255, 255, 255, 0.85)",
      secondary: "rgba(255, 255, 255, 0.65)",
      tertiary: "rgba(255, 255, 255, 0.45)",
      disabled: "rgba(255, 255, 255, 0.25)",
      inverse: "#141414",
      link: colorPalette.blue[400],
      linkHover: colorPalette.blue[300],
      linkActive: colorPalette.blue[500],
    },

    // Фоны
    background: {
      primary: "#141414",
      secondary: "#1f1f1f",
      tertiary: "#262626",
      overlay: "rgba(0, 0, 0, 0.65)",
    },

    // Границы
    border: {
      light: "#424242",
      normal: "#434343",
      bold: "#8c8c8c",
      divider: "rgba(255, 255, 255, 0.12)",
    },

    // Состояния
    states: {
      hover: "rgba(255, 255, 255, 0.08)",
      selected: "rgba(255, 255, 255, 0.12)",
      disabled: "rgba(255, 255, 255, 0.08)",
      active: "rgba(255, 255, 255, 0.18)",
    },

    // Дополнительные
    mask: "rgba(0, 0, 0, 0.65)",
    highlight: colorPalette.yellow[900],
  },

  boxShadow: {
    ...lightTheme.boxShadow,
    xs: "0 1px 1px rgba(0, 0, 0, 0.15)",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.2)",
    md: "0 3px 6px -4px rgba(0, 0, 0, 0.48), 0 6px 16px 0 rgba(0, 0, 0, 0.32), 0 9px 28px 8px rgba(0, 0, 0, 0.2)",
    lg: "0 6px 16px -8px rgba(0, 0, 0, 0.32), 0 9px 28px 0 rgba(0, 0, 0, 0.2), 0 12px 48px 16px rgba(0, 0, 0, 0.12)",
    xl: "0 8px 24px rgba(0, 0, 0, 0.3), 0 16px 48px rgba(0, 0, 0, 0.25)",
  },
};

// Типизация
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryHover: string;
      primaryActive: string;
      primaryDisabled: string;
      primaryLight: string;

      secondary: string;
      secondaryHover: string;
      secondaryActive: string;

      error: string;
      errorHover: string;
      errorActive: string;
      errorLight: string;

      success: string;
      successHover: string;
      successActive: string;
      successLight: string;

      warning: string;
      warningHover: string;
      warningActive: string;
      warningLight: string;

      info: string;
      infoHover: string;
      infoActive: string;

      text: {
        primary: string;
        secondary: string;
        tertiary: string;
        disabled: string;
        inverse: string;
        link: string;
        linkHover: string;
        linkActive: string;
      };

      background: {
        primary: string;
        secondary: string;
        tertiary: string;
        overlay: string;
      };

      border: {
        light: string;
        normal: string;
        bold: string;
        divider: string;
      };

      states: {
        hover: string;
        selected: string;
        disabled: string;
        active: string;
      };

      mask: string;
      highlight: string;
    };

    fontFamily: {
      primary: string;
      code: string;
      heading: string;
    };

    fontSizes: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      h3: string;
      h2: string;
      h1: string;
      display: string;
    };

    fontWeights: {
      light: number;
      regular: number;
      medium: number;
      semibold: number;
      bold: number;
      extrabold: number;
    };

    lineHeights: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };

    letterSpacings: {
      normal: string;
      wide: string;
      wider: string;
    };

    spacing: {
      none: string;
      xxs: string;
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      xxxl: string;
    };

    borderRadius: {
      none: string;
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      circle: string;
      pill: string;
    };

    boxShadow: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      inner: string;
    };

    zIndex: {
      base: number;
      dropdown: number;
      sticky: number;
      fixed: number;
      modalBackdrop: number;
      modal: number;
      popover: number;
      tooltip: number;
      notification: number;
      toast: number;
    };

    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };

    transitions: {
      duration: {
        fast: string;
        normal: string;
        slow: string;
      };
      easing: {
        easeInOut: string;
        easeOut: string;
        easeIn: string;
      };
    };
  }
}

export type AppTheme = typeof lightTheme;
