import React from 'react';
import { 
  ThemeProvider, 
  CssBaseline, 
  Box, 
  Container,
  Theme,
  SxProps
} from '@mui/material';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { DateTime } from './components/common/DateTime';
import { store } from './store';
import theme from './theme';

// تعریف تایپ‌ها
interface DateTimeProps {
  date: Date;
  format?: string;
  showIcon?: boolean;
  showTimeAgo?: boolean;
  variant?: 'h6' | 'body1' | 'body2';
  color?: 'primary' | 'secondary' | 'textPrimary' | 'textSecondary';
  updateInterval?: number;
}

// تعریف استایل‌های مشترک
const containerStyles: SxProps<Theme> = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  py: 3,
  direction: 'rtl'
};

const headerStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 2,
  p: 2,
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 1
};

const mainContentStyles: SxProps<Theme> = {
  flex: 1,
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 1,
  p: 2
};

const footerStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mt: 2,
  pt: 2,
  borderTop: '1px solid',
  borderColor: 'divider',
  p: 2,
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 1
};

const App: React.FC = () => {
  // تنظیم تاریخ ثابت برای همه کامپوننت‌ها
  const currentDate = new Date('2025-02-13T18:27:39.000Z');

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container maxWidth="lg">
            <Box sx={containerStyles}>
              {/* هدر */}
              <Box sx={headerStyles}>
                <DateTime 
                  date={currentDate}
                  showIcon
                  showTimeAgo
                  variant="h6"
                  color="primary"
                  updateInterval={1000}
                />
              </Box>

              {/* محتوای اصلی */}
              <Box sx={mainContentStyles}>
                <AppRoutes />
              </Box>

              {/* فوتر */}
              <Box sx={footerStyles}>
                <DateTime 
                  date={currentDate}
                  format="YYYY/MM/DD"
                  showIcon={false}
                  showTimeAgo={false}
                  variant="body2"
                  color="textSecondary"
                />
                <DateTime 
                  date={currentDate}
                  updateInterval={30000}
                  variant="body1"
                  color="primary"
                  showTimeAgo
                />
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;