import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import useWindowSize from "../../hooks/useWindowSize";
import ImagePreview from "./components/ImagePreview";

export default function Camera() {
  const webcamRef = useRef(null);
  const windowSize = useWindowSize();
  const [image, setImage] = useState("");

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);

  const videoConstraints = {
    width: windowSize,
    height: 700,
    facingMode: "environment",
  };

  return (
    <div className="webcamCapture">
      {image === "" ? (
        <>
          <Webcam
            width={videoConstraints.width}
            height={videoConstraints.height}
            mirrored
            ref={webcamRef}
            audio={false}
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
        <>
          <ImagePreview image={image} setImage={setImage} />
        </>
      )}
    </div>
  );
}
