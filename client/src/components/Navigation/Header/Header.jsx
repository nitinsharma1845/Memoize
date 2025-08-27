import React from "react";
import { Logo, SearchBar, Button } from "../../index";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserRound } from "lucide-react";
import { logoutUser } from "../../../utils/authServices";
import toast from "react-hot-toast";
import { logout } from "../../../store/auth/authSlice";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // console.log(isLoggedIn);
  const avatar = useSelector((state) => state.auth.avatar);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(avatar);

  const links = [
    {
      path: "/login",
      name: "Login",
      active: !isLoggedIn,
    },
    {
      path: "/signup",
      name: "Signup",
      active: !isLoggedIn,
    },
  ];

  function handleLogout() {
    const id = toast.loading("Logging out");
    logoutUser()
      .then((res) => {
        console.log(res);
        toast.success(res.data.message, { id });
        dispatch(logout());
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        toast.success(err.message, { id });
      });
  }

  return (
    <header className="bg-amber-300 w-full p-2 fixed top-0 left-0 z-10">
      <nav className="container mx-auto flex items-center justify-between gap-x-20">
        <Link to={"/"}>
          <Logo size="25px" className="font-secondry" />
        </Link>
        <div className="w-[50%]">
          <SearchBar />
        </div>
        <div className="flex items-center gap-5">
          {links.map(
            (link, index) =>
              link.active && (
                <Link
                  key={index}
                  to={link.path}
                  className="border px-3 py-1 rounded-full hover:border-amber-200 duration-200 hover:bg-amber-200"
                >
                  {link.name}
                </Link>
              )
          )}

          {isLoggedIn && (
            <Link
              to={"/account"}
              className="shadow-xs rounded-full w-10 h-10 flex justify-center items-center overflow-hidden z-10"
            >
              {!avatar ? (
                <UserRound />
              ) : (
                <img
                  src={avatar}
                  alt=""
                  className="w-full h-full z-0 rounded-full object-cover "
                />
              )}
            </Link>
          )}
          {isLoggedIn && (
            <Button
              onClick={handleLogout}
              className="text-xs bg-red-500 text-white border-none"
            >
              Logout
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
