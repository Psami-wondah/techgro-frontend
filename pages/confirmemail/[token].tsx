import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Loader } from "../../components/loader";
import useConfirmEmail from "../../hooks/confirmEmail.hook";

const ConfirmEmail = () => {
  const router = useRouter();
  const { token } = router.query; //test with logs

  const { mutate, isLoading } = useConfirmEmail();

  useEffect(() => {
    if (router.isReady) {
      mutate(token as string, {
        onSuccess: () => {
          router.push("/login");
        },
      });
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps
  return <div>{isLoading ? <Loader /> : ""}</div>;
};

export default ConfirmEmail;
