import Image from "next/image";
import React, { useState } from "react";
import logo from "../../public/svgs/logo.svg";
import menu from "../../public/svgs/menu.svg";
import cancel from "../../public/svgs/cancel.svg";
import MobileNav from "./mobile-nav";
import Link from "next/link";
import { useRecoilValue, useResetRecoilState } from "recoil";
import userAtom from "../../atom/user.atom";

const NavBar = () => {
  const [dropDown, setDropDown] = useState(false);
  const userData = useRecoilValue(userAtom);
  const resetUser = useResetRecoilState(userAtom);

  const logout = () => {
    resetUser();
  };
  return (
    <div>
      <div className="flex items-center justify-between px-10 pt-5">
        <Image
          src={logo}
          alt="logo"
          width={100}
          height={100}
          className="cursor-pointer hover:opacity-50 transition ease-out duration-150"
        />

        <div className=" text-white space-x-8 hidden lg:block">
          <span className="cursor-pointer hover:opacity-50 transition ease-out duration-150 ">
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
          <span className="cursor-pointer hover:opacity-50 transition ease-out duration-150 ">
            Features
          </span>
        </div>

        {userData.access_token ? (
          <div className="hidden lg:flex gap-x-8 items-center">
            <p
              className="text-white cursor-pointer hover:opacity-50 transition ease-out duration-150"
              onClick={() => logout()}
            >
              Logout
            </p>

            <Link href={"/register"}>
              <button className="bg-white rounded-[40px] py-3 px-8 cursor-pointer hover:opacity-50 transition ease-out duration-150 ">
                Dashboard
              </button>
            </Link>
          </div>
        ) : (
          <div className="hidden lg:flex gap-x-8 items-center">
            <Link href={"login"}>
              <p className="text-white cursor-pointer hover:opacity-50 transition ease-out duration-150">
                Login
              </p>
            </Link>
            <Link href={"/register"}>
              <button className="bg-white rounded-[40px] py-3 px-8 cursor-pointer hover:opacity-50 transition ease-out duration-150 ">
                Register
              </button>
            </Link>
          </div>
        )}

        <div className="lg:hidden">
          <Image
            src={dropDown ? cancel : menu}
            alt="menu"
            width={40}
            height={40}
            className="cursor-pointer hover:opacity-50 transition ease-out duration-150"
            onClick={() => setDropDown(!dropDown)}
          />
        </div>
      </div>
      <MobileNav dropDown={dropDown} />
    </div>
  );
};

export default NavBar;
