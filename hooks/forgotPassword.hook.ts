import { useMutation } from "react-query";
import { toast } from "react-hot-toast";
import { Api } from "../services/Api";

export default function useForgotPassword() {
  return useMutation((token: string) => Api.auth.forgotPassword(token), {
    onSuccess: ({ data }) => {
      toast.success(data.message);
    },
    onError: (err: any) => {
      toast.error(err);
    },
  });
}
