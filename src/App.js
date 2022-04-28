import Grid from "@mui/material/Grid";
import { useContext } from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import NavbarComponent from "./components/Navbar/NavbarComponent";
import CameraPage from "./pages/camera/CameraPage";
import LoginPage from "./pages/login/LoginPage";
import MapPage from "./pages/map/MapPage";
import NotFoundPage from "./pages/notFound/NotFoundPage";
import ProfilePage from "./pages/profile/ProfilePage";
import UserContext from "./userContext";

const ProtectedRoute = () => {
  const location = useLocation();
  const [user] = useContext(UserContext);

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

function App() {
  return (
    <Grid container direction="column">
      <NavbarComponent />
      <Grid style={{ height: "90vh" }}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/camera" element={<CameraPage />} />
            <Route path="/map" element={<MapPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Grid>
    </Grid>
  );
}

export default App;
