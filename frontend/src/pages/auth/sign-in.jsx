import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import axiosClient from "@/axios-client";
import { useStateContext } from "@/context/ContextProvider";

export function SignIn() {
  const [formData, setFormData] = useState({
    signin: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { setUser, setToken } = useStateContext();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axiosClient
      .post("/auth/sign-in", formData)
      .then((response) => {
        setUser(response.data.user);
        setToken(response.data.token);
        if (response.data.user.role === "admin") {
          navigate("/admin/home", { replace: true });
        } else if (response.data.user.role === "user") {
          navigate("/user/home", { replace: true });
        }
      })
      .catch((error) => {
        const response = error.response;
        if (response && response.status === 422) {
          if (response.data.errors) {
            setErrors(response.data.errors);
          } else {
            setErrors(response.data);
          }
        }
      });
  };

  return (
    <>
      <div className="absolute inset-0 z-0 h-full w-full bg-white/50" />
      <div className="container mx-auto p-4">
        <form onSubmit={onSubmit}>
          <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-4 grid h-28 place-items-center"
            >
              <Typography variant="h3" color="white">
                Sign In
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              {errors.message && (
                <Typography
                  variant="small"
                  color="red"
                  className="mt-2 flex items-center gap-1 font-normal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="-mt-px h-4 w-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.message}
                </Typography>
              )}

              <Input
                type="text"
                label="Email or Phone Number"
                size="lg"
                name="signin"
                value={formData.signin}
                onChange={handleChange}
              />
              {errors.signin && (
                <Typography
                  variant="small"
                  color="red"
                  className="mt-2 flex items-center gap-1 font-normal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="-mt-px h-4 w-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.signin}
                </Typography>
              )}

              <Input
                type="password"
                label="Password"
                size="lg"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <Typography
                  variant="small"
                  color="red"
                  className="mt-2 flex items-center gap-1 font-normal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="-mt-px h-4 w-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.password}
                </Typography>
              )}
              {/* <div className="-ml-2.5">
                <Checkbox label="Remember Me" />
              </div> */}
            </CardBody>
            <CardFooter className="pt-0">
              <Button type="submit" color="blue" variant="gradient" fullWidth>
                Sign In
              </Button>
              {/* <Typography variant="small" className="mt-6 flex justify-center">
                Don't have an account?
                <Link to="/auth/sign-up">
                  <Typography
                    as="span"
                    variant="small"
                    color="blue"
                    className="ml-1 font-bold"
                  >
                    Sign up
                  </Typography>
                </Link>
              </Typography> */}
            </CardFooter>
          </Card>
        </form>
      </div>
    </>
  );
}

export default SignIn;
