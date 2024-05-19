// import SignIn from "@/views/SignIn/SignIn";
// import SignUp from "@/views/SignUp/SignUp";
// import UserInfo from "@/views/UserInfo/UserInfo"
import PatientsRecord from "@/views/PatientsRecord/PatientsRecord";
import PatientDetail from "@/views/PatientsRecord/PatientDetail";
import { createBrowserRouter } from "react-router-dom";




export const routes = createBrowserRouter([
    {
        path: "/",
        Component: PatientDetail,
        children: []
    },
],{ basename: "/kk2/" });
