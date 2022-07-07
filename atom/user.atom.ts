import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export type UserAtom = {
  message: string;
  user: {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    image_url: string;
  };

  access_token: string;
};

export default atom<UserAtom>({
  key: "user-login",
  default: {
    message: "",
    user: {
      email: "",
      first_name: "",
      last_name: "",
      image_url: "",
    },

    access_token: "",
  } as UserAtom,
  effects_UNSTABLE: [persistAtom],
});
