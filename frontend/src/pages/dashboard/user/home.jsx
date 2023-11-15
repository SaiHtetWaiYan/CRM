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
      <img
        className="h-96 w-full object-cover object-center"
        src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
        alt="nature image"
      />
    </div>
  );
}

export default Home;
