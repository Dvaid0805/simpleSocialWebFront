import React from "react";
import { Avatar, Button, Paper, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

import { isAuthSelector, fetchRegister } from '../../Store/slices/auth'
import styles from "./Login.module.scss";

export const Registration = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthSelector);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (value) => {
    const data = await dispatch(fetchRegister(value));

    if(!data.payload) {
      alert("failed to register")
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  };

  if (isAuth) {
    return (<Navigate to="/"/>)
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography
        sx={{ textAlign: "center", fontWeight: "bold", marginBottom: "30px" }}
        variant="h5"
      >
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          sx={{ marginBottom: "20px" }}
          label="Full name"
          fullWidth
          type="text"
          helperText={errors.fullName?.message}
          error={Boolean(errors.fullName?.message)}
          {...register("fullName", { required: "you should enter your full name" })}
        />
        <TextField
          sx={{ marginBottom: "20px" }}
          label="E-Mail"
          fullWidth
          type="email"
          autoComplete="email"
          helperText={errors.email?.message}
          error={Boolean(errors.email?.message)}
          {...register("email", { required: "you should enter an email" })}
        />
        <TextField
          sx={{ marginBottom: "20px" }}
          label="Password"
          fullWidth
          type="password"
          autoComplete="current-password"
          helperText={errors.password?.message}
          error={Boolean(errors.password?.message)}
          {...register("password", {
            required: "you should enter the password",
          })}
        />
        <Button disabled={!isValid} size="large" variant="contained" fullWidth type="submit">
          Create an Account
        </Button>
      </form>
    </Paper>
  );
};
