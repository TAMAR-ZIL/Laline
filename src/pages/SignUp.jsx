import { useForm } from "react-hook-form";
import { addUser } from "../api/userService";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Swal from "sweetalert2";
import { login } from "../api/userService";
import { useDispatch } from "react-redux"
import { logIn } from "../features/userSlice"

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [expirationTime, setExpirationTime] = React.useState("");
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange", reValidateMode: "onSubmit" });

  const onSubmit = async (data) => {
    save(data);
  };

  const save = (data) => {
    const { confirmPassword, ...userData } = data;
    if (!userData.password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "שגיאה: יש להזין סיסמה",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
      return;
    }
    console.log("User Data before sending:", userData);

    addUser(userData)
      .then(async (res) => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        dispatch(logIn(res.data.user));
        try {
          const loginResponse = await login({
            userName: userData.userName,
            password: userData.password,
          });
          localStorage.setItem('token', loginResponse.data.token);
          setExpirationTime(Date.now() + 3600000)
          dispatch(logIn(loginResponse.data.user));
          localStorage.setItem('tokenExpiration', JSON.stringify(expirationTime));
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Welcome, ${loginResponse.data.user.userName}`,
            showConfirmButton: false,
            timer: 1500
          });
          navigate("/products");
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "שגיאה בהתחברות: ",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
        }
      })
      .catch((err) => {
        if (err.response) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong: ",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
        }
      });
  };

  const password = watch("password", "");

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="lbl" htmlFor="userName">הכנס את שמך</label>
        {errors.userName && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert variant="outlined" severity="error">{errors.userName.message}</Alert>
          </Stack>
        )}
        <input
          className="npt"
          id="userName"
          type="text"
          {...register("userName", {
            required: "חובה להכניס שם משתמש",
            minLength: { value: 3, message: "השם חייב להכיל לפחות 3 תווים" },
            maxLength: { value: 30, message: "השם לא יכול להיות יותר מ-30 תווים" }
          })}
        />

        <label className="lbl" htmlFor="email">אימייל</label>
        {errors.email && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert variant="outlined" severity="error">{errors.email.message}</Alert>
          </Stack>
        )}
        <input
          className="npt"
          id="email"
          type="email"
          {...register("email", {
            required: "שדה חובה",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "כתובת אימייל לא תקינה",
            },
          })}
        />

        <label className="lbl" htmlFor="password">הכנס סיסמא</label>
        {errors.password && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert variant="outlined" severity="error">{errors.password.message}</Alert>
          </Stack>
        )}
        <input
          className="npt"
          id="password"
          type="password"
          {...register("password", {
            required: "חובה להזין סיסמה",
            minLength: { value: 6, message: "הסיסמה צריכה להיות לפחות 6 תווים" }
          })}
        />

        <label className="lbl" htmlFor="confirmPassword">הזן שוב את הסיסמא שבחרת</label>
        {errors.confirmPassword && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert variant="outlined" severity="error">{errors.confirmPassword.message}</Alert>
          </Stack>
        )}
        <input
          className="npt"
          id="confirmPassword"
          type="password"
          {...register("confirmPassword", {
            required: "חובה לאמת סיסמה",
            validate: (value) => value === password || "הסיסמאות לא תואמות",
          })}
        />


        <input className="btn" type="submit" disabled={!isValid} />
      </form>
    </>
  );
};

export default SignUp;
