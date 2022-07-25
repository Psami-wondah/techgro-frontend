import { useRouter } from "next/router";
import { useResetRecoilState } from "recoil";
import farmAtom from "../atom/farm.atom";
import farmDataAtom from "../atom/farmData.atom";
import userAtom from "../atom/user.atom";

const useLogout = () => {
  const resetUser = useResetRecoilState(userAtom);
  const resetFarms = useResetRecoilState(farmAtom);
  const resetFarmData = useResetRecoilState(farmDataAtom);
  const router = useRouter();

  const Logout = () => {
    resetUser();
    resetFarms();
    resetFarmData();
    router.push("/");
  };

  return { Logout };
};

export default useLogout;
