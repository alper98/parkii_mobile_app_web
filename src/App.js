import Grid from "@mui/material/Grid";
import { useContext } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import NavbarComponent from "./components/Navbar/NavbarComponent";
import Camera from "./pages/camera/Camera";
import Login from "./pages/login/LoginContainer";
import MapContainer from "./pages/map/MapContainer";
import Profile from "./pages/profile/Profile";
import UserContext from "./userContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children ? children : <Outlet />;
};

function App() {
  const [user] = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/map");
    } else {
      navigate("/login");
    }
  }, [user]);

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
