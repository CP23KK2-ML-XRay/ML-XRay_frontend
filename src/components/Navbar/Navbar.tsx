import React from "react";

interface NavbarProps {
  // Define your component props here
}

const Navbar: React.FC<NavbarProps> = () => {
  // Implement your component logic here

  return (
    <nav className="flex componenbg h-20 items-center shadow-lg ">
      <div className="flex justify-center sm:justify-between w-full px-20">
        <div className="font-bold text-2xl">ML-XRay</div>
        <div className="hidden sm:block">
          {" "}
          <br></br>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
