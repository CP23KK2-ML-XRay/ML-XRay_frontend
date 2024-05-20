import { Navigate, createBrowserRouter } from "react-router-dom";
import { Layout } from "@/components/_Layout";
import SignIn from "@/views/SignIn/SignIn";
import SignUp from "@/views/SignUp/SignUp";
import { isAuthentication } from "@/utils/AuthenticationUtils";
import { PageNotFound } from "@/views/PageNotFound/PageNotFound";

const requireAuth = (element: React.ReactElement) => {
  return isAuthentication() ? element : <Navigate to="/signin" />;
};

export const routes = createBrowserRouter([
  {
    path: "/",
    element: requireAuth(<Layout />),
    children: [],
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
    path: "/404",
    element: <PageNotFound />,
  },
]);
