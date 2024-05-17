import React from "react"; // Add this line
import { createBrowserRouter, useNavigate } from "react-router-dom";
import { Layout } from "@/components/_Layout";


export const routes = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        children: []
    }
]);
