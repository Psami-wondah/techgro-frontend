import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import NavBar from "../components/navbar";

const Home: NextPage = () => {
  return (
    <div>
      <div className=" bg-techgro-dark min-h-screen font-nunito bg-techgro-home bg-no-repeat bg-50%">
        <NavBar />
        <div className="mt-[10vh] md:mt-[17vh] font-lato text-center space-y-8 lg:space-y-5">
          <div className="text-white font-[900] text-6xl md:text-7xl w-[90%] md:w-[70%] xl:w-[50%] text-center m-auto">
            Tech in Agriculture.{" "}
            <span className="text-techgro-green">Farm remotely!</span>
          </div>
          <div className="text-[#8B8B8B] w-[70%] md:w-[30%] text-center m-auto">
            {"Don't"} let your computer memories consumes all of those browser
            tabs. Findtrend let you gathers all of your favorite website into
            one place.
          </div>
          <div className="">
            <Link href={"/register"}>
              <button className=" bg-techgro-green text-lg rounded-[40px] py-4 px-8 cursor-pointer hover:opacity-50 transition ease-out duration-150">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
