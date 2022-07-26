import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import io from "socket.io-client";
import farmAtom from "../atom/farm.atom";
import farmDataAtom, { FarmDataAtom } from "../atom/farmData.atom";
import userAtom from "../atom/user.atom";

export const useSocketIO = (socketUri: string) => {
  const user = useRecoilValue(userAtom);
  const farm = useRecoilValue(farmAtom);
  const [farmData, setFarmData] = useRecoilState(farmDataAtom);
  const socket = io(socketUri, {
    transports: ["websocket", "polling", "flashsocket"],
    auth: { token: user.access_token, farm_short_id: farm.currentFarm },
  });
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    console.log("connecting...");
    socket.once("connect", () => {
      console.log("Socket Connected");
      setIsConnected(true);
    });

    socket.on("connect_error", (err: { message: string }) => {
      console.log("Socket connection failed: " + err.message);
    });

    socket.on("new_sensor_data", (data: FarmDataAtom) => {
      if (
        farmData.filter((item) => item.date_added !== data.date_added).length ==
        0
      ) {
        // setFarmData((prevData) => [data, ...prevData]);
        console.log("testingoh", data);
      } else {
        console.log("already exists");
      }
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log("Socket disconnected");
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [farm.currentFarm]); // eslint-disable-line
  return { isConnected, socket };
};
