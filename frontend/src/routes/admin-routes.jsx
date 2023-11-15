import {
  HomeIcon,
  UserGroupIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/solid";
import { Home, Customer, Setting } from "@/pages/dashboard/admin";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const adminRoutes = [
  {
    title: "show_sidenav",
    layout: "admin",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "home",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: "customer",
        path: "/customer",
        element: <Customer />,
      },
      {
        icon: <Cog8ToothIcon {...icon} />,
        name: "setting",
        path: "/setting",
        element: <Setting />,
      },
    ],
  },
];

export default adminRoutes;
