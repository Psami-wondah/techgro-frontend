import { useMutation, useQuery } from "react-query";
import { toast } from "react-hot-toast";
import { useSetRecoilState } from "recoil";
import userAtom from "../atom/user.atom";
import { Api } from "../services/Api";
import farmAtom from "../atom/farm.atom";
import { EMAIL_NOT_VERIFIED_ERROR } from "../utils/constants";
import farmDataAtom from "../atom/farmData.atom";

export type FarmData = {
  name: string;
  key: string;
};

export default function useCreateFarm() {
  return useMutation((data: FarmData) => Api.farm.addFarm(data), {
    onSuccess: ({ data }) => {
      toast.success(data.message);
    },
    onError: (err: any) => {
      toast.error(err);
    },
  });
}

export function useGetFarms() {
  const setFarms = useSetRecoilState(farmAtom);
  return useQuery("get-farms", () => Api.farm.getFarms(), {
    enabled: false,
    refetchOnMount: false,
    onSuccess: ({ data }) => {
      setFarms(data);
    },
    onError: (err: any) => {
      toast.error(err);
      setFarms([]);
    },
  });
}

export function useGetFarmData(farmShortId: string) {
  const setFarmData = useSetRecoilState(farmDataAtom);
  return useQuery("get-farm-data", () => Api.farm.getFarmData(farmShortId), {
    enabled: false,
    refetchOnMount: false,
    onSuccess: ({ data }) => {
      setFarmData(data);
    },
    onError: (err: any) => {
      toast.error(err);
    },
  });
}
