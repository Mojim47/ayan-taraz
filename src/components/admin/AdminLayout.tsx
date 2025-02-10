// src/components/admin/AdminLayout.tsx
import React, { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Menu,
  MenuItem,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  Article,
  School,
  People,
  Settings,
  Payment,
  Comment,
  ExitToApp,
  Person,
} from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const DRAWER_WIDTH = 240;

const menuItems = [
  { title: 'داشبورد', icon: <Dashboard />, path: '/admin' },
  { title: 'مقالات', icon: <Article />, path: '/admin/articles' },
  { title: 'آموزش‌ها', icon: <School />, path: '/admin/tutorials' },
  { title: 'کاربران', icon: <People />, path: '/admin/users' },
  { title: 'تراکنش‌ها', icon: <Payment />, path: '/admin/transactions' },
  { title: 'نظرات', icon: <Comment />, path: '/admin/comments' },
  { title: 'تنظیمات', icon: <Settings />, path: '/admin/settings' },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <Box>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <img src="/logo.png" alt="آیان تراز" style={{ width: 40 }} />
        <Typography variant="h6" color="primary">
          پنل مدیریت
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map(item => (
          <ListItem
            button
            key={item.path}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              '&.Mui-selected': {
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                '& .MuiListItemIcon-root': {
                  color: 'primary.contrastText',
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
            <Avatar alt="مدیر سیستم" src="/admin-avatar.jpg" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => navigate('/admin/profile')}>
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              <Typography>پروفایل</Typography>
            </MenuItem>
            <MenuItem onClick={() => navigate('/logout')}>
              <ListItemIcon>
                <ExitToApp fontSize="small" />
              </ListItemIcon>
              <Typography>خروج</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          mt: 8,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
