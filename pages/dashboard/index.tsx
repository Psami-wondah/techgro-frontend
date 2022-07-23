import Image from "next/image";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import userAtom from "../../atom/user.atom";
import CircularProgressWithLabel from "../../components/circularprogress";
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
          openSideNav ? " md:ml-[16.666667%]" : ""
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

        <div className="grid grid-cols-1 md:grid-cols-2 p-12 gap-12">
          <div>
            <CircularProgressWithLabel
              value={50}
              color="warning"
              size={300}
              sx={{ circle: { color: "gray", borderRadius: "9999px" } }}
            />
          </div>
          <div>
            <CircularProgressWithLabel value={20} color="success" size={300} />
          </div>
          <div>
            <CircularProgressWithLabel value={20} color="warning" size={300} />
          </div>
          <div>
            <CircularProgressWithLabel value={20} color="warning" size={300} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
