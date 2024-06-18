import React, { useEffect, useState } from "react";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Link, useParams } from "react-router-dom";
import AuthenticationService from "@/service/AuthenticationService";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputLabel, OutlinedInput } from "@mui/material";

const handleLogout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("accessTokenExp");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("refreshTokenExp");
  localStorage.removeItem("email");
  localStorage.removeItem("role");
  location.href = "/signin";
};

interface SidebarProps {}

interface UserData {
  firstname: string;
  lastname: string;
  email: string;
  position: string;
}

// THIS IS FUNCTION SECTOR NAJA
// | | | | | | | | | | | |
// | | | | | | | | | | | |
// V V V V V V V V V V V V

const Sidebar: React.FC<SidebarProps> = () => {
  const { email } = useParams<{ email: string }>();
  const userEmail = email ? email : "";

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formErrors, setFormErrors] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  const [userData, setUserData] = useState<UserData | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors = { oldPassword: "", password: "", confirmPassword: "" };

    if (!oldPassword.trim()) {
      newErrors.oldPassword = "Old password is required";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
    }


    setFormErrors(newErrors);

    return (
      !newErrors.oldPassword &&
      !newErrors.password &&
      !newErrors.confirmPassword
    );
  };

  // | | | | | | | | |
  // | | | | | | | | |
  // V V V V V V V V V
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

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        // const authenticationService = new AuthenticationService
        // await authenticationService.updateUser(userEmail, password)
        setIsEditing(false);
        setIsPopupOpen(false);
      } catch (error) {
        console.error("Failed to update user info:", error);
      }
    }
  };

  // | | | | | | | | | | | |
  // | | | | | | | | | | | |
  // V V V V V V V V V V V V

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authenticationService = new AuthenticationService();
        const data = await authenticationService.retrieveUser(userEmail);
        if (data) {
          setUserData(data);
        }
      } catch (error) {
        console.error("ERROR");
      }
    };
    fetchData();
    const role = localStorage.getItem("role");
    setUserRole(role);
  }, [userEmail]);
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
            {userRole === "ADMIN" && (
              <Link
                to={"/createmodel"}
                className="flex items-center w-full py-3 pl-4 gap-3 rounded-l-lg text-gray-500 hover:bg-gray-300"
              >
                <AddBoxIcon fontSize="small" />
                <p>Create Model</p>
              </Link>
            )}
            {userRole === "ADMIN" && (
              <Link
                to={"/model"}
                className="flex items-center w-full py-3 pl-4 gap-3 rounded-l-lg text-gray-500 hover:bg-gray-300"
              >
                <ClearAllIcon fontSize="small" />
                <p>Models</p>
              </Link>
            )}

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
            <ExitToAppOutlinedIcon fontSize="small" style={{ color: "red" }} />
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
                  <div  className="mt-4">
                    <InputLabel>
                      Old Password
                    </InputLabel>
                    <OutlinedInput
                      type={showOldPassword ? "text" : "password"}
                      name="oldPassword"
                      className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      endAdornment={
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowOldPassword((prev) => !prev)}
                          edge="end">
                             {showOldPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                      }
                      sx={{width: '300px', height: '50px'}}
                    />
                    {formErrors.oldPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.oldPassword}
                      </p>
                    )}
                  </div>
                  <div  className="mt-4">
                    <InputLabel>
                      New Password                      
                    </InputLabel>
                    <OutlinedInput
                      type={showNewPassword ? "text" : "password"}
                      name="password"
                      className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      endAdornment={
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowNewPassword((prev) => !prev)}
                          edge="end">
                            {showNewPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                      }
                      sx={{width: '300px', height: '50px'}}
                    />
                    {formErrors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.password}
                      </p>
                    )}
                  </div>
                  <div className="mt-4">
                    <InputLabel>
                      Confirm Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      endAdornment={
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowConfirmPassword((prev) => !prev)}
                          edge="end">
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                      }
                      sx={{width: '300px', height: '50px'}}
                    />
                    {formErrors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.confirmPassword}
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <div>
                  Firstname: {userData?.firstname}
                  <p>Lastname: {userData?.lastname}</p>
                  <p>Email: {userData?.email}</p>
                  <p>Role: {userData?.position}</p>
                </div>
              )}
            </div>
            <div className="flex justify-end">
              {isEditing ? (
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              ) : (
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                  onClick={handleEditClick}
                >
                  Change Password
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
