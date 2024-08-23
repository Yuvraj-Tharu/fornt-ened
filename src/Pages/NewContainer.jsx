import React from "react";
import "../../src/assets/Style/Home.css";

export default function NewContainer() {
  return (
    <>
      <div className="p-10 relative bg-[#FFFFFF] min-h-[100vh]">
        <div className="center h-[67vh] w-full flex items-end justify-between">
          <div className="left">
            <h3 className="text-lg w-[10vw] font-semibold leading-1"></h3>
          </div>
          <div className=" right-0 z-10">
            {/* <h1 className="from-neutral-200 text-[10vw] poppins-semibold  leading-[10vw] text-right text-slate-600 opacity-60">
              Space <br /> That <br /> Inspire
            </h1> */}
          </div>
        </div>
        <div className="shape absolute right-0 top-0 bottom-0 ">
          <div className="shape-1 w-[30vw] h-[30vw] bg-slate-600 mt-20 opacity-90"></div>
          <div className="shape-2 w-[20vw] h-[20vw] bg-slate-600 rounded-tl-[20vh ]  mt-10"></div>
        </div>
        <div className="shape absolute left-0 top-2 bottom-0 z-0 mx-0 opacity-75">
          <div className="shape-3 w-[20vw] h-[20vw] bg-slate-700 opacity-75 "></div>
        </div>
      </div>
    </>
  );
}
