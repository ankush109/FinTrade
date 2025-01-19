import React from "react";
import LoginForm from "./login.form";
import Image from "next/image";
import img1 from "../../../public/img3.jpg";

function Page() {
  return (
    <div className="flex flex-col md:grid md:grid-cols-2 min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-10 text-gray-900">
      <div className="flex flex-col justify-center px-6 md:px-16">
        <LoginForm />
      </div>
      <div className="hidden md:flex items-center justify-center">
        <Image
          src={img1}
          alt="Login Illustration"
          width={500}
          height={500}
          className="object-contain rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}

export default Page;
