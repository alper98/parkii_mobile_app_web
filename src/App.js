import Grid from "@mui/material/Grid";
import { useContext, useEffect } from "react";
import { use100vh } from "react-div-100vh";
import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import NavbarComponent from "./components/Navbar/NavbarComponent";
import CameraPage from "./pages/camera/CameraPage";
import LoginPage from "./pages/login/LoginPage";
import MapPage from "./pages/map/MapPage";
import NotFoundPage from "./pages/notFound/NotFoundPage";
import ProfilePage from "./pages/profile/ProfilePage";
import UserContext from "./userContext";
import CornerRibbon from "react-corner-ribbon";

const ProtectedRoute = () => {
  const location = useLocation();
  const { currentUser } = useContext(UserContext);
  const [user, setUser] = currentUser;

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
      <CornerRibbon position="bottom-left">TEST v1.8.0</CornerRibbon>
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
