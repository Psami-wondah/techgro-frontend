import Image from "next/image";
import React from "react";
import { InputField } from "../input";
import logo from "../../public/svgs/logo.svg";
import Link from "next/link";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-techgro-dark min-h-screen grid grid-cols-12 relative">
      <div className="col-span-4 px-5 ">
        <Link href={"/"}>
          <Image
            src={logo}
            alt="logo"
            width={100}
            height={100}
            className="cursor-pointer hover:opacity-50 transition ease-out duration-150"
          />
        </Link>
        <div className=" font-poppins text-white text-4xl mt-6 tracking-wider hidden md:block">
          Tech in Agriculture. Farm remotely!
        </div>{" "}
        <div className=" mt-[20vh] hidden md:block">
          <Image
            src={"/svgs/home.svg"}
            alt="home"
            width={400}
            height={400}
            className="cursor-pointer hover:opacity-50 transition ease-out duration-150"
          />{" "}
        </div>
      </div>
      <div className="col-span-12 md:col-span-8 min-h-screen bg-white rounded-l-[38px] px-[10%] lg:px-[20%] font-poppins">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
