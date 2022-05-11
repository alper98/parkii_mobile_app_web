import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { use100vh } from "react-div-100vh";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import userService from "./api/userService";
import "./App.css";
import NavbarComponent from "./components/Navbar/NavbarComponent";
import useWindowDimensions from "./hooks/useWindowDimensions";
import CameraPage from "./pages/camera/CameraPage";
import LoginPage from "./pages/login/LoginPage";
import MapPage from "./pages/map/MapPage";
import NotFoundPage from "./pages/notFound/NotFoundPage";
import ProfilePage from "./pages/profile/ProfilePage";
import { getUserLocation } from "./redux/features/mapSlice";
import { getUser } from "./redux/features/userSlice";
import OnlyMobileAlert from "./components/commons/OnlyMobileAlert";

const ProtectedRoutes = ({ user }) => {
  let location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

function App() {
  const realHeight = use100vh();
  const user = useSelector((s) => s.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checkingUser, setCheckingUser] = useState(false);
  const { width } = useWindowDimensions();
  const token = useSelector((s) => s.user.token);
  let location = useLocation();

  useEffect(() => {
    async function fetchUser() {
      setCheckingUser(true);
      const user = await dispatch(getUser()).unwrap();
      setCheckingUser(false);
    }
    if (token) {
      fetchUser();
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (user) {
        let from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      }
    }
    dispatch(getUserLocation());
    fetchData();
  }, [user]);

  if (checkingUser) {
    return null;
  }

  if (width > 600) {
    return <OnlyMobileAlert />;
  }

  return (
    <Box sx={{ height: realHeight }}>
      <Grid sx={{ height: "8%" }}>{user && <NavbarComponent />}</Grid>
      <Grid sx={{ height: "92%" }}>
        <Routes>
          <Route path="*" element={user ? <NotFoundPage /> : <LoginPage />} />
          <Route path="/" element={user ? <MapPage /> : <LoginPage />} />
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
