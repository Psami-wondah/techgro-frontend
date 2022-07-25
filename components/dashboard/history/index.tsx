import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import farmAtom from "../../../atom/farm.atom";
import farmDataAtom from "../../../atom/farmData.atom";
import { useGetFarmData } from "../../../hooks/farm.hook";
import { Loader } from "../../loader";
import SelectFarm from "../../selectfarm";

const History = () => {
  const farmState = useRecoilValue(farmAtom);
  const farmData = useRecoilValue(farmDataAtom);

  const { refetch, isFetching } = useGetFarmData(farmState.currentFarm);

  useEffect(() => {
    refetch();
  }, [farmState.currentFarm]); // eslint-disable-line
  return (
    <div>
      <SelectFarm />
      <div>
        {isFetching ? (
          <Loader />
        ) : (
          <div>
            {farmData.map((farmDatum, index) => (
              <div key={index}>{farmDatum.date_added}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
