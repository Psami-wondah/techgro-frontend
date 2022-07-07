import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { Api } from "../services/Api";

export default function useResendEmail() {
  return useMutation((email: string) => Api.auth.resendEmail(email), {
    onSuccess: ({ data }) => {
      toast.success(data.message);
    },
    onError: (err: any) => {
      toast.error(err);
    },
  });
}
