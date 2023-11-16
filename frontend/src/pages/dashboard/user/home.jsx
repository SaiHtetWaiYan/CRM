import React from "react";
import { Typography } from "@material-tailwind/react";
import { useStateContext } from "@/context/ContextProvider";
export function Home() {
  const { user } = useStateContext();
  return (
    <div className="w-full py-12">
      <Typography variant="h4" className="mb-4">
        Welcome {user.name}
      </Typography>
      <div className=" flex items-center justify-center">
        <div className="mt-2 w-full">
          <div className="mr-2 max-w-full animate-pulse overflow-hidden rounded shadow-lg">
            <div className="h-48 bg-gray-300"></div>
            <div className="px-6 py-4">
              <div className="mb-2 h-6 bg-gray-300"></div>
              <div className="h-4 w-2/3 bg-gray-300"></div>
            </div>
            <div className="px-6 pt-4 pb-6">
              <div className="mb-2 h-4 w-1/4 bg-gray-300"></div>
              <div className="h-4 w-1/2 bg-gray-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
