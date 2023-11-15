import React from "react";
import {
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/solid";
import axiosClient from "@/axios-client";
export function Delete({ data, url, setSuccess, fetchData }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const deleteData = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.delete(`/${url}/delete/${data.id}`);
      setSuccess(response.data.message);
      fetchData();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <IconButton variant="text" color="red" onClick={handleOpen}>
        <TrashIcon className="h-4 w-4" />
      </IconButton>
      <Dialog open={open} handler={handleOpen} size="sm">
        <Card className="mt-6 w-full">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2 ">
              Delete ?
            </Typography>
            <Typography>
              Are you sure you want to delete this <b>{data.name}</b> ?
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="text"
              color="blue"
              className="mr-2"
              onClick={handleOpen}
            >
              Cancel
            </Button>
            <Button variant="gradient" color="red" onClick={deleteData}>
              Delete
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}

export default Delete;
