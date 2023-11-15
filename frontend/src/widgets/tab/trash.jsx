import React from "react";
import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";
import { FunnelIcon, TrashIcon } from "@heroicons/react/24/solid";
const TABS = [
  {
    label: "No Trash",
    value: "false",
    icon: FunnelIcon,
  },
  {
    label: "Trash",
    value: "true",
    icon: TrashIcon,
  },
];

export function Trash({ setTrash }) {
  return (
    <Tabs value="false" className="w-full  md:w-72">
      <TabsHeader>
        {TABS.map(({ label, value, icon }) => (
          <Tab key={value} value={value} onClick={() => setTrash(value)}>
            <div className="flex items-center gap-2">
              {React.createElement(icon, { className: "w-5 h-5" })}
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
    </Tabs>
  );
}

export default Trash;
