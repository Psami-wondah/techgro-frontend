import { useMutation } from "react-query";
import { Api } from "../services/Api";

export default function useVerifyToken() {
  return useMutation((data: { access_token: string }) =>
    Api.auth.verifyToken(data)
  );
}
