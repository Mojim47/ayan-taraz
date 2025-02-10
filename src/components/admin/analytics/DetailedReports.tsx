// src/components/admin/analytics/DetailedReports.tsx
import React, { useState } from 'react';
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

export const DetailedReports: React.FC<DetailedReportsProps> = ({ data }) => {
  const [reportType, setReportType] = useState<
    'users' | 'revenue' | 'consultations'
  >('users');

  const generateReport = () => {
    // پیاده‌سازی خروجی گزارش به صورت CSV یا EXCEL
    console.log('Generating report for:', reportType);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          گزارش‌های تفصیلی
        </Typography>
        <ButtonGroup variant="outlined" sx={{ mb: 2 }}>
          <Button
            onClick={() => setReportType('users')}
            variant={reportType === 'users' ? 'contained' : 'outlined'}
          >
            کاربران
          </Button>
          <Button
            onClick={() => setReportType('revenue')}
            variant={reportType === 'revenue' ? 'contained' : 'outlined'}
          >
            درآمد
          </Button>
          <Button
            onClick={() => setReportType('consultations')}
            variant={reportType === 'consultations' ? 'contained' : 'outlined'}
          >
            مشاوره‌ها
          </Button>
        </ButtonGroup>
        <Button
          startIcon={<Download />}
          onClick={generateReport}
          variant="contained"
          sx={{ float: 'right' }}
        >
          دریافت گزارش
        </Button>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {reportType === 'users' && (
                <>
                  <TableCell>نام کاربر</TableCell>
                  <TableCell>تاریخ عضویت</TableCell>
                  <TableCell>تعداد مشاوره</TableCell>
                  <TableCell>مجموع پرداخت</TableCell>
                </>
              )}
              {reportType === 'revenue' && (
                <>
                  <TableCell>تاریخ</TableCell>
                  <TableCell>نوع خدمت</TableCell>
                  <TableCell>تعداد</TableCell>
                  <TableCell>مبلغ کل</TableCell>
                </>
              )}
              {reportType === 'consultations' && (
                <>
                  <TableCell>تاریخ</TableCell>
                  <TableCell>مشاور</TableCell>
                  <TableCell>کاربر</TableCell>
                  <TableCell>وضعیت</TableCell>
                  <TableCell>امتیاز</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>{/* نمایش داده‌های متناسب با نوع گزارش */}</TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
