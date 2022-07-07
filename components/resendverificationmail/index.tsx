import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import useResendEmail from "../../hooks/resendEmail.hook";
import Info from "../info";
import { InputField } from "../input";
import { ButtonSpinner } from "../loader";

interface IResendEmailModalProps {
  open: boolean;
  handleClose: () => void;
}

const ResendEmailModal = ({ open, handleClose }: IResendEmailModalProps) => {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");

  const { mutate, isLoading } = useResendEmail();

  const submit = () => {
    const emailFilter =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (email.trim() === "" || email === null) {
      return setErr("please enter your email");
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
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="w-[90%] md:w-[70%] lg:w-[40%] mx-auto bg-white  p-9 mt-[20vh] rounded-md">
          <p className="  font-[600] text-3xl tracking-wider">
            Resend Verification Email
          </p>
          {err && <Info type="warning" name="Error" message={err} />}
          <form action="" className="space-y-8 mt-5">
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
        </div>
      </Modal>
    </div>
  );
};

export default ResendEmailModal;
