import React from "react";
import Image from "next/image";
import Link from "next/link";

const MobileNav = () => {
  return (
    <div className="lg:hidden">
      <div className=" space-y-7 text-white flex flex-col justify-center text-center px-6">
        <span className="cursor-pointer hover:opacity-50 transition ease-out duration-150">
          About
        </span>
        <span className="cursor-pointer hover:opacity-50 transition ease-out duration-150">
          How it works
        </span>
        <span className="cursor-pointer hover:opacity-50 transition ease-out duration-150">
          Pricing
        </span>
        <span className="cursor-pointer hover:opacity-50 transition ease-out duration-150">
          Solution
        </span>
        <span className="cursor-pointer hover:opacity-50 transition ease-out duration-150">
          Features
        </span>
        <Link href={"/login"}>
          <p className="text-white cursor-pointer hover:opacity-50 transition ease-out duration-150">
            Login
          </p>
        </Link>
        <Link href={"/register"}>
          <button className="bg-white rounded-[40px] py-3 px-8 cursor-pointer hover:opacity-50 transition ease-out duration-150 text-black">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MobileNav;
