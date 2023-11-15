import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import CustomerAdd from "./customer-add";
import CustomerDetail from "./customer-detail";
import CustomerEdit from "./customer-edit";
import axiosClient from "@/axios-client";
import { Delete, Restore } from "@/widgets/dialog";
import { Pagination } from "@/widgets/pagination";
import { Search } from "@/widgets/search";
import { Trash } from "@/widgets/tab";
import { Success } from "@/widgets/alerts";

export function Customer() {
  const [customers, setCustomers] = useState([]);
  const [success, setSuccess] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [trash, setTrash] = useState("false");
  const [loading, setLoading] = useState(false);
  const headers = [" ", "Name", "Email", "Phone", " "];
  const loadingSetection = (
    <tr>
      <td colSpan={5}>
        <div className="flex items-center justify-center pt-8">
          <svg
            role="status"
            className="mr-2 inline h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      </td>
    </tr>
  );
  const noDataSetection = (
    <tr>
      <td colSpan={5}>
        <Typography color="blue-gray" className="flex  justify-center p-4">
          No Data
        </Typography>
      </td>
    </tr>
  );
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get(
        `/customers?page=${currentPage}&query=${query}&trash=${trash}`
      );
      setCustomers(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentPage, query, trash]);

  return (
    <>
      {success && <Success message={success} setSuccess={setSuccess} />}
      <Card className="mt-12 mb-5 h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Customers list
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all customers
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <CustomerAdd fetchData={fetchData} setSuccess={setSuccess} />
            </div>
          </div>
          <div className="flex flex-col items-center justify-end gap-4 md:flex-row">
            <Trash setTrash={setTrash} />
            <Search query={query} setQuery={setQuery} />
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {headers.map((el) => (
                  <th
                    key={el}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <>{loadingSetection}</>
              ) : customers?.data?.length === 0 ? (
                <>{noDataSetection}</>
              ) : (
                customers?.data?.map(
                  ({ name, email, phone, deleted_at }, index) => {
                    return (
                      <tr key={name}>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="ml-3 flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {index + 1 + (customers.current_page - 1) * 10}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className=" flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {name}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {email === null ? "-" : email}
                            </Typography>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {phone}
                            </Typography>
                          </div>
                        </td>
                        <td className="p-4">
                          <CustomerDetail customer={customers.data[index]} />

                          {deleted_at ? (
                            <Restore
                              data={customers.data[index]}
                              url="customers"
                              setSuccess={setSuccess}
                              fetchData={fetchData}
                            />
                          ) : (
                            <>
                              <CustomerEdit
                                fetchData={fetchData}
                                setSuccess={setSuccess}
                                customer={customers.data[index]}
                              />
                              <Delete
                                data={customers.data[index]}
                                url="customers"
                                setSuccess={setSuccess}
                                fetchData={fetchData}
                              />
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  }
                )
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-center border-t border-blue-gray-50 p-6">
          <Pagination
            fetchData={fetchData}
            data={customers}
            setCurrentPage={setCurrentPage}
          />
        </CardFooter>
      </Card>
    </>
  );
}

export default Customer;
