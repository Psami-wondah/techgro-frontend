import { MenuItem, SelectChangeEvent } from "@mui/material";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import farmAtom from "../../atom/farm.atom";
import { useGetFarms } from "../../hooks/farm.hook";
import { ButtonSpinner } from "../loader";
import { SelectField } from "../select";

const SelectFarm = () => {
  const [farmState, setFarmState] = useRecoilState(farmAtom);
  const { refetch, isFetching } = useGetFarms();

  useEffect(() => {
    refetch();
  }, [farmAtom]); // eslint-disable-line
  const selectFarm = (e: SelectChangeEvent<string>) => {
    setFarmState({ ...farmState, currentFarm: e.target.value });
  };
  return (
    <div className="py-6">
      {isFetching? <ButtonSpinner/> :  <SelectField
        value={farmState.currentFarm}
        onChange={selectFarm}
        id="farm-select"
      >
       
        {farmState.farms.map((farm, index) => (
          <MenuItem key={index} value={farm.short_id}>
            {farm.name}
          </MenuItem>
        ))}
      </SelectField>}
      
    </div>
  );
};

export default SelectFarm;
