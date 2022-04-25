import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import NavbarComponent from "./components/Navbar/NavbarComponent";
import Camera from "./pages/camera/Camera";
import Login from "./pages/login/LoginContainer";
import MapContainer from "./pages/map/MapContainer";
import Profile from "./pages/profile/Profile";
import { checkToken } from "./redux/features/auth/authSlice";
import { useEffect } from "react";

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children ? children : <Outlet />;
};

function App() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);

  useEffect(() => {
    dispatch(checkToken());
  }, []);

  return (
    <Grid container direction="column">
      <NavbarComponent />
      <Grid style={{ height: "90vh" }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/camera" element={<Camera />} />
            <Route path="/map" element={<MapContainer />} />
          </Route>
        </Routes>
      </Grid>
    </Grid>
  );
}

export default App;
