import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import userAtom from "../../atom/user.atom";
import Farm from "../../components/dashboard/farm";
import History from "../../components/dashboard/history";
import Home from "../../components/dashboard/home";
import Settings from "../../components/dashboard/settings";
import SideNav from "../../components/sidenav";
import { withAuth } from "../../hocs/withAuth";
import menu from "../../public/svgs/menu-dark.svg";

const Dashboard = () => {
  const [openSideNav, setOpenSideNav] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const user = useRecoilValue(userAtom);
  return (
    <div>
      <Head>
        <title>Dashboard Techgro</title>
      </Head>
      <SideNav
        openSideNav={openSideNav}
        setOpenSideNav={setOpenSideNav}
        setActiveTab={setActiveTab}
      />
      <div
        className={`${
          openSideNav ? " md:ml-[25%] lg:ml-[16.666667%]" : ""
        } transition-[margin-left] duration-500 p-5`}
      >
        <div className="">
          <div className="flex justify-between  z-[1]  top-0 items-center w-[100%]">
            <Image
              src={menu}
              alt="menu"
              width={40}
              height={40}
              className="cursor-pointer hover:opacity-50 transition ease-out duration-150"
              onClick={() => setOpenSideNav(!openSideNav)}
            />

            <p className=" font-nunito font-bold text-xl text-techgro-green">
              Welcome {user.user.first_name}
            </p>
          </div>
        </div>

        {activeTab === "home" && <Home />}
        {activeTab === "history" && <History />}
        {activeTab === "settings" && <Settings />}
        {activeTab == "farm" && <Farm />}
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
