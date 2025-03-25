import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logIn } from "../features/userSlice";
import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { login } from "../api/userService.js";
import Swal from "sweetalert2";

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: "onBlur" });
  const [expirationTime, setExpirationTime] = React.useState("");
  const onSubmit = async (data) => {
    try {

      const res = await login({ userName: data.userName, password: data.password });
      dispatch(logIn(res.data.user));
      setExpirationTime(Date.now() + 3600000)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem('tokenExpiration', JSON.stringify(expirationTime));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `welcom ${res.data.user.userName}`,
        showConfirmButton: false,
        timer: 1500
      });;
      navigate("/products");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "שגיאה בהתחברות: " + (err.response?.data?.message || err.message),
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    }
  };



  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="lbl" htmlFor="userName">שם משתמש</label>
        {errors.userName && <Stack sx={{ width: '100%' }} spacing={2}><Alert variant="outlined" severity="error">{errors.userName.message}</Alert></Stack>}
        <input className="npt" id="userName" type="text" {...register("userName", { required: { value: true, message: "חובה להכניס שם משתמש" } })} />
        <label className="lbl" htmlFor="password">סיסמא</label>
        {errors.password && <Stack sx={{ width: '100%' }} spacing={2}><Alert variant="outlined" severity="error">{errors.password.message}</Alert></Stack>}
        <input className="npt" id="password" type="password" {...register("password", { required: "חובה להכניס סיסמא", minLength: { value: 6, message: "סיסמא צריכה להיות לפחות 6 תווים" } })} />
        <input className="btn" type="submit" disabled={!isValid} value="התחבר" />
      </form>
    </>
  );
}

export default LogIn;
