import React, { useState, useEffect } from 'react';
import { Box, Typography, Tooltip, IconButton } from '@mui/material';
import { AccessTime, Sync, Person } from '@mui/icons-material';

interface CurrentDateTimeProps {
  username?: string;
  showUsername?: boolean;
  showUTC?: boolean;
  updateInterval?: number;
  onRefresh?: () => void;
}

const CurrentDateTime: React.FC<CurrentDateTimeProps> = ({
  username,
  showUsername = true,
  showUTC = true,
  updateInterval = 1000,
  onRefresh,
}) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, updateInterval);

    return () => clearInterval(timer);
  }, [updateInterval]);

  const formatDateTime = (date: Date): string => {
    return date.toISOString().replace('T', ' ').slice(0, 19);
  };

  const handleRefresh = async () => {
    if (onRefresh) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
      }
    }
    setCurrentDateTime(new Date());
  };

  const formatPersianDateTime = (date: Date): string => {
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(date);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 1,
        boxShadow: 1,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <AccessTime color="primary" />
        <Tooltip title={`تاریخ و زمان به وقت محلی: ${formatPersianDateTime(currentDateTime)}`}>
          <Typography variant="body1">
            {showUTC ? formatDateTime(currentDateTime) : formatPersianDateTime(currentDateTime)}
          </Typography>
        </Tooltip>
      </Box>

      {showUsername && username && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Person color="primary" />
          <Typography variant="body1">{username}</Typography>
        </Box>
      )}

      <Tooltip title="بروزرسانی">
        <IconButton
          onClick={handleRefresh}
          sx={{
            animation: isRefreshing ? 'spin 1s linear infinite' : 'none',
            '@keyframes spin': {
              '0%': {
                transform: 'rotate(0deg)',
              },
              '100%': {
                transform: 'rotate(360deg)',
              },
            },
          }}
          size="small"
        >
          <Sync />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default CurrentDateTime;