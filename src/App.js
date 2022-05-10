import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { use100vh } from "react-div-100vh";
import Lottie from "react-lottie";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import userService from "./api/userService";
import "./App.css";
import NavbarComponent from "./components/Navbar/NavbarComponent";
import useWindowDimensions from "./hooks/useWindowDimensions";
import * as onlyPhone from "./lotties/onlyPhone.json";
import CameraPage from "./pages/camera/CameraPage";
import LoginPage from "./pages/login/LoginPage";
import MapPage from "./pages/map/MapPage";
import NotFoundPage from "./pages/notFound/NotFoundPage";
import ProfilePage from "./pages/profile/ProfilePage";
import { getUserLocation } from "./redux/features/mapSlice";
import { setUser } from "./redux/features/userSlice";

const ProtectedRoutes = ({ user }) => {
  return user ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
  const realHeight = use100vh();
  const user = useSelector((s) => s.user.user);
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checkingUser, setCheckingUser] = useState(false);
  const [userInStorage, setUserInStorage] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  useEffect(() => {
    async function fetchUser() {
      setCheckingUser(true);
      const response = await userService.get();
      if (response?.user?.email == userInStorage?.email) {
        dispatch(getUserLocation());
        dispatch(setUser(response.user));
      }
      setCheckingUser(false);
    }
    if (userInStorage) {
      fetchUser();
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (user) {
        dispatch(getUserLocation());
        navigate("/map");
      }
    }
    fetchData();
  }, [user]);

  if (checkingUser) {
    return null;
  }

  if (width > 600) {
    return (
      <Box
        sx={{
          height: "90vh",
          display: "flex",
          textAlign: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: onlyPhone,
          }}
          height={300}
          width={300}
        />
        <Typography variant="h4">
          Parkii.dk is only available trough a mobile device
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: realHeight }}>
      <Grid sx={{ height: "8%" }}>{user && <NavbarComponent />}</Grid>
      <Grid sx={{ height: "92%" }}>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<LoginPage />} />
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
