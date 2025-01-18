import React from "react";

import RegisterForm from "./register.form";

function Page() {
  return (
    <div className="flex flex-col md:grid md:grid-cols-2 min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-10 text-gray-900">

      <div className="">
        <RegisterForm />
      </div>

  
    </div>
  );
}

export default Page;
