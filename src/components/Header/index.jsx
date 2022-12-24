import React from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Header.module.scss";
import { isAuthSelector, logout } from "../../Store/slices/auth";

import { token } from "../../axios";

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthSelector);

  const onClickLogout = () => {
    if (window.confirm("are you sure you want to logout")) {
      dispatch(logout());
      window.localStorage.removeItem('token')
    }
  };
  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>SSW - Small Social Web</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Button variant="contained" color="primary">
                  <Link to="/add-post" >Написать статью</Link>
                </Button>
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                >
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
