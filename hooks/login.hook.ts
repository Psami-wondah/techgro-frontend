import { useMutation } from "react-query";
import { toast } from "react-hot-toast";
import { useSetRecoilState } from "recoil";
import userAtom from "../atom/user.atom";
import { Api } from "../services/Api";
import errorAtom from "../atom/error.atom";
import { EMAIL_NOT_VERIFIED_ERROR } from "../utils/constants";

export type LoginData = {
  email: string;
  password: string;
};

export default function useLogin() {
  const setUserData = useSetRecoilState(userAtom);
  const setErrorMessage = useSetRecoilState(errorAtom);
  return useMutation((data: LoginData) => Api.auth.signInEmail(data), {
    onSuccess: ({ data }) => {
      toast.success(data.message);
      setUserData(data);
    },
    onError: (err: any) => {
      if (err === EMAIL_NOT_VERIFIED_ERROR) {
        setErrorMessage({ message: EMAIL_NOT_VERIFIED_ERROR });
      } else toast.error(err);
    },
  });
}
