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
import { AnalyticsData } from '../../../types/analytics';

interface DetailedReportsProps {
  data: AnalyticsData;
}

type ReportType = 'users' | 'revenue' | 'consultations';

interface TableConfig {
  headers: string[];
  getRowData: (item: any) => React.ReactNode[];
}

const REPORT_TYPES: Record<ReportType, string> = {
  users: 'کاربران',
  revenue: 'درآمد',
  consultations: 'مشاوره‌ها',
} as const;

const TABLE_CONFIGS: Record<ReportType, TableConfig> = {
  users: {
    headers: ['نام کاربر', 'تاریخ عضویت', 'تعداد مشاوره', 'مجموع پرداخت'],
    getRowData: (user) => [
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
    getRowData: (revenue) => [
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
    getRowData: (consultation) => [
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
      // در اینجا می‌توانید لاجیک دانلود گزارش را پیاده‌سازی کنید
      console.info(`Generating ${reportType} report...`);
      // مثال: await generateReportPDF(data[reportType]);
    } catch (error) {
      console.error('Error generating report:', error);
      // می‌توانید از یک کامپوننت نوتیفیکیشن برای نمایش خطا استفاده کنید
    }
  };

  const currentConfig = useMemo(() => TABLE_CONFIGS[reportType], [reportType]);
  
  const getReportData = useMemo(() => {
    // این تابع باید بر اساس نوع گزارش، داده‌های مناسب را از data استخراج کند
    return data[reportType] || [];
  }, [data, reportType]);

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          گزارش‌های تفصیلی
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <ButtonGroup variant="outlined">
            {Object.entries(REPORT_TYPES).map(([type, label]) => (
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
              {currentConfig.headers.map((header) => (
                <TableCell key={header}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {getReportData.map((item, index) => (
              <TableRow key={index}>
                {currentConfig.getRowData(item).map((cell, cellIndex) => (
                  <TableCell key={cellIndex}>{cell}</TableCell>
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