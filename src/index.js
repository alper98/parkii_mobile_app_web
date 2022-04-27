import "bootstrap/dist/css/bootstrap.min.css";
import "mapbox-gl/dist/mapbox-gl.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { UserProvider } from "./userContext";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </QueryClientProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
