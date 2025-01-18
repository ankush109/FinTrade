import Image from "next/image";
import React from "react";
import Ngoform from "./ngo.form";

function page() {
  return (
    <div className="grid grid-cols-2  mt-4 mb-10 h-screen">
      {/* <LoginForm /> */}
      <Ngoform />
      <div className="my-auto ">
        <Image
          height={900}
          width={700}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhuZMsc_-2l-WqV3xpCTHqi76yBY3qmK4FAQ&s"
          //   src="https://images.squarespace-cdn.com/content/v1/60818be3726c6c6c3f24a841/1622140128102-KWTH9R30PZ4DOZ9UN9KB/Mental+Health.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default page;
