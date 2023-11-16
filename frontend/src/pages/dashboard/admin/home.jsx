import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { ClockIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { StatisticsChart } from "@/widgets/charts";
import { statisticsChartsData } from "@/data";
import axiosClient from "@/axios-client";
export function Home() {
  const [totalCustomers, setTotalCustomers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get("/customers/count");
        setTotalCustomers(response.data.count);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader
            variant="gradient"
            color="blue"
            className="absolute -mt-4 grid h-16 w-16 place-items-center"
          >
            <UserPlusIcon className="h-6 w-6 text-white" />
          </CardHeader>
          <CardBody className="p-4 text-right">
            <Typography
              variant="small"
              className="font-normal text-blue-gray-600"
            >
              Total Customers
            </Typography>
            <Typography variant="h4" color="blue-gray">
              {totalCustomers}
            </Typography>
          </CardBody>
          <CardFooter className="border-t border-blue-gray-50 p-4">
            {" "}
          </CardFooter>
        </Card>
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-inherit" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
