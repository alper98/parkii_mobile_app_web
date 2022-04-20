import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import "../Camera.css";

export default function ImagePreview({ image, setImage }) {
  return (
    <>
      <img
        src={image}
        alt=""
        style={{
          border: "2px solid black",
          objectFit: "none",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& > *": {
            m: 1,
          },
        }}
      >
        <ButtonGroup
          size="large"
          variant="contained"
          aria-label="large button group"
          style={{ width: "100%" }}
        >
          <Button
            style={{ width: "50%" }}
            color="warning"
            onClick={() => setImage("")}
          >
            RETRY
          </Button>
          <Button style={{ width: "50%" }} color="success">
            Scan
          </Button>
        </ButtonGroup>
      </Box>
    </>
  );
}
