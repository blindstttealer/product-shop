import 'styled-components';
import type { Theme as AdmiralTheme } from '@admiral-ds/react-ui';

declare module 'styled-components' {
  // Говорим styled-components: DefaultTheme — это тема из @admiral-ds/react-ui
  export interface DefaultTheme extends AdmiralTheme {}
}