// import SignIn from "@/views/SignIn/SignIn";
// import SignUp from "@/views/SignUp/SignUp";
// import UserInfo from "@/views/UserInfo/UserInfo"
import PatientsRecord from "@/views/PatientsRecord/PatientsRecord";
import PatientDetail from "@/views/PatientsRecord/PatientDetail";
import ModelList from "@/views/ModelList/ModelList";
import SignUp from "@/views/SignUp/SignUp"
import NotFound from "@/views/PageNotFound/PageNotFound"
import { createBrowserRouter } from "react-router-dom";




export const routes = createBrowserRouter([
    {
        path: "/",
        Component: ModelList,
        children: []
    },
],{ basename: "/kk2/" });
