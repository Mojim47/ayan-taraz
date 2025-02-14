import React from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

interface LoginFormProps {
  onSubmit: (values: { username: string; password: string }) => void;
}

const validationSchema = yup.object({
  username: yup.string().required('نام کاربری الزامی است'),
  password: yup.string().required('رمز عبور الزامی است'),
});

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
      <TextField
        fullWidth
        id="username"
        name="username"
        label="نام کاربری"
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
        margin="normal"
        aria-label="username"
      />
      <TextField
        fullWidth
        id="password"
        name="password"
        label="رمز عبور"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        margin="normal"
        aria-label="password"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        ورود
      </Button>
    </Box>
  );
};

export default LoginForm;