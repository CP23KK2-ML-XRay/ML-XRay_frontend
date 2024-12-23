import AuthenticationService from "@/service/AuthenticationService";
import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React, { useState, FormEvent } from "react";
import Swal from "sweetalert2";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  // const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleCheckboxChange = () => {
    setShowPassword((prev) => !prev);
  };

  // const handleMouseDownPassword = (
  //   event: React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   event.preventDefault();
  // };

  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  const validate = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Please enter your password.";
    } else if (!validatePassword(password)) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate()) {
      const data = {
        email: email,
        password: password,
      };

      const authenservice = new AuthenticationService();
      authenservice
        .signIn(data)
        .then((data) => {
          // ตั้งค่า localStorage ก่อน
          // console.log(data);
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("accessTokenExp", data.accessTokenExp);
          localStorage.setItem("refreshToken", data.refreshToken);
          localStorage.setItem("refreshTokenExp", data.refreshTokenExp);
          localStorage.setItem("email", data.email);
          localStorage.setItem("role", data.roles[0]);

          // แสดง SweetAlert หลังจากที่ตั้งค่า localStorage เสร็จสิ้น
          Swal.fire({
            title: "Good job!",
            text: "Login success",
            icon: "success",
          }).then(() => {
            // Redirect ไปยังหน้าหลักหรือที่ต้องการหลังจากที่ SweetAlert ถูกแสดง
            location.href = "/"
          });
        })
        .catch((error) => {
          console.error(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email or Password wrong!",
          });
        });
    }
  };

  return (
    <section className="h-screen w-screen flex flex-col md:flex-row justify-center md:space-x-16 items-center bg-white">
      <div className="absolute md:relative md:w-1/3 max-w-sm invisible md:visible">
        <label className="pl-10 text-blue-900 text-xl font-bold ">
          Machine Learning for Diagnosis
        </label>
        <p className="mt-2 font-bold text-black">Empowering Healthcare: </p>
        <p className="text-gray-500 ">
          Machine Learning technology helps healthcare professionals provide
          faster, more accurate diagnoses.
        </p>
        <img
          src="https://celltecltd.com/wp-content/uploads/2023/05/undraw_Access_account_re_8spm-980x902.png"
          alt="Home Image"
        />
      </div>
      <div className="absolute md:relative invisible md:visible">
        <svg
          width="2"
          height="660"
          viewBox="0 0 2 660"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="1"
            y1="-4.37114e-08"
            x2="1.00003"
            y2="660"
            stroke="#E2E8F0"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="md:w-1/3 max-w-sm">
        <div className="text-center md:text-left py-6">
          <label className="mr-1 text-blue-900 text-4xl font-bold ">
            Sign in
          </label>
        </div>
        <form onSubmit={handleSubmit}>
          <FormControl
            className="w-full"
            variant="outlined"
            error={errors.email ? true : false}
          >
            <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
            <OutlinedInput
              id="outlined-adornment-text"
              type="text"
              label="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormHelperText id="component-error-text">
              {errors.email}
            </FormHelperText>
          </FormControl>
          <div className="pt-6 mb-2"></div>
          <div className="relative block fill-white">
            <FormControl
              className="w-full"
              variant="outlined"
              error={errors.password ? true : false}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleCheckboxChange}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                }
              />
              <FormHelperText id="component-error-text">
                {errors.password}
              </FormHelperText>
            </FormControl>
            {/* <div className="flex mt-4">
              <input
                data-hs-toggle-password='{ "target": "#hs-toggle-password-with-checkbox" }'
                name="show-pass"
                id="show-pass"
                type="checkbox"
                className="mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                checked={showPassword}
                onChange={handleCheckboxChange}
              />
              <label
                className="text-sm text-gray-500 ms-3 dark:text-neutral-400 cursor-pointer"
                htmlFor="show-pass"
              >
                Show password
              </label>
            </div> */}
          </div>
          <div className="mt-4 flex justify-between font-semibold text-sm"></div>
          <div className="text-center md:text-left">
            <button
              className="w-full mt-4 bg-blue-900 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Don't have an account?{" "}
          <a
            className="text-red-600 hover:underline hover:underline-offset-4"
            href="/signup"
          >
            Create Account
          </a>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
