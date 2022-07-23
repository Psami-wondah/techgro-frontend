import { atom } from "recoil";

export type ErrorAtom = {
  message: string;
};

export default atom<ErrorAtom>({
  key: "error-message",
  default: {
    message: "",
  } as ErrorAtom,
});
