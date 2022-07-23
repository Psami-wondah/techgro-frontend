import Image from "next/image";
import React from "react";
import logo from "../../public/svgs/logo.svg";
import home_logo from "../../public/svgs/home_logo.svg";
import logout from "../../public/svgs/logout.svg";
import settings from "../../public/svgs/settings.svg";
import history from "../../public/svgs/history.svg";
import { useResetRecoilState } from "recoil";
import userAtom from "../../atom/user.atom";
import { useRouter } from "next/router";

interface ISideNavProps {
  openSideNav: boolean;
  setOpenSideNav: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideNav = ({ openSideNav, setOpenSideNav }: ISideNavProps) => {
  const resetUser = useResetRecoilState(userAtom);
  const router = useRouter();

  const Logout = () => {
    // router.push("/");
    resetUser();
  };
  return (
    <div
      className={`h-full ${
        openSideNav ? "w-1/2 md:w-1/6" : "w-0"
      } fixed z-[1] top-0 left-0 overflow-x-hidden transition-[width] duration-500 bg-techgro-dark `}
    >
      <div className="px-4">
        <Image
          src={logo}
          alt="logo"
          width={100}
          height={100}
          className="cursor-pointer hover:opacity-50 transition ease-out duration-150"
        />
        <div className=" font-nunito font-bold text-white text-lg space-y-16 mt-12">
          <div className="cursor-pointer hover:opacity-50 transition ease-out duration-150 flex items-center gap-x-3">
            <Image src={home_logo} alt="logo" />
            Home
          </div>
          <div className="cursor-pointer hover:opacity-50 transition ease-out duration-150 flex items-center gap-x-3">
            <Image src={history} alt="history" />
            History
          </div>
          <div className="cursor-pointer hover:opacity-50 transition ease-out duration-150 flex items-center gap-x-3">
            <Image src={settings} alt="settings" />
            Account Settings
          </div>
          <div
            className="cursor-pointer hover:opacity-50 transition ease-out duration-150 flex items-center gap-x-3"
            onClick={() => Logout()}
          >
            <Image src={logout} alt="logout" />
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
