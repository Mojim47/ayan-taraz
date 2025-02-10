export type ErrorSeverity = 'info' | 'warning' | 'error' | 'critical';
export type ErrorSource = 'client' | 'server' | 'network' | 'validation';

export interface ErrorLog {
  id: string;
  timestamp: Date;
  user?: string;
  severity: ErrorSeverity;
  source: ErrorSource;
  message: string;
  stack?: string;
  context: {
    url?: string;
    action?: string;
    component?: string;
    [key: string]: any;
  };
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}
