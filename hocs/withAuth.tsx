/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { toast } from "react-hot-toast";
import { Loader } from "../components/loader";
import userAtom from "../atom/user.atom";
import useVerifyToken from "../hooks/verifyToken.hook";
export const withAuth = (WrappedComponent: any) => {
  return function (props: any) {
    const router = useRouter();
    const [userData, setUserData] = useRecoilState(userAtom);
    const resetUser = useResetRecoilState(userAtom);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { mutate } = useVerifyToken();

    useEffect(() => {
      (async () => {
        // if no accessToken was found,then we redirect to "/" page.
        if (!userData.access_token) {
          router.push("/");
        } else {
          // we call the api that verifies the token.
          mutate(
            { access_token: userData.access_token },
            {
              onSuccess: () => {
                setIsAuthenticated(true);
                setIsLoading(false);
              },
              onError: () => {
                resetUser();
                router.push("/login");
                toast.error("Please Log In");
              },
            }
          );
        }
      })();
    }, [userData.access_token]);

    // check loading state
    if (isLoading) {
      return (
        <div>
          <Loader />
        </div>
      );
    }
    if (isAuthenticated) {
      return <WrappedComponent isLoading={isLoading} {...props} />;
    }
    return null;
  };
};
