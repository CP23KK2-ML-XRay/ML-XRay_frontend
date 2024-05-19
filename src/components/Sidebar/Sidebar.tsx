import React from "react";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";

interface SidebarProps {
  // Define the props for your sidebar component here
}

const Sidebar: React.FC<SidebarProps> = () => {
  // Implement your sidebar component logic here

  return (
    <aside className="hidden md:block bcomponenbg w-1/6 overflow-y-auto ">
      <div className="flex flex-col justify-between w-full h-full py-7 text-md md:text-lg font-semibold">
        <div className="flex flex-col w-full pl-4 gap-2">
          <div className="pl-4 text-sm md:text-md">Main Menu</div>
          <div className="w-full">
            <button className="flex items-center w-full py-3 pl-4 gap-3 border-r-4 border-indigo-500 rounded-l-lg text-black hover:bg-gray-300">
              <DashboardOutlinedIcon fontSize="small" />
              <p>Dashboard</p>
            </button>
            <button className="flex items-center w-full py-3 pl-4 gap-3 rounded-l-lg text-gray-500 hover:bg-gray-300">
              <GroupsOutlinedIcon fontSize="small" />
              <p>Patients</p>
            </button>
            {/* <button className="flex items-center w-full py-3 pl-4 gap-3 rounded-l-lg text-gray-500 hover:bg-gray-300">
              <CalendarMonthOutlinedIcon fontSize="small" />
              <p>Calendar</p>
            </button>
            <button className="flex items-center w-full py-3 pl-4 gap-3 rounded-l-lg text-gray-500 hover:bg-gray-300 ">
              <SettingsOutlinedIcon fontSize="small" />
              <p>Setting</p>
            </button> */}
          </div>
        </div>
        <button className="flex justify-center items-center py-3 mx-4 gap-3 rounded-lg hover:bg-gray-300">
          <ExitToAppOutlinedIcon fontSize="small" />
          <p>Logout</p>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
