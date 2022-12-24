import React from "react";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth, fetchRegister, isAuthSelector, logout } from '../../Store/slices/auth'
import { Navigate } from "react-router-dom";

import styles from "./Login.module.scss";

export const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthSelector);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (value) => {
    const data = await dispatch(fetchAuth(value));

    if (!data.payload) {
      return alert("failed to login");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography
        sx={{ textAlign: "center", fontWeight: "bold", marginBottom: "30px" }}
        variant="h5"
      >
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          sx={{ marginBottom: "20px" }}
          label="E-Mail"
          fullWidth
          helperText={errors.email?.message}
          error={Boolean(errors.email?.message)}
          {...register("email", { required: "you should enter an email" })}
        />
        <TextField
          sx={{ marginBottom: "20px" }}
          label="Пароль"
          fullWidth
          helperText={errors.password?.message}
          error={Boolean(errors.password?.message)}
          {...register("password", {
            required: "you should enter the password",
          })}
        />
        <Button disabled={!isValid} size="large" variant="contained" fullWidth type="submit">
          Login
        </Button>
      </form>
    </Paper>
  );
};
