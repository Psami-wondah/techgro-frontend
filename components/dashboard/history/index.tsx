import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import farmAtom from "../../../atom/farm.atom";
import farmDataAtom, { FarmDataAtom } from "../../../atom/farmData.atom";
import { useGetFarmData } from "../../../hooks/farm.hook";
import { Loader } from "../../loader";
import SelectFarm from "../../selectfarm";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { useSocketIO } from "../../../hooks/socket.hook";

const History = () => {
  const farmState = useRecoilValue(farmAtom);
  const farmData = useRecoilValue(farmDataAtom);

  const { mutate, isLoading } = useGetFarmData();

  const { socket, isConnected } = useSocketIO();

  useEffect(() => {
    mutate(farmState.currentFarm);
  }, [farmState.currentFarm]); // eslint-disable-line

  useEffect(() => {
    const theInterval = setInterval(() => {
      if (socket.connected) {
        socket.emit(
          "sensor_data",
          JSON.stringify({ farm_short_id: farmState.currentFarm })
        );
      }
      // console.log(farmState.currentFarm);
      // console.log("sending", socket.connected);
    }, 4000);

    return () => clearInterval(theInterval);
  }, [farmState.currentFarm]); // eslint-disable-line
  return (
    <div>
      <SelectFarm />
      <div>
        {isLoading ? (
          <Loader />
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="results table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="right">
                    Soil Moisture
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="right">
                    Temperature
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="right">
                    Humidity
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {farmData.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&:first-child td, &:first-child th": {
                        color: "#81E291",
                        fontWeight: "bold",
                      },
                    }}
                    className=" first-of-type:text-techgro-green"
                  >
                    <TableCell component="th" scope="row">
                      {moment(new Date(row.date_added)).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </TableCell>

                    <TableCell align="right">
                      {row.soil_moisture + "%"}
                    </TableCell>
                    <TableCell align="right">
                      {row.temperature + "°C"}
                    </TableCell>
                    <TableCell align="right">{row.humidity + "%"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          // <div>
          //   {farmData.map((farmDatum, index) => (
          //     <div key={index}>{farmDatum.date_added}</div>
          //   ))}
          // </div>
        )}
      </div>
    </div>
  );
};

export default History;
