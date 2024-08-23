import React from "react";
import { BiSolidMessageAltEdit } from "react-icons/bi";
export default function MessageIcon() {
  return (
    <div>
      <Link className="text-6xl flex flex-row-reverse" to="/chat">
        <BiSolidMessageAltEdit />
      </Link>
    </div>
  );
}
