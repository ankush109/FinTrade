import React, { FC } from "react";
import { Avatar, Button } from "@mui/material";
import Link from "next/link";
import { blue } from "@mui/material/colors";

interface ConsultantCardProps {
  id: string;
  name: string;
  phonenumber: string;
  email: string;
}

const ConsultantCard: FC<ConsultantCardProps> = ({
  id,
  name,
  phonenumber,
  email,
}) => {
  return (
    <div className="bg-slate-100 flex flex-col shadow-lg rounded-lg items-start transition ease-in hover:-translate-y-1">
      <div className="flex justify-between items-center w-full p-5">
        <div className="flex-grow">
          <div className="font-comf text-lg font-semibold">
            <p>
              Mentor: <span className="font-normal">{name}</span>
            </p>
            <p>
              Email: <span className="font-normal">{email}</span>
            </p>
          </div>
          <div className="mt-4">
            <Link href={`/dashboard/meeting/${id}`}>
              <Button
                variant="contained"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full"
              >
                Book a Call
              </Button>
            </Link>
          </div>
        </div>
        <Avatar
          sx={{
            height: "4.2vmax",
            width: "4.2vmax",
            fontSize: "2vmax",
            bgcolor: blue[300],
          }}
          alt={name}
          src="/static/images/avatar/1.jpg"
        />
      </div>
    </div>
  );
};

export default ConsultantCard;
