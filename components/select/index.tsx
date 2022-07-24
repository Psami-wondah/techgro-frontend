import * as React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { SelectChangeEvent } from "@mui/material";

interface SelectFieldProps {
  children: React.ReactNode;
  id: string;
  onChange:
    | ((event: SelectChangeEvent<string>, child: React.ReactNode) => void)
    | undefined;
  value: string | number;
}

export const SelectField = ({
  children,
  id,
  onChange,
  value,
}: SelectFieldProps) => {
  return (
    <>
      <div className=" font-sofia">
        <Box sx={{ minWidth: 120 }}>
          <FormControl
            fullWidth
            sx={{
              "& .Mui-focused": {
                borderColor: "#E6E6E6",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#81E291 !important",
                },
              },
            }}
          >
            <label htmlFor={id} className="font-[400] mb-2">
              Select Farm to Display
            </label>
            <Select
              id={id}
              value={value as string}
              onChange={onChange}
              sx={{
                backgroundColor: "white",
                outline: "none",
                border: "none",
                height: "64px",
                "& .MuiOutlinedInput-input": {
                  color: "gray",
                },

                "& .MuiOutlinedInput-notchedOutline": {
                  borderWidth: "1px",
                  borderColor: "#E6E6E6",
                  borderStyle: "solid",
                },
                "& .Mui-focused": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E6E6E6 !important",
                  },
                },
              }}
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
                // getContentAnchorEl: null,
              }}
            >
              {children}
            </Select>
          </FormControl>
        </Box>
      </div>
    </>
  );
};
