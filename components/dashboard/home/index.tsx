import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import farmAtom from "../../../atom/farm.atom";
import { useGetFarmData } from "../../../hooks/farm.hook";
import CircularProgressWithLabel from "../../circularprogress";
import { Loader } from "../../loader";
import SelectFarm from "../../selectfarm";

const Home = () => {
  const farmState = useRecoilValue(farmAtom);

  const { refetch, isFetching } = useGetFarmData(farmState.currentFarm);

  return (
    <div>
      {isFetching ? (
        <Loader />
      ) : (
        <>
          <SelectFarm />
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
