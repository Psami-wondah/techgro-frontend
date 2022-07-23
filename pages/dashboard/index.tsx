import Image from "next/image";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import userAtom from "../../atom/user.atom";
import SideNav from "../../components/sidenav";
import { withAuth } from "../../hocs/withAuth";
import menu from "../../public/svgs/menu-dark.svg";

const Dashboard = () => {
  const [openSideNav, setOpenSideNav] = useState(false);
  const user = useRecoilValue(userAtom);
  return (
    <div>
      <SideNav openSideNav={openSideNav} setOpenSideNav={setOpenSideNav} />
      <div
        className={`${
          openSideNav ? "ml-[50%] md:ml-[16.666667%]" : ""
        } transition-[margin-left] duration-500 p-5`}
      >
        <div className="flex justify-between">
          <Image
            src={menu}
            alt="menu"
            width={40}
            height={40}
            className="cursor-pointer hover:opacity-50 transition ease-out duration-150"
            onClick={() => setOpenSideNav(!openSideNav)}
          />

          <p className=" font-nunito font-bold text-xl text-techgro-orange">
            Welcome {user.user.first_name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
