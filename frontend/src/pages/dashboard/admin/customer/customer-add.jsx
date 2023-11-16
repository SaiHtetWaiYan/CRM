import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import axiosClient from "@/axios-client";
export default function CustomerAdd({ fetchData, setSuccess }) {
  const [open, setOpen] = React.useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });
  const handleOpen = () => {
    setOpen((cur) => !cur);
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
    });
    setErrors({});
  };
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
      .post("/customers/store", formData)
      .then((response) => {
        fetchData();
        setSuccess(response.data.message);
        setOpen(false);
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
      <Button
        className="flex items-center gap-2"
        size="md"
        onClick={handleOpen}
      >
        <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add customer
      </Button>

      <Dialog
        size="lg"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <form onSubmit={onSubmit}>
          <Card className="mx-auto w-full ">
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" color="blue-gray">
                Customer Add
              </Typography>
              <div className="my-4 grid grid-cols-2 gap-4">
                <div>
                  <Typography className="mb-2" variant="h6">
                    Name
                  </Typography>
                  <Input
                    type="text"
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
                </div>
                <div>
                  <Typography className="mb-2" variant="h6">
                    Email (Optional)
                  </Typography>
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
                </div>
                <div>
                  <Typography className="mb-2" variant="h6">
                    Phone Number
                  </Typography>
                  <Input
                    type="phone"
                    label="Phone Number"
                    size="lg"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && (
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
                      {errors.phone}
                    </Typography>
                  )}
                </div>
                <div>
                  <Typography className="mb-2" variant="h6">
                    Password
                  </Typography>
                  <Input
                    type="password"
                    label="Password"
                    size="lg"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
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
                </div>
                <div>
                  <Typography className="mb-2" variant="h6">
                    Confirm Password
                  </Typography>
                  <Input
                    type="password"
                    label="Confirm Password"
                    size="lg"
                    onChange={handleChange}
                    value={formData.password_confirmation}
                    name="password_confirmation"
                  />
                </div>
              </div>
            </CardBody>
            <CardFooter className="space-x-2 pt-0">
              <Button variant="text" color="red" onClick={handleOpen}>
                cancel
              </Button>
              <Button variant="gradient" type="submit">
                Create
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Dialog>
    </>
  );
}
