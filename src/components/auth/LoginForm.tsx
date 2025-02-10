import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Box, Alert } from '@mui/material';
import { useAuth } from '../../hooks/useStore';
import { LoginCredentials } from '../../types/auth';

const schema = yup
  .object({
    username: yup.string().required('نام کاربری الزامی است'),
    password: yup.string().required('رمز عبور الزامی است'),
    rememberMe: yup.boolean(),
  })
  .required();

export const LoginForm: React.FC = () => {
  const { login, loading, error } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginCredentials) => {
    await login(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        margin="normal"
        fullWidth
        label="نام کاربری"
        autoFocus
        error={!!errors.username}
        helperText={errors.username?.message}
        {...register('username')}
      />

      <TextField
        margin="normal"
        fullWidth
        label="رمز عبور"
        type="password"
        error={!!errors.password}
        helperText={errors.password?.message}
        {...register('password')}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={loading}
      >
        {loading ? 'در حال ورود...' : 'ورود'}
      </Button>
    </Box>
  );
};
