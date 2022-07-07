import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { Api } from "../services/Api";

export type RegisterData = {
  email: string;
  password: string;
  last_name: string;
  first_name: string;
};

export default function useRegister() {
  return useMutation((data: RegisterData) => Api.auth.signUpEmail(data), {
    onSuccess: ({ data }) => {
      toast.success(data.message);
    },
    onError: (err: any) => {
      toast.error(err);
    },
  });
}
