import Grid from "@mui/material/Grid";
import "bootstrap/dist/css/bootstrap.min.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { use100vh } from "react-div-100vh";
import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import "./App.css";
import NavbarComponent from "./components/Navbar/NavbarComponent";
import Camera from "./pages/camera/Camera";
import Login from "./pages/login/LoginContainer";
import MapContainer from "./pages/map/MapContainer";
import Profile from "./pages/profile/Profile";

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    console.log(user);
    return <Navigate to="/login" replace />;
  }
  return children ? children : <Outlet />;
};

function App() {
  const user = useSelector((s) => s.auth.user);
  const height = use100vh();
  const realDeviceHeight = height ? height / 1.08 : "50vh";
  return (
    <BrowserRouter>
      <Grid container direction="column">
        <NavbarComponent />
        <div style={{ height: realDeviceHeight }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route element={<ProtectedRoute user={user} />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/camera" element={<Camera />} />
              <Route path="/map" element={<MapContainer />} />
            </Route>
          </Routes>
        </div>
      </Grid>
    </BrowserRouter>
  );
}

export default App;
