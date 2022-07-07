import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { Api } from "../services/Api";

export default function useConfirmEmail() {
  return useMutation((token: string) => Api.auth.confirmEmail(token), {
    onSuccess: ({ data }) => {
      toast.success(data.message);
    },
    onError: (err: any) => {
      toast.error(err);
    },
  });
}
