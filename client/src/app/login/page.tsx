import React from "react";
import LoginForm from "./login.form";
import Image from "next/image";

function Page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-screen">
      <div className="">
        <LoginForm />
      </div>
      <div className="hidden md:flex p-10 bg-gray-200 items-center justify-center">
        <Image
          src="https://image.mux.com/017Yw7T7QleOQFbHCvL4FHJgZXxbgi003MOxEvUJcqj00I/thumbnail.webp"
          alt="Login Illustration"
          width={800}
          height={800}
          className="object-contain rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}

export default Page;
