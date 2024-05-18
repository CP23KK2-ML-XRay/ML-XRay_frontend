import SignIn from "@/views/SignIn/SignIn";
import SignUp from "@/views/SignUp/SignUp";

import { createBrowserRouter } from "react-router-dom";




export const routes = createBrowserRouter([
    {
        path: "/",
        Component: SignUp,
        children: []
    },
],{ basename: "/kk2/" });
