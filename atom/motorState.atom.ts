import { atom } from "recoil";

export default atom<string>({
  key: "motor",
  default: "off",
});
