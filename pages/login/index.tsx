import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRecoilValue } from "recoil";
import errorAtom from "../../atom/error.atom";
import AuthLayout from "../../components/authlayout";
import GoogleButton from "../../components/google";
import Info from "../../components/info";
import { InputField } from "../../components/input";
import { ButtonSpinner } from "../../components/loader";
import ResendEmailModal from "../../components/resendverificationmail";
import useLogin from "../../hooks/login.hook";
import { EMAIL_NOT_VERIFIED_ERROR } from "../../utils/constants";

const Login = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const errorMessage = useRecoilValue(errorAtom);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (errorMessage.message == EMAIL_NOT_VERIFIED_ERROR) {
      toast(
        (t) => (
          <span>
            <p className="font-bold text-lg">Your email is not verified</p>
            <p></p>
            <p
              onClick={() => {
                handleOpen();
                toast.dismiss(t.id);
              }}
              className="text-techgro-green hover:opacity-50 transition ease-out duration-150 cursor-pointer mt-5 "
            >
              Resend Verification Email
            </p>
          </span>
        ),
        { duration: 5000 }
      );
    }
  }, [errorMessage]);

  const [err, setErr] = useState("");
  const { mutate, isLoading } = useLogin();
  function login() {
    const { email, password } = data;
    const emailFilter =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (email.trim() === "" || email === null) {
      return setErr("please enter your email");
    }
    if (!emailFilter.test(email)) {
      return setErr("Please include an @ in your email");
    }
    if (password.trim() === "" || password === null) {
      return setErr("please enter your password");
    }
    setErr("");
    mutate(data, {
      onSuccess: () => {
        router.push("/dashboard");
      },
    });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value.trim(),
    });
  };
  return (
    <AuthLayout>
      <p className="  font-[600] text-3xl tracking-wider mt-[10vh] md:mt-[20vh]">
        Sign In
      </p>
      <div className="py-5">
        <GoogleButton />
      </div>
      <p className="text-[#909090] text-lg text-center">- OR -</p>
      {err && <Info type="warning" name="Error" message={err} />}
      <form action="" className="space-y-8 mt-5">
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
            type="button"
            onClick={() => login()}
            className="bg-techgro-green py-[10px] w-[70%] font-[700] text-white rounded-[9px] mt-5 hover:opacity-50 transition ease-out duration-150"
          >
            {isLoading ? <ButtonSpinner /> : "Sign In"}
          </button>
          <p className="text-[#A0A0A0] mt-5">
            {`Don't`} have an account?{" "}
            <Link href={"/register"} passHref>
              <span className="text-techgro-green hover:opacity-50 transition ease-out duration-150 cursor-pointer">
                Register
              </span>
            </Link>
          </p>
          <p className=" mt-5">
            {" "}
            <Link href={"/forgotpassword"} passHref>
              <span className="text-techgro-green hover:opacity-50 transition ease-out duration-150 cursor-pointer">
                Forgot Password?
              </span>
            </Link>
          </p>
        </div>
      </form>
      <ResendEmailModal open={open} handleClose={handleClose} />
    </AuthLayout>
  );
};

export default Login;
