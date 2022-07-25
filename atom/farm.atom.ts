import { atom } from "recoil";

import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export type FarmAtom = {
  farms: {
    name: string;
    key: string;
    short_id: string;
  }[];
  currentFarm: string;
};

export default atom<FarmAtom>({
  key: "farm",
  default: {
    farms: [],
    currentFarm: "",
  } as FarmAtom,
  effects_UNSTABLE: [persistAtom],
});
