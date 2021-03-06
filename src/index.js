import "mapbox-gl/dist/mapbox-gl.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

//We add these 3 lines here
if (window.Cypress) {
  window.store = store;
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter forceRefresh={true}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </Provider>
    <ToastContainer
      position="top-right"
      limit={1}
      autoClose={1250}
      pauseOnHover={false}
      pauseOnFocusLoss={false}
      rtl={false}
      draggable={false}
    />
  </React.StrictMode>
);
