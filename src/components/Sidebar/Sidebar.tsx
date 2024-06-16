import React, { useState } from "react";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import { Link } from "react-router-dom";

interface SidebarProps {
  // Define the props for your sidebar component here
}

const handleLogout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("accessTokenExp");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("refreshTokenExp");
  localStorage.removeItem("email");
  localStorage.removeItem("role");
  location.href = "/signin";
};

  // THIS IS FUNCTION SECTOR NAJA
  // | | | | | | | | | | | |
  // | | | | | | | | | | | |
  // V V V V V V V V V V V V

const Sidebar: React.FC<SidebarProps> = () => {  
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({ firstname: 'John', lastname: 'Doe' });

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
    setIsEditing(false);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  // UX UI Sidebar here 
  // | | | | | | | | | | | |
  // | | | | | | | | | | | |
  // V V V V V V V V V V V V

  return (
    <aside className="hidden md:block bcomponenbg w-1/6 overflow-y-auto ">
      <div className="flex flex-col justify-between w-full h-full py-7 text-md md:text-lg font-semibold">
        <div className="flex flex-col w-full pl-4 gap-2">
          <div className="pl-4 text-sm md:text-md">Main Menu</div>
          <div className="w-full">
            {/* <button className="flex items-center w-full py-3 pl-4 gap-3 border-r-4 border-indigo-500 rounded-l-lg text-black hover:bg-gray-300">
              <DashboardOutlinedIcon fontSize="small" />
              <p>Dashboard</p>
            </button> */}
            <Link
              to={"/"}
              className="flex items-center w-full py-3 pl-4 gap-3 rounded-l-lg text-gray-500 hover:bg-gray-300"
            >
              <GroupsOutlinedIcon fontSize="small" />
              <p>Patients</p>
            </Link>
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
        <div className="flex flex-col w-full gap-2">
          <button
            className="flex justify-start items-center py-3 pl-3 mx-4 gap-3 rounded-lg hover:bg-gray-300"
            onClick={handlePopupOpen}
          >
            <AccountBoxRoundedIcon fontSize="small" />
            <p>User Info</p>
          </button>
          <span className="border-b-4 mx-2 py-3 "></span>
          <button
            className="flex justify-start items-center py-3 pl-3 mx-4 gap-3 rounded-lg hover:bg-gray-200 text-red-500 "
            onClick={handleLogout}
          >
            <ExitToAppOutlinedIcon fontSize="small" style={{ color: 'red' }} />
            <p>Logout</p>
          </button>
        </div>
      </div>
      {/*
POP UP for USER INFO and EDIT USER INFO
   | | | | | | | | | | | |
   | | | | | | | | | | | |
   V V V V V V V V V V V V
      */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">User Information</h2>
            <div className="mb-4">
              {isEditing ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Firstname</label>
                    <input
                      type="text"
                      name="firstname"
                      className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                      value={userInfo.firstname}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Lastname</label>
                    <input
                      type="text"
                      name="lastname"
                      className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                      value={userInfo.lastname}
                      onChange={handleChange}
                    />
                  </div>
                </>
              ) : (
                <>
                  <p>Firstname: {userInfo.firstname}</p>
                  <p>Lastname: {userInfo.lastname}</p>
                  <p>Email: </p>
                  <p>Role:</p>
                </>
              )}
            </div>
            <div className="flex justify-end">
              {isEditing ? (
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
                  onClick={handleSaveClick}
                >
                  Save
                </button>
              ) : (
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                  onClick={handleEditClick}
                >
                  Edit
                </button>
              )}
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 ml-4"
                onClick={handlePopupClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
