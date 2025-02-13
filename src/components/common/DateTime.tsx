import React, { useState, useEffect } from 'react';
import { Typography, Box, Tooltip } from '@mui/material';
import { Schedule } from '@mui/icons-material';
import { formatDateTime, timeAgo } from '../../utils/dateUtils';

interface DateTimeProps {
  date: Date | string;
  format?: string;
  showIcon?: boolean;
  showTimeAgo?: boolean;
  updateInterval?: number;
  variant?: 'body1' | 'body2' | 'caption';
  color?: 'primary' | 'secondary' | 'textPrimary' | 'textSecondary';
}

export const DateTime: React.FC<DateTimeProps> = ({
  date,
  format = 'YYYY-MM-DD HH:mm:ss',
  showIcon = true,
  showTimeAgo = true,
  updateInterval = 60000, // 1 minute
  variant = 'body2',
  color = 'textSecondary',
}) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  useEffect(() => {
    if (!showTimeAgo) return;

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, updateInterval);

    return () => clearInterval(timer);
  }, [showTimeAgo, updateInterval]);

  const formattedDate = formatDateTime(dateObj, format);
  const timeAgoText = timeAgo(dateObj);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {showIcon && <Schedule fontSize="small" color={color} />}
      <Tooltip title={showTimeAgo ? formattedDate : timeAgoText}>
        <Typography variant={variant} color={color} component="span">
          {showTimeAgo ? timeAgoText : formattedDate}
        </Typography>
      </Tooltip>
    </Box>
  );
};

export default DateTime;