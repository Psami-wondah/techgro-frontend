import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export type ErrorAtom = {
  message: string;
};

export default atom<ErrorAtom>({
  key: "error-message",
  default: {
    message: "",
  } as ErrorAtom,
  effects_UNSTABLE: [persistAtom],
});
