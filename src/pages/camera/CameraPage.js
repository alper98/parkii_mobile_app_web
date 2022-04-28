import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import ImagePreview from "./components/ImagePreview";

export default function CameraPage() {
  const webcamRef = useRef(null);
  const { height, width } = useWindowDimensions();
  const [image, setImage] = useState("");

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);

  const videoConstraints = {
    width: width,
    height: height * 0.8,
    facingMode: "environment",
  };

  return (
    <div className="webcamCapture">
      {image === "" ? (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
          <Box textAlign="center" padding={2}>
            <Button
              size="large"
              onClick={capture}
              variant="contained"
              color="success"
              style={{ width: "50%" }}
            >
              Scan
            </Button>
          </Box>
        </>
      ) : (
        <ImagePreview image={image} setImage={setImage} />
      )}
    </div>
  );
}
