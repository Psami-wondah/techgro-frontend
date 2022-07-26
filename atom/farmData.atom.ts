import { atom } from "recoil";

export type FarmDataAtom = {
  temperature: string;
  humidity: string;
  soil_moisture: string;
  date_added: string;
};

export default atom<FarmDataAtom[]>({
  key: "farm-data",
  default: [
    {
      date_added: "2022-01-01T18:39:10.258+00:00",
      soil_moisture: "0",
      temperature: "0",
      humidity: "0",
    },
  ] as FarmDataAtom[],
});
