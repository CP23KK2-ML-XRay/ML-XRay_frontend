import { createBrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "@/components/_Layout";
import SignIn from "@/views/SignIn/SignIn";
import SignUp from "@/views/SignUp/SignUp";
// import { isAuthentication } from "@/utils/AuthenticationUtils";
import { ListPatient } from "@/views/Patiant/ListPatiant";
import { DetailPatient } from "@/views/Patiant/DetailPatient";
import  UserInfo  from '../views/UserInfo/UserInfo';


// const requireAuth = (element: React.ReactElement) => {
//   return isAuthentication() ? element : <Navigate to="/signin" />;
// };

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <ListPatient /> },
      { path: "/detail/:id", element: <DetailPatient /> },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/info",
    element: <UserInfo />,
  }
]);
