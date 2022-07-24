import * as React from "react";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const CircularProgressWithLabel = (
  props: CircularProgressProps & { value: number; symbol: string }
) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="black"
          sx={{ fontSize: "3rem", fontFamily: "Lato" }}
        >{`${Math.round(props.value)}${props.symbol}`}</Typography>
      </Box>
    </Box>
  );
};

export default CircularProgressWithLabel;
