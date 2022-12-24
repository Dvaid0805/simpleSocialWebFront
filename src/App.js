import Container from "@mui/material/Container";

import { Header } from "./components";
import { AddPost, Login, Registration, Home, FullPost } from "./pages/";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAuthMe, isAuthSelector } from "./Store/slices/auth";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthSelector);

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
