import React from "react";

interface LayoutProps {
  // Define your component props here
}

export const Layout: React.FC<LayoutProps> = ({}) => {
  // Component logic and JSX here

  return (
    <div className="flex flex-col h-screen w-screen">
      <nav className="flex bg-pink-500 h-20 items-center">
        {/* Full Width Header */}
        fdskjfkdsjkfjkdsjfljsdlfjlsdjlk
        <div className="">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            ML-XRAY
          </span>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden sm:block bg-green-300 w-1/6 overflow-y-auto">
          {/* Sidebar content  */}
        </aside>
        <main className="flex flex-1 bg-blue-300 overflow-y-auto paragraph px-4">
          {/* main content */}
          dsla;dklsaldkak;ldk;ksa;l
        </main>
      </div>
      {/* <div className="flex bg-yellow-300">Footer</div> */}
    </div>
  );
};
