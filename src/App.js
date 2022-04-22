import Grid from "@mui/material/Grid";
import "bootstrap/dist/css/bootstrap.min.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/Footer";
import Camera from "./pages/camera/Camera";
import MapComponent from "./pages/map/MapComponent";
import Profile from "./pages/profile/Profile";

function App() {
  return (
    <BrowserRouter>
      <Grid container direction="column" height={"100vh"}>
        <Grid item xs={11}>
          <Routes>
            <Route path="/" element={<Navigate to="/camera" />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/camera" element={<Camera />} />
            <Route path="/map" element={<MapComponent />} />
          </Routes>
        </Grid>
        <Grid item xs={1}>
          <Footer />
        </Grid>
      </Grid>
    </BrowserRouter>
  );
}

export default App;
