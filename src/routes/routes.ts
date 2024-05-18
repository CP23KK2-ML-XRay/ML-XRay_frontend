import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@/components/_Layout";



export const routes = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        children: []
    }
],{ basename: "/kk2/" });
