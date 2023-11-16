import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import {
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import axiosClient from "@/axios-client";
import { useStateContext } from "@/context/ContextProvider";
export function Sidenav({ routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { openSidenav } = controller;
  const { setUser, setToken, setRole } = useStateContext();
  const logout = (e) => {
    e.preventDefault();
    axiosClient.post("/logout").then(() => {
      setUser(null);
      setToken(null);
    });
  };

  return (
    <aside
      className={`bg-white shadow-lg ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50  h-[calc(100vh)] w-72  transition-transform duration-300 xl:translate-x-0`}
    >
      <div className="relative flex items-center border-b border-blue-gray-50">
        <Link to="#" className="flex items-center gap-2 py-6 px-8">
          <img
            src="/img/crm.png"
            className="relative inline-block w-28 rounded-lg object-cover object-center"
          />
        </Link>
        <IconButton
          variant="text"
          color="blue-gray"
          className="ml-auto mr-1 xl:hidden"
          onClick={() => setOpenSidenav(dispatch, !openSidenav)}
        >
          {openSidenav ? (
            <XMarkIcon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          ) : (
            <></>
          )}
        </IconButton>
      </div>
      <div className="m-4">
        {routes
          .filter((route) => route.title == "show_sidenav")
          .map(({ layout, pages }, key) => (
            <ul key={key} className="mb-4 flex flex-col gap-1">
              {pages.map(({ icon, name, path }) => (
                <li key={name}>
                  <NavLink to={`/${layout}${path}`}>
                    {({ isActive }) => (
                      <Button
                        variant={isActive ? "gradient" : "text"}
                        color={isActive ? "blue" : "blue-gray"}
                        className="flex items-center gap-4 px-4 capitalize"
                        fullWidth
                      >
                        {icon}
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          {name}
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          ))}
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-4 px-4 capitalize"
          fullWidth
          onClick={logout}
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5 text-inherit" />
          <Typography color="inherit" className="font-medium capitalize">
            Logout
          </Typography>
        </Button>
      </div>
    </aside>
  );
}

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
