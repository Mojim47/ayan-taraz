// src/components/admin/analytics/AnalyticsDashboard.tsx
import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  People,
  Visibility,
  TrendingUp,
  Assignment,
} from '@mui/icons-material';
import { AnalyticsData, TimeRange } from '../../../types/analytics';

interface AnalyticsDashboardProps {
  data: AnalyticsData;
  onTimeRangeChange: (range: TimeRange) => void;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  data,
  onTimeRangeChange,
}) => {
  const [timeRange, setTimeRange] = useState('7d');

  const handleTimeRangeChange = (event: any) => {
    const range = event.target.value;
    setTimeRange(range);
    const end = new Date();
    const start = new Date();

    switch (range) {
      case '7d':
        start.setDate(start.getDate() - 7);
        break;
      case '30d':
        start.setDate(start.getDate() - 30);
        break;
      case '90d':
        start.setDate(start.getDate() - 90);
        break;
      default:
        break;
    }

    onTimeRangeChange({ start, end });
  };

  const StatCard = ({ icon, title, value, subtitle, color }: any) => (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              p: 1,
              borderRadius: 1,
              bgcolor: `${color}20`,
              color: color,
              mr: 2,
            }}
          >
            {icon}
          </Box>
          <Typography color="textSecondary">{title}</Typography>
        </Box>
        <Typography variant="h4" sx={{ mb: 1 }}>
          {value}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">داشبورد تحلیلی</Typography>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>بازه زمانی</InputLabel>
          <Select
            value={timeRange}
            onChange={handleTimeRangeChange}
            label="بازه زمانی"
          >
            <MenuItem value="7d">۷ روز گذشته</MenuItem>
            <MenuItem value="30d">۳۰ روز گذشته</MenuItem>
            <MenuItem value="90d">۹۰ روز گذشته</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {/* کارت‌های آماری */}
        <Grid item xs={12} md={3}>
          <StatCard
            icon={<People />}
            title="کاربران فعال"
            value={data.users.active}
            subtitle={`${data.users.growth}% رشد نسبت به ماه قبل`}
            color="#2196F3"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            icon={<Visibility />}
            title="بازدیدکنندگان"
            value={data.visitors.total}
            subtitle={`${data.visitors.unique} بازدید یکتا`}
            color="#4CAF50"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            icon={<TrendingUp />}
            title="درآمد"
            value={new Intl.NumberFormat('fa-IR', {
              style: 'currency',
              currency: 'IRR',
            }).format(data.revenue.total)}
            subtitle={`${data.revenue.thisMonth} ریال در این ماه`}
            color="#FF9800"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            icon={<Assignment />}
            title="مشاوره‌ها"
            value={data.consultations.total}
            subtitle={`${data.consultations.satisfaction}% رضایت‌مندی`}
            color="#F44336"
          />
        </Grid>

        {/* نمودار بازدید */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              روند بازدید
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={data.pageViews.mostVisited}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="path" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#2196F3"
                  name="تعداد بازدید"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* نمودار درآمد */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              درآمد به تفکیک خدمات
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={data.revenue.byService}
                  dataKey="amount"
                  nameKey="service"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {data.revenue.byService.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* نمودار کاربران */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              پراکندگی کاربران
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={data.users.byLocation}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="city" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#2196F3" name="تعداد کاربران" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
