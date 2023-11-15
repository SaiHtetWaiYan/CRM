import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Select,
  Option,
  Button,
  Alert,
} from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useStateContext } from "@/context/ContextProvider";
import axiosClient from "@/axios-client";
export function Setting() {
  const { user, setUser } = useStateContext();
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

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
      .post("/update-profile", formData)
      .then((response) => {
        setUser(response.data.user);
        setSuccess(response.data.message);
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

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
      }, 5000); // 5000 milliseconds = 5 seconds

      return () => {
        clearTimeout(timer);
      };
    }
  }, [success]);

  return (
    <>
      {success && (
        <div className="flex justify-end">
          <Alert
            color="green"
            icon={
              <InformationCircleIcon strokeWidth={2} className="h-6 w-6 " />
            }
            className="w-1/3"
          >
            {success}
          </Alert>
        </div>
      )}

      <form onSubmit={onSubmit}>
        <Card className="mx-auto mt-12 mb-4 w-full">
          <CardBody className="flex flex-col gap-4">
            <div>
              <Typography variant="h5" color="blue-gray">
                Account Setting
              </Typography>
            </div>
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
                  Email
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
                  Phone
                </Typography>
                <Input
                  type="number"
                  label="Phone"
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
              {/* <div>
                <Typography className="mb-2" variant="h6">
                  Role
                </Typography>
                <Select
                  size="lg"
                  color="blue"
                  label="Role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <Option value="admin">Admin</Option>
                  <Option value="user">User</Option>
                </Select>
              </div> */}

              {errors.message && (
                <div className="col-span-2">
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
                </div>
              )}

              <div>
                <Typography className="mb-2" variant="h6">
                  Current Password
                </Typography>
                <Input
                  type="password"
                  label="Current Password"
                  size="lg"
                  name="current_password"
                  value={formData.current_password}
                  onChange={handleChange}
                />
                {errors.current_password && (
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
                    {errors.current_password}
                  </Typography>
                )}
              </div>
              <div>
                <Typography className="mb-2" variant="h6">
                  New Password
                </Typography>
                <Input
                  type="password"
                  label="Password"
                  size="lg"
                  name="new_password"
                  value={formData.new_password}
                  onChange={handleChange}
                />
                {errors.new_password &&
                  errors.new_password.map((error) => (
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
                  Confirm New Password
                </Typography>
                <Input
                  type="password"
                  label="Confirm Password"
                  size="lg"
                  name="new_password_confirmation"
                  value={formData.new_password_confirmation}
                  onChange={handleChange}
                />
              </div>
            </div>
          </CardBody>
          <CardFooter>
            <Button type="submit" color="blue" variant="gradient">
              Save
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
}

export default Setting;
