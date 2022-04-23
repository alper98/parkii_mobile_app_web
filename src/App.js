import Grid from "@mui/material/Grid";
import "bootstrap/dist/css/bootstrap.min.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/Footer";
import Camera from "./pages/camera/Camera";
import MapContainer from "./pages/map/MapContainer";
import Profile from "./pages/profile/Profile";
import { use100vh } from "react-div-100vh";

function App() {
  const height = use100vh();
  const realDeviceHeight = height ? height / 1.08 : "50vh";
  return (
    <BrowserRouter>
      <Grid container direction="column">
        <Grid item xs={11}>
          <div style={{ height: realDeviceHeight }}>
            <Routes>
              <Route path="/" element={<Navigate to="/camera" />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/camera" element={<Camera />} />
              <Route path="/map" element={<MapContainer />} />
            </Routes>
          </div>
        </Grid>
        <Grid item xs={1}>
          <Footer />
        </Grid>
      </Grid>
    </BrowserRouter>
  );
}

export default App;
