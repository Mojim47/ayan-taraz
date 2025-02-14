import React, { useState, useMemo } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  ButtonGroup,
  Typography,
} from '@mui/material';
import { Download } from '@mui/icons-material';
import { 
  AnalyticsData, 
  UserAnalytics, 
  RevenueAnalytics, 
  ConsultationAnalytics 
} from '../../../types/analytics';

interface DetailedReportsProps {
  data: AnalyticsData;
}

type ReportType = 'users' | 'revenue' | 'consultations';
type ReportDataItem = UserAnalytics | RevenueAnalytics | ConsultationAnalytics;

interface TableConfig {
  headers: string[];
  getRowData: (item: ReportDataItem) => React.ReactNode[];
}

const REPORT_TYPES: Record<ReportType, string> = {
  users: 'کاربران',
  revenue: 'درآمد',
  consultations: 'مشاوره‌ها',
} as const;

const TABLE_CONFIGS: Record<ReportType, TableConfig> = {
  users: {
    headers: ['نام کاربر', 'تاریخ عضویت', 'تعداد مشاوره', 'مجموع پرداخت'],
    getRowData: (user: UserAnalytics) => [
      user.name,
      new Date(user.joinDate).toLocaleDateString('fa-IR'),
      user.consultationCount,
      new Intl.NumberFormat('fa-IR', {
        style: 'currency',
        currency: 'IRR',
      }).format(user.totalPayment),
    ],
  },
  revenue: {
    headers: ['تاریخ', 'نوع خدمت', 'تعداد', 'مبلغ کل'],
    getRowData: (revenue: RevenueAnalytics) => [
      new Date(revenue.date).toLocaleDateString('fa-IR'),
      revenue.serviceType,
      revenue.count,
      new Intl.NumberFormat('fa-IR', {
        style: 'currency',
        currency: 'IRR',
      }).format(revenue.totalAmount),
    ],
  },
  consultations: {
    headers: ['تاریخ', 'مشاور', 'کاربر', 'وضعیت', 'امتیاز'],
    getRowData: (consultation: ConsultationAnalytics) => [
      new Date(consultation.date).toLocaleDateString('fa-IR'),
      consultation.advisorName,
      consultation.userName,
      consultation.status,
      consultation.rating,
    ],
  },
};

export const DetailedReports: React.FC<DetailedReportsProps> = ({ data }) => {
  const [reportType, setReportType] = useState<ReportType>('users');

  const handleGenerateReport = async () => {
    try {
      console.info(`Generating ${reportType} report...`);
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  const currentConfig = useMemo(() => TABLE_CONFIGS[reportType], [reportType]);
  
  const getReportData = useMemo(() => {
    return (data[reportType]?.data || []) as ReportDataItem[];
  }, [data, reportType]);

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          گزارش‌های تفصیلی
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <ButtonGroup variant="outlined">
            {Object.entries(REPORT_TYPES).map(([type, label]: [string, string]) => (
              <Button
                key={type}
                onClick={() => setReportType(type as ReportType)}
                variant={reportType === type ? 'contained' : 'outlined'}
                sx={{ minWidth: 100 }}
              >
                {label}
              </Button>
            ))}
          </ButtonGroup>
          <Button
            startIcon={<Download />}
            onClick={handleGenerateReport}
            variant="contained"
            color="primary"
          >
            دریافت گزارش
          </Button>
        </Box>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {currentConfig.headers.map((header: string, headerIndex: number) => (
                <TableCell key={`header-${headerIndex}`}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {getReportData.map((item: ReportDataItem, index: number) => (
              <TableRow key={`row-${index}`}>
                {currentConfig.getRowData(item).map((cell: React.ReactNode, cellIndex: number) => (
                  <TableCell key={`cell-${index}-${cellIndex}`}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DetailedReports;