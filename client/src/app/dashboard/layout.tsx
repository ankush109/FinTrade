import React, { FC } from "react";
import Sidebar from "./_components/sidebar";
import { Suspense } from "react";
import Loading from "./_components/Loader";
interface PageProps {
  children: React.ReactNode;
}

const Layout: FC<PageProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <div className="flex-none hidden lg:block">
        {/* <Suspense fallback={<Loading />}>
          <Sidebar />
        </Suspense> */}
      </div>
      <div className="flex-grow overflow-auto p-1">{children}</div>
    </div>
  );
};

export default Layout;
