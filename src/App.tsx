import { 
  ThemeProvider, 
  CssBaseline, 
  Box, 
  Container,
  Theme 
} from '@mui/material';
import { SxProps } from '@mui/system';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { DateTime } from './components/common/DateTime';
import { store } from './store';
import theme from './theme';

// تعریف استایل‌ها به صورت مستقیم با type
const styles: Record<string, SxProps<Theme>> = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    py: 3,
    direction: 'rtl'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 2,
    p: 2,
    bgcolor: 'background.paper',
    borderRadius: 1,
    boxShadow: 1
  },
  mainContent: {
    flex: 1,
    bgcolor: 'background.paper',
    borderRadius: 1,
    boxShadow: 1,
    p: 2
  },
  footer: {
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
  }
};

const App = () => {
  const currentDate = new Date('2025-02-14T16:27:07.000Z');

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container maxWidth="lg">
            <Box sx={styles.container}>
              <Box 
                component="header" 
                sx={styles.header}
              >
                <DateTime 
                  date={currentDate}
                  showIcon
                  showTimeAgo
                  variant="h6"
                  color="primary"
                  updateInterval={1000}
                />
              </Box>

              <Box 
                component="main" 
                sx={styles.mainContent}
              >
                <AppRoutes />
              </Box>

              <Box 
                component="footer" 
                sx={styles.footer}
              >
                <DateTime 
                  date={currentDate}
                  format="YYYY/MM/DD"
                  showIcon={false}
                  showTimeAgo={false}
                  variant="body2"
                  color="text.secondary"
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