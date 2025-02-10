import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class DevErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // در محیط توسعه می‌توانیم خطاها را لاگ کنیم
    if (process.env.REACT_APP_ENV === 'development') {
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Paper sx={{ p: 3, m: 2 }}>
          <Typography variant="h5" color="error">
            خطای توسعه
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">{this.state.error?.message}</Typography>
            {this.state.errorInfo && (
              <pre style={{ overflow: 'auto', maxHeight: '300px' }}>
                {this.state.errorInfo.componentStack}
              </pre>
            )}
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.location.reload()}
            sx={{ mt: 2 }}
          >
            بارگذاری مجدد
          </Button>
        </Paper>
      );
    }

    return this.props.children;
  }
}
