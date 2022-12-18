import moment from "moment";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import farmAtom from "../../../atom/farm.atom";
import farmDataAtom, { FarmDataAtom } from "../../../atom/farmData.atom";
import { FarmData, useGetFarmData } from "../../../hooks/farm.hook";
import { useSocketIO } from "../../../hooks/socket.hook";
import BasicChart from "../../chart";
import CircularProgressWithLabel from "../../circularprogress";
import { Loader } from "../../loader";
import SelectFarm from "../../selectfarm";

const Home = () => {
  const farmState = useRecoilValue(farmAtom);
  const farmData = useRecoilValue(farmDataAtom);

  const { mutate, isLoading } = useGetFarmData();

  const { socket, isConnected } = useSocketIO();

  useEffect(() => {
    mutate(farmState.currentFarm);
  }, [farmState.currentFarm]); // eslint-disable-line

  // useEffect(() => {
  //   const theInterval = setInterval(() => {
  //     if (socket.connected) {
  //       socket.emit(
  //         "sensor_data",
  //         JSON.stringify({ farm_short_id: farmState.currentFarm })
  //       );
  //     }
  //   }, 4000);

  //   return () => clearInterval(theInterval);
  // }, [farmState.currentFarm]); // eslint-disable-line

  return (
    <div>
      <>
        <SelectFarm />

        <p>
          Current Time:{" "}
          <span>
            {moment(new Date(farmData[0]?.date_added))
              .local()
              .format("MMMM Do YYYY, h:mm:ss a")}
          </span>
        </p>

        {isLoading ? (
          <Loader />
        ) : (
          <div className=" p-12 space-y-12 ">
            <div className="grid h-[130vh] lg:h-auto lg:grid-cols-2 items-center">
              <div>
                <div className=" flex justify-center">
                  <CircularProgressWithLabel
                    symbol="°C"
                    value={Math.round(Number(farmData[0]?.temperature))}
                    size={300}
                    sx={{ circle: { color: "rgb(249, 157, 64)" } }}
                    className="bg-gray-100 rounded-full"
                  />
                </div>
                <p className="w-full text-center p-4 text-xl font-nunito font-bold">
                  Temperature
                </p>
              </div>
              <BasicChart
                data={farmData
                  .map((item) => Number(item.temperature))
                  .slice(0, 4)
                  .reverse()}
                color={"rgb(249, 157, 64)"}
                xData={farmData
                  .map((item) => item.date_added)
                  .slice(0, 4)
                  .reverse()}
              />
            </div>
            <div className="grid h-[130vh] lg:h-auto lg:grid-cols-2 items-center">
              <div>
                <div className=" flex justify-center">
                  <CircularProgressWithLabel
                    value={Math.round(Number(farmData[0]?.humidity))}
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
              <BasicChart
                data={farmData
                  .map((item) => Number(item.humidity))
                  .slice(0, 4)
                  .reverse()}
                color={"#08D2FB"}
                xData={farmData
                  .map((item) => item.date_added)
                  .slice(0, 4)
                  .reverse()}
              />
            </div>
            <div className="grid h-[130vh] lg:h-auto lg:grid-cols-2 items-center">
              <div>
                <div className=" flex justify-center ">
                  <CircularProgressWithLabel
                    value={Math.round(Number(farmData[0]?.soil_moisture))}
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

              <BasicChart
                data={farmData
                  .map((item) => Number(item.soil_moisture))
                  .slice(0, 4)
                  .reverse()}
                color={"#81E291"}
                xData={farmData
                  .map((item) => item.date_added)
                  .slice(0, 4)
                  .reverse()}
              />
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default Home;
