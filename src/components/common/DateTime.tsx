import React, { useState, useEffect } from 'react';
import { Typography, Box, Tooltip } from '@mui/material';
import { Schedule } from '@mui/icons-material';
import { format, formatDistance } from 'date-fns';
import { fa } from 'date-fns/locale'; // تغییر نحوه import

interface DateTimeProps {
  date: Date;
  format?: string;
  showIcon?: boolean;
  showTimeAgo?: boolean;
  variant?: 'h6' | 'body1' | 'body2';
  color?: 'primary' | 'secondary' | 'textPrimary' | 'textSecondary' | 'action';
  updateInterval?: number;
}

export const DateTime: React.FC<DateTimeProps> = ({
  date,
  format: dateFormat = 'yyyy-MM-dd HH:mm:ss',
  showIcon = true,
  showTimeAgo = true,
  variant = 'body1',
  color = 'textPrimary',
  updateInterval = 60000,
}) => {
  const [, setUpdate] = useState(0);

  useEffect(() => {
    if (!showTimeAgo) return;
    const timer = setInterval(() => {
      setUpdate(prev => prev + 1);
    }, updateInterval);
    return () => clearInterval(timer);
  }, [showTimeAgo, updateInterval]);

  const formattedDate = format(date, dateFormat, { locale: fa });
  const timeAgo = showTimeAgo
    ? formatDistance(date, new Date('2025-02-13T18:43:22.000Z'), { addSuffix: true, locale: fa })
    : '';

  const iconColor = color === 'textSecondary' ? 'action' : color;
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {showIcon && <Schedule fontSize="small" color={iconColor as 'primary' | 'secondary' | 'action'} />}
      <Tooltip title={timeAgo}>
        <Typography variant={variant} color={color} component="span">
          {formattedDate}
        </Typography>
      </Tooltip>
    </Box>
  );
};

export default DateTime;