import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import userAtom from "../atom/user.atom";
import { Api } from "../services/Api";

export type LoginData = {
  credential: string;
};

export default function useGoogleLogin() {
  const setUserData = useSetRecoilState(userAtom);
  return useMutation((data: LoginData) => Api.auth.googleAuth(data), {
    onSuccess: ({ data }) => {
      toast.success(data.message);
      setUserData(data);
    },
    onError: (err: any) => {
      toast.error(err);
    },
  });
}
