import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import AuthLayout from "../../components/authlayout";
import Info from "../../components/info";
import { InputField } from "../../components/input";
import { ButtonSpinner } from "../../components/loader";
import useResetPassword from "../../hooks/resetPassword.hook";

const ResetPassword = () => {
  const router = useRouter();
  const { token } = router.query; //test with logs

  const [err, setErr] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isLoading } = useResetPassword();

  const submit = () => {
    if (router.isReady) {
      if (password.trim() === "" || password === null) {
        return setErr("please enter your email");
      }
      setErr("");
      mutate(
        { token: token as string, data: { password } },
        {
          onSuccess: () => {
            router.push("/login");
          },
        }
      );
    }
  };

  return (
    <AuthLayout>
      <Head>
        <title>Reset Password Techgro</title>
      </Head>
      <p className="  font-[600] text-3xl tracking-wider mt-[10vh] md:mt-[20vh]">
        Reset Your Password
      </p>
      {err && <Info type="warning" name="Error" message={err} />}
      <form action="" className="space-y-8 mt-10">
        <InputField
          placeholder="New Password"
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="text-center">
          <button
            type="button"
            onClick={() => submit()}
            className="bg-techgro-green py-[10px] w-[70%] font-[700] text-white rounded-[9px] mt-5 hover:opacity-50 transition ease-out duration-150"
          >
            {isLoading ? <ButtonSpinner /> : "Submit"}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;
