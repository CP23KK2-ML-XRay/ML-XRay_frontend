// import SignIn from "@/views/SignIn/SignIn";
// import SignUp from "@/views/SignUp/SignUp";
import UserInfo from "@/views/UserInfo/UserInfo"
import { createBrowserRouter } from "react-router-dom";




export const routes = createBrowserRouter([
    {
        path: "/",
        Component: UserInfo,
        children: []
    },
],{ basename: "/kk2/" });
