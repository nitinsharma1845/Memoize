import React, { useEffect } from "react";
import { getCurrentUser, logoutUser } from "./utils/authServices";
import { Button, Header, Input, NoteCard, NoteSave } from "./components";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/auth/authSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        console.log(res);
        dispatch(
          login({
            user: res.data.data?.user,
            token: res.data.data?.token,
            avatar: res.data.data?.avatar || "",
          })
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(logout());
      });
  }, []);

  return (
    <div className="">
      <Toaster />
      <Header />
      {<Outlet />}
    </div>
  );
};

export default App;
