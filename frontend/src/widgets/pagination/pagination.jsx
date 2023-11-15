import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export function Pagination({ data, fetchData, setCurrentPage }) {
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchData(page);
  };
  return (
    <div className="flex items-center gap-8">
      <IconButton
        size="sm"
        variant="outlined"
        onClick={() => handlePageChange(data.current_page - 1)}
        disabled={data.current_page === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
      <Typography color="gray" className="font-normal">
        Page <strong className="text-gray-900">{data.current_page}</strong> of
        <strong className="pl-2 text-gray-900">{data.last_page}</strong>
      </Typography>
      <IconButton
        size="sm"
        variant="outlined"
        onClick={() => handlePageChange(data.current_page + 1)}
        disabled={data.last_page === data.current_page}
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </div>
  );
}

export default Pagination;
