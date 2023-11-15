import { Link } from "react-router-dom";
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
export function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});
  const { setUser, setToken } = useStateContext();

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
      .post("/auth/sign-up", formData)
      .then((response) => {
        setUser(response.data.user);
        setToken(response.data.token);
      })
      .catch((error) => {
        const response = error.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
          console.log(response.data.errors);
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
                Sign Up
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <Input
                label="Name"
                size="lg"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
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
                  {errors.name}
                </Typography>
              )}
              <Input
                type="email"
                label="Email"
                size="lg"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
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
                  {errors.email}
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

              {errors.password &&
                errors.password.map((error) => (
                  <Typography
                    variant="small"
                    color="red"
                    className="mt-2 flex items-center gap-1 font-normal"
                    key={error}
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
                    {error}
                  </Typography>
                ))}
              <Input
                type="password"
                label="Confirm Password"
                size="lg"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
              />
              {/* <div className="-ml-2.5">
                <Checkbox
                  label="I agree the Terms and Conditions"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                />
              </div> */}
            </CardBody>
            <CardFooter className="pt-0">
              <Button type="submit" variant="gradient" fullWidth>
                Sign Up
              </Button>
              {/* <Typography variant="small" className="mt-6 flex justify-center">
                Already have an account?
                <Link to="/auth/sign-in">
                  <Typography
                    as="span"
                    variant="small"
                    color="blue"
                    className="ml-1 font-bold"
                  >
                    Sign in
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

export default SignUp;
