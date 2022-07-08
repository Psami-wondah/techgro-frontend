import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useGoogleLogin from "../../hooks/google.hook";
import { GOOGLE_ID } from "../../utils/constants";
import { ButtonSpinner } from "../loader";

const GoogleButton = () => {
  const router = useRouter();
  const { mutate, isLoading } = useGoogleLogin();

  const handleGoogleResponse = async (
    response: google.accounts.id.CredentialResponse
  ) => {
    mutate(
      { credential: response.credential },
      {
        onSuccess: () => {
          router.push("/dashboard");
        },
      }
    );
  };

  const handleFailure = (error: unknown) => {
    console.log(error);
  };

  const initializeGSI = () => {
    if (typeof window !== "undefined") {
      try {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_ID,
          callback: handleGoogleResponse,
        });

        window.google.accounts.id.renderButton(
          document.getElementById(
            "google-continue-button-myquba"
          ) as HTMLElement,
          {
            type: "standard",
            text: "continue_with",
          }
        );
      } catch (error) {
        handleFailure(error);
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
    <>
      <div id="google-continue-button-myquba" className=""></div>
    </>
  );
};

export default GoogleButton;
