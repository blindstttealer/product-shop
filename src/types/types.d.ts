/* eslint-disable @typescript-eslint/no-empty-object-type */
import 'styled-components';
import type { Theme as AdmiralTheme } from '@admiral-ds/react-ui';

declare module 'styled-components' {
  export interface DefaultTheme extends AdmiralTheme {}
}
/* eslint-enable @typescript-eslint/no-empty-object-type */
