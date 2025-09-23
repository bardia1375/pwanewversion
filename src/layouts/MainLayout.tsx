import React from "react";
import Navbar from "./partials/Navbar";
import Footer from "./partials/Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="pr-4 pl-4 h-screen  bg-[#d6f0f7] flex flex-col overflow-hidden">
      <Navbar />
      <main className=" flex-1 pt-20  overflow-auto ">
        {children}
      </main>
     <Footer />
    </div>
  );
};

export default MainLayout;
