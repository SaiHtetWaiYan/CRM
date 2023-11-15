import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
} from "@heroicons/react/24/solid";
import { Home } from "@/pages/dashboard/user";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    title: "show_sidenav",
    layout: "user",
    pages: [
      {
        icon: <UserCircleIcon {...icon} />,
        name: "home",
        path: "/home",
        element: <Home />,
      },
    ],
  },
];

export default routes;
