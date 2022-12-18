import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import io from "socket.io-client";
import farmAtom from "../atom/farm.atom";
import farmDataAtom, { FarmDataAtom } from "../atom/farmData.atom";
import motorStateAtom from "../atom/motorState.atom";
import userAtom from "../atom/user.atom";
import { BACKEND_URL } from "../utils/constants";

export const useSocketIO = () => {
  const user = useRecoilValue(userAtom);
  const farm = useRecoilValue(farmAtom);
  const [farmData, setFarmData] = useRecoilState(farmDataAtom);
  const [motorState, setMotorState] = useRecoilState(motorStateAtom);
  const socket = io(BACKEND_URL, {
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

    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log("Socket disconnected");
    });
    socket.on("new_sensor_data", (data: FarmDataAtom) => {
      console.log(data);
      setFarmData((itemArr) => {
        const x = itemArr.filter((item) => item.date_added === data.date_added);
        if (x.length === 0) {
          return [data, ...itemArr];
        } else {
          return itemArr;
        }
      });
    });

    socket.on(
      "motor_update",
      (data: { motor_state: string; farm_short_id: String }) => {
        setMotorState(data.motor_state);
        console.log(data);
      }
    );

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      socket.off("new_sensor_data");
      socket.off("motor_update");
    };
  }, [farm.currentFarm]); // eslint-disable-line
  return { isConnected, socket };
};
