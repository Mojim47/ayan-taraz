import { createTheme } from '@mui/material/styles';
import { faIR } from '@mui/material/locale';

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      sidebar: {
        width: number;
        closedWidth: number;
      };
    };
  }
  interface ThemeOptions {
    custom?: {
      sidebar?: {
        width?: number;
        closedWidth?: number;
      };
    };
  }
}

export const theme = createTheme(
  {
    direction: 'rtl',
    typography: {
      fontFamily: 'IRANSans, Arial, sans-serif',
    },
    palette: {
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
    custom: {
      sidebar: {
        width: 240,
        closedWidth: 70,
      },
    },
  },
  faIR
);
