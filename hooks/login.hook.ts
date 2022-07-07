import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import userAtom from "../atom/user.atom";
import { Api } from "../services/Api";

export type LoginData = {
  email: string;
  password: string;
};

export default function useLogin() {
  const setUserData = useSetRecoilState(userAtom);
  return useMutation((data: LoginData) => Api.auth.signInEmail(data), {
    onSuccess: ({ data }) => {
      toast.success("Welcome Back");
      setUserData(data);
    },
    onError: (err: any) => {
      toast.error(err);
    },
  });
}
