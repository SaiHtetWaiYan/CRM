import React, { useEffect } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { Alert } from "@material-tailwind/react";

export function Success({ message, setSuccess }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setSuccess("");
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [message]);
  return (
    <div className="flex justify-end">
      <Alert
        color="green"
        icon={<InformationCircleIcon strokeWidth={2} className="h-6 w-6 " />}
        className="w-1/3"
      >
        {message}
      </Alert>
    </div>
  );
}

export default Success;
