import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

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
        <main className="flex flex-1 bg-gray-300 overflow-y-auto paragraph px-4">
          <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/patients" element={<h1>Patients</h1>} />
            <Route path="/models" element={<h1>Models</h1>} />
            <Route path="/settings" element={<h1>Settings</h1>} />
          </Routes>
        </main>
      </div>
      {/* <div className="flex bg-yellow-300">Footer</div> */}
    </div>
  );
};
