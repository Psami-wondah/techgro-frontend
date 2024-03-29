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
      setFarms({ farms: data, currentFarm: data[0]?.short_id });
    },
    onError: (err: any) => {
      toast.error(err);
      setFarms({ farms: [], currentFarm: "" });
    },
  });
}

export function useGetFarmData() {
  const setFarmData = useSetRecoilState(farmDataAtom);
  return useMutation(
    (farmShortId: string) => Api.farm.getFarmData(farmShortId),
    {
      onSuccess: ({ data }) => {
        setFarmData(data);
      },
      onError: (err: any) => {
        setFarmData([]);
        toast.error(err);
      },
    }
  );
}
