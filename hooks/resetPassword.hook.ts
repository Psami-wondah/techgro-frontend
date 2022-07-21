import { useMutation } from "react-query";
import { toast } from "react-hot-toast";
import { Api } from "../services/Api";
interface Data {
  data: object;
  token: string;
}
export default function useResetPassword() {
  return useMutation(
    (data: Data) => Api.auth.resetPassword(data.token, data.data),
    {
      onSuccess: ({ data }) => {
        toast.success(data.message);
      },
      onError: (err: any) => {
        toast.error(err);
      },
    }
  );
}
