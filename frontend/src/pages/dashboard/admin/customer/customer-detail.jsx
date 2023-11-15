import React from "react";
import {
  IconButton,
  Tooltip,
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
export default function CustomerDetail({ customer }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <>
      <IconButton variant="text" onClick={handleOpen}>
        <InformationCircleIcon className="h-4 w-4" />
      </IconButton>

      <Dialog open={open} size="md" handler={handleOpen}>
        <Card>
          <CardBody className="text-center">
            <Typography variant="h4" color="blue-gray" className="mb-2">
              {customer.name}
            </Typography>
            <Typography color="blue-gray" className="font-medium" textGradient>
              {customer.email === null ? "-" : customer.email} /{" "}
              {customer.phone}
            </Typography>
          </CardBody>
          <CardFooter className="flex justify-center gap-7 pt-2">
            <Button variant="text" onClick={handleOpen}>
              <span>Close</span>
            </Button>
          </CardFooter>
        </Card>
        {/* <DialogHeader>Its a simple dialog.</DialogHeader>
        <DialogBody>
          The key to more success is to have a lot of pillows. Put it this way,
          it took me twenty five years to get these plants, twenty five years of
          blood sweat and tears, and I&apos;m never giving up, I&apos;m just
          getting started. I&apos;m up to something. Fan luv.
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" onClick={handleOpen}>
            <span>Close</span>
          </Button>
        </DialogFooter> */}
      </Dialog>
    </>
  );
}
