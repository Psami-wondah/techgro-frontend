import React, { useEffect } from "react";
import { GOOGLE_ID } from "../../utils/constants";

const GoogleButton = ({
  handleGoogleResponse,
  handleFailure,
}: {
  handleGoogleResponse:
    | ((response: google.accounts.id.CredentialResponse) => void)
    | undefined;
  handleFailure: (error: unknown) => void;
}) => {
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
    <div id="google-continue-button-myquba" className="track-sign-in-cn"></div>
  );
};

export default GoogleButton;
