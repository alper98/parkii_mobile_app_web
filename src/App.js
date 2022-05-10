import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { use100vh } from "react-div-100vh";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import userService from "./api/userService";
import NavbarComponent from "./components/Navbar/NavbarComponent";
import CameraPage from "./pages/camera/CameraPage";
import LoginPage from "./pages/login/LoginPage";
import MapPage from "./pages/map/MapPage";
import NotFoundPage from "./pages/notFound/NotFoundPage";
import ProfilePage from "./pages/profile/ProfilePage";
import { getUserLocation } from "./redux/features/mapSlice";
import { setUser } from "./redux/features/userSlice";
import "./App.css";

const ProtectedRoute = () => {
  const location = useLocation();
  const user = useSelector((s) => s.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchUser() {
      const response = await userService.get();
      if (response?.user) {
        dispatch(getUserLocation());
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
  const realHeight = use100vh();
  const user = useSelector((s) => s.user.user);

  return (
    <Box sx={{ height: realHeight }}>
      <Grid sx={{ height: "7%" }}>{user && <NavbarComponent />}</Grid>
      <Grid sx={{ height: "93%" }}>
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
    </Box>
  );
}

export default App;
