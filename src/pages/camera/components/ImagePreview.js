import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function ImagePreview({ image, setImage }) {
  return (
    <>
      <img src={image} alt="" />
      <Box textAlign="center" padding={2}>
        <Button
          style={{ width: "40%", marginRight: "5px" }}
          color="warning"
          onClick={() => setImage("")}
          variant="contained"
        >
          RETRY
        </Button>
        <Button
          style={{ width: "40%", marginLeft: "5px" }}
          color="success"
          variant="contained"
        >
          Scan
        </Button>
      </Box>
    </>
  );
}
