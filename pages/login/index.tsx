import Image from "next/image";
import Link from "next/link";
import React from "react";
import AuthLayout from "../../components/authlayout";
import { InputField } from "../../components/input";

const Login = () => {
  return (
    <AuthLayout>
      <p className="  font-[600] text-3xl tracking-wider mt-[10vh] md:mt-[20vh]">
        Sign In
      </p>
      <div className="py-5">Sign up with google</div>
      <p className="text-[#909090] text-lg text-center">- OR -</p>
      <form action="" className="space-y-8 mt-5">
        <InputField
          placeholder="Email Address"
          type="email"
          name="email"
          id="email"
        />
        <InputField
          placeholder="Password"
          type="password"
          name="password"
          id="password"
        />
        <div className="text-center">
          <button className="bg-techgro-green py-[10px] w-[70%] font-[700] text-white rounded-[9px] mt-5 hover:opacity-50 transition ease-out duration-150">
            Sign In
          </button>
          <p className="text-[#A0A0A0] mt-5">
            {`Don't`} have an account?{" "}
            <Link href={"/register"}>
              <span className="text-techgro-green hover:opacity-50 transition ease-out duration-150 cursor-pointer">
                Register
              </span>
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
