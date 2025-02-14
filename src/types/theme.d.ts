import '@mui/material/styles';
import { Theme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface CustomTheme extends Theme {
   
  }
  
  export interface Theme extends CustomTheme {}
  export interface ThemeOptions extends Partial<CustomTheme> {}
}