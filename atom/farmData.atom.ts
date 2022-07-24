import { atom } from "recoil";

export type FarmDataAtom = {
  temperature: string;
  humidity: string;
  soil_moisture: string;
  date: string;
};

export default atom<FarmDataAtom[]>({
  key: "farm-data",
  default: [] as FarmDataAtom[],
});
