import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Lottie from "react-lottie";
import * as onlyPhone from "../../lotties/onlyPhone.json";

export default function OnlyMobileAlert() {
  return (
    <Box
      sx={{
        height: "90vh",
        display: "flex",
        textAlign: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: onlyPhone,
        }}
        height={300}
        width={300}
      />
      <Typography variant="h4">
        Parkii.dk is only available trough a mobile device
      </Typography>
    </Box>
  );
}
