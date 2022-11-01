import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import userAtom from "../atom/user.atom";
// import NavBr from "../components/navbar";
import useGoogleLogin from "../hooks/google.hook";
import { GOOGLE_ID } from "../utils/constants";
import dynamic from "next/dynamic";
import Head from "next/head";

const NavBar = dynamic(import("../components/navbar"), { ssr: false });

const Home: NextPage = () => {
  const router = useRouter();
  const { mutate, isLoading } = useGoogleLogin();
  const userData = useRecoilValue(userAtom);

  const handleGoogleResponse = async (
    response: google.accounts.id.CredentialResponse
  ) => {
    console.log(response.credential);
    mutate(
      { credential: response.credential },
      {
        onSuccess: () => {
          router.push("/dashboard");
        },
      }
    );
  };

  const initializeGSI = () => {
    if (typeof window !== "undefined") {
      if (!userData.access_token) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_ID,
          callback: handleGoogleResponse,
        });
        document.cookie =
          "g_state=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        window.google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed()) {
            console.error("No google sessions");
          }
        });
      }
    }
  };

  useEffect(() => {
    const el = document.createElement("script");
    el.setAttribute("src", "https://accounts.google.com/gsi/client");
    document.querySelector("body")?.appendChild(el);
    el.onload = () => initializeGSI();
  }, []); // eslint-disable-line

  return (
    <div>
      <Head>
        <title>Techgro</title>
      </Head>
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
