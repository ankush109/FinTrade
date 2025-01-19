import React from "react";

import avatar from "../assets/avatar.jpg";

const Navbar: React.FC = () => {
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // const toggleMobileMenu = () => {
  //   setIsMobileMenuOpen((prev) => !prev);
  // };

  return (
    <header className="bg-white dark:bg-[#1F214A] h-16 flex justify-between items-center border-b border-[#00000029] dark:border-[#1F214A] dark:border-l dark:border-[#FFFFFF29] dark:text-white">
      <div className="flex w-[90%] h-full  border-r border-[#00000029] dark:border-[#FFFFFF29] justify-between items-center">
        <div className="mx-8 text-2xl font-bold"> Dashboard</div>
        <div className=" mx-8">
     hi
        </div>
      </div>
      <div className="flex w-[10%] h-full  justify-center items-center">
        {/* <Image src={avatar.src} className="h-11 w-11 rounded-full" /> */}
      </div>
    </header>
  );
};

export default Navbar;