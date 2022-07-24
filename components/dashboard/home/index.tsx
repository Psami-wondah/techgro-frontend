import { MenuItem, SelectChangeEvent } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import farmAtom from "../../../atom/farm.atom";
import { useGetFarms } from "../../../hooks/farm.hook";
import CircularProgressWithLabel from "../../circularprogress";
import { Loader } from "../../loader";
import { SelectField } from "../../select";

const Home = () => {
  const [currentFarm, setCurrentFarm] = useState("");
  const { refetch, isFetching } = useGetFarms();

  const selectFarm = (e: SelectChangeEvent<string>) => {
    setCurrentFarm(e.target.value);
  };
  const farms = useRecoilValue(farmAtom);
  useEffect(() => {
    refetch();
    setCurrentFarm(farms[0]?.short_id);
  }, [farmAtom]); // eslint-disable-line

  return (
    <div>
      {isFetching ? (
        <Loader />
      ) : (
        <>
          <div className="py-6">
            <SelectField
              value={currentFarm}
              onChange={selectFarm}
              id="farm-select"
            >
              {farms.map((farm, index) => (
                <MenuItem key={index} value={farm.short_id}>
                  {farm.name}
                </MenuItem>
              ))}
            </SelectField>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 p-12 gap-12">
            <div>
              <div className=" flex justify-center">
                <CircularProgressWithLabel
                  symbol="°C"
                  value={150}
                  size={300}
                  sx={{ circle: { color: "rgb(249, 157, 64)" } }}
                  className="bg-gray-100 rounded-full"
                />
              </div>
              <p className="w-full text-center p-4 text-xl font-nunito font-bold">
                Temperature
              </p>
            </div>

            <div>
              <div className=" flex justify-center">
                <CircularProgressWithLabel
                  value={20}
                  size={300}
                  symbol="%"
                  sx={{ circle: { color: "#08D2FB" } }}
                  className="bg-gray-100 rounded-full"
                />
              </div>
              <p className="w-full text-center p-4 text-xl font-nunito font-bold">
                Humidity
              </p>
            </div>

            <div>
              <div className=" flex justify-center ">
                <CircularProgressWithLabel
                  value={20}
                  size={300}
                  symbol="%"
                  sx={{ circle: { color: "#81E291" } }}
                  className="bg-gray-100 rounded-full"
                />
              </div>
              <p className="w-full text-center p-4 text-xl font-nunito font-bold">
                Soil Moisture Percentage
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
