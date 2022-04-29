import { useState } from "react";
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import ImagePreview from "./components/ImagePreview";

export default function CameraPage() {
  const { height, width } = useWindowDimensions();
  const [image, setImage] = useState("");

  return (
    <div className="webcamCapture">
      {image === "" ? (
        <>
          <Camera
            imageType={IMAGE_TYPES.JPG}
            idealFacingMode={FACING_MODES.ENVIRONMENT}
            idealResolution={{ width: width, height: height * 0.94 }}
            onTakePhoto={(dataUri) => {
              setImage(dataUri);
            }}
          />
        </>
      ) : (
        <ImagePreview image={image} setImage={setImage} />
      )}
    </div>
  );
}
