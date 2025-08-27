import React, { useEffect, useState } from "react";
import { getCurrentUser, logoutUser } from "./utils/authServices";
import {
  Button,
  Header,
  Input,
  NoteCard,
  NoteSave,
  Loading,
  AsideBar,
} from "./components";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/auth/authSlice";

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn)

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        // console.log(res);
        setUser(res.data.data);
        dispatch(
          login({
            user: res.data.data.user,
            token: res.data.data.token,
            avatar: res.data.data.avatar || "",
          })
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(logout());
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // console.log(user);

  if (loading) return <Loading />;

  return (
    <div className="">
      <Toaster />
      <Header />
      <div className="flex gap-5">
        {isLoggedIn && <AsideBar />}
        <div className={isLoggedIn ? "ml-72 p-4 mt-13 container mx-auto" : "p-4 mt-13 container mx-auto"}>{<Outlet />}</div>
      </div>
    </div>
  );
};

export default App;
