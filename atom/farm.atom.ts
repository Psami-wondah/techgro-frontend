import { atom } from "recoil";

import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export type FarmAtom = {
  name: string;
  key: string;
  short_id: string;
};

export default atom<FarmAtom[]>({
  key: "farm",
  default: [] as FarmAtom[],
  effects_UNSTABLE: [persistAtom],
});
