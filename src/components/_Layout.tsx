import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import { ListPatient } from "@/views/Patiant/ListPatiant";
import { DetailPatient } from "@/views/Patiant/DetailPatient";

interface LayoutProps {
  // Define your component props here
}

export const Layout: React.FC<LayoutProps> = ({}) => {
  // Component logic and JSX here

  return (
    <div className="flex flex-col h-screen w-screen">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex flex-1 bg-gray-300 overflow-y-auto px-4">
          <Routes>
            <Route path="/" element={<ListPatient />} />
            <Route path="/detail/:id" element={<DetailPatient />} />
          </Routes>
        </main>
      </div>
      {/* <div className="flex bg-yellow-300">Footer</div> */}
    </div>
  );
};
