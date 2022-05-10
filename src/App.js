import Grid from "@mui/material/Grid";
// eslint-disable-next-line import/no-webpack-loader-syntax
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { use100vh } from "react-div-100vh";
import Lottie from "react-lottie";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import * as spinner from "./lotties/spinner.json";
import userService from "./api/userService";
import "./App.css";
import NavbarComponent from "./components/Navbar/NavbarComponent";
import CameraPage from "./pages/camera/CameraPage";
import LoginPage from "./pages/login/LoginPage";
import MapPage from "./pages/map/MapPage";
import NotFoundPage from "./pages/notFound/NotFoundPage";
import ProfilePage from "./pages/profile/ProfilePage";
import { getUserLocation } from "./redux/features/mapSlice";
import { setUser } from "./redux/features/userSlice";

const ProtectedRoutes = ({ user }) => {
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

function App() {
  const realHeight = use100vh();
  const user = useSelector((s) => s.user.user);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  useEffect(() => {
    async function fetchData() {
      if (user) {
        dispatch(getUserLocation());
        navigate("/profile");
      }
    }
    fetchData();
  }, [user]);

  return (
    <Box sx={{ height: realHeight }}>
      <Grid sx={{ height: "8%" }}>{user && <NavbarComponent />}</Grid>
      <Grid sx={{ height: "92%" }}>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoutes user={user} />}>
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
