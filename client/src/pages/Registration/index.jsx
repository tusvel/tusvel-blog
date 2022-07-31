import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin, fetchRegister, selectIsAuth } from '../../redux/slices/user';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

export const Registration = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    if (!data.payload) {
      return console.log('Ошибка регистрации');
    }

    if ('token' in data.payload) {
      return localStorage.setItem('token', data.payload.token);
    } else {
      return console.log('Ошибка регистрации');
    }
  };

  if (isAuth) {
    return <Navigate to={'/'} />;
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Создание аккаунта
        </Typography>
        <div className={styles.avatar}>
          <Avatar sx={{ width: 100, height: 100 }} />
        </div>
        <TextField
          className={styles.field}
          label="Полное имя"
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: 'Напишите ваше имя' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="E-Mail"
          type="email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Укажите почту' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Пароль"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Заполните пароль' })}
          fullWidth
        />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
