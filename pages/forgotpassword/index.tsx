import React, { useState } from "react";
import AuthLayout from "../../components/authlayout";
import Info from "../../components/info";
import { InputField } from "../../components/input";
import { ButtonSpinner } from "../../components/loader";
import useForgotPassword from "../../hooks/forgotPassword.hook";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");

  const { mutate, isLoading } = useForgotPassword();

  const submit = () => {
    const emailFilter =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (email.trim() === "" || email === null) {
      return setErr("Please enter your email");
    }
    if (!emailFilter.test(email)) {
      return setErr("Please include an @ in your email");
    }
    setErr("");
    mutate(email, {
      onSuccess: () => {},
    });
  };
  return (
    <AuthLayout>
      <p className="  font-[600] text-3xl tracking-wider mt-[10vh] md:mt-[20vh]">
        Forgot Password
      </p>
      {err && <Info type="warning" name="Error" message={err} />}
      <form action="" className="space-y-8 mt-10">
        <InputField
          placeholder="Email Address"
          type="email"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
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

export default ForgotPassword;
