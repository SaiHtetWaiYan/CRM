import { useLocation } from "react-router-dom";
import {
  Navbar,
  Typography,
  IconButton,
  Breadcrumbs,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  BellIcon,
  Bars3Icon,
  XMarkIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import Avatar from "react-avatar";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { useStateContext } from "@/context/ContextProvider";
export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const { user } = useStateContext();

  return (
    <Navbar
      color="transparent"
      className="rounded-xl px-0 py-1 transition-all"
      fullWidth
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs className="bg-transparent p-0 transition-all">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
            >
              {layout}
            </Typography>

            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {page}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray">
            {page}
          </Typography>
        </div>
        <div className="flex items-center">
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            {openSidenav ? (
              <XMarkIcon
                strokeWidth={3}
                className="h-6 w-6 text-blue-gray-500"
              />
            ) : (
              <Bars3Icon
                strokeWidth={3}
                className="h-6 w-6 text-blue-gray-500"
              />
            )}
          </IconButton>

          <Menu>
            <MenuHandler>
              <IconButton variant="text" color="blue-gray">
                <BellIcon className="h-5 w-5 text-blue-gray-500" />
              </IconButton>
            </MenuHandler>
            <MenuList className="w-max border-0">
              <MenuItem className="flex items-center gap-4">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-blue-gray-800 to-blue-gray-900">
                  <InformationCircleIcon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    No New Notifications
                  </Typography>
                </div>
              </MenuItem>
            </MenuList>
          </Menu>
          <Avatar
            size="40"
            className="mx-2"
            round={true}
            name={user.name}
            color="#379cf0"
          />
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
