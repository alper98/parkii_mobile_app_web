import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import ImagePreview from "./components/ImagePreview";
import { use100vh } from "react-div-100vh";
import { Helmet } from "react-helmet";

export default function CameraPage() {
  const webcamRef = useRef(null);
  const { width } = useWindowDimensions();
  const [image, setImage] = useState("");

  const height = use100vh();
  const halfHeight = height ? height * 0.9 : "90vh";

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);

  const videoConstraints = {
    width: width,
    height: halfHeight,
    facingMode: "environment",
  };

  return (
    <div className="webcamCapture">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Scan a sign - Parkii.dk</title>
      </Helmet>
      {image === "" ? (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
        </>
      ) : (
        <ImagePreview image={image} setImage={setImage} />
      )}
    </div>
  );
}
