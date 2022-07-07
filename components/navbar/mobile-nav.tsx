import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRecoilValue, useResetRecoilState } from "recoil";
import userAtom from "../../atom/user.atom";

const MobileNav = () => {
  const userData = useRecoilValue(userAtom);
  const resetUser = useResetRecoilState(userAtom);

  const logout = () => {
    resetUser();
  };
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
        {userData.access_token ? (
          <p
            className="text-white cursor-pointer hover:opacity-50 transition ease-out duration-150"
            onClick={() => logout}
          >
            Logout
          </p>
        ) : (
          <Link href={"/login"}>
            <p className="text-white cursor-pointer hover:opacity-50 transition ease-out duration-150">
              Login
            </p>
          </Link>
        )}

        {userData.access_token ? (
          <Link href={"/dashboard"}>
            <button className="bg-white rounded-[40px] py-3 px-8 cursor-pointer hover:opacity-50 transition ease-out duration-150 text-black">
              Dashboard
            </button>
          </Link>
        ) : (
          <Link href={"/register"}>
            <button className="bg-white rounded-[40px] py-3 px-8 cursor-pointer hover:opacity-50 transition ease-out duration-150 text-black">
              Register
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MobileNav;
