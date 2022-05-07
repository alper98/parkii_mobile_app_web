import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import { use100vh } from "react-div-100vh";
import { useDispatch, useSelector } from "react-redux";
import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import {
  fetchRestrictions,
  fetchZones,
  setViewState,
} from "./redux/features/mapSlice";
import userService from "./api/userService";
import "./App.css";
import NavbarComponent from "./components/Navbar/NavbarComponent";
import CameraPage from "./pages/camera/CameraPage";
import LoginPage from "./pages/login/LoginPage";
import MapPage from "./pages/map/MapPage";
import NotFoundPage from "./pages/notFound/NotFoundPage";
import ProfilePage from "./pages/profile/ProfilePage";
import { setUser } from "./redux/features/userSlice";

const ProtectedRoute = () => {
  const location = useLocation();
  const user = useSelector((s) => s.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const radius = useSelector((s) => s.user.settings.radius);

  useEffect(() => {
    async function fetchData() {
      navigator.geolocation.getCurrentPosition((pos) => {
        dispatch(
          setViewState({
            longitude: pos.coords.longitude,
            latitude: pos.coords.latitude,
          })
        );
        dispatch(
          fetchRestrictions({
            longitude: pos.coords.longitude,
            latitude: pos.coords.latitude,
            distance: radius,
          })
        );
        dispatch(fetchZones());
      });
    }
    async function fetchUser() {
      const response = await userService.get();
      if (response?.user) {
        navigate(location.pathname);
        fetchData();
        dispatch(setUser(response.user));
      }
    }
    fetchUser();
  }, []);

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
