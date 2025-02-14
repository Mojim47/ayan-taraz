import React from 'react';
import { Box, Typography, Badge } from '@mui/material';
import { Chat } from '../../types/chat.types';
import { User } from '../../types/auth.types';

interface ChatRoomProps {
  room: Chat.Room;
  currentUser: User;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ room, currentUser }) => {
  const { name, lastMessage, unreadCount } = room;

  return (
    <Box
      sx={{
        p: 2,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        mb: 1,
        '&:hover': {
          bgcolor: 'action.hover',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="h6">{name}</Typography>
        <Badge badgeContent={unreadCount} color="primary">
          <Typography variant="body2">
            New messages: {unreadCount}
          </Typography>
        </Badge>
      </Box>

      <Typography variant="body2" color="text.secondary">
        {lastMessage.content}
      </Typography>

      <Typography variant="caption" color="text.secondary">
        Status: {lastMessage.status}
      </Typography>
    </Box>
  );
};

export default ChatRoom;