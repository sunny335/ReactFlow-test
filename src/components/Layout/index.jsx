import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { TextSmall, HeaderMainTitle, Line } from "./Style";
import Typography from "@mui/material/Typography"
const Layout = ({ children }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "#0f1219" }}>
        <Toolbar display="flex" width="100%" style={{ minHeight: "75px", justifyContent: "space-between" }}>
          <Box display={"inline-block"} margin={0} lineHeight={1}>
            <HeaderMainTitle>
              DataFlow
            </HeaderMainTitle>
            <TextSmall>
              by innogence
            </TextSmall>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center" gap="45px" marginRight="220px">
            <Box display="flex" justifyContent="center" alignItems="center" gap="15px">
              <Typography fontSize="14px" fontFamily="centuryGothic" color="#ffa834">Flow Status:</Typography>
              <Typography fontSize="14px" fontFamily="centuryGothic" color="#00f6ff">Not submitted</Typography>

            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" gap="15px">
              <Typography fontSize="14px" fontFamily="centuryGothic" color="#ffa834">Flow ID:</Typography>
              <Typography fontSize="14px" fontFamily="centuryGothic" color="#00f6ff">N/A</Typography>

            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" gap="15px">
              <Typography fontSize="14px" fontFamily="centuryGothic" color="#ffa834">Flow Name:</Typography>
              <Typography fontSize="14px" fontFamily="centuryGothic" color="#00f6ff">N/A</Typography>

            </Box>

          </Box>
        </Toolbar>
      </AppBar>
      <Line className="line">

      </Line>
      {children}

    </Box>
  );
};
export default Layout;
