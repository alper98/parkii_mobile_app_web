import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import "./Camera.css";
import ImagePreview from "./components/ImagePreview";
import useWindowSize from "../../hooks/useWindowSize";

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
    facingMode: "user",
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
            style={{
              border: "2px solid black",
              objectFit: "fill",
            }}
          />
          <Box textAlign="center">
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
