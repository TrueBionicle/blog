import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function CircularIndeterminate() {
  return (
    <Box
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      sx={{ display: "flex" }}
    >
      <CircularProgress />
    </Box>
  );
}
