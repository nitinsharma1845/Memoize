import React, { useState } from "react";
import { Logo, Input } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";
import { useForm } from "react-hook-form";
import { loginUser } from "../../utils/authServices";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../../store/auth/authSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ mode: "all" });

  function LoginUser(data) {
    const id = toast.loading("Logging in ");
    console.log(data);
    loginUser(data)
      .then((res) => {
        toast.success("Login successfull", { id });
        console.log(res.data.data);
        dispatch(
          login({
            user: res.data.data.user,
            token: res.data.data.token,
            avatar: res.data.data.user.avatar || "",
          })
        );
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        toast.error(err.message, { id });
      });
  }

  return (
    <div className="bg-amber-100 p-10 rounded-2xl shadow-2xl flex flex-col justify-center items-center">
      <Logo size="35px" />
      <h1 className="text-sm mt-5">
        Don't have a account?{" "}
        <Link
          className="border-b-1 border-dotted hover:text-sky-600"
          to={"/signup"}
        >
          Signup
        </Link>
      </h1>
      <form
        method="post"
        className="w-full flex flex-col "
        onSubmit={handleSubmit(LoginUser)}
      >
        <div>
          <Input
            {...register("email", { required: "Email is required" })}
            type="email"
            label="Email"
            name="email"
            placeholder="Enter your Email"
          />
          {errors.email && (
            <p className="text-xs text-red-700 mt-2">{errors.email?.message}</p>
          )}
        </div>

        <div className="my-3">
          <div className="relative">
            <Input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must contain 8 character",
                },
              })}
              type={showPassword ? "text" : "password"}
              label="Password"
              name="password"
              placeholder="Enter your Password"
            />
            <div
              className="absolute top-12 right-3"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {!showPassword ? <Eye /> : <EyeClosed />}
            </div>
          </div>
          {errors.password && (
            <p className="text-xs text-red-700 mt-2">
              {errors.password?.message}
            </p>
          )}
        </div>

        <Input
          type="submit"
          value={isSubmitting ? "Loginin..." : "Login"}
          className="mt-5 bg-amber-300 border-none cursor-pointer hover:bg-amber-400"
          disabled={isSubmitting || !isValid}
        />
      </form>
    </div>
  );
};

export default Login;
