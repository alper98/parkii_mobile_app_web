import Grid from "@mui/material/Grid";
import { useContext } from "react";
import { use100vh } from "react-div-100vh";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import NavbarComponent from "./components/Navbar/NavbarComponent";
import CameraPage from "./pages/camera/CameraPage";
import LoginPage from "./pages/login/LoginPage";
import MapPage from "./pages/map/MapPage";
import NotFoundPage from "./pages/notFound/NotFoundPage";
import ProfilePage from "./pages/profile/ProfilePage";
import UserContext from "./userContext";
import "react-toastify/dist/ReactToastify.css";

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
  const height = use100vh();
  const halfHeight = height ? height * 0.9 : "90vh";

  return (
    <Grid container direction="column">
      <NavbarComponent />
      <Grid style={{ height: halfHeight }}>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/camera" element={<CameraPage />} />
            <Route path="/map" element={<MapPage />} />
          </Route>
        </Routes>
      </Grid>
    </Grid>
  );
}

export default App;
