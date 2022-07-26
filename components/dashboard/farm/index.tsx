import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import farmAtom from "../../../atom/farm.atom";
import useCreateFarm, { useGetFarms } from "../../../hooks/farm.hook";
import Info from "../../info";
import { InputField } from "../../input";
import { ButtonSpinner, Loader } from "../../loader";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";

const Farm = () => {
  const { refetch, isFetching } = useGetFarms();
  const { mutate, isLoading } = useCreateFarm();
  const [err, setErr] = useState("");
  const [data, setData] = useState({
    name: "",
    key: "",
  });

  const submitFarm = () => {
    const { name, key } = data;
    if (name.trim() === "" || name === null) {
      return setErr("please enter a name");
    }
    if (key.trim() === "" || key === null) {
      return setErr("please enter a key");
    }
    setErr("");
    mutate(data, {
      onSuccess: () => {
        refetch();
      },
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value.trim(),
    });
  };

  const farms = useRecoilValue(farmAtom);
  useEffect(() => {
    refetch();
  }, [farmAtom]); // eslint-disable-line
  return (
    <div className="pt-16">
      <div>
        <p className="  font-[600] text-3xl tracking-wider">Add Farm</p>
        <div className="pt-5">
          {err && <Info type="warning" name="Error" message={err} />}
          <form>
            <InputField
              placeholder="Name"
              type="text"
              name="name"
              id="name"
              onChange={(e) => handleChange(e)}
            />
            <InputField
              placeholder="Key"
              type="text"
              name="key"
              id="key"
              onChange={(e) => handleChange(e)}
            />
            <div className="text-center">
              <button
                type="button"
                onClick={() => submitFarm()}
                className="bg-techgro-green py-[10px] w-[70%] font-[700] text-white rounded-[9px] mt-5 hover:opacity-50 transition ease-out duration-150"
              >
                {isLoading ? <ButtonSpinner /> : "Add this Farm"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div>
        {isFetching ? (
          <Loader />
        ) : (
          <div className="py-5">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="results table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Key</TableCell>
                    <TableCell align="right">Short ID</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {farms.farms.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>

                      <TableCell align="right">{row.key}</TableCell>
                      <TableCell align="right">{row.short_id}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Farm;
