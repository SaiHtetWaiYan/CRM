import { UserCircleIcon, Cog8ToothIcon } from "@heroicons/react/24/solid";
import { Home, Setting } from "@/pages/dashboard/user";

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
      {
        icon: <Cog8ToothIcon {...icon} />,
        name: "setting",
        path: "/setting",
        element: <Setting />,
      },
    ],
  },
];

export default routes;
