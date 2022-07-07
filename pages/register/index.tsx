import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import AuthLayout from "../../components/authlayout";
import Info from "../../components/info";
import { InputField } from "../../components/input";
import { ButtonSpinner } from "../../components/loader";
import useRegister from "../../hooks/register.hook";
import logo from "../../public/svgs/logo.svg";

const Register = () => {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
    last_name: "",
    first_name: "",
  });

  const [err, setErr] = useState("");
  const { mutate, isLoading } = useRegister();
  function register() {
    const { email, password, last_name, first_name } = data;
    const emailFilter =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (first_name === "" || first_name === null) {
      return setErr("please enter your first name");
    }
    if (last_name === "" || last_name === null) {
      return setErr("please enter your last name");
    }
    if (email === "" || email === null) {
      return setErr("please enter your email");
    }
    if (!emailFilter.test(email)) {
      return setErr("Please include an @ in your email");
    }
    if (password === "" || password === null) {
      return setErr("please enter your password");
    }
    setErr("");
    mutate(data, {
      onSuccess: () => {
        // router.push("/admin/dashboard");
      },
    });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <AuthLayout>
      <p className="  font-[600] text-3xl tracking-wider mt-[10vh] md:mt-[20vh]">
        Create Account
      </p>
      <div className="py-5">Sign up with google</div>
      <p className="text-[#909090] text-lg text-center">- OR -</p>
      {err && <Info type="warning" name="Error" message={err} />}
      <form action="" className="space-y-8 mt-5">
        <InputField
          placeholder="First Name"
          type="text"
          name="first_name"
          id="first_name"
          onChange={(e) => handleChange(e)}
        />
        <InputField
          placeholder="Last Name"
          type="text"
          name="last_name"
          id="last_name"
          onChange={(e) => handleChange(e)}
        />
        <InputField
          placeholder="Email Address"
          type="email"
          name="email"
          id="email"
          onChange={(e) => handleChange(e)}
        />
        <InputField
          placeholder="Password"
          type="password"
          name="password"
          id="password"
          onChange={(e) => handleChange(e)}
        />
        <div className="text-center">
          <button
            onClick={() => register()}
            type="button"
            className="bg-techgro-green py-[10px] w-[70%] font-[700] text-white rounded-[9px] mt-5 hover:opacity-50 transition ease-out duration-150"
          >
            {isLoading ? <ButtonSpinner /> : "Create Account"}
          </button>
          <p className="text-[#A0A0A0] mt-5">
            Already have an account?{" "}
            <Link href={"/login"}>
              <span className="text-techgro-green hover:opacity-50 transition ease-out duration-150 cursor-pointer">
                Log in
              </span>
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;
